import { db } from "../firebase";
import { get, ref, push, set } from "firebase/database";


export const assignLike = async (id, remitterId) => {
    try {
        let send = false;
        const dbRef = ref(db, 'users/' + id + '/likes/')
        const snapshot = await get(dbRef);
        const likes = snapshot.val(); 
        if (snapshot.val() === null) {
            send = true;
        } else {
            Object.keys(likes).forEach((key) => {
                if (remitterId === likes[key].remitterId) {
                    send = false;
                } else {
                    send = true;
                }
            });
        }
        if (send === true) {
            await push(dbRef, {
                remitterId
            });
            console.log("Like!");
        }
    } catch (error) {
        console.log(error);
    }
}

