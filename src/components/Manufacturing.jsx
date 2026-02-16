"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const VideoSlider = () => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const videoSlides = [
    {
      id: 1,
      src: "/images/videos/video1.mp4",
      thumbnail: "/images/videos/thumb1.png",
    },
    {
      id: 2,
      src: "/images/videos/video2.mp4",
      thumbnail: "/images/videos/thumb2.png",
    },
    {
      id: 3,
      src: "/images/videos/video3.mp4",
      thumbnail: "/images/videos/thumb3.png",
    },
    {
      id: 4,
      src: "/images/videos/video4.mp4",
      thumbnail: "/images/videos/thumb4.png",
    },
  ];

  const stopAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setPlayingIndex(null);
  };

  const handlePlay = (index) => {
    stopAllVideos();

    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      currentVideo.play();
      setPlayingIndex(index);
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-[#1F1951] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4">
          <span className="w-1.5 h-1.5 bg-[#C8205F] rounded-full" />
          AVANTA BY JAIPUR KURTI GHARANA
          <span className="w-1.5 h-1.5 bg-[#C8205F] rounded-full" />
        </div>

        <h2 className="text-3xl md:text-4xl font-cinzel font-bold uppercase mb-6">
          We’re Manufacturing What Matters
        </h2>

        <p className="max-w-4xl mx-auto text-black text-sm md:text-base">
          Discover the products we build and the expertise behind them.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        loop={true}
        initialSlide={3}
        speed={600}
        spaceBetween={24}
        slidesPerView={1.4}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 1.8,
            spaceBetween: 30,
          },
        }}
        onSlideChange={stopAllVideos}
        className="!overflow-visible"
      >

        {videoSlides.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className="relative aspect-[16/7] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg">

              {/* Thumbnail (always visible) */}
              <img
                src={video.thumbnail}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Video (overlay only when playing) */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playingIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                muted
                playsInline
                controls={playingIndex === index}
              />

              {/* Play Button */}
              {playingIndex !== index && (
                <button
                  onClick={() => handlePlay(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="fill-white text-white ml-1" size={28} />
                  </div>
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <div className="flex justify-center gap-12 mt-8">
        <button className="prev-btn hover:text-[#C8205F] transition">
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>
        <button className="next-btn hover:text-[#C8205F] transition">
          <ChevronRight size={32} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
};

export default VideoSlider;
