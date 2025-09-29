import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { Shield } from 'lucide-react';

const SplineModel = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl">
        <div className="text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">CodeInspector</h3>
          <p className="text-gray-400">AI Code Detection & Humanization Platform</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden">
      <Spline
        scene="https://prod.spline.design/52fHeNdbT3Cp05k1/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        onError={handleError}
      />
      {/* Black overlay to cover watermark at bottom right */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-10"></div>
    </div>
  );
};

export default SplineModel;