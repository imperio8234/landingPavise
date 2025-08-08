// components/DynamicVideoButton.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function DynamicVideoButton() {
  const [isPaused, setIsPaused] = useState(false)

  const togglePlay = () => {
    const video = document.getElementById('background-video')
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }

  return (
    <div className="absolute bottom-8 right-8 z-20">
      <button
        onClick={togglePlay}
        className="bg-black/50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-300"
        aria-label="Play/Pause video"
      >
        {isPaused ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>
    </div>
  )
}
