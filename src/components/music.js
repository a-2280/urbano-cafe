"use client"

import Image from "next/image";
import { useState } from "react";
import { PlayIcon, PauseIcon } from "./icons";

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="music flex align-end gap-20">
      <div className="ratio-1-1 pos-rel w-70px overflow">
        <Image
          className="album bg-image"
          src="/images/music.jpg"
          alt="Album Cover"
          width={70}
          height={70}
        />
        <div className="overlay flex align-center justify-center" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <PauseIcon size={28} color="white" /> : <PlayIcon size={28} color="white" />}
        </div>
      </div>
      <div>
        <p className="bold">Listen to Urbano Cafe radio</p>
        <p className="flex gap-4">
          <span className="bold">Now Playing</span>Liberation Bells by Joe Westerland
        </p>
      </div>
    </div>
  );
}
