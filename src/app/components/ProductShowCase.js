'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)

  const products = [
    {
      id: 1,
      name: 'Dynamic Age Defense',
      category: 'SUNSCREEN SPF 30',
      price: '$148',
      description: 'Foundational skin regeneration for daily anti-aging treatment use',
      features: ['Broad spectrum SPF 30', 'Anti-aging technology', 'Invisible finish', '100% mineral'],
      image: '//pavise.com/cdn/shop/files/BSR-FullSize-Updated0527_98cb69f9-caed-4e4f-a713-3591f02db59e.png?v=1751376524&width=600',
      imageHover: 'https://pavise.com/cdn/shop/files/BSR-PDP-1a_1.png?v=1751376574&width=600',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'Bioadaptive Stress Repair',
      category: 'RECOVERY SERUM',
      price: '$228',
      description: 'The first daily topical biostimulator',
      features: ['Stress adaptation', 'Barrier repair', 'Environmental protection', 'DiamondCore® technology'],
      image: '//pavise.com/cdn/shop/files/DAD-with-AwardSeals-updated_3890aca3-e7bc-40b0-9335-a1589c029e92.png?v=1738341533&width=600',
      imageHover: '//pavise.com/cdn/shop/files/DAD-PDP-Updated-Jun10.png?v=1749585950&width=600',
      color: 'bg-purple-600'
    },
    {
      id: 3,
      name: 'Precision Eye Lift',
      category: 'EYE TREATMENT',
      price: '$128',
      description: 'Regenerative eye treatment',
      features: ['Instant lifting', 'Reduces fine lines', 'Brightens dark circles', 'Clinically proven'],
      image: '//pavise.com/cdn/shop/files/PEL-PDP-1.png?v=1748962850&width=600',
      imageHover: '//pavise.com/cdn/shop/files/PEL-PDP-2.png?v=1753994668&width=600',
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'Gentle Amino Powerwash',
      category: 'CLEANSER',
      price: '$64',
      description: 'Skin-refining cleanser to remove impurities, makeup, and sunscreen',
      features: ['Amino acid formula', 'pH balanced', 'Gentle yet effective', 'Suitable for all skin'],
      image: '//pavise.com/cdn/shop/files/GAP-with-AwardSeal-updated_8b20d0db-85db-4801-bba3-3f7bd0b40531.png?v=1738705766&width=600',
      imageHover: '//pavise.com/cdn/shop/files/GAP-PDP-Update-2_1.png?v=1738705766&width=600',
      color: 'bg-orange-600'
    }
  ]

  // Auto-rotate products every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [products.length])

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
            Our <span className="font-semibold">DiamondCore®</span> Collection
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each product is powered by our patented DiamondCore® biotechnology,
            delivering unprecedented results for healthier, younger-looking skin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative bg-gray-900 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:transform hover:scale-105 cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                {/* Default Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                />
                
                {/* Hover Image */}
                <img
                  src={product.imageHover}
                  alt={`${product.name} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                />
                
                {/* Hover Overlay with Shop Now Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-center">
                  <Link href={"/shop/collections"} className="bg-white text-black px-6 py-3 font-semibold text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0">
                    Shop Now
                  </Link>
                </div>
              </div>
              
              {/* Product Info */}
              <Link href={`/shop/product/${product.id}`} className="p-6 text-white">
                <div className="flex justify-between items-start mb-3 m-2">
                  <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                  <span className="text-white font-bold text-lg ml-2">{product.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed m-2">
                  {product.description}
                </p>
                
                {/* Category Badge */}
                <div className="mt-4">
                  <span className="text-xs font-medium text-gray-400 tracking-wider uppercase m-2">
                    {product.category}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View Full Collection Button */}
        <div className="text-center mt-16">
          <Link href={"/shop/collections"} className="border cursor-pointer border-white text-white px-8 py-3 font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300">
            VIEW THE FULL COLLECTION
          </Link>
        </div>
        
      </div>
    </section>
  )
}