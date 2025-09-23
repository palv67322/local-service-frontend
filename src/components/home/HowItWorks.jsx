import React from 'react';

function HowItWorks() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Step 1 */}
          <div className="text-center max-w-xs">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl rounded-full">
              1
            </div>
            <h3 className="mt-4 text-xl font-semibold">Search for a Service</h3>
            <p className="mt-2 text-gray-600">
              Enter the service you need and find trusted professionals near you.
            </p>
          </div>
          {/* Step 2 */}
          <div className="text-center max-w-xs">
             <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl rounded-full">
              2
            </div>
            <h3 className="mt-4 text-xl font-semibold">Book & Pay</h3>
            <p className="mt-2 text-gray-600">
              Choose your provider, schedule a time, and pay securely online.
            </p>
          </div>
          {/* Step 3 */}
          <div className="text-center max-w-xs">
             <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl rounded-full">
              3
            </div>
            <h3 className="mt-4 text-xl font-semibold">Get It Done</h3>
            <p className="mt-2 text-gray-600">
              Relax while our verified professional takes care of everything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;