"use client"

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import styles from './../home.module.css'
import { handleSignInWithGoogle } from '../Components/signInWithGoogle';
import { useRouter } from "next/navigation"
import { getUser } from "../firebase";

const Page = () => {
  const router = useRouter()
  const [unLogged, setUnlogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        if (currentUser) {
          router.push("/")
        }
      } catch (error) {
        setUnlogged(true);
        console.log("Sign In please");
      }
    };
    fetchUser();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await handleSignInWithGoogle(e);
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  if (unLogged === true) {
    return (
      <section className="flex flex-col items-center h-screen mt-5 m-5" >
        <div className="flex items-center justify-between w-full p-4 top-0">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-neutral-700">MY</h1>
            <h1 className="text-lg text-neutral-700">ROOMMATE </h1>
          </div>
        </div>
        <div className={styles.section}>
        </div>
        <div className=" absolute bottom-28 left-14">
          <a href="/signUp">
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-16 py-4 mr-2 mb-2 dark:bg-gray-800 dark:text-white">Get Started!</button>
          </a>
          <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-6 py-4 mr-2 mb-2 dark:bg-red-800 dark:text-white" onClick={handleClick}>
            <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </button>
          {/*
              <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-3 mr-2 mb-2 pb-4 dark:bg-gray-800 dark:text-white  ">
                <svg aria-hidden="true" className="w-5 h-4" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Icon description</span>
              </button>
              */}
          <div className="grid justify-center">
            <div className="flex">
              <p className="font-semibold text-sm mr-1">Already have an account?</p>
              <a href="/signIn" className="font-semibold text-orange-600 text-sm">Sign in</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Page;