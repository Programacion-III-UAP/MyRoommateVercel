"use client";
import { db, getUser } from "../firebase";
import { useState, useEffect} from "react";
import { set, ref } from "firebase/database";
import { useRouter } from "next/navigation"


const Page = () => {
  const router = useRouter()
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [redditLink, setRedditLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
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

  async function addSocialLink() {
    try {
      await set(ref(db, 'users/' + user.uid + '/socialMedia/'), {
        FacebookLink: facebookLink,
        TwitterLink: twitterLink,
        RedditLink: redditLink,
        InstagramLink: instagramLink
      });
    } catch (error) {
      console.log("Ocurrió el siguiente error: "+ error);
    }
  }


  const handleFacebookChange = (event) => {
    setFacebookLink(event.target.value);
  };
  const handleTwitterChange = (event) => {
    setTwitterLink(event.target.value);
  };
  const handleRedditChange = (event) => {
    setRedditLink(event.target.value);
  };
  const handleInstagramChange = (event) => {
    setInstagramLink(event.target.value);
  };
  
  //Esto es el manejo del submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    addSocialLink().then(() => {
      console.log("Datos cargados exitosamente");
      router.push('/profile');
    }).catch((error) => {
      console.log("Error al cargar los datos: " + error);
    })

  };

  return (
    <div className="grid min-h-screen place-items-center">
      <div>
        <a href="/profile">
          <button
            type="button"
            className="mr-72 inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
            ←
          </button>
        </a>
      </div>
      {/* Formulario */}
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-xl font-semibold">Hi mate,<span className="font-normal"> leave here your social media</span></h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
          <label htmlFor="facebookLink" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Facebook</label>
          <input type="text" id="facebook" onChange={handleFacebookChange} name="facebook" placeholder="link to your facebook profile" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
          {/** */}
          <label htmlFor="twitterLink" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Twitter</label>
          <input type="text" id="twitter" onChange={handleTwitterChange} name="twitter" placeholder="link to your twitter profile" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
          {/** */}
          <label htmlFor="redditLink" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Reddit</label>
          <input type="text" id="reddit" onChange={handleRedditChange} name="reddit" placeholder="link to your reddit profile" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
          {/** */}
          <label htmlFor="instagramLink" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Instagram</label>
          <input type="text" id="instagram" onChange={handleInstagramChange} name="instagram" placeholder="link to your instagram profile" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
          {/** */}
          <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
export default Page;