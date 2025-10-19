// components/Layout.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, user, onLogout }) => {
    const theme = useTheme();

    return (
        <div 
            className="min-h-screen flex flex-col"
            style={{ 
                backgroundColor: theme.colors.background,
                color: theme.colors.text
            }}
        >
            <Header user={user} onLogout={onLogout} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;