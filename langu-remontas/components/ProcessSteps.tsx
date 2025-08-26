import React from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  content: {
    title: string;
    subtitle: string;
    steps: Step[];
  };
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ content }) => {
  if (!content || !content.steps) {
    return null;
  }

  const { title, subtitle, steps } = content;

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300" aria-hidden="true"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary-600 text-white rounded-full text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
