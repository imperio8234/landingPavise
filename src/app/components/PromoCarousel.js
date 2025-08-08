import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Promotional messages extracted from the HTML
  const promoMessages = [
    {
      id: 1,
      text: "NOW AVAILABLE: ",
      linkText: "Precision Eye Lift",
      href: "/products/precision-eye-lift",
      title: "PRECISION EYE LIFT"
    },
    {
      id: 2,
      text: "Get 10% off when you sign up for emails and texts. ",
      linkText: "Unlock your offer.",
      href: "https://pavise.attn.tv/p/1nx/landing-page",
      title: "https://pavise.attn.tv/p/1nx/landing-page"
    }
  ]

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible, promoMessages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoMessages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoMessages.length) % promoMessages.length)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="sticky top-0 bg-gray-100 text-black overflow-hidden">
      {/* Carousel Container */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        {/* Slides Container */}
        <div className="flex-1 relative overflow-hidden mx-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            {promoMessages.map((message, index) => (
              <div
                key={message.id}
                className="w-full flex-shrink-0 text-center text-sm"
              >
                <p className="inline">
                  {message.text}
                  <a
                    href={message.href}
                    title={message.title}
                    className="underline hover:no-underline font-medium transition-all duration-200"
                  >
                    {message.linkText}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 ml-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Close promotional banner"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {promoMessages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-black'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PromoCarousel