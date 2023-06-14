"use client"

import React, { useEffect, useState } from "react";
import UploadPP from "../Components/UploadPP";
import SocialButtons from "../Components/SocialButtons";
import { auth } from "./../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"
import { getUser } from "./../firebase";
import { FaPencilAlt } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { Navigation } from "./../Components/navigationButtons";

const Page = () => {
  const router = useRouter()
  const [user, setUser] = useState(null);

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

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("Sign out");
      router.push('/notSign');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-between mb-4 mt-8 text-center">
        <button className=" bg-gray-200 p-5 mr-20 rounded-full hover:bg-gray-500 hover:text-white shadow-xl" onClick={handleBack} ><MdArrowBack /></button>
        <div className="text-black py-2">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        <button className=" bg-black p-5 ml-20 rounded-full hover:bg-gray-500 hover:text-white shadow-xl"><FaPencilAlt className="text-gray-300" /></button>
      </div>
      <div> <UploadPP /></div>
      <div className="flex-1 m-20"><SocialButtons /></div>
      <div>
        <button type="logout" className="mb-20 w-full text-sm cursor-pointer font-semibold px-12 py-2 rounded-full shadow-xl bg-gray-200 hover:bg-gray-500 hover:text-white" href="/NotSign" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Navigation></Navigation>
    </div>
  );
  
  };
};
  

export default Page;
