import React, { useRef, useState, useEffect } from "react";
import icon from "../assets/icon-music.svg";
import pause from "../assets/icon-pause.svg";


const MusicPlayer = ({ cancion, initialPlay = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    if (initialPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
      });
    }
  }, [initialPlay]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full">
      <audio ref={audioRef} src={cancion} preload="auto" />

      <button onClick={togglePlayPause} type="button">
        {isPlaying ? (
          <img
            src={pause}
            alt="Pause"
            className="fixed top-5 right-5 size-16 sm:size-14 animate-custom-bounce bg-[#8B9E8D]/70 rounded-full p-3 z-50"
          />
        ) : (
          <img
            src={icon}
            alt="Play"
            className="fixed top-5 right-5 size-16 sm:size-14 animate-custom-bounce bg-[#8B9E8D]/70 rounded-full p-3 z-50"
          />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;