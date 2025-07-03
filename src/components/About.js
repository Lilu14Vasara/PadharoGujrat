import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          About Us
        </h2>

        {/* About Content */}
        <div className="bg-white shadow-xl rounded-lg p-8 md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center">
            <img
              src="/image/grba2.jpg"
              alt="Gujarat Travel"
              className="w-72 h-72 object-cover rounded-full border-4 border-green-700 mb-6"
            />
            <p className="text-xl text-center text-gray-600">
              "Discover the rich culture, heritage, and beauty of Gujarat with our detailed travel guide. Explore the best places, hidden gems, and vibrant traditions of this incredible state."
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              What We Do
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              At Padharo Gujarat, our mission is to help travelers explore the breathtaking beauty of Gujarat. From the majestic temples to the serene beaches, we provide you with detailed information, hidden gems, and travel tips for each region.
            </p>
            <ul className="list-disc ml-6 text-gray-600">
              <li className="mb-2">Handpicked tourist spots and local gems</li>
              <li className="mb-2">Travel itineraries and planning tips</li>
              <li className="mb-2">Cultural insights and experiences</li>
              <li className="mb-2">Hotel, restaurant, and transport recommendations</li>
            </ul>
            <div className="mt-6">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                To be Gujarat's most trusted travel guide, helping tourists experience the true essence of the state with personalized travel suggestions, rich culture, and spectacular sights.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Made with ❤️ by <span className="text-green-700 font-bold">Padharo Gujarat Team</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
