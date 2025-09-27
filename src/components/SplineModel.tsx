import Spline from '@splinetool/react-spline';

const SplineModel = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden">
      <Spline
        scene="https://prod.spline.design/52fHeNdbT3Cp05k1/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SplineModel;