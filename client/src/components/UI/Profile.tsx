import React from "react";

const UpdateProfile = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl h-full flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Update Profile
        </h2>

        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-blue-500 mb-4"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Change Profile Picture
          </button>
        </div>

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
