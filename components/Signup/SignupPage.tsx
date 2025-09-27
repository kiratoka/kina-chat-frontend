"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, User, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface SignupFormData {
    nama: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<SignupFormData>();

    const watchPassword = watch('password');

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);

        try {
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validasi konfirmasi password
            if (data.password !== data.confirmPassword) {
                setError('confirmPassword', {
                    type: 'manual',
                    message: 'Password tidak cocok'
                });
                return;
            }

            console.log('Signup data:', {
                nama: data.nama,
                username: data.username,
                // password jangan ditampilin di real app
            });

        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back to landing */}
                <Link href={"/"}>
                    <button
                        className="mb-8 flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 cursor-pointer hover:underline"
                    >
                        ← Kembali ke beranda
                    </button>
                </Link>

                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bergabung dengan Kami</h2>
                        <p className="text-gray-600">Buat akun Kina Chat baru</p>
                    </div>

                    <div className="space-y-6">
                        {/* Nama Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('nama', {
                                        required: 'Nama harus diisi',
                                        minLength: {
                                            value: 3,
                                            message: 'Nama minimal 3 karakter'
                                        }
                                    })}
                                    type="text"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.nama ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>
                            {errors.nama && (
                                <p className="mt-1 text-sm text-red-600">{errors.nama.message}</p>
                            )}
                        </div>

                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('username', {
                                        required: 'Username harus diisi',
                                        minLength: {
                                            value: 3,
                                            message: 'Username minimal 3 karakter'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Username maksimal 20 karakter'
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]+$/,
                                            message: 'Username hanya boleh huruf, angka, dan underscore'
                                        }
                                    })}
                                    type="text"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.username ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Pilih username unik"
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
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'Password harus ada huruf kecil, besar, dan angka'
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-12 pr-12 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Buat password yang kuat"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('confirmPassword', {
                                        required: 'Konfirmasi password harus diisi',
                                        validate: value =>
                                            value === watchPassword || 'Password tidak cocok'
                                    })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`w-full pl-12 pr-12 py-3 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all duration-200 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    placeholder="Ulangi password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-2xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                        >
                            {isLoading ? 'Mendaftar...' : 'Daftar'}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Sudah punya akun?{' '}
                            <Link href={"/login"}>
                                <button
                                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 cursor-pointer hover:underline"
                                >
                                    Masuk di sini
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
