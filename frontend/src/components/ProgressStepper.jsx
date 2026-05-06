export const ProgressStepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
              index <= currentStep
                ? 'bg-primary text-dark'
                : 'bg-border text-gray-400'
            }`}
          >
            {index + 1}
          </div>
          <span className={`text-sm ${index <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-full mt-2 ${
                index < currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
