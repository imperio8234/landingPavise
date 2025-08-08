'use client'

import { ReactNode, createContext, useContext, useState } from 'react'


// Datos de productos (puedes mover esto a un archivo separado si quieres)
export const PRODUCTS = [
    {
        id: 1,
        name: 'Dynamic Age Defense',
        category: 'SUNSCREEN SPF 30',
        price: 148,
        priceDisplay: '$148',
        description: 'Foundational skin regeneration for daily anti-aging treatment use',
        features: ['Broad spectrum SPF 30', 'Anti-aging technology', 'Invisible finish', '100% mineral'],
        image: '//pavise.com/cdn/shop/files/BSR-FullSize-Updated0527_98cb69f9-caed-4e4f-a713-3591f02db59e.png?v=1751376524&width=600',
        imageHover: 'https://pavise.com/cdn/shop/files/BSR-PDP-1a_1.png?v=1751376574&width=600',
        color: 'bg-blue-600',
        rating: 4.8,
        reviews: 142
    },
    {
        id: 2,
        name: 'Bioadaptive Stress Repair',
        category: 'RECOVERY SERUM',
        price: 228,
        priceDisplay: '$228',
        description: 'The first daily topical biostimulator',
        features: ['Stress adaptation', 'Barrier repair', 'Environmental protection', 'DiamondCore® technology'],
        image: '//pavise.com/cdn/shop/files/DAD-with-AwardSeals-updated_3890aca3-e7bc-40b0-9335-a1589c029e92.png?v=1738341533&width=600',
        imageHover: '//pavise.com/cdn/shop/files/DAD-PDP-Updated-Jun10.png?v=1749585950&width=600',
        color: 'bg-purple-600',
        rating: 4.9,
        reviews: 89
    },
    {
        id: 3,
        name: 'Precision Eye Lift',
        category: 'EYE TREATMENT',
        price: 128,
        priceDisplay: '$128',
        description: 'Regenerative eye treatment',
        features: ['Instant lifting', 'Reduces fine lines', 'Brightens dark circles', 'Clinically proven'],
        image: '//pavise.com/cdn/shop/files/PEL-PDP-1.png?v=1748962850&width=600',
        imageHover: '//pavise.com/cdn/shop/files/PEL-PDP-2.png?v=1753994668&width=600',
        color: 'bg-green-600',
        rating: 4.7,
        reviews: 203
    },
    {
        id: 4,
        name: 'Gentle Amino Powerwash',
        category: 'CLEANSER',
        price: 64,
        priceDisplay: '$64',
        description: 'Skin-refining cleanser to remove impurities, makeup, and sunscreen',
        features: ['Amino acid formula', 'pH balanced', 'Gentle yet effective', 'Suitable for all skin'],
        image: '//pavise.com/cdn/shop/files/GAP-with-AwardSeal-updated_8b20d0db-85db-4801-bba3-3f7bd0b40531.png?v=1738705766&width=600',
        imageHover: '//pavise.com/cdn/shop/files/GAP-PDP-Update-2_1.png?v=1738705766&width=600',
        color: 'bg-orange-600',
        rating: 4.6,
        reviews: 156
    }
]



const CartContext = createContext(undefined)

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prevItems, { ...product, quantity }]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const clearCart = () => setCartItems([])

    const getTotalItems = () =>
        cartItems.reduce((total, item) => total + item.quantity, 0)

    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    const getCartItem = (productId) =>
        cartItems.find(item => item.id === productId)

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
                getCartItem
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider')
    }
    return context
}
