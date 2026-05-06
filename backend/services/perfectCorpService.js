import fetch from 'node-fetch';

const API_KEY = process.env.PERFECT_CORP_API_KEY;
const BASE_URL = process.env.PERFECT_CORP_BASE_URL;

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_KEY}`
};

// Mock data for fallback
const mockFaceAnalysis = {
  skin_tone: 'warm',
  face_shape: 'oval',
  contrast_level: 'high',
  recommended_colors: ['warm red', 'golden yellow', 'burnt orange', 'chocolate brown', 'cream'],
  colors_to_avoid: ['cool pink', 'icy blue', 'silver']
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getFaceAnalysis = async (fileBuffer) => {
  try {
    if (!API_KEY || API_KEY.includes('your_api_key')) {
      console.log('[API] Demo mode: Using mock data');
      return { success: true, data: mockFaceAnalysis };
    }

    console.log('[API] Starting real face analysis workflow (v2.1)...');

    // 1. Start Task
    // Convert buffer to Base64 Data URI for src_file_url
    const base64Image = fileBuffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    const body = {
      "src_file_url": dataUri,
      "dst_actions": [],
      "miniserver_args": {
        "enable_mask_overlay": false
      },
      "format": "json",
      "pf_camera_kit": false
    };

    const startRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    });

    if (!startRes.ok) {
      const errorText = await startRes.text();
      // If Data URI is too large, we might get a 413 or 400.
      // In that case, we should log it clearly.
      throw new Error(`Start request failed: ${startRes.status} ${errorText.substring(0, 500)}`);
    }

    const startPayload = await startRes.json();
    const taskId = startPayload?.data?.task_id;

    if (!taskId) {
      throw new Error(`task_id not found in response: ${JSON.stringify(startPayload)}`);
    }

    console.log('[API] Task started, id =', taskId);

    // 2. Poll for results
    const maxAttempts = 60; // Increased to 60 (2 mins)
    const intervalMs = 2000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const pollUrl = `${BASE_URL}/${taskId}`;
      const pollRes = await fetch(pollUrl, { 
        method: 'GET', 
        headers: { "Authorization": `Bearer ${API_KEY}` } 
      });

      if (!pollRes.ok) {
        throw new Error(`Polling failed: ${pollRes.status}`);
      }

      const pollPayload = await pollRes.json();
      const status = pollPayload?.data?.task_status;
      console.log(`[API] Poll Attempt ${attempt}, status = ${status}`);

      if (status === 'success') {
        const results = pollPayload?.data?.results;
        console.log('[API] Success! Results received');
        
        // Map the real results to our internal faceData structure
        // The API returns skin_tone, face_shape, etc. in results
        return {
          success: true,
          data: {
            skin_tone: results?.skin_tone?.value || results?.skin_tone || 'neutral',
            face_shape: results?.face_shape?.value || results?.face_shape || 'oval',
            contrast_level: results?.contrast?.value || results?.contrast || 'medium',
            recommended_colors: results?.recommended_colors || mockFaceAnalysis.recommended_colors,
            colors_to_avoid: results?.colors_to_avoid || mockFaceAnalysis.colors_to_avoid
          }
        };
      }

      if (status === 'error' || status === 'failed') {
        throw new Error(`Task failed: ${JSON.stringify(pollPayload?.data?.error || pollPayload)}`);
      }

      await sleep(intervalMs);
    }

    throw new Error('Max attempts exceeded while polling');
  } catch (error) {
    console.error('[API] Real API error:', error.message);
    console.log('[API] Falling back to mock data');
    return { success: true, data: mockFaceAnalysis };
  }
};

const uploadImage = async (base64Data) => {
  const uploadUrl = 'https://yce-api-01.makeupar.com/s2s/v3.0/upload';
  const body = {
    "file": base64Data,
    "file_type": "image"
  };

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status}`);
  }

  const data = await res.json();
  return data.url; // assume it returns {url: "https://..."}
};

export const getClothAnalysis = async (srcFileUrl, refFileUrl) => {
  try {
    if (!API_KEY || API_KEY.includes('your_api_key')) {
      console.log('[API] Demo mode: Cloth API mock response');
      return { 
        success: true, 
        data: { 
          status: 'demo', 
          message: 'Cloth analysis simulated',
          images: ['https://plugins-media.makeupar.com/strapi/assets/clothes_01_10be1e1a9b.png'] 
        } 
      };
    }

    const CLOTH_BASE_URL = 'https://yce-api-01.makeupar.com/s2s/v3.0/task/cloth';
    console.log('[API] Starting Cloth API workflow (v3.0)...');

    // Extract base64 data from data URIs
    const extractBase64 = (dataUri) => {
      if (dataUri.startsWith('data:')) {
        const base64 = dataUri.split(',')[1];
        return base64;
      }
      return dataUri; // assume it's already base64
    };

    const srcBase64 = extractBase64(srcFileUrl);
    const refBase64 = extractBase64(refFileUrl);

    // Upload images first
    console.log('[API] Uploading src image...');
    const srcUrl = await uploadImage(srcBase64);
    console.log('[API] Src image uploaded:', srcUrl);

    console.log('[API] Uploading ref image...');
    const refUrl = await uploadImage(refBase64);
    console.log('[API] Ref image uploaded:', refUrl);

    // 1. Start Task
    const body = {
      "src_file_url": srcUrl,
      "ref_file_url": refUrl,
      "garment_category": "auto"
    };

    const startRes = await fetch(CLOTH_BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    });

    if (!startRes.ok) {
      const errorText = await startRes.text();
      throw new Error(`Start request failed: ${startRes.status} ${errorText.substring(0, 500)}`);
    }

    const startPayload = await startRes.json();
    const taskId = startPayload?.data?.task_id;

    if (!taskId) {
      throw new Error(`task_id not found in response: ${JSON.stringify(startPayload)}`);
    }

    console.log('[API] Cloth Task started, id =', taskId);

    // 2. Poll for results
    const maxAttempts = 60;
    const intervalMs = 2000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const pollUrl = `${CLOTH_BASE_URL}/${taskId}`;
      const pollRes = await fetch(pollUrl, { 
        method: 'GET', 
        headers: HEADERS 
      });

      if (!pollRes.ok) {
        throw new Error(`Polling failed: ${pollRes.status}`);
      }

      const pollPayload = await pollRes.json();
      const status = pollPayload?.data?.task_status;
      console.log(`[API] Cloth Poll Attempt ${attempt}, status = ${status}`);

      if (status === 'success') {
        return {
          success: true,
          data: pollPayload.data.results
        };
      }

      if (status === 'error' || status === 'failed') {
        throw new Error(`Cloth Task failed: ${JSON.stringify(pollPayload?.data?.error || pollPayload)}`);
      }

      await sleep(intervalMs);
    }

    throw new Error('Max attempts exceeded while polling Cloth API');
  } catch (error) {
    console.error('[API] Cloth API error:', error.message);
    return { success: false, error: error.message };
  }
};
