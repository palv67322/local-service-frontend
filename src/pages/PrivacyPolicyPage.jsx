import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-600 space-y-4">
        <p><strong>Last updated: September 23, 2025</strong></p>
        <p>
          LocalServicePro ("us", "we", or "our") operates the LocalServicePro website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your email address, name, phone number, and address.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Use of Data</h2>
        <p>
          LocalServicePro uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to allow you to participate in interactive features of our Service when you choose to do so, to provide customer care and support, and to monitor the usage of the Service.
        </p>
        <p>
          Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;