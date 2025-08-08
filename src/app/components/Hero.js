import Image from 'next/image'
import Link from 'next/link'
import DynamicVideoButton from './buttons/playVideoButton'

export default function Hero() {

    return (
        <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 p-5">
                <video
                    id="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                >
                    <source src='https://player.vimeo.com/progressive_redirect/playback/1032403058/rendition/1080p/file.mp4?loc=external&signature=52e350661a35ab6127a0bedad6f7c2ff890c04d769aaddc517712f955571d1be' type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0  bg-opacity-30"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-6">
                <h1 className="text-2xl md:text-5xl font-light mb-6 leading-tight ">
                    Outsmart skin aging with{' '} DiamondCore®

                </h1>

                <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
                    Skin that behaves younger, powered by patented DiamondCore® biotechnology.
                </p>

                <Link
                    href="/shop/collections"
                    className="inline-block border-2 border-white text-white px-8 py-4 text-lg font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
                >
                    SHOP NOW
                </Link>
            </div>

            <DynamicVideoButton />

            {/* Product Highlight - Removed for video focus */}
        </section>
    )
}