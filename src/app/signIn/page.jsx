"use client"

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase";
import { useRouter } from "next/navigation"
import { getUser } from "./../firebase";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [unLogged, setUnlogged] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        if (currentUser) {
          router.push("/")
        }
      } catch (error) {
        setUnlogged(true);
      }
    };
    fetchUser();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await signInWithEmailAndPassword(auth, email, password)
      if (currentUser) {
        router.push("/")
      }
    } catch (error) {
      //ESTOS MENSAJES DE ERROR, NO DEBERIAN SER ALERTAS, SINO QUE TENDRIAN QUE SER VENTANAS EMERGENTES 
      //EXPLICANDO EL ERROR, Y QUIZAS CON UN BOTON DE "OK".
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        alert("We couldn't find any account with the provided email.");
      }
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        alert("The supplied password does not match with the provided email.");
      }
      console.log(error.message)
    }
  };

  if (unLogged === true) {
    return (
      <form onSubmit={handleSignIn}>
        <section class="flex flex-col justify-center items-center h-screen w-full">
          <div className="bg-white rounded-2xl shadow-2xl px-16 py-10">
            <h1 class="text-black mb-20 text-center text-2xl ">Sign In</h1>
            <div>
              <div className="border-b border-gray-200 p-2 flex items-center mb-5"><FaRegEnvelope className="text-gray-400 mr-4"></FaRegEnvelope>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none text-sm"
                />
              </div>
              <div className="border-b border-gray-200 p-2 flex items-center mb-5"><MdLockOutline className="text-gray-400 mr-4"></MdLockOutline>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none text-sm"
                />
              </div>
              <button type="submit" className="w-full  text-sm cursor-pointer font-semibold mt-4 px-12 py-2 rounded-full shadow-xl bg-gray-200 hover:bg-gray-500 hover:text-white">
                Submit
              </button>
            </div>
          </div>
        </section>
      </form>
    );
  }
};

export default Page;

