import { Heart, MessageCircle, Shield, Users } from 'lucide-react';
import Link from 'next/link';



const LandingPage = () => {
  return (
    // LandingPage Component
    <div className="min-h-screen">
      {/* Header */}
      {/* Header Component */}
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Kina Chat
            </span>
          </div>
          <div className="space-x-4">
            <Link href={"/login"}>
              <button
                className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 cursor-pointer"
              >
                Masuk
              </button>
            </Link>
            <Link href={"/signup"}>
              <button

                className="px-6 py-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </header>
      {/* Header Component END */}

      {/* Hero Section */}
      {/* Hero Section Component */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Chat dengan
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Kehangatan
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Aplikasi chat yang dirancang untuk memberikan pengalaman komunikasi yang nyaman,
            aman, dan menenangkan untuk semua pengguna.
          </p>
          <Link href={"/login"}>
            <button
              className="px-8 py-4 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full text-lg font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              Mulai Sekarang
            </button>

          </Link>
        </div>

        {/* Features */}
        {/* Features Component */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {/* Feature Card 1 Component */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Keamanan Terjamin</h3>
            <p className="text-gray-600 leading-relaxed">
              Sistem autentikasi yang aman dengan enkripsi end-to-end untuk melindungi privasi percakapan Anda.
            </p>
          </div>
          {/* Feature Card 1 Component END */}

          {/* Feature Card 2 Component */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Interface Lembut</h3>
            <p className="text-gray-600 leading-relaxed">
              Desain yang menenangkan dengan warna-warna soft yang nyaman di mata dan memberikan perasaan damai.
            </p>
          </div>
          {/* Feature Card 2 Component END */}

          {/* Feature Card 3 Component */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Komunitas Hangat</h3>
            <p className="text-gray-600 leading-relaxed">
              Bergabunglah dengan komunitas yang ramah dan supportif dalam lingkungan yang positif.
            </p>
          </div>
          {/* Feature Card 3 Component END */}
        </div>
        {/* Features Component END */}
      </main>
      {/* Hero Section Component END */}
    </div>
    // LandingPage Component END
  );
};

export default LandingPage;