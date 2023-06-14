import { db } from "../firebase";
import { get, ref } from "firebase/database";

export const getUsersDb = async () => {
    try {
        const users = [];
        const dbRef = ref(db, 'users/');
        const snapshot = await get(dbRef);
        if (snapshot) {
            users.push(snapshot.val());
        } else {
            console.log("No data available");
        }
        return users;
    } catch (error) {
        console.log(error);
    }
}

