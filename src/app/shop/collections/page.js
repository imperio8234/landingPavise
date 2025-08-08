'use client'
import { PRODUCTS, useCart } from "@/app/components/context/productsCardContext";


export default function Home() {
    const { addToCart, setIsCartOpen } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setIsCartOpen(true)
        // Opcional: mostrar una notificación o feedback al usuario
        console.log(`${product.name} agregado al carrito`);
    };

    return (
        <main className="flex justify-center">
            <div className="w-9/12 h-full flex justify-center text-center flex-col space-y-7">
                <div className="text-6xl">
                    <h3>SHOP ALL</h3>
                </div>
                <div className="flex gap-9">
                    {PRODUCTS.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative bg-gray-900 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:transform hover:scale-105 cursor-pointer h-12/12 w-8/12"
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
                                        className="bg-white cursor-pointer text-black px-6 py-3 font-semibold text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 text-white">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                                    <span className="text-white font-bold text-lg ml-2">${product.price}</span>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Category Badge */}
                                <div className="mt-4">
                                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}