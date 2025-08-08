import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './components/context/productsCardContext'

export const metadata = {
  title: 'Pavise - DiamondCore® Technology',
  description: 'Outsmart skin aging with DiamondCore®. Skin that behaves younger, powered by patented DiamondCore® biotechnology.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}