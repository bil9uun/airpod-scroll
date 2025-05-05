"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 147;
// const frameCount = 100;
const canvasWidth = 1158;
const canvasHeight = 770;

const currentFrame = (index: number): string =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
    index + 1
  )
    .toString()
    .padStart(4, "0")}.jpg`;

// const currentFrame = (index: number): string =>
//   `/egotech/${(index + 1).toString().padStart(4, "0")}.jpg`;

const AirpodsScrollCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const airpods = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    imagesRef.current[0].onload = render;

    function render() {
      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      const image = imagesRef.current[airpods.current.frame];
      if (image && context) {
        context.drawImage(image, 0, 0);
      }
    }

    gsap.to(airpods.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5,
      },
      onUpdate: render,
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-lightpass" />;
};

export default AirpodsScrollCanvas;
