import MediaMarquee from './components/buttons/mediaMarque'
import DynamicVideoButton from './components/buttons/playVideoButton'
import Hero from './components/Hero'
import ProductShowcase from './components/ProductShowCase'
import DiamondCoreVideoSection from './components/sections'

export default function Home() {
  return (
    <>
      <Hero />
      <MediaMarquee />
      <ProductShowcase />

      {/* DiamondCore Results Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Skin that <span className="font-semibold">looks</span> and <span className="font-semibold">behaves</span> younger
            </h2>
            <p className="text-lg mb-10 ">
              Patented DiamondCore® technology targets the root causes of aging to mimic and enhance skin's own regenerative processes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <span className="text-4xl font-bold  px-2">97%</span>
                <p className="mt-2">noticed visibly firmer, tighter skin.</p>
              </div>
              <div>
                <span className="text-4xl font-bold  px-2">97%</span>
                <p className=" mt-2">noticed significant reduction in overall stress and damage.</p>
              </div>
              <div>
                <span className="text-4xl font-bold  px-2">97%</span>
                <p className=" mt-2">noticed significantly brighter and more even-toned skin.</p>
              </div>
              <div>
                <span className="text-4xl font-bold  px-2">94%</span>
                <p className=" mt-2">noticed visibly reduced expression lines and wrinkles.</p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <video
              src="https://player.vimeo.com/progressive_redirect/playback/1008100783/rendition/1080p/file.mp4?loc=external&signature=0e6d7281cb5da43d5220fd4806c32aee63277f1a9b9ef6d0770d894ba6183ace"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 text-sm">EXPRESSION LINES + WRINKLES</span>
          </div>

        </div>
      </section>


      {/* Call to Action Section */}
      {/* DiamondCore Technology Results Section */}
      <DiamondCoreVideoSection />
    </>
  )
}