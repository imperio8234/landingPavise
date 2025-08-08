'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, ArrowUp } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          
          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Be the first to receive updates about new product drops, groundbreaking science, and more.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/pavise" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://facebook.com/pavise" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Shop</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/shop/dynamic-age-defense" className="hover:text-white transition-colors">
                  Dynamic Age Defense
                </Link>
              </li>
              <li>
                <Link href="/shop/bioadaptive-stress-repair" className="hover:text-white transition-colors">
                  Bioadaptive Stress Repair
                </Link>
              </li>
              <li>
                <Link href="/shop/precision-eye-lift" className="hover:text-white transition-colors">
                  Precision Eye Lift
                </Link>
              </li>
              <li>
                <Link href="/shop/gentle-amino-powerwash" className="hover:text-white transition-colors">
                  Gentle Amino Powerwash
                </Link>
              </li>
              <li>
                <Link href="/shop/uv-camera" className="hover:text-white transition-colors">
                  UV Camera
                </Link>
              </li>
            </ul>
          </div>

          {/* About Pavise Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">About Pavise</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Our technology
                </Link>
              </li>
              <li>
                <Link href="/scientific-team" className="hover:text-white transition-colors">
                  Scientific team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Visit our blog: In the Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="hover:text-white transition-colors">
                  Rewards & referrals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="hover:text-white transition-colors">
                  Manage your subscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <Link href="mailto:hello@pavise.com" className="hover:text-white transition-colors">
                  hello@pavise.com
                </Link>
              </div>
              <div>
                <Link href="/partner-inquiries" className="hover:text-white transition-colors underline">
                  Partner inquiries
                </Link>
              </div>
              <div className="text-sm">
                Mon-Fri 10:00am - 6:00pm ET
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-16 mb-12">
          <Link href="/" className="inline-block">
            <div className="text-4xl font-bold tracking-wider">pavise</div>
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 md:mb-0">
            <span>© Pavise 2024</span>
            <span>•</span>
            <Link href="/site-credit" className="hover:text-white transition-colors underline">
              Site Credit
            </Link>
          </div>

          <div className="flex flex-wrap items-center space-x-6 text-sm">
            <Link href="/cookie-settings" className="text-gray-400 hover:text-white transition-colors underline">
              Cookie settings
            </Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors underline">
              Privacy policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors underline">
              Terms & conditions
            </Link>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="ml-8 p-2 border border-gray-600 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}