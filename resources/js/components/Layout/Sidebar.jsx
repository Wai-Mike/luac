import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar({ user, role, currentPath, onToggle, variant = 'desktop' }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        if (onToggle) onToggle();
    };

    const getRoleRoutes = () => {
        const dashIcon = (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
        );
        const profileIcon = (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        );

        switch (role) {
            case 'admin':
                return [
                    {
                        name: 'Admin',
                        href: '/admin/dashboard',
                        icon: dashIcon,
                        description: 'Admin dashboard',
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                ];
            case 'user':
                return [
                    {
                        name: 'Dashboard',
                        href: '/user/dashboard',
                        icon: dashIcon,
                        description: 'Member home',
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Profile',
                        href: '/user/profile',
                        icon: profileIcon,
                        description: 'Your profile',
                        color: 'text-gray-600',
                        bgColor: 'bg-gray-50',
                    },
                ];
            default:
                return [];
        }
    };

    const roleRoutes = getRoleRoutes();

    const isActive = (href) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const containerClass =
        variant === 'mobile'
            ? `fixed top-0 left-0 z-50 h-screen w-64 border-r border-gray-200/60 bg-gray-800 shadow-xl transition-all duration-300`
            : `fixed top-0 left-0 z-40 h-screen border-r border-gray-200/60 bg-gray-800 shadow-xl transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden lg:block`;

    return (
        <div className={containerClass}>
            {/* Sidebar Toggle Button */}
            <div className="border-b border-gray-200/60 p-4">
                <div className="flex items-center justify-center">
                    <button onClick={handleToggle} className="rounded-lg p-2 transition-all duration-200 hover:bg-white/20 hover:shadow-md">
                        <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 p-4">
                {roleRoutes.map((route) => (
                    <Link
                        key={route.name}
                        href={route.href}
                        className={`group flex items-center space-x-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive(route.href)
                                ? `${route.bgColor} ${route.color} border-l-4 border-l-current shadow-md`
                                : 'text-white hover:bg-white/20 hover:text-white hover:shadow-sm'
                        }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                isActive(route.href) ? route.bgColor : 'bg-gray-700 group-hover:bg-gray-600'
                            }`}
                        >
                            <div className={isActive(route.href) ? route.color : 'text-gray-300 group-hover:text-white'}>{route.icon}</div>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <div className="font- truncate">{route.name}</div>
                            </div>
                        )}
                        {isActive(route.href) && !isCollapsed && <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
