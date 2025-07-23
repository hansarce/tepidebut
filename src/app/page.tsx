"use client";

import Carousel from "@/components/Carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scroll2SectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<Array<{left: number, width: number, height: number, delay: number, duration: number, rotate: number, drift: number}>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!scrollEnabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollEnabled]);

  useEffect(() => {
    if (isClient) {
      // Generate petals only on client side
      const petalCount = 18;
      const newPetals = Array.from({ length: petalCount }).map(() => ({
        left: getRandom(0, 95),
        width: getRandom(14, 22),
        height: getRandom(14, 22) * 1.35,
        delay: getRandom(0, 4),
        duration: getRandom(4.5, 8),
        rotate: getRandom(-25, 25),
        drift: getRandom(-40, 40)
      }));
      setPetals(newPetals);
    }
  }, [isClient]);

  const handleScrollDown = () => {
    setScrollEnabled(true);
    setTimeout(() => {
      scrollSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        scroll2SectionRef.current?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          thirdSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1800);
      }, 1800);
    }, 50);
  };

  // Helper to randomize values
  const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number}>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const target = new Date("2025-08-19T16:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section>
        <main className="relative min-h-screen w-screen overflow-hidden">
          {/* Scroll reset logic moved here */}
          <ResetScrollOnMount setScrollEnabled={setScrollEnabled} />
          {/* Background Image */}
          <Image
            src="/home.jpg"
            alt="Home Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          {/* Umbrella Top Left */}
          <div className="absolute -top-45 -left-45 z-20">
            <Image
              src="/umbrella.png"
              alt="Umbrella Top Left"
              width={500}
              height={500}
              priority
              className="animate-spin-slow"
              style={{ animationDuration: "15s" }}
            />
          </div>
          {/* Umbrella Bottom Right */}
          <div className="absolute -bottom-45 -right-45 z-20">
            <Image
              src="/umbrella.png"
              alt="Umbrella Bottom Right"
              width={500}
              height={500}
              priority
              className="animate-spin-slow"
              style={{ animationDuration: "15s" }}
            />
          </div>
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/80 z-10" />
          {/* Content */}
          <div className="relative z-30 text-[20px] text-white text-center pt-[320px] fade-in">
            <p>You are cordially invited to <br />
            the 18th Birthday of </p>
            <h1 className="text-[45px] leading-[1] pt-[20px]">Chrisette <br />
            Stephanie So</h1>
            <div className="flex justify-center mt-6">
              <button onClick={handleScrollDown} aria-label="Scroll Down">
                <Image
                  src="/scrdown.png"
                  alt="Scroll Down"
                  width={60}
                  height={60}
                  className="animate-float"
                />
              </button>
            </div>
          </div>
        </main>
      </section>

      {/* Scroll Section */}
      <section
        ref={scrollSectionRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        <Image
          src="/scroll.jpg"
          alt="Scroll Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative z-20 text-white text-2xl">
          {/* Scroll section content */}
        </div>
      </section>

      {/* Scroll2 Section */}
      <section
        ref={scroll2SectionRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        <Image
          src="/scroll2.jpg"
          alt="Scroll Background 2"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative z-20 text-white text-2xl">
          {/* Scroll2 section content */}
        </div>
      </section>

      {/* Card Countdown */}
      <section
        ref={thirdSectionRef}
        className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden"
        style={{
          backgroundImage: "url('/eventdetailsbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <style>
          {`
            @keyframes fall-petal {
              0% {
                transform: translateY(-10vh) translateX(0) rotate(0deg) scale(1);
                opacity: 0.8;
              }
              80% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(110vh) var(--petal-x, 0) rotate(360deg) scale(0.8);
                opacity: 0;
              }
            }
            .falling-petal {
              position: absolute;
              top: 0;
              width: 32px;
              height: 44px;
              background: #F8BBD0;
              border-radius: 60% 80% 70% 60% / 80% 60% 100% 60%;
              opacity: 0.85;
              pointer-events: none;
              box-shadow: 0 6px 16px #f8bbd055, 0 0px 0px #fff;
              animation: fall-petal 6s linear infinite;
              transform: rotate(-18deg) skewX(-8deg);
              z-index: 1;
              transition: filter 0.2s;
              filter: blur(0.2px);
              overflow: visible;
            }
            .falling-petal::after {
              content: '';
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%) scaleX(0.7) scaleY(1.2);
              width: 12px;
              height: 18px;
              background: linear-gradient(180deg, #F8BBD0 60%, #f48fb1 100%);
              border-radius: 50% 50% 80% 80% / 80% 80% 100% 100%;
              opacity: 0.7;
              z-index: 2;
              filter: blur(0.5px);
            }
          `}
        </style>
        {isClient && petals.map((petal, i) => (
          <div
            key={i}
            className="falling-petal"
            style={{
              left: `${petal.left}vw`,
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `rotate(${petal.rotate - 18}deg) skewX(-8deg)`,
              ['--petal-x' as any]: `translateX(${petal.drift}px)`,
            }}
          />
        ))}
        
        <div className="text-black text-2xl relative z-10">
          {/* Lantern + Card container */}
          <div className="flex flex-col reverse-">
            {/* Japanese Lantern - moved to the very top */}
            <div
              className="jp-lantern "
              style={{ width: 150, height: 150 }}
            >
              <Image
                src="/jplantern.png"
                alt="Japanese Lantern"
                width={150}
                height={150}
                priority
                className="mb-44"
                draggable={false}
              />
            </div>
            {/* Countdown Card */}
            <div
              className="mx-auto w-[340px] h-[220px] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: "url('/fan.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="mx-auto w-[340px] h-[220px] rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: "url('/fan.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="relative z-10 flex justify-center items-end gap-10 h-full text-white text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[45px] font-bold ml-8 leading-none">{timeLeft.days}</span>
                    <span className="text-xl font-normal ml-16 mb-20">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[45px] font-bold -ml-4 leading-none">{timeLeft.hours}</span>
                    <span className="text-xl font-normal -ml-4 mb-28">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[45px] mr-12 font-bold leading-none">{timeLeft.minutes}</span>
                    <span className="text-xl font-normal -ml-5 mr-10 mb-20">Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Countdown text below the fan card */}
          <div className="mt-6 text-center text-xl text-pink-700 font-semibold">
            Countdown to Chrisette's <br /> 18th Birthday!
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black relative"
         style={{
           backgroundImage: "url('/photosbg.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center",
         }}>
        <h2 className="text-4xl font-bold text-white mb-8 mt-8 drop-shadow-lg z-10">Photos</h2>
        <Carousel />
      </section>


      {/* Event Details with Map Section*/}
  <section
  className="min-h-screen flex flex-col items-center justify-center bg-black relative"
  style={{
    backgroundImage: "url('/eventbg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Card with background */}
  <div 
    className="mx-auto w-[320px] h-[720px] rounded-2xl flex flex-col items-center justify-start relative overflow-hidden p-8"
    style={{
      backgroundImage: "url('/scrollpageforevent.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Event Header */}
    <div className="text-center mb-5 mt-20">
      <h1 className="text-4xl font-bold text-pink-700 mb-2">Chrisette's</h1>
      <h1 className="text-4xl font-serif font-bold text-pink-600 mb-4">Debut</h1>
      <p className="text-[14px]  text-black">Don't miss this wonderful night.</p>
      <p className="text-[14px]  text-black">A flowery night to remember</p>
    </div>

    {/* Event Details */}
    <div className="w-full text-center">
      <div className=" pb-4">
        <p className="text-[14px]  text-black">Dress: Cocktail/Semi-Formal</p>
        <p className="text-[14px]  text-black">(Pastel Pink/Yellow/White)</p>
      </div>

      <div className="pb-4">
        <p className="text-[14px]  text-black">Venue: Casa Signora</p>
      </div>

      <div className="pb-4">
        <p className="text-[14px]  text-black">Time: August 24, 2025 4:00 PM</p>
      </div>

      <div className="pt-2">
        <p className="text-xl font-semibold text-pink-700 mb-2">Event Location</p>
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.424982414458!2d120.97443017592654!3d14.2867226861633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d5c5897658d9%3A0x7305c4cfadc91193!2sCasa%20Signora!5e0!3m2!1sen!2sph!4v1752996706860!5m2!1sen!2sph"
            width="175"
            height="185"
            style={{ border: 0 }}
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg flex justify-center ml-9"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* RSVP Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: "url('/rsvpbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 rounded-xl shadow-lg p-10 max-w-xl w-full mx-4 text-center z-10">
          <h2 className="text-3xl font-bold mb-4 text-purple-700">RSVP</h2>
          <p className="mb-6 text-lg">Kindly confirm your attendance by August 1, 2025.</p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded border border-gray-300"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded border border-gray-300"
              required
            />
            <select className="p-3 rounded border border-gray-300" required>
              <option value="">Will you attend?</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I can't make it</option>
            </select>
            <button
              type="submit"
              className="bg-pink-600 text-white font-semibold py-2 rounded hover:bg-pink-700 transition"
            >
              Submit RSVP
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function ResetScrollOnMount({ setScrollEnabled }: { setScrollEnabled: (v: boolean) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setScrollEnabled(false);
  }, [setScrollEnabled]);
  return null;
}