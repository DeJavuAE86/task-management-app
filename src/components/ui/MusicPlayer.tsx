'use client';

import { useRef, useState } from 'react';

import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';

const BGM_LIST = [
  {
    title: 'Cagayake! GIRLS',
    url: '/music/cagayake-girls.mp3',
  },
  {
    title: 'Don\'t say "lazy"',
    url: '/music/dont-say-lazy.mp3',
  },
  /* {
    title: 'Fuwa Fuwa Time',
    url: '/music/fuwa-fuwa-time.mp3',
  },
  {
    title: 'GO! GO! MANIAC',
    url: '/music/go-go-maniac.mp3',
  },
  {
    title: 'U&I',
    url: '/music/u-and-i.mp3',
  }, */
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div className="tw-fixed tw-bottom-4 tw-right-4 tw-bg-[#B17C55] tw-rounded-full tw-p-3 tw-shadow-lg tw-flex tw-items-center tw-space-x-3 tw-z-40">
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-[#FDF6E3] tw-rounded-full hover:tw-bg-[#E6B89C] tw-transition-colors disabled:tw-opacity-50"
      >
        {isLoading ? (
          <div className="tw-w-5 tw-h-5 tw-border-2 tw-border-[#744436] tw-border-t-transparent tw-rounded-full tw-animate-spin" />
        ) : isPlaying ? (
          <PauseIcon className="tw-w-5 tw-h-5 tw-text-[#744436]" />
        ) : (
          <PlayIcon className="tw-w-5 tw-h-5 tw-text-[#744436]" />
        )}
      </button>
      <div className="tw-text-[#FDF6E3] tw-text-sm">
        {BGM_LIST[currentTrack].title}
      </div>
      <audio
        ref={audioRef}
        src={BGM_LIST[currentTrack].url}
        onEnded={() => {
          setCurrentTrack((prev) => (prev + 1) % BGM_LIST.length);
        }}
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}
