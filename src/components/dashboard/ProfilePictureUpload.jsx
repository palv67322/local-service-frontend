import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import toast from 'react-hot-toast';

function ProfilePictureUpload() {
  const { user, updateUserContext } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    setUploading(true);
    const toastId = toast.loading('Uploading picture...');
    const storageRef = ref(storage, `profile_pictures/${user._id}/${imageFile.name}`);

    try {
      // Step 1: Upload to Firebase
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Step 2: Save URL to our backend
      const res = await axios.put('import.meta.env.VITE_API_BASE_URL/api/auth/update-picture', { imageUrl: downloadURL });

      // Step 3: Update context
      updateUserContext({ user: res.data.user }); // Assuming provider data doesn't change
      
      toast.success('Profile picture updated!', { id: toastId });
      setImageFile(null);
    } catch (error) {
      toast.error('Upload failed.', { id: toastId });
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const profilePicUrl = user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random`;

  return (
    <div className="flex flex-col items-center">
      <img
        src={profilePicUrl}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <div className="mt-4">
        <input type="file" id="profilePicInput" className="hidden" onChange={handleFileChange} accept="image/*" />
        <label htmlFor="profilePicInput" className="cursor-pointer bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm hover:bg-gray-300">
          Choose File
        </label>
        {imageFile && (
          <button onClick={handleUpload} disabled={uploading} className="ml-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-indigo-700 disabled:bg-gray-400">
            {uploading ? 'Uploading...' : 'Upload & Save'}
          </button>
        )}
      </div>
      {imageFile && <span className="text-xs mt-2 text-gray-500">{imageFile.name}</span>}
    </div>
  );
}

export default ProfilePictureUpload;