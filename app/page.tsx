import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-4 text-white h-[44vh] px-5 md:px-0 text-sm md:text-base mt-10 md:mt-0">
        <div className="font-bold text-3xl md:text-5xl text-center"> BUY ME A CHAI</div>
        <p className="text-center md:text-left">
          A CROWDFUNDING PLATFORM FOR CREATORS. GET FUNDED BY YOUR FANS AND
          FOLLOWERS.
        </p>
        <p className="text-center md:text-left">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your project funded
        </p>
        <div className="flex gap-5 mt-4">
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
            >
              start here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
            >
              read more
            </button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white h-1 opacity-10"></div>
      
      {/* Features Section */}
      <div className="text-white container mx-auto pb-32 px-10 pt-14">
        <h1 className="text-2xl font-bold text-center mb-14">YOUR FRIENDS CAN BUY YOU A CHAI</h1>
        {/* 👇 Added flex-col for mobile and md:flex-row for desktop 👇 */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/img.webp" alt="Fans" />
            <p className="font-bold text-center">FANS WANT TO HELP</p>
            <p className="text-center">your fans are available for you to help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/coin.webp" alt="Coin" />
            <p className="font-bold text-center">FANS WANT TO HELP</p>
            <p className="text-center">your fans are available for you to help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/group.webp" alt="Group" />
            <p className="font-bold text-center">FANS WANT TO HELP</p>
            <p className="text-center">your fans are available for you to help</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      
      {/* Video Section */}
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-center mb-14">
          LEARN MORE ABOUT US
        </h1>
        {/* 👇 The Magic Fix: Used aspect-video for perfect responsive resizing 👇 */}
        <div className="w-full md:w-[70%] lg:w-[50%] aspect-video">
          <iframe 
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/5vMWZhHPlaw?si=1e-VlR5-mYsLqo6C" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}