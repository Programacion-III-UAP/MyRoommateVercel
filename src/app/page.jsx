"use client"

import React, { useEffect, useState } from "react";
import { FaBell, FaTimes, FaHeart } from "react-icons/fa";
import Image from 'next/image';
import { getUser } from "./firebase";
import { useRouter } from "next/navigation"
import { getUsersDb } from "./Components/getUsersDb";
import { assignLike } from "./Components/assignLike"
import { Navigation } from "./Components/navigationButtons";

const Page = () => {
  const router = useRouter()
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [userMate, setUserMate] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        router.push("/notSign");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      showMate();
    }
  }, [user, page]);

  const showMate = async (e) => {
    const users = await getUsersDb(e);
    let count = 0;
    let userEliminate = null;
    if (users && user) {
      for (let i = 0; i < Object.keys(users[0]).length; i++) {
        if (Object.keys(users[0])[i] !== user.uid) {
          count++;
        } else {
          userEliminate = i;
        }
      }
      delete users[0][Object.keys(users[0])[userEliminate]];
      setUsers(users);
      const key = Object.keys(users[0])[page];
      setUserMate(users[0][key]);
      setQuantity(count);
    } else {
      console.log("Users or user is equal to null");
    }
  }

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      if (page !== quantity - 1) {
        setPage(page + 1)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      if (page > 0) {
        setPage(page - 1)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const id = Object.keys(users[0])[page];
      await assignLike(id, user.uid);
      handleNext(e);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center justify-between h-screen mt-5 m-5">
      <div className="flex items-center justify-between w-full p-4 top-0">
        <div className="flex items-center">
          <a href="/profile">
            {user && user.photoURL ? (
              <Image src={user.photoURL} width={10} height={10} className="mr-5 w-10 h-10 rounded-full" alt="User Avatar" />
            ) : (
              <Image src="/userPhoto.png" width={40} height={40} className="mr-5 rounded-full" alt="User Avatar" />
            )}
          </a>
          <h1 className="mr-2 text-lg text-neutral-700">Hola, </h1>
          {user ? (
            <h1 className="text-lg font-bold text-neutral-700">{user.displayName}</h1>
          ) : null}
        </div>
        <FaBell className="text-2xl text-neutral-600" />
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gradient-to-b from-orange-300 via-orange-200 to-orange-200 rounded-3xl shadow-xl max-w-xs pt-10 w-96 h-[500px]">
          <div className="flex items-center justify-center">
            {userMate && userMate.photoURL ? (
              <Image src={userMate.photoURL} width={100} height={100} className="rounded-full shadow-xl" alt="Example1" />
            ) : (
              <Image src="/userPhoto.png" width={100} height={100} className="rounded-full shadow-xl" alt="Example1" />
            )}
          </div>
          {userMate ? (
            <div>
              <p className="text-lg font-bold mt-4 text-center mx-auto">{userMate.displayName}</p>
              <p className="text-lg font-bold mt-4 text-center mx-auto">{userMate.email}</p>
            </div>
          ) : null}
          <div className="flex justify-center mt-auto">
            <button className="bg-transparent text-black font-bold py-2 px-20 rounded-md mt-32" onClick={handleBack}>
              Back
            </button>
            <button className="bg-transparent text-black font-bold py-2 px-20 rounded-md mt-32" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-24">
        <button className="flex items-center justify-center w-16 h-16 bg-red-400 rounded-full shadow-xl mx-6" onClick={handleNext}>
          <FaTimes className="text-white text-3xl" />
        </button>
        <button className="flex items-center justify-center w-16 h-16 bg-indigo-400 rounded-full shadow-xl mx-6" onClick={handleLike}>
          <FaHeart className="text-white text-3xl" />
        </button>
      </div>
      <Navigation></Navigation>
    </section >
  );
};

export default Page;