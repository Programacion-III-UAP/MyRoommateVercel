import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { set, ref, update } from "firebase/database";

export const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
        const userCredentials = await signInWithPopup(auth, provider)
        if (userCredentials) {
            const dbRef = ref(db, 'users/' + userCredentials.user.uid)
            await set(dbRef, {
                displayName: userCredentials.user.displayName,
                email: userCredentials.user.email,
                photoURL: userCredentials.user.photoURL,
            })
        }
    } catch (error) {
        console.log(error)
    }
};