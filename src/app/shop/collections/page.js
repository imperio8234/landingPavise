'use client'
import { PRODUCTS, useCart } from "@/app/components/context/productsCardContext";
import Link from "next/link";


export default function Home() {
    const { addToCart, setIsCartOpen } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setIsCartOpen(true)
        // Opcional: mostrar una notificación o feedback al usuario
        console.log(`${product.name} agregado al carrito`);
    };

    return (
        <main className="flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl h-full flex justify-center text-center flex-col space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    <h3>SHOP ALL</h3>
                </div>
                
                {/* Grid responsivo para productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {PRODUCTS.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative bg-gray-900 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:transform hover:scale-105 cursor-pointer w-full"
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
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        className="bg-white cursor-pointer text-black px-4 py-2 sm:px-6 sm:py-3 font-semibold text-xs sm:text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <Link  href={`/shop/product/${product.id}`} className="lg:p-5 sm:p-6 text-white ">
                                <div className="flex justify-between items-start mb-3 m-2">
                                    <h3 className="font-semibold text-base sm:text-lg leading-tight text-left">{product.name}</h3>
                                    <span className="text-white font-bold text-base sm:text-lg ml-2">${product.price}</span>
                                </div>

                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-left m-2">
                                    {product.description}
                                </p>

                                {/* Category Badge */}
                                <div className="mt-3 sm:mt-4">
                                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                                        {product.category}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}