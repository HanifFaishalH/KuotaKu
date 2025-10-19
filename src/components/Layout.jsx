import { useTheme } from '../ThemeContext';
import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';

const Layout = ({ children, toggleSidebar, user, onLogout }) => {
    const theme = useTheme();

    return (
        <div 
            className="min-h-screen flex flex-col"
            style={{ 
                backgroundColor: theme.colors.background,
                color: theme.colors.text
            }}
        >
            <Header toggleSidebar={toggleSidebar} user={user} onLogout={onLogout} />
            <HeroSection />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;