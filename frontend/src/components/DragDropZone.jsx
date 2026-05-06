import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { MdCloudUpload } from 'react-icons/md';

export const DragDropZone = ({ onDrop, accept = 'image/*', children }) => {
  const handleDrop = useCallback(acceptedFiles => {
    onDrop?.(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': [] }
  });

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ borderColor: '#8B5CF6' }}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <input {...getInputProps()} />
      <MdCloudUpload className="w-12 h-12 mx-auto text-primary mb-4" />
      {isDragActive ? (
        <p className="text-primary font-semibold">Drop files here...</p>
      ) : (
        <div>
          <p className="text-gray-300 font-semibold">Drag and drop images here</p>
          <p className="text-gray-400 text-sm mt-1">or click to select</p>
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};
