import React, { useState, useEffect } from 'react';
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'boxicons';

const ProfilePicture = ({ googlePhotoURL, onImageUpdate }) => {
    const [image, setImage] = useState(googlePhotoURL || ''); //poe a imagem padrao caso o usuario n tenha foto no google  FAZER DEPOIS
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(image);

    useEffect(() => {
        if (googlePhotoURL) {
            setImage(googlePhotoURL);
            setPreview(googlePhotoURL);
        }
    }, [googlePhotoURL]);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Upload to Firebase Storage
            const user = auth.currentUser;
            if (user) {
                const storageRef = ref(storage, `profilePictures/${user.uid}`);
                await uploadBytes(storageRef, selectedFile);
                const downloadURL = await getDownloadURL(storageRef);
                setImage(downloadURL);
                onImageUpdate(downloadURL); // Notifica o pai sobre a nova URL
            }
        }
    };

    return (
        <div className="relative w-32 h-32">
            <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-[#121212] cursor-pointer hover:opacity-70 transition-opacity duration-300"
                onClick={() => document.getElementById('profilePictureInput').click()}
            />
            <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <div 
            className="absolute inset-0 flex items-center justify-center bg-black rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300 cursor-pointer" 
            onClick={() => document.getElementById('profilePictureInput').click()}>
                <box-icon name='pencil' type='solid' color='#ffffff' size='28px'></box-icon>
            </div>
        </div>
    );
};

export default ProfilePicture;