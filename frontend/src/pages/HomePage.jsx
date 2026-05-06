import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';
import { Button } from '../components/Button';

export const HomePage = () => {
  const features = [
    {
      title: 'Face Analysis',
      description: 'AI-powered analysis to understand your skin tone, face shape, and color palette'
    },
    {
      title: 'Wardrobe Audit',
      description: 'Smart categorization of your items: Keep, Donate, or Sell'
    },
    {
      title: 'Outfit Generator',
      description: 'Create perfect outfit combinations based on your face analysis'
    },
    {
      title: 'Instant Recommendations',
      description: 'Get personalized styling advice for every occasion'
    }
  ];

  return (
    <div className="flex-1">
      <section className="min-h-screen bg-gradient-to-b from-dark via-dark to-card/50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl sm:text-7xl font-bold">
              Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Fashion</span> Therapist
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get personalized wardrobe recommendations based on your unique features. Analyze your style, organize your closet, and create perfect outfits in seconds.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/selfie">
                <Button variant="primary" size="lg">
                  Get Started <MdArrowForward />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-card to-dark border border-border rounded-lg p-6 hover:border-primary/50 transition"
              >
                <div className="w-12 h-12 bg-primary/20 text-primary text-xl font-bold rounded-lg flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
