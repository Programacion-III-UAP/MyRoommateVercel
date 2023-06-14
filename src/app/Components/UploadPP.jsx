"use client";

import { useEffect, useState } from "react";
import { getUser, db } from "./../firebase";
import { updateProfile } from "firebase/auth";
import { ref as storageRef, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation"
import Image from 'next/image';  //Función de next para imagenes
//import Avatar from "react-avatar-edit"; //Componente de react para la preview de la imagen
import { update, ref as databasebRef } from "firebase/database";


// El resto de las funciones son las que ya estaban para subir la foto, lo único que cambié fue que el setPhotoFile lo tome de la preview
//pero antes de que eso funcione hay que hacer un decode porque cuando se settea el photoURL se hace en base64.

const UploadPP = () => {
  const router = useRouter()
  const storage = getStorage();
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        router.push("/notSign")
      }
    };
    fetchUser();
  }, []);

  async function upload(photoFile, user) {
    try {
      const fileRef = storageRef(storage, `profilePicture/${user.uid}.png`);
      const snapshot = await uploadBytes(fileRef, photoFile)
      const photoURL = await getDownloadURL(snapshot.ref)
      await updateProfile(user, { photoURL });
      alert("Uploaded file!");
      router.refresh();
      const dbRef = databasebRef(db, 'users/' + user.uid)
      await update(dbRef, {
        photoURL: photoURL,
      })
    } catch (error) {
      console.log(error);
    }
  }


  function handleClick() {
    upload(photoFile, user);
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhotoFile(e.target.files[0])
    }
  }

  //esto es solo para cerrar la preview
  const onClose = () => {
    setPreview(null);
  }

  const onCrop = view => {
    setPreview(view);
    console.log(view);
  }

  return (
    <div>
      {/* 
        <div>
          <Avatar
            width={250}
            height={250}
            onCrop={onCrop}
            onClose={onClose}
            src={preview}
          />
        </div>
        {preview && <img src={preview} alt="" />}*/}
      <div className="flex flex-col items-center">
        {user && user.photoURL ? (
          <Image src={user.photoURL} width={120} height={120} className="m-10 shadow-xl rounded-full" alt="User Avatar" />
        ) : (
          <Image src="/userPhoto.png" width={120} height={120} className="m-10 shadow-xl rounded-full" alt="User Avatar" />
        )}
        {user ? (
          <h1 className="text-xl font-bold text-neutral-700 text-center">{user.displayName}</h1>
        ) : null}
        <div className="flex justify-center w-full">
          <input className="text-xs cursor-pointer shadow-xl font-semibold m-2 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-300 " type="file" onChange={handleChange} />
          <button className="text-xs cursor-pointer  shadow-xl font-semibold m-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-300 disabled:opacity-10" disabled={!photoFile} onClick={handleClick}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};


export default UploadPP;  