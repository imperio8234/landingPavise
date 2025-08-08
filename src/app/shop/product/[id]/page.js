"use client"
import React, { useEffect, useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/app/components/context/productsCardContext';
import { useCart } from '@/app/components/context/productsCardContext'; // Importar el hook del carrito

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('with-add-on');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    clinicalTrials: false,
    bundleDetails: false,
    howToUse: false
  });
  
  const params = useParams();
  const { id } = params;

  // Usar el contexto del carrito
  const { addToCart, setIsCartOpen } = useCart();

  const assignProduct = () => {
    const productFiltered = PRODUCTS.find((r) => r.id == id);
    console.log("producto", productFiltered);
    setProduct(productFiltered);
    setCurrentImg(productFiltered.image)
  };

  useEffect(() => {
    assignProduct();
  }, [id]);

  // Opciones de bundle dinámicas basadas en el producto
  const getBundleOptions = (product) => {
    if (!product) return [];
    
    const basePrice = product.price;
    const addOnPrice = 64; // Precio fijo del add-on
    
    return [
      {
        id: 'with-add-on',
        label: 'With add-on',
        price: basePrice + addOnPrice,
        originalPrice: Math.round((basePrice + addOnPrice) * 1.1), // 10% más como precio original
        description: `Complete ${product.name} + Gentle Amino Powerwash`
      },
      {
        id: 'without-add-on',
        label: 'Without add-on',
        price: basePrice,
        originalPrice: Math.round(basePrice * 1.1),
        description: `${product.name} only`
      },
      {
        id: 'add-on-only',
        label: 'Add-on Gentle Amino Powerwash',
        price: addOnPrice,
        description: 'Gentle Amino Powerwash only'
      }
    ];
  };

  const bundleOptions = getBundleOptions(product);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const selectedBundle = bundleOptions.find(option => option.id === selectedOption);

  // Función para manejar agregar al carrito
  const handleAddToCart = () => {
    if (!product || !selectedBundle) return;

    // Crear el producto a agregar basado en la opción seleccionada
    const productToAdd = {
      id: `${product.id}-${selectedOption}`, // ID único para cada variante
      name: selectedBundle.description,
      price: selectedBundle.price,
      originalPrice: selectedBundle.originalPrice,
      image: product.image,
      category: product.category,
      bundleType: selectedOption,
      originalProduct: product
    };

    // Agregar al carrito y abrir el carrito
    addToCart(productToAdd, quantity);
    setIsCartOpen(true);
    
    // Opcional: mostrar una notificación o feedback al usuario
    console.log(`${productToAdd.name} agregado al carrito`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-4">
              <div onClick={() => setCurrentImg(product.image)} className={`w-16 h-16 bg-gray-700 rounded-lg border-2 cursor-pointer ${currentImg == product.image && "border-orange-500"}`}>
                <img
                  src={product.image}
                  alt={`${product.name} thumbnail`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {product.imageHover && (
                <div onClick={() => setCurrentImg(product.imageHover)} className={`w-16 h-16 bg-gray-700 rounded-lg border-2 cursor-pointer ${currentImg == product.imageHover && "border-orange-500"}`}>
                  <img
                    src={product.imageHover}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name.toUpperCase()}</h1>
              <p className="text-orange-400 mb-4">
                {product.category} | {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-400">({product.reviews} Reviews)</span>
              </div>

              {/* Features dinámicas */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-300 mb-3">Key Features:</p>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-gray-300 mb-6">
                Our foundational skin regenerative system, powered by advanced technology. The starting point we 
                recommend for those seeking visible and cellular-level, complete age reversal.
              </p>

              <p className="text-gray-300 mb-6">
                Designed to target both the root causes and consequences of aging across the full 24-hour cycle, 
                this protocol works to radically enhance skin longevity.
              </p>
            </div>

            {/* Protocol Contents - Dinámico */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What's included:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {product.name}—{product.description}</li>
                {selectedOption === 'with-add-on' && (
                  <li>• Gentle Amino Powerwash—serum-to-lather cleanser that encourages cell turnover.</li>
                )}
              </ul>
            </div>

            {/* Bundle Options */}
            <div className="space-y-3">
              {bundleOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedOption === option.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-lg font-bold">${option.price}</span>
                  </div>
                  {option.description && (
                    <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                  )}
                  {option.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      Original: ${option.originalPrice}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="border border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Add to cart - ${selectedBundle?.price}</span>
                {selectedBundle?.originalPrice && (
                  <span className="text-gray-400 line-through">
                    (${selectedBundle.originalPrice} Value)
                  </span>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-700 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-700 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ${(selectedBundle?.price * quantity) || 0}
                </button>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              <div className="border-t border-gray-700 pt-4">
                <button
                  onClick={() => toggleSection('clinicalTrials')}
                  className="w-full flex justify-between items-center py-2 text-left hover:text-orange-400 transition-colors"
                >
                  <span className="font-medium">CLINICAL TRIALS</span>
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.clinicalTrials ? 'rotate-45' : ''}`} />
                </button>
                {expandedSections.clinicalTrials && (
                  <div className="mt-4 text-gray-300">
                    <p>Clinical trials and efficacy data for {product.name}...</p>
                    <p className="mt-2">
                      Studies show significant improvement in skin texture, hydration, and appearance 
                      after regular use of this product.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-4">
                <button
                  onClick={() => toggleSection('bundleDetails')}
                  className="w-full flex justify-between items-center py-2 text-left hover:text-orange-400 transition-colors"
                >
                  <span className="font-medium">BUNDLE DETAILS</span>
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.bundleDetails ? 'rotate-45' : ''}`} />
                </button>
                {expandedSections.bundleDetails && (
                  <div className="mt-4 text-gray-300">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-white mb-1">Main Product:</h4>
                        <p>{product.name} - {product.description}</p>
                        <p>Price: {product.priceDisplay}</p>
                      </div>
                      {selectedOption === 'with-add-on' && (
                        <div>
                          <h4 className="font-semibold text-white mb-1">Add-on:</h4>
                          <p>Gentle Amino Powerwash - $64</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-4">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex justify-between items-center py-2 text-left hover:text-orange-400 transition-colors"
                >
                  <span className="font-medium">HOW TO USE</span>
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.howToUse ? 'rotate-45' : ''}`} />
                </button>
                {expandedSections.howToUse && (
                  <div className="mt-4 text-gray-300 space-y-3">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Daily Application:</h4>
                      <p>Apply {product.name} as part of your daily skincare routine.</p>
                      {product.category.includes('SUNSCREEN') && (
                        <p className="mt-2">
                          <strong>For sunscreen:</strong> Apply generously 15 minutes before sun exposure. 
                          Reapply every 2 hours or after swimming/sweating.
                        </p>
                      )}
                    </div>
                    {selectedOption === 'with-add-on' && (
                      <div>
                        <h4 className="font-semibold text-white mb-2">With Gentle Amino Powerwash:</h4>
                        <p>Use the powerwash to cleanse, then apply {product.name} for optimal results.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};