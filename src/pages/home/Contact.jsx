import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:flex md:gap-10">
        {/* Left - Info */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            Welcome to <span className="font-semibold text-orange-500">KV-Audio</span> — your one-stop shop
            for professional sound stage equipment, lighting, and AV gear. Whether you're hosting a concert, wedding,
            or corporate event, we provide high-quality gear to make your event unforgettable.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">📍 Location:</h3>
            <p className="text-gray-600">No. 12A, Main Street, Padukka, Sri Lanka</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">📞 Phone:</h3>
            <p className="text-gray-600">+94 77 123 4567</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">⏰ Working Hours:</h3>
            <p className="text-gray-600">Monday – Saturday: 9:00 AM – 7:00 PM</p>
          </div>
        </div>

        {/* Right - Map */}
        <div className="flex-1 mt-8 md:mt-0">
          <iframe
            title="Map"
            className="rounded-xl w-full h-72 border"
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=Padukka&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
