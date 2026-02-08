import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScoreDisplay } from './ScoreDisplay';
import { Menu, X, LayoutDashboard, Trophy, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
    { path: '/learn', label: 'Learn', icon: MessageSquare },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
            <div className="container-app">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="VeritasLearn Logo" className="h-10 w-auto" />
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            VeritasLearn
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    location.pathname === path
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                                )}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Score Display & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <ScoreDisplay />

                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                    location.pathname === path
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                                )}
                            >
                                <Icon size={20} />
                                {label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
