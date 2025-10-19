import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import Button from '../Button';

const CTASection = ({ 
    title = "Siap Nikmati Internet Cepat?",
    subtitle = "Bergabung dengan ribuan pelanggan yang sudah merasakan kemudahan berbelanja di Kuotaku",
    primaryButton = { text: "Daftar Sekarang", link: "/register" },
    secondaryButton = { text: "Lihat Paket Data", link: "/packages" },
    background = "primary"
}) => {
    const theme = useTheme();

    return (
        <section 
            className="py-16 px-4 rounded-2xl"
            style={{ backgroundColor: background === 'primary' ? theme.colors.primary : '#f8fafc' }}
        >
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                    background === 'primary' ? 'text-white' : 'text-gray-800'
                }`}>
                    {title}
                </h2>
                <p className={`text-xl mb-8 ${
                    background === 'primary' ? 'text-purple-100' : 'text-gray-600'
                }`}>
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={primaryButton.link}>
                        <Button 
                            type={background === 'primary' ? 'accent' : 'primary'}
                            size="lg" 
                            className={background === 'primary' 
                                ? "bg-white text-purple-600 hover:bg-gray-100" 
                                : ""
                            }
                        >
                            {primaryButton.text}
                        </Button>
                    </Link>
                    {secondaryButton && (
                        <Link to={secondaryButton.link}>
                            <Button 
                                type="secondary"
                                size="lg"
                                className={background === 'primary' 
                                    ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600" 
                                    : ""
                                }
                            >
                                {secondaryButton.text}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CTASection;