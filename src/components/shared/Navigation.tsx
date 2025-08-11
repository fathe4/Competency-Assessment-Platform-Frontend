import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HomeIcon } from "./Icons";

// Types for menu items
interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface UserMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Business Logic - Navigation Items
  const navigationItems: MenuItem[] = useMemo(() => {
    const baseItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        id: "assessment",
        label: "Assessment",
        path: "/assessment-test",
      },
    ];

    // Add admin panel link for admin users
    if (user?.role === "admin") {
      baseItems.push({
        id: "admin",
        label: "Admin Panel",
        path: "/admin",
      });
    }

    return baseItems;
  }, [user?.role]);

  // Business Logic - User Menu Actions
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userMenuItems: UserMenuItem[] = useMemo(
    () => [
      {
        id: "logout",
        label: "Logout",
        icon: (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        ),
        onClick: handleLogout,
        variant: "danger" as const,
      },
    ],
    []
  );

  // Business Logic - Helper Functions
  const isActivePath = (path: string): boolean => location.pathname === path;

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const getUserInitial = (): string => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  // Business Logic - CSS Classes
  const getNavLinkClasses = (path: string): string => {
    const baseClasses =
      "px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300";
    const activeClasses =
      "bg-blue-100 text-blue-600 shadow-sm border border-blue-200";
    const inactiveClasses =
      "text-gray-700 hover:text-blue-600 hover:bg-blue-50";

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`;
  };

  const getMobileNavLinkClasses = (path: string): string => {
    const baseClasses =
      "block px-6 py-3 text-sm font-semibold transition-colors duration-200";
    const activeClasses = "text-blue-600 bg-blue-50";
    const inactiveClasses =
      "text-gray-700 hover:text-blue-600 hover:bg-blue-50";

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`;
  };

  const getUserMenuItemClasses = (variant?: "default" | "danger"): string => {
    const baseClasses =
      "w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center space-x-3";
    const defaultClasses = "text-gray-700 hover:bg-gray-50 hover:text-blue-600";
    const dangerClasses = "text-red-600 hover:bg-red-50";

    return `${baseClasses} ${variant === "danger" ? dangerClasses : defaultClasses}`;
  };

  // Business Logic - Side Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render Components
  const renderLogo = () => (
    <Link
      to={isAuthenticated ? "/dashboard" : "/"}
      className="flex items-center space-x-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
        <HomeIcon className="w-5 h-5 text-white" />
      </div>
      <span className="hidden sm:block tracking-tight">TestSchool</span>
    </Link>
  );

  const renderDesktopNavItems = () => (
    <div className="flex items-center space-x-6">
      {navigationItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={getNavLinkClasses(item.path)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  const renderMobileNavItems = () => (
    <div className="py-2">
      {navigationItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          onClick={closeAllMenus}
          className={getMobileNavLinkClasses(item.path)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  const renderUserInfo = () => (
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="text-sm font-semibold text-gray-900">
        {user?.fullName || "User"}
      </div>
      <div className="text-sm text-gray-500">{user?.email}</div>
    </div>
  );

  const renderUserMenuItems = () => (
    <>
      <div className="py-2">
        {userMenuItems
          .filter((item) => item.variant !== "danger")
          .map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={getUserMenuItemClasses(item.variant)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
      </div>

      <div className="border-t border-gray-200 pt-2">
        {userMenuItems
          .filter((item) => item.variant === "danger")
          .map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={getUserMenuItemClasses(item.variant)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
      </div>
    </>
  );

  const renderUserAvatar = () => (
    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
      <span className="text-white text-sm font-bold">{getUserInitial()}</span>
    </div>
  );

  const renderUserDropdown = () => (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={toggleUserMenu}
        className="flex items-center space-x-3 px-3 py-2 rounded-2xl hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {renderUserAvatar()}
        <div className="hidden lg:block text-left">
          <div className="text-sm font-semibold text-gray-900">
            {user?.fullName || "User"}
          </div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            isUserMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-3xl shadow-xl py-2 z-50">
          {renderUserInfo()}
          {renderUserMenuItems()}
        </div>
      )}
    </div>
  );

  const renderUnauthenticatedMenu = () => (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-blue-50"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
      >
        Register
      </Link>
    </div>
  );

  const renderMobileMenuButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="inline-flex items-center justify-center p-2 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
    >
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );

  const renderMobileUserInfo = () => (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-lg font-bold">
            {getUserInitial()}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {user?.fullName || "User"}
          </div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
      </div>
    </div>
  );

  const renderMobileUserActions = () => (
    <div className=" border-gray-200">
      {userMenuItems
        .filter((item) => item.variant !== "danger")
        .map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-3"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  );

  const renderMobileLogout = () => (
    <div className="border-t border-gray-200 pt-2">
      {userMenuItems
        .filter((item) => item.variant === "danger")
        .map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="absolute top-16 right-4 w-72 bg-white border border-gray-200 rounded-3xl shadow-xl py-4 z-50">
      {isAuthenticated ? (
        <>
          {renderMobileUserInfo()}
          {renderMobileNavItems()}
          {renderMobileUserActions()}
          {renderMobileLogout()}
        </>
      ) : (
        <div className="py-2">
          <Link
            to="/login"
            onClick={closeAllMenus}
            className="block px-6 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={closeAllMenus}
            className="block mx-6 my-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-semibold text-center transition-all duration-300 shadow-lg"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );

  // Main Render
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">{renderLogo()}</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {renderDesktopNavItems()}
                {renderUserDropdown()}
              </>
            ) : (
              renderUnauthenticatedMenu()
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center" ref={menuRef}>
            {renderMobileMenuButton()}
            {isMenuOpen && renderMobileMenu()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
