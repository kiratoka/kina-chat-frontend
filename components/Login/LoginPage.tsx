"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, User, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LoginFormData {
    username: string;
    password: string;
}


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Basic validation (replace with actual API call)
            if (data.username.length < 3) {
                setError('username', {
                    type: 'manual',
                    message: 'Username harus minimal 3 karakter'
                });
                return;
            }

            if (data.password.length < 6) {
                setError('password', {
                    type: 'manual',
                    message: 'Password harus minimal 6 karakter'
                });
                return;
            }

            console.log('Login data:', data);

        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back to landing */}
                <Link href={"/"}>
                <button
                    className="mb-8 flex justify-center items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 cursor-pointer gap-x-2 hover:underline">
                    <ArrowLeft />
                    <h1>
                        Kembali ke beranda
                    </h1>
                </button>
                </Link>

                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
                        <p className="text-gray-600">Masuk ke akun Kina Chat Anda</p>
                    </div>

                    <div className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username atau Email
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('username', {
                                        required: 'Username atau email harus diisi',
                                        minLength: {
                                            value: 3,
                                            message: 'Username minimal 3 karakter'
                                        }
                                    })}
                                    type="text"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.username ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Masukkan username atau email"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('password', {
                                        required: 'Password harus diisi',
                                        minLength: {
                                            value: 6,
                                            message: 'Password minimal 6 karakter'
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-12 pr-12 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Masukkan password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-2xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                        >
                            {isLoading ? 'Masuk...' : 'Masuk'}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Belum punya akun?{' '}
                            <Link href={"/signup"}
                                className="text-purple-600 hover:text-purple-700 hover:underline cursor-pointer font-medium transition-colors duration-200"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;