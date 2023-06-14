"use client";

import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./../firebase";
import { useRouter } from "next/navigation"
import { getUser } from "./../firebase";
import { set, ref } from "firebase/database";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const Page = () => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [unLogged, setUnlogged] = useState(false);
  const displayName = name + ' ' + surname;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        if (currentUser) {
          router.push("/")
          console.log(db);
        }
      } catch (error) {
        setUnlogged(true);
      }
    };
    fetchUser();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        if (userCredentials) {
          await updateProfile(userCredentials.user, {
            displayName: displayName
          })
          const dbRef = ref(db, 'users/' + userCredentials.user.uid)
          await set(dbRef, {
            displayName: userCredentials.user.displayName,
            email: userCredentials.user.email,
            photoURL: userCredentials.user.photoURL,
          })
        }
        router.push("/")
      } catch (error) {
        //ESTOS MENSAJES DE ERROR, NO DEBERIAN SER ALERTAS, SINO QUE TENDRIAN QUE SER VENTANAS EMERGENTES 
        //EXPLICANDO EL ERROR, Y QUIZAS CON UN BOTON DE "OK".
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          alert("The provided email address is already in use.");
        }
        if (error.message === 'Firebase: Error (auth/missing-password).') {
          alert("Password field is empty. Please enter a password to proceed.");
        }
        if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          alert("Password should be at least 6 characters");
        }
      }
    } else {
      alert("Passwords do not match. Please make sure the passwords entered are identical.");
    }
  };

  if (unLogged === true) {
    return (
      <form onSubmit={handleSignUp}>
        <section class="flex flex-col justify-center items-center h-screen w-full">
          <div className="bg-white rounded-2xl shadow-2xl px-16 py-10">
            <h1 class="text-black mb-20 text-center text-2xl ">Sign Up</h1>
            <div className="border-b border-gray-200 p-2 flex items-center mb-5"> <FaRegEnvelope className="text-gray-400 mr-4"></FaRegEnvelope>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none text-sm "
              />
            </div>
            <div className="border-b border-gray-200 p-2 flex items-center mb-5"><FaRegEnvelope className="text-gray-400 mr-4"></FaRegEnvelope>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="outline-none text-sm"
              />
            </div>
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
            <div className="border-b border-gray-200 p-2 flex items-center mb-5"><MdLockOutline className="text-gray-400 mr-4"></MdLockOutline>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" outline-none text-sm"
              />
            </div>
            <button type="submit" className="w-full  text-sm cursor-pointer font-semibold mt-4 px-12 py-2 rounded-full shadow-xl bg-gray-200 hover:bg-gray-500 hover:text-white">
              Submit
            </button>
          </div>
        </section>
      </form>
    );
  }
}

export default Page;