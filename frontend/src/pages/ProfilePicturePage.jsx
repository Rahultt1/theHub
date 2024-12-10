import React, { useState } from "react";

const ProfilePhoto = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State to store the selected profile image URL
  const [uploadedFile, setUploadedFile] = useState(null); // Temporary state for modal photo

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle file selection in modal
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedFile(fileURL);
    }
  };
  

  // Save the selected photo and close the modal
  const savePhoto = () => {
    if (uploadedFile) {
      setProfileImage(uploadedFile);
      setUploadedFile(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center -mt-12 min-h-screen">
        <div className="bg-transparent p-8 rounded-2xl shadow-md w-2/5 h-3/4 transform transition-all hover:scale-105">
          <div className="flex flex-col items-center">
            {/* Profile Photo Section */}
            <div className="w-80 h-80 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-medium mb-8 border-4 border-dashed border-gray-300">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                "Add Photo"
              )}
            </div>

            {/* Buttons */}
            <button
              onClick={openModal}
              className="w-2/6 bg-green-500 text-white text-center py-2 px-4 rounded-lg text-md font-semibold hover:bg-green-600 transition-all duration-300 mb-0 shadow-md hover:shadow-lg"
            >
              Add Photo
            </button>
            {/* Conditionally render Save Profile Photo button */}
{profileImage && (
  <button
    onClick={() => alert('Saving Profile Photo...')} // Replace with actual save logic
    className="w-2/6 bg-blue-500 text-white py-2 px-4 rounded-lg text-md mt-2 mb-2"
  >
    Save Profile Photo
</button>
)}
            <button
              className="w-2/6 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-md font-semibold hover:bg-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Do it Later
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex items-center pb-3 border-b border-gray-200">
              <div className="flex-1">
                <h3 className="text-gray-800 text-xl font-bold">Upload Image</h3>
                <p className="text-gray-600 text-xs mt-1">Upload image to this profile</p>
              </div>

              <button onClick={closeModal} className="ml-2 cursor-pointer fill-gray-400 hover:fill-red-500">
                X
              </button>
            </div>

            {/* Upload Area with Drag & Drop Interface */}
            <div className="rounded-lg border-2 border-gray-200 border-dashed mt-6">
            <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
  <input
    id="chooseFile"
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />
  
  <label
    htmlFor="chooseFile"
    className="cursor-pointer text-blue-600 text-lg mb-2"
  >
    Choose Image
  </label>

  {/* Drag and Drop Instructions */}
  <h4 className="text-sm text-gray-600 mt-2">
    Drag & Drop or <span className="text-blue-600 cursor-pointer">Choose Image</span> to upload
  </h4>

  {/* Uploaded Preview */}
  {uploadedFile && (
    <img
      src={uploadedFile}
      alt="Uploaded"
      className="mt-4 w-32 h-32 rounded-full object-cover"
    />
  )}
</div>

            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-between gap-4 mt-6">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 rounded-lg text-gray-800 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={savePhoto}
                className="w-full px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-900"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
