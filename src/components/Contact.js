import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          Contact Us
        </h2>

        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          {submitted ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Thank you for reaching out!
              </h3>
              <p className="text-lg text-gray-600">
                We'll get back to you as soon as possible. In the meantime,
                feel free to browse our website!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-lg font-medium text-gray-800 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-gray-800 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col mt-6">
                <label
                  htmlFor="message"
                  className="text-lg font-medium text-gray-800 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="p-3 border border-gray-300 rounded-md"
                  placeholder="Your Message"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Or Reach Us At:
          </h3>
          <p className="text-lg text-gray-600">
            <strong>Email:</strong> padharogujarat@gmail.com
          </p>
          <p className="text-lg text-gray-600">
            <strong>Phone:</strong> +91 123 456 7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
