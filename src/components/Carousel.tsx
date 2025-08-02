"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  { src: "/slideshow/slide1.jpg", alt: "Slide 1" },
  { src: "/slideshow/slide2.jpg", alt: "Slide 2" },
  { src: "/slideshow/slide3.jpg", alt: "Slide 3" },
  { src: "/slideshow/slide4.jpg", alt: "Slide 4" },
  { src: "/slideshow/slide5.jpg", alt: "Slide 5" },
  { src: "/slideshow/slide6.jpg", alt: "Slide 6" },
  { src: "/slideshow/slide7.jpg", alt: "Slide 7" },
  { src: "/slideshow/slide8.jpg", alt: "Slide 8" },
  { src: "/slideshow/slide9.jpg", alt: "Slide 9" },
  { src: "/slideshow/slide10.jpg", alt: "Slide 10" },
  { src: "/slideshow/slide11.jpg", alt: "Slide 11" },
  { src: "/slideshow/slide12.jpg", alt: "Slide 12" },

];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prev = (current - 1 + images.length) % images.length;
  const next = (current + 1) % images.length;

  return (
    <div className="w-full flex items-center justify-center perspective py-8">
      <div className="relative w-[300px] sm:w-[340px] h-[450px]">
        {images.map((img, index) => {
          let transform = "";
          let zIndex = 0;
          let opacity = 0;

          if (index === prev) {
            transform = "translateX(-110%) rotateY(30deg) scale(0.9)";
            zIndex = 1;
            opacity = 1;
          } else if (index === current) {
            transform = "translateX(0) rotateY(0deg) scale(1)";
            zIndex = 3;
            opacity = 1;
          } else if (index === next) {
            transform = "translateX(110%) rotateY(-30deg) scale(0.9)";
            zIndex = 1;
            opacity = 1;
          }

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-full h-full transform-gpu transition-all duration-1000 ease-in-out rounded-xl overflow-hidden shadow-xl"
              style={{
                transform,
                zIndex,
                opacity,
                transformOrigin: "center center",
                marginLeft: "-50%",
                marginTop: "-50%", // ⬅️ this vertically centers the cards
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
