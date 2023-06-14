import React, { useState, useEffect } from "react";
import { BsHouse, BsHeart, BsChat, BsPerson, BsHouseFill, BsPersonFill, BsHeartFill, BsChatFill } from 'react-icons/bs';
import { useRouter, usePathname } from "next/navigation";

export const Navigation = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [homeButton, setHomeButton] = useState(false);
    const [likesButton, setLikesButton] = useState(false);
    const [chatButton, setChatButton] = useState(false);
    const [profileButton, setProfileButton] = useState(false);

    useEffect(() => {
        const setCurrentPage = async () => {
            try {
                if (pathname === "/") {
                    setHomeButton(true);
                } else if (pathname === "/likes") {
                    setLikesButton(true);
                } else if (pathname === "/chat") {
                    setChatButton(true);
                } else if (pathname === "/profile") {
                    setProfileButton(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        setCurrentPage();
    }, []);

    const handleNavigation = (route) => {
        try {
            router.push(route);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0">
            <ul className="flex justify-center m-4">
                {homeButton ? (
                    <button className="m-auto scale-150">
                        <BsHouseFill />
                    </button>
                ) : (
                    <button className="m-auto scale-150" onClick={() => handleNavigation("/")}>
                        <BsHouse />
                    </button>
                )}
                {likesButton ? (
                    <button className="m-auto scale-150">
                        <BsHeartFill />
                    </button>
                ) : (
                    <button className="m-auto scale-150" onClick={() => handleNavigation("/likes")}>
                        <BsHeart />
                    </button>
                )}
                {chatButton ? (
                    <button className="m-auto scale-150">
                        <BsChatFill />
                    </button>
                ) : (
                    <button className="m-auto scale-150" onClick={() => handleNavigation("/chat")}>
                        <BsChat />
                    </button>
                )}
                {profileButton ? (
                    <button className="m-auto scale-150">
                        <BsPersonFill />
                    </button>
                ) : (
                    <button className="m-auto scale-150" onClick={() => handleNavigation("/profile")}>
                        <BsPerson />
                    </button>
                )}
            </ul>
        </nav>
    );
}

