import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
          {/* Restaurant Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DA</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Diet Art Restaurant</h3>
              <p className="text-gray-300 text-sm max-w-xs">
                Where healthy eating meets culinary artistry.
              </p>
            </div>
          </div>

                                  {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">123 Healthy Street</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-green-400" />
                  <a 
                    href="tel:+1 (555) 123-4567" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-green-400" />
                  <a 
                    href="mailto:info@dietartrestaurant.com" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    info@dietartrestaurant.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">Mon-Sun: 7AM-10PM</span>
                </div>
              </div>
            </div>

          {/* Quick Links & Contact Info - Horizontal */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a 
                    href="" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    Catering
                  </a>
                </li>
              </ul>
            </div>


          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              © 2024 Diet Art Restaurant. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a 
                href="" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-xs"
              >
                Privacy Policy
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-xs"
              >
                Terms of Service
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-xs"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
