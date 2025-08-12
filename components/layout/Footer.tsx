"use client"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/zona-clic-admin.firebasestorage.app/o/AC%20TIEMPO%20LIBRE.png?alt=media&token=be7e985b-1cae-4848-bfe4-95c328b4f069"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold">Alejandro Caraballo</span>
            </div>
            <p className="text-gray-300 text-sm">
              Más de 20 años de experiencia en equipos de caza y pesca. Tu aventura comienza aquí.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/comunidad" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Comunidad
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda?categoria=rifles" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Rifles de Caza
                </Link>
              </li>
              <li>
                <Link href="/tienda?categoria=pesca" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Equipos de Pesca
                </Link>
              </li>
              <li>
                <Link href="/tienda?categoria=optica" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Óptica y Miras
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda?categoria=accesorios"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300 text-sm">+34 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300 text-sm">info@alejandrocaraballo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300 text-sm">Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Alejandro Caraballo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}