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
    <div 
      className="w-full h-[400px] md:h-[600px] relative border border-gray-700 rounded-lg overflow-hidden"
      onWheelCapture={(e) => {
        // Intercept wheel events BEFORE they reach Spline canvas to prevent zoom
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMoveCapture={(e) => {
        // Intercept touch events BEFORE they reach Spline to prevent touch zoom
        if (e.touches.length === 1) {
          // Only prevent single-touch scroll, allow multi-touch gestures for interaction
          e.preventDefault();
        }
      }}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <div className="w-full h-full relative">
        <Spline
          scene="https://prod.spline.design/52fHeNdbT3Cp05k1/scene.splinecode"
          style={{ 
            width: '100%', 
            height: '100%'
          }}
          onError={handleError}
        />
        {/* Black overlay to cover watermark completely */}
        <div className="absolute bottom-0 right-0 w-48 h-20 bg-black z-10"></div>
      </div>
    </div>
  );
};

export default SplineModel;