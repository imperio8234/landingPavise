 "use client"
 import React, { useState, useEffect } from 'react';

const DiamondCoreVideoSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('video-section');
    if (section) {
      observer.observe(section);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const getOpacity = (delay = 0) => {
    if (!isVisible) return 0;
    const progress = Math.min((scrollY - delay) / 500, 1);
    return Math.max(0, progress);
  };

  const getTransform = (delay = 0) => {
    if (!isVisible) return 'translateY(50px)';
    const progress = Math.min((scrollY - delay) / 500, 1);
    const translateY = Math.max(0, 50 - (progress * 50));
    return `translateY(${translateY}px)`;
  };

  return (
    <div className="min-h-screen bg-black/50">
      {/* Hero section for initial scroll */}
      <section className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-light mb-4">DiamondCore®</h1>
          <p className="text-xl text-gray-300">Revolutionary Skincare Technology</p>
        </div>
      </section>

      {/* Video background section */}
      <section 
        id="video-section"
        className="relative "
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source 
              src="https://player.vimeo.com/progressive_redirect/playback/995899936/rendition/1080p/file.mp4?loc=external&signature=01f420e9ee1f5cd32c5fff7aaaa75ac8979d3cd0dedbc41523f0698f5e3434b3"
              type="video/mp4" 
            />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 "></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          {/* UVA Defense Section */}
          <div className="min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div 
                className="text-white"
                style={{
                  opacity: getOpacity(0),
                  transform: getTransform(0),
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <p className="text-sm uppercase tracking-wide mb-4 text-gray-300">
                  Target the root cause of skin aging
                </p>
                <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6">
                  The highest level of<br />
                  <span className="font-semibold">UVA defense</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  UVA rays are the #1 cause of accelerated aging and account for 95% of 
                  UV radiation. DiamondCore® multitasks as the strongest possible UVA 
                  defense, rated PA++++ for total age defense.
                </p>
              </div>
              <div 
                className="text-center md:text-right"
                style={{
                  opacity: getOpacity(200),
                  transform: getTransform(200),
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <p className="text-sm text-gray-400 mb-2">From the mind of chemical-</p>
                <p className="text-sm text-gray-400">biomedical engineer, Sophie Bai</p>
              </div>
            </div>
          </div>

          {/* Cellular Aging Section */}
          <div className="min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-6">
              <div 
                className="text-white text-right max-w-2xl ml-auto"
                style={{
                  opacity: getOpacity(400),
                  transform: getTransform(400),
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <p className="text-sm uppercase tracking-wide mb-4 text-gray-300">
                  Target the root cause of skin aging
                </p>
                <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6">
                  Reversal of cellular<br />
                  <span className="font-semibold">aging</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Reactive Oxygen Species are the inflammatory, damaging particles at 
                  the root of all aging. They result from sources of stress like UV radiation, 
                  air pollution, and cell dysfunction. DiamondCore® eradicates 80% of 
                  ROS, preventing the cell reactions that cause aging.
                </p>
              </div>
            </div>
          </div>

          {/* Skin Repair Section */}
          <div className="min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-6">
              <div 
                className="text-white max-w-2xl"
                style={{
                  opacity: getOpacity(600),
                  transform: getTransform(600),
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <p className="text-sm uppercase tracking-wide mb-4 text-gray-300">
                  Target the root cause of skin aging
                </p>
                <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6">
                  Skin repair<br />
                  <span className="font-semibold">optimization</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  DiamondCore® is scientifically proven to maximize healthy skin cell 
                  activity and collagen synthesis, enhancing skin's ability to repair damage 
                  from external and internal stressors.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="min-h-screen flex items-center">
            <div 
              className="max-w-4xl mx-auto text-center px-6 text-white"
              style={{
                opacity: getOpacity(800),
                transform: getTransform(800),
                transition: 'opacity 0.6s ease, transform 0.6s ease'
              }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                Ready to Experience{' '}
                <span className="font-semibold">DiamondCore®</span>?
              </h2>
              <p className="text-xl mb-12 text-gray-300">
                Join thousands who have discovered the future of skincare with our 
                revolutionary biotechnology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                  SHOP PRODUCTS
                </button>
                <button className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-black transition-all transform hover:scale-105">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default DiamondCoreVideoSection;