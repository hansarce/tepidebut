"use client";

import Carousel from "@/components/Carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, easeInOut } from "framer-motion";
import { Cinzel, Cinzel_Decorative, Luxurious_Script, Freeman, Libre_Caslon_Text, Merriweather, Oswald, Quicksand, Roboto } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });
const cinzelDecorative = Cinzel_Decorative({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'] 
});

const libreCaslonText = Libre_Caslon_Text({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic', 'normal']
});
const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal']
});
const freeman = Freeman({ 
  subsets: ['latin'],
  weight: ['400'],
  style: [ 'normal']
});
const luxurious = Luxurious_Script({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
});
const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
});
const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});
const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['italic', 'normal']
});


export default function Home() {
  
   const [scrollEnabled, setScrollEnabled] = useState(false);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scroll2SectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<Array<{left: number, width: number, height: number, delay: number, duration: number, rotate: number, drift: number}>>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Animation refs and controls
  const rosesRef = useRef(null);
  const treasuresRef = useRef(null);
  const isRosesInView = useInView(rosesRef, { margin: "0px 0px -100px 0px", once: false });
  const isTreasuresInView = useInView(treasuresRef, { margin: "0px 0px -100px 0px", once: false });
  const controls = useAnimation();
  const treasuresControls = useAnimation();
 // Update your existing RSVP state and handlers
const [formData, setFormData] = useState({
  name: '',
  attendance: 'yes'
});
const [submitted, setSubmitted] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    // Create callback function
    (window as any).handleRSVPResponse = (response: any) => {
      if (response.success) {
        setSubmitted(true);
      } else {
        setError('Failed to submit. Please try again.');
      }
      delete (window as any).handleRSVPResponse;
    };

    // Insert your script URL here:
    const scriptUrl = `https://script.google.com/macros/s/AKfycbxMUO8qMbJIs1BQontXD10Hth0xOSvC-I7KlEgoaijWzNZx7l1NkXeXLwIWHvVCISDI1g/exec?name=${encodeURIComponent(formData.name)}&attendance=${formData.attendance}&callback=handleRSVPResponse`;

    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
    
    // Set timeout to show error if response never comes
    const timeout = setTimeout(() => {
      if (!submitted) {
        setError('Submission timed out. Please try again.');
        setIsLoading(false);
      }
    }, 5000);

    // Clean up
    return () => {
      clearTimeout(timeout);
      document.body.removeChild(script);
    };
    
  } catch (err) {
    setError('An error occurred. Please try again.');
    setIsLoading(false);
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
// Animation effects
useEffect(() => {
  controls.start(isRosesInView ? "visible" : "hidden");
}, [isRosesInView, controls]);

  useEffect(() => {
    treasuresControls.start(isTreasuresInView ? "visible" : "hidden");
  }, [isTreasuresInView, treasuresControls]);

  // Unified animation variants
  const unifiedVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    }
  };

const treasureNames = [
  "Alliyah Solis",
  "Arjean Grace Delos Reyes",
  "Jade Dazo",
  "Jaimmer Bones",
  "Martinna Cabrera",
  "Maika Cunanan",
  "Jaron Dandan",
  "Honey Azhiel Mallon",
  "Eirzeth Bhrent Ramos",
  "Benielle Amber Ramos",
  "Wayne Pecbot",
  "Chloe Credo",
  "Maria Dulce So",
  "Petervhane Lorejo",
  "Riley Manalo",
  "Jerome Cebrero",
  "Maam Jessica Halina",
  "Maam Kim Pearl Dalma",
  "Maam Clyde Colarina",
  "Arlene",
];

  // Add this effect specifically for overflow prevention
  useEffect(() => {
    const preventOverflow = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.width = '100%';
      document.body.style.width = '100%';
    };

    preventOverflow();
    window.addEventListener('resize', preventOverflow);

    return () => {
      window.removeEventListener('resize', preventOverflow);
    };
  }, []);
   const roses = [
    'Hans Arce', 'Khristian Agustin', 'Marc Custodio', 'Patrick Lim',
    'Rhon Reyes', 'Reinor Catapang', 'Marwin Sacman', 'Akiro Rabino',
    'Keefe De Guzman', 'Eldrin Orense', 'Russel Manalo', 'Junjun Aguilar',
    'Rei Del Rosario', 'Vince Lita', 'Ron Agustin', 'Joshua Cerezo',
    'Aian Padilla', 'Christian De Jesus'
  ];

  const candles = [
    'Irish Joy Viudez', 'Francine Parra', 'Reese Tapan', 'Chloe Carlos',
    'Jillian Azarcon', 'Tricia Fungo', 'Angelica Pablo', 'Charisse Bartolome',
    'Kimberly Narciso', 'Cianne Aguilar', 'Cassandra Valdez', 'Kyla Mae Nardo',
    'Princess Jaelene Dela Cruz', 'Fritzie Joy Lazaro', 'Hanna Basilio',
    'Angelica Castillo', 'Shannon Recaido', 'Christine Joy Catapang'
  ];

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
      <style jsx global>{`
        * {
          max-width: 100vw;
        }
        html, body {
          width: 100vw;
          overflow-x: hidden;
          position: relative;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    
      {/* Hero Section */}
     <section className="w-screen overflow-hidden " onClick={handleScrollDown}>
        <main className="relative h-screen w-screen overflow-hidden">
          {/* Scroll reset logic */}
          <ResetScrollOnMount setScrollEnabled={setScrollEnabled} />
          {/* Background Image with explicit width */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/home.jpg"
              alt="Home Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="z-0"
            />
          </div>
          
          {/* Umbrellas with constrained positioning */}
          <div className="absolute top-0 left-0 z-20 overflow-hidden" style={{ width: '500px', height: '500px', transform: 'translate(-45%, -45%)' }}>
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
          <div className="absolute bottom-0 right-0 z-20 overflow-hidden" style={{ width: '500px', height: '500px', transform: 'translate(57%, 60%)' }}>
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
            <p className={quicksand.className}>You are cordially invited to <br />
            the 18th Birthday of </p>
            <h1 className={luxurious.className + " text-[70px] leading-[1] pt-[20px]"}>Chrisette <br />
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
        className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden"
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
        className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden"
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
       {/* Event Details with Map Section*/}
      <section   ref={thirdSectionRef}
        className="min-h-screen flex flex-col w-screen items-center justify-center bg-black relative overflow-hidden"
        style={{
          backgroundImage: "url('/eventbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        
      >
         <div className="absolute inset-0 bg-black/40"></div>
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
            <h1 className={`${luxurious.className} text-[50px] font-bold text-[#D02B31] flex flex-col`}>
  <span>Chrisette's</span>
  <span className="-mt-6">Debut</span> {/* Adjust negative margin as needed */}
</h1>
            <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>Don't miss this wonderful night.</p>
            <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>A flowery night to remember</p>
          </div>

          {/* Event Details */}
          <div className="w-full text-center">
            <div className=" pb-4">
              <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>Dress: Cocktail/Semi-Formal</p>
              <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>(Pastel Pink/Yellow/White)</p>
            </div>

            <div className="pb-4">
              <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>Venue: Casa Signora</p>
            </div>

            <div className="pb-4">
              <p className={`${quicksand.className} text-[14px]  text-[#D02B31] `}>Time: August 24, 2025 4:00 PM</p>
            </div>

            <div className="pt-2">
              <p className={`${quicksand.className} text-xl font-bold text-[#D02B31]  mb-2`}>Event Location</p>
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

      {/* Card Countdown */}
      <section
        className="min-h-screen w-screen flex items-center justify-center bg-gray-100 relative overflow-hidden"
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

            @keyframes fall-petal-red {
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
            .falling-petal-red {
              position: absolute;
              top: 0;
              width: 32px;
              height: 44px;
              background: #CF2B2F;
              border-radius: 60% 80% 70% 60% / 80% 60% 100% 60%;
              opacity: 0.85;
              pointer-events: none;
              box-shadow: 0 6px 16px #CF2B2F55, 0 0px 0px #fff;
              animation: fall-petal-red 6s linear infinite;
              transform: rotate(-18deg) skewX(-8deg);
              z-index: 1;
              transition: filter 0.2s;
              filter: blur(0.2px);
            }
            .falling-petal-red::after {
              content: '';
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%) scaleX(0.7) scaleY(1.2);
              width: 12px;
              height: 18px;
              background: linear-gradient(180deg, #CF2B2F 60%, #a82226 100%);
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
              className="jp-lantern"
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
          <div className={`${quicksand.className} mt-6 text-center text-xl text-white font-semibold`}>
            Countdown to Chrisette's <br /> 18th Birthday!
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="min-h-screen w-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
         style={{
           backgroundImage: "url('/photosbg.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center",
         }}>
           <div className="absolute inset-0 bg-black/40"></div>
        <h2 className={`${quicksand.className} text-4xl font-bold text-white -mb-12 drop-shadow-lg z-10`}>Photos</h2>
        <Carousel />
      </section>

     
      {/* 18 Roses & 18 Candles Section */}
      <section
        ref={rosesRef}
        className="min-h-screen w-screen flex flex-col items-center justify-center py-12 relative overflow-hidden"
      >
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/roses-bg.jpg"
            alt="Roses Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl px-4 z-10">
          <motion.div
            variants={unifiedVariants}
            initial="hidden"
            animate={controls}
            className="text-center p-8"
          >
            <h3 className={`${luxurious.className} text-[60px]  font-semibold text-white mb-8 font-serif`}>18 Roses</h3>
            <div className={`${quicksand.className} space-y-2 text-lg text-white font-medium`}>
              {roses.map((name, index) => (
                <motion.div 
                  key={index}
                  variants={unifiedVariants}
                  custom={index}
                >
                   {name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={unifiedVariants}
            initial="hidden"
            animate={controls}
            className="text-center p-8"
          >
            <h3 className={`${luxurious.className} text-[60px] font-semibold text-white mb-8 font-serif`}>18 Candles</h3>
            <div className={`${quicksand.className} space-y-2 text-lg text-gray-100 font-medium`}>
              {candles.map((name, index) => (
                <motion.div 
                  key={index}
                  variants={unifiedVariants}
                  custom={index}
                >
             {name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    
      {/* 18 Treasures Section */}
      <section 
        ref={treasuresRef}
        className="min-h-screen w-screen flex flex-col items-center justify-center py-12 relative overflow-hidden"
      >
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/treasurers-bg.jpg"
            alt="Treasures Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="z-10 w-full max-w-5xl px-4">
          <motion.div
            variants={unifiedVariants}
            initial="hidden"
            animate={treasuresControls}
            className="text-center p-6"
          >
            <h3 className={`${luxurious.className} text-[60px]  font-semibold text-white mb-6`}>
              18 Treasures (Gifts)
            </h3>
            <div className="space-y-3">
              {treasureNames.map((name, index) => (
                <motion.p
                  key={index}
                  variants={unifiedVariants}
                  custom={index}
                  className={`${quicksand.className} text-lg text-gray-100`}
                >
               {name}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/rsvpbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isClient && petals.map((petal, i) => (
          <div
            key={`red-${i}`}
            className="falling-petal-red"
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
         {submitted ? (
    <div className="text-center z-10 p-8 bg-white/90 rounded-lg max-w-md mx-4">
      <h2 className={`${luxurious.className} text-4xl font-bold mb-4 text-[#D12B31]`}>Thank You!</h2>
      <p className={`${quicksand.className} text-xl text-[#D12B31]`}>
        Thanks for filling up! We look forward to seeing you at the event!
      </p>
    </div>
  ) : (
    <>
      <h2 className={`${luxurious.className} text-[60px] font-bold mb-4 text-[#D12B31] z-10`}>RSVP</h2>
      <p className={`${quicksand.className} mb-6 text-lg flex flex-col items-center justify-center text-[#D12B31] text-center z-10`}>
        Kindly confirm your attendance 
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded z-10 max-w-md w-full text-center">
          {error}
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 z-10 w-full max-w-md px-4"
      >
        <div>
          <h3 className={`${quicksand.className} text-lg text-[#D12B31] mb-1`}>Your Name</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded border text-[#D12B31] border-[#D12B31] bg-white/90"
            required
          />
        </div>
        
        <div>
          <h3 className={`${quicksand.className} text-lg text-[#D12B31] mb-1`}>Will you attend?</h3>
          <select 
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            className="w-full p-3 rounded border text-[#D12B31] border-[#D12B31] bg-white/90"
            required
          >
            <option value="yes">Yes, I will attend</option>
            <option value="no">No, I can't make it</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`${quicksand.className} bg-[#D12B31] text-white font-semibold py-3 rounded hover:bg-[#D12B31]/90 transition disabled:opacity-50 flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Submit'}
        </button>
      </form>
    </>
  )}
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