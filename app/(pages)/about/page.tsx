import {
  Heart,
  Leaf,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
} from "lucide-react";

export default async function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-emerald-600">Diet Art</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where culinary artistry meets healthy living. We believe that
            nutritious food can be both delicious and beautiful, creating an
            experience that nourishes both body and soul.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded with a passion for healthy living and culinary excellence,
              Diet Art Restaurant began as a dream to transform the way people
              think about healthy dining.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our journey started with a simple belief: that nutritious food
              should never compromise on taste or presentation. Every dish we
              create is a masterpiece of flavor, nutrition, and visual appeal.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we continue to innovate and inspire, serving our community
              with love, creativity, and the finest ingredients nature has to
              offer.
            </p>
          </div>
          <div className="bg-emerald-100 rounded-2xl p-8 text-center">
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Fresh & Organic
            </h3>
            <p className="text-gray-600">
              We source only the freshest, organic ingredients to ensure every
              meal is both nutritious and delicious.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Passion
              </h3>
              <p className="text-gray-600">
                We pour our heart into every dish, creating meals that are made
                with love and care.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect, from ingredients to
                presentation to service.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                We&apos;re committed to building a healthy community through
                nutritious, delicious food.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Diet Art?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Expert Nutritionists
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our team includes certified nutritionists who design
                    balanced, healthy menus.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Fresh Ingredients
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We use only the freshest, locally-sourced ingredients in all
                    our dishes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Customizable Options
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Every dish can be customized to meet your dietary
                    preferences and restrictions.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Beautiful Presentation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Each dish is carefully crafted to be as visually appealing
                    as it is delicious.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Health-Focused
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our menu is designed to support your health and wellness
                    goals.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Warm Atmosphere
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Enjoy your meal in our welcoming, comfortable dining
                    environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Visit Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">
                123 Healthy Street
                <br />
                Wellness City, WC 12345
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon-Fri: 7AM - 10PM
                <br />
                Sat-Sun: 8AM - 11PM
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-600">
                (555) 123-4567
                <br />
                info@dietart.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
