import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProfileEditModal from './ProfileEditModal';
import ProfilePictureUpload from './ProfilePictureUpload';

function Profile() {
    const { user, provider } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!user) {
        return <p className="text-center py-10">Loading profile...</p>;
    }

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column for Profile Picture */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <ProfilePictureUpload />
                        </div>
                    </div>

                    {/* Right Column for Details */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg"><span className="font-semibold">Name:</span> {user.name}</p>
                            <p className="text-lg mt-2"><span className="font-semibold">Email:</span> {user.email}</p>
                            <p className="text-lg mt-2"><span className="font-semibold">Role:</span> <span className="capitalize">{user.role}</span></p>
                            
                            {user.role === 'provider' && provider && (
                                <>
                                    <hr className="my-4" />
                                    <p className="text-lg"><span className="font-semibold">Business Name:</span> {provider.businessName}</p>
                                    <p className="text-lg mt-2"><span className="font-semibold">Phone:</span> {provider.phone}</p>
                                    <p className="text-lg mt-2"><span className="font-semibold">Address:</span> {provider.address}</p>
                                </>
                            )}
                            
                            <button onClick={() => setIsModalOpen(true)} className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProfileEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default Profile;