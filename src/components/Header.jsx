import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Button from './Button';
import logo from '../assets/logo.png';

const Header = ({ toggleSidebar, user, onLogout }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header 
            className="bg-white shadow-md border-b-2 sticky top-0 z-50"
            style={{ borderBottomColor: theme.colors.primary }}
        >
            <nav className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo dan Navigation */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link>
                            <img src={logo} className=''/>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex gap-6">
                            <Link 
                                to="/"
                                className={`font-medium transition-colors duration-300 ${
                                    location.pathname === '/' 
                                        ? 'text-purple-600' 
                                        : 'text-gray-700 hover:text-purple-600'
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/packages"
                                className={`font-medium transition-colors duration-300 ${
                                    location.pathname === '/packages' 
                                        ? 'text-purple-600' 
                                        : 'text-gray-700 hover:text-purple-600'
                                }`}
                            >
                                Paket Data
                            </Link>
                            <Link 
                                to="/about"
                                className={`font-medium transition-colors duration-300 ${
                                    location.pathname === '/about' 
                                        ? 'text-purple-600' 
                                        : 'text-gray-700 hover:text-purple-600'
                                }`}
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-700">Halo, {user.name}</span>
                                <Link to="/dashboard">
                                    <Button type="secondary" size="md">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button 
                                    type="primary" 
                                    size="md"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button type="primary" size="md">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button type="secondary" size="md">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                        
                        {/* Mobile menu button */}
                        <button 
                            onClick={toggleSidebar}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;