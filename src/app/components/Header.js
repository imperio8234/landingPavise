'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X, Plus, Minus, Search, Clock, Menu, ShoppingCart } from 'lucide-react'
import { PRODUCTS, useCart } from './context/productsCardContext'
import PromoCarousel from './PromoCarousel'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPromo, setShowPromo] = useState(true)
  const [isCartClosing, setIsCartClosing] = useState(false)
  const [isCartOpening, setIsCartOpening] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['cleanser', 'moisturizer', 'UV protection'])

  const timeoutRef = useRef(null)
  const searchInputRef = useRef(null)

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
    addToCart
  } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setIsCartOpen(true)
    console.log(`${product.name} agregado al carrito`);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true)
    setIsCartOpening(true)
    setTimeout(() => {
      setIsCartOpening(false)
    }, 600)
  }

  const handleCloseCart = () => {
    setIsCartClosing(true)
    setTimeout(() => {
      setIsCartOpen(false)
      setIsCartClosing(false)
    }, 600)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 300)
    } else {
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)

    if (query.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const filtered = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 300)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecentSearches)
    }
  }

  const handleDropdownEnter = (dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  // Menu data structure
  const menuData = {
    shop: {
      categories: [
        { name: 'Skincare', items: ['Cleansers', 'Moisturizers', 'Serums', 'Treatments'] },
      ]
    },
    science: {
      categories: [
        { name: 'Research', items: ['Clinical Studies', 'Ingredient Science', 'UV Analysis'] },
        { name: 'Technology', items: ['UV Detection', 'Skin Analysis', 'AI Recommendations'] },
        { name: 'Innovation', items: ['Product Development', 'Future Tech', 'Patents'] }
      ]
    },
    lab: {
      categories: [
        { name: 'Testing', items: ['UV Analysis', 'Skin Testing', 'Product Testing'] },
        { name: 'Development', items: ['Formulation', 'R&D Process', 'Quality Control'] },
        { name: 'Results', items: ['Lab Reports', 'Clinical Data', 'Before/After'] }
      ]
    }
  }

  return (
    <>
      {/* Promotional Banner */}
      {showPromo && (
        <PromoCarousel />
      )}

      {/* Main Header */}
      <header className="bg-black text-white py-4 px-6 z-40 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Button - Left */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Left Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {/* SHOP Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter('shop')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link href="/shop/collections" className="hover:text-gray-300 flex items-center py-2">
                SHOP <span className="ml-1">▼</span>
              </Link>

              {activeDropdown === 'shop' && (
                <div
                  className="absolute top-full left-0 transform mt-2 w-screen max-w-6xl bg-black border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 animate-fadeIn"
                  onMouseEnter={() => handleDropdownEnter('shop')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-8">
                    <div className="flex gap-8">
                      {/* Categorías del menú - Lado izquierdo */}
                      <div className="flex-shrink-0 w-64">
                        <div className="grid grid-cols-1 gap-6">
                          {menuData.shop.categories.map((category, index) => (
                            <div key={index} className="space-y-3">
                              <h3 className="font-semibold text-white border-b border-gray-700 pb-2 text-base">
                                {category.name}
                              </h3>
                              <ul className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link
                                      href={`/shop/collections`}
                                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block py-1 hover:pl-2"
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Productos destacados - Lado derecho */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white border-b border-gray-700 pb-3 mb-6 text-base">
                           Featured Products
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {PRODUCTS.slice(0, 3).map((product, i) => (
                            <div
                              key={product.id}
                              className="group relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                            >
                              {/* Contenedor de imagen del producto */}
                              <div className="relative aspect-square overflow-hidden">
                                {/* Imagen por defecto */}
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />

                                {/* Imagen hover */}
                                {product.imageHover && (
                                  <img
                                    src={product.imageHover}
                                    alt={`${product.name} hover`}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                  />
                                )}

                                {/* Overlay con botón */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleAddToCart(product);
                                    }}
                                    className="bg-white text-black px-4 py-2 font-semibold text-xs tracking-wider hover:bg-gray-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 rounded"
                                  >
                                    ADD TO CART
                                  </button>
                                </div>
                              </div>

                              {/* Información del producto */}
                              <div className="p-3">
                                <h4 className="text-white font-medium text-sm truncate">
                                  {product.name}
                                </h4>
                                {product.price && (
                                  <p className="text-gray-400 text-xs mt-1">
                                    ${product.price}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enlace para ver todo */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                      <Link
                        href="/shop/collections"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 text-base group"
                      >
                        Shop All →
                        <svg
                          className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SCIENCE Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter('science')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link href="/science" className="hover:text-gray-300 flex items-center py-2">
                SCIENCE <span className="ml-1">▼</span>
              </Link>

              {activeDropdown === 'science' && (
                <div
                  className="absolute top-full  mt-2 w-screen max-w-3xl bg-black border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 animate-fadeIn"
                  onMouseEnter={() => handleDropdownEnter('science')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                      {menuData.science.categories.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="font-semibold text-white border-b border-gray-700 pb-2 text-base">
                            {category.name}
                          </h3>
                          <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link
                                  href={`/science/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block py-1"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                      <Link
                        href="/science"
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 text-lg"
                      >
                        View All Science →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* IN THE LAB Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter('lab')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link href="/lab" className="hover:text-gray-300 flex items-center py-2">
                IN THE LAB <span className="ml-1">▼</span>
              </Link>

              {activeDropdown === 'lab' && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-3xl bg-black border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 animate-fadeIn"
                  onMouseEnter={() => handleDropdownEnter('lab')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                      {menuData.lab.categories.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="font-semibold text-white border-b border-gray-700 pb-2 text-base">
                            {category.name}
                          </h3>
                          <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link
                                  href={`/lab/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block py-1"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                      <Link
                        href="/lab"
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 text-lg"
                      >
                        Explore Lab →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Logo */}
          <div className="flex-1 text-center md:flex-none">
            <Link href="/" className="text-2xl font-bold tracking-wider">
              pavise
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/partner-locator" className="hover:text-gray-300 text-sm">
              PARTNER LOCATOR
            </Link>
            <div className="relative search-container">
              <button
                onClick={handleSearchToggle}
                className="hover:text-gray-300 text-sm flex items-center gap-1"
              >
                <Search size={16} />
                SEARCH
              </button>
            </div>
            <Link href="/account" className="hover:text-gray-300 text-sm">
              ACCOUNT
            </Link>
            <button
              onClick={handleOpenCart}
              className="hover:text-gray-300 text-sm"
            >
              CART({getTotalItems()})
            </button>
          </div>

          {/* Mobile Cart Button - Right */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 relative"
            onClick={handleOpenCart}
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-0 bg-black z-50 overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <Link href="/" className="text-2xl font-bold tracking-wider">
                pavise
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6">
              {/* Shop Section - Expanded by default */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">SHOP</h2>
                
                {/* Categories */}
                <div className="space-y-6 mb-6">
                  {menuData.shop.categories.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-white text-base">
                        {category.name}
                      </h3>
                      <ul className="space-y-2 ml-4">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={`/shop/collections`}
                              className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Products */}
                <div>
                  <h3 className="font-semibold text-white border-b border-gray-700 pb-3 mb-4 text-base">
                    Featured Products
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {PRODUCTS.slice(0, 3).map((product, i) => (
                      <div
                        key={product.id}
                        className="flex gap-4 bg-gray-900 rounded-xl overflow-hidden p-4"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">
                            {product.name}
                          </h4>
                          {product.price && (
                            <p className="text-gray-400 text-xs mt-1">
                              ${product.price}
                            </p>
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                              setIsMenuOpen(false);
                            }}
                            className="bg-white text-black px-3 py-1 font-semibold text-xs tracking-wider hover:bg-gray-100 transition-all duration-300 rounded mt-2"
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shop All Link */}
                <div className="mt-6 text-center">
                  <Link
                    href="/shop/collections"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop All →
                  </Link>
                </div>
              </div>

              {/* Other Menu Items */}
              <nav className="space-y-4">
                <Link 
                  href="/science" 
                  className="block text-lg font-medium hover:text-gray-300 py-2 border-b border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SCIENCE
                </Link>
                <Link 
                  href="/lab" 
                  className="block text-lg font-medium hover:text-gray-300 py-2 border-b border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  IN THE LAB
                </Link>
                <Link 
                  href="/partner-locator" 
                  className="block text-lg font-medium hover:text-gray-300 py-2 border-b border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PARTNER LOCATOR
                </Link>
                <button
                  onClick={() => {
                    handleSearchToggle();
                    setIsMenuOpen(false);
                  }}
                  className="block text-lg font-medium hover:text-gray-300 py-2 border-b border-gray-700 text-left w-full flex items-center gap-2"
                >
                  <Search size={16} />
                  SEARCH
                </button>
                <Link 
                  href="/account" 
                  className="block text-lg font-medium hover:text-gray-300 py-2 border-b border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ACCOUNT
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Search Dropdown Panel */}
      {isSearchOpen && (
        <>
          <div className="top-32 left-0 w-full bg-black/95 backdrop-blur-sm z-[1000] search-container">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search Header */}
              <div className="flex justify-center py-4 sm:py-6">
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <div className="relative rounded-full border border-white overflow-hidden">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full text-white pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </form>
              </div>

              {/* Search Content */}
              <div className="bg-black text-white max-h-[70vh] sm:max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* No search query */}
                {!searchQuery && (
                  <div className="p-4 sm:p-6">
                    {/* Recent Searches */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                        <Clock size={16} className="sm:w-5 sm:h-5" />
                        Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="bg-gray-800 hover:bg-gray-700 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-200"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Categories */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Popular Categories</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                        {['Cleansers', 'Moisturizers', 'Serums', 'UV Protection'].map((category, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(category)}
                            className="bg-gray-800 hover:bg-gray-700 p-2 sm:p-4 rounded-lg text-center text-xs sm:text-sm transition-colors duration-200"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading */}
                {isSearching && (
                  <div className="p-4 sm:p-6 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2 text-gray-400 text-sm">Searching...</p>
                  </div>
                )}

                {/* Search Results */}
                {searchQuery && !isSearching && (
                  <div className="p-4 sm:p-6">
                    {searchResults.length > 0 ? (
                      <>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                          Search Results ({searchResults.length})
                        </h3>

                        {/* Grid responsivo para resultados */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-4">
                          {searchResults.map((product, index) => (
                            <div
                              key={product.id}
                              className="group relative bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:transform hover:scale-105 cursor-pointer w-full"
                            >
                              {/* Product Image Container */}
                              <div className="relative aspect-square overflow-hidden rounded-t-xl sm:rounded-t-2xl">
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
                                    className="bg-white cursor-pointer text-black px-3 py-2 sm:px-6 sm:py-3 font-semibold text-xs sm:text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0"
                                  >
                                    ADD TO CART
                                  </button>
                                </div>
                              </div>

                              {/* Product Info */}
                              <Link href={`/shop/product/${product.id}`} className="p-2 sm:p-3 lg:p-4 text-white">
                                <div className="flex justify-between items-start mb-1 sm:mb-2">
                                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base leading-tight text-left">{product.name}</h3>
                                  <span className="text-white font-bold text-xs sm:text-sm lg:text-base ml-1">${product.price}</span>
                                </div>

                                <p className="text-gray-300 text-xs leading-relaxed text-left line-clamp-2 mb-1 sm:mb-2">
                                  {product.description}
                                </p>

                                {/* Category Badge */}
                                <div className="mt-1 sm:mt-2">
                                  <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                                    {product.category}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>

                        {/* View All Results Button */}
                        <div className="mt-4 sm:mt-6 text-center">
                          <Link
                            href={`/search?q=${searchQuery}`}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg transition-colors duration-200"
                          >
                            View All Results
                          </Link>
                        </div>
                      </>
                    ) : (
                      /* No Results Found */
                      <div className="text-center py-6 sm:py-8">
                        <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">No products found for {searchQuery}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Try searching for:</p>
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2">
                          {['cleanser', 'moisturizer', 'serum', 'UV protection'].map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearch(suggestion)}
                              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm underline px-1"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </>
      )}

      {/* Cart Overlay */}
      {(isCartOpen || isCartClosing) && (
        <div
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-600 ease-in-out ${isCartClosing ? 'opacity-0' : isCartOpening ? 'opacity-0' : 'opacity-100'
            }`}
          onClick={handleCloseCart}
        >
          {/* Cart Panel */}
          <div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-black text-white overflow-y-auto transform transition-all duration-600 ease-in-out ${isCartClosing ? 'translate-x-full opacity-0 scale-95' :
              isCartOpening ? 'translate-x-full opacity-0 scale-95' :
                'translate-x-0 opacity-100 scale-100'
              }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transitionDelay: isCartOpening ? '100ms' : '0ms'
            }}
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={handleCloseCart}
                className="text-white hover:text-gray-300 transform transition-transform duration-200 hover:scale-110"
              >
                <X size={24} />
              </button>
            </div>

            {/* Promotional Message */}
            <div className="bg-blue-600 p-3 text-sm">
              <div className="mb-2 font-semibold">You have unlocked a free UV Indicator Card!</div>
              <div className="bg-blue-700 p-2 rounded text-xs">
                🔵 For a limited time, you'll receive a complimentary UV Indicator Card in every order.
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-4">
              {cartItems.length === 0 ? (
                <div className={`text-center text-gray-400 mt-8 transition-all duration-800 delay-300 ${isCartOpening ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* UV Indicator Card - Free Item */}
                  <div className={`flex items-center gap-3 p-3 border border-gray-700 rounded transform transition-all duration-700 delay-200 hover:scale-[1.02] hover:shadow-lg ${isCartOpening ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                    }`}>
                    <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">UV Indicator Card</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">$0.00</div>
                    </div>
                  </div>

                  {/* Cart Products */}
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 border border-gray-700 rounded transform transition-all duration-700 hover:scale-[1.02] hover:shadow-lg ${isCartOpening ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                        }`}
                      style={{
                        transitionDelay: isCartOpening ? `${300 + (index * 150)}ms` : `${index * 100}ms`
                      }}
                    >
                      <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name.toUpperCase()}</h3>
                        <p className="text-xs text-gray-400">{item.category}</p>

                        {/* Subscription Options */}
                        <div className="mt-2 space-y-1">
                          <label className="flex items-center text-xs transition-colors duration-200 hover:text-white">
                            <input type="radio" name={`purchase-${item.id}`} className="mr-2" />
                            One-time purchase
                          </label>
                          <label className="flex items-center text-xs transition-colors duration-200 hover:text-white">
                            <input type="radio" name={`purchase-${item.id}`} className="mr-2" defaultChecked />
                            Subscription & save 5%
                          </label>
                        </div>

                        <select className="mt-2 bg-gray-800 text-white text-xs p-1 rounded w-full transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                          <option>Delivery every 1 month</option>
                          <option>Delivery every 2 months</option>
                          <option>Delivery every 3 months</option>
                        </select>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm transition-all duration-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-gray-400 hover:text-red-400 mt-1 underline transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className={`border-t border-gray-700 p-4 transition-all duration-800 delay-500 ${isCartOpening ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-lg font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Taxes & shipping calculated at checkout</p>

                <div className={`space-y-3 transition-all duration-700 delay-600 ${isCartOpening ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}>
                  <button className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Check out
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Buy with ShopPay
                  </button>
                  <button className="w-full bg-yellow-500 text-black py-3 rounded font-semibold hover:bg-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    PayPal
                  </button>
                  <button className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                    <span className="text-blue-500 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-500 font-bold">e</span>
                    <span className="ml-1">Pay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }
      `}</style>
    </>
  )
}