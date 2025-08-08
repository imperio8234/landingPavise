"use client"
import React from 'react';


const MediaMarquee = () => {
  const mediaLogos = [
    { name: 'Vogue', url: 'https://www.vogue.com/article/best-mineral-sunscreens', width: 338, height: 90 },
    { name: 'Harper\'s Bazaar', url: 'https://www.harpersbazaar.com/beauty/a45028056/most-iconic-beauty-products-2023/', width: 262, height: 90 },
    { name: 'Cosmopolitan', url: 'https://www.cosmopolitan.com/style-beauty/beauty/a45393355/cosmo-acne-awards-2023/', width: 469, height: 91 },
    { name: 'Allure', url: 'https://www.allure.com/story/lasers-peels-filler-for-hands', width: 309, height: 91 },
    { name: 'Women\'s Health', url: 'https://www.womenshealthmag.com/beauty/a45838808/melanin-skincare-products/', width: 440, height: 91 },
    { name: 'Glossy', url: 'https://www.glossy.co/announcement/awards/ysl-native-sephora-r-e-m-beauty-and-madison-reed-are-2023-glossy-beauty-awards-finalists/', width: 495, height: 90 },
    { name: 'Esquire', url: 'https://www.esquire.com/style/grooming/g45640232/top-shelf-grooming-october-2023/', width: 469, height: 70 },
    { name: 'Beauty Matter', url: 'https://beautymatter.com/articles/beautymatter-next-award-winners-revealed', width: 323, height: 64 },
    { name: 'Bustle', url: 'https://www.bustle.com/beauty/best-high-tech-beauty-products', width: 346, height: 90 },
    { name: 'L\'Officiel', url: 'https://www.lofficielusa.com/shopping/best-spf-lip-balms-summer-beauty-sunscreen-shopping', width: 392, height: 90 },
    { name: 'Beauty Independent', url: 'https://www.beautyindependent.com/b-a-i-biosciences-sophie-bai-spf-pavise/', width: 324, height: 90 },
    { name: 'Forbes', url: 'https://www.forbes.com/sites/celiashatzman/2023/03/22/this-new-skincare-line-is-changing-how-we-protect-our-skin-from-the-sun-and-how-we-age/?sh=5c2be8ca276c', width: 346, height: 90 },
    { name: 'Oprah Daily', url: 'https://www.oprahdaily.com/beauty/skin-makeup/a43621151/best-skincare-routines-for-every-age/', width: 248, height: 90 },
    { name: 'Elle', url: 'https://www.elle.com/beauty/makeup-skin-care/a44095976/best-summer-sunscreens-2023/', width: 220, height: 90 },
    { name: 'WWD', url: 'https://wwd.com/beauty-industry-news/beauty-features/pavise-sun-cares-biotechnology-powered-new-player-1235583993/', width: 269, height: 90 },
    { name: 'CNN', url: 'https://www.cnn.com/cnn-underscored/beauty/spring-beauty-launches-2023', width: 188, height: 90 },
    { name: 'Marie Claire', url: 'https://www.marieclaire.com/beauty/pavise-uv-camera-review/', width: 597, height: 90 },
    { name: 'W Magazine', url: 'https://www.wmagazine.com/beauty/best-new-beauty-products-makeup-skincare-november-2024', width: 56, height: 90 },
    { name: 'Highsnobiety', url: 'https://www.highsnobiety.com/p/pavise-skincare-sophie-bai-interview/', width: 517, height: 90 }
  ];

  const LogoItem = ({ logo }) => (
    <a 
      href={logo.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex h-full items-center mr-12 flex-shrink-0 transition-transform duration-300 hover:scale-110"
    >
      <div className="h-20 flex items-center justify-center px-4">
        <div 
          className="text-white font-bold text-xl tracking-wider opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {logo.name.toUpperCase()}
        </div>
      </div>
    </a>
  );

  return (
    <div className="w-full bg-black overflow-hidden py-8">
      <div className="relative flex">
        {/* First set of logos */}
        <div 
          className="flex items-center h-20 animate-marquee"
          style={{
            animation: 'marquee 20s linear infinite'
          }}
        >
          {mediaLogos.map((logo, index) => (
            <LogoItem key={`first-${index}`} logo={logo} />
          ))}
        </div>
        
        {/* Second set of logos for seamless loop */}
        <div 
          className="flex items-center h-20 animate-marquee"
          style={{
            animation: 'marquee 20s linear infinite'
          }}
        >
          {mediaLogos.map((logo, index) => (
            <LogoItem key={`second-${index}`} logo={logo} />
          ))}
        </div>

        {/* Third set for extra smoothness */}
        <div 
          className="flex items-center h-20 animate-marquee"
          style={{
            animation: 'marquee 20s linear infinite'
          }}
        >
          {mediaLogos.map((logo, index) => (
            <LogoItem key={`third-${index}`} logo={logo} />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          white-space: nowrap;
        }
        
        /* Pause animation on hover */
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MediaMarquee;