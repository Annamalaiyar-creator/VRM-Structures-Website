import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Info, Hammer, Landmark, Award, Phone, BookOpen, Layers, Briefcase, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';

interface HeaderProps {
  onRequestQuote: () => void;
  onOpenLogin: () => void;
}

export default function Header({ onRequestQuote, onOpenLogin }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePage = (): string => {
    const path = location.pathname;
    if (path === '/') return 'home';
    const segment = path.split('/')[1];
    return segment || 'home';
  };

  const activePage = getActivePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileDownloadsOpen, setMobileDownloadsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesDropdownItems = [
    { label: 'Aluminum MMS', id: '0' },
    { label: 'Hot Dip Galvanized', id: '1' },
    { label: 'FRP Walkway', id: '2' },
    { label: 'FRP Handrails', id: '3' },
    { label: 'Ground Mounted MMS', id: '4' },
    { label: 'Solar BOS Kit', id: '5' }
  ];

  const productsDropdownItems = [
    { label: 'Carport MMS', id: 'pro-carport' },
    { label: 'Customized MMS', id: 'pro-customized' },
    { label: 'Ground Mounted MMS', id: 'pro-ground-mounding' },
    { label: 'RCC Roof MMS', id: 'pro-rcc-roof' },
    { label: 'Solar Pump MMS', id: 'pro-solar-pump' }
  ];

  const downloadsDropdownItems = [
    { label: 'Solar Panels', id: 'solar-panels' },
    { label: 'Inverters', id: 'inverters' },
    { label: 'Brochures', id: 'brochures' }
  ];

  const navItems = [
    { label: 'Home', page: 'home' as const, icon: Sun },
    { label: 'About', page: 'about' as const, icon: Info },
    { label: 'Services', page: 'services' as const, icon: Hammer },
    { label: 'Articles', page: 'articles' as const, icon: BookOpen },
    { label: 'Products', page: 'products' as const, icon: Layers },
    { label: 'Downloads', page: 'downloads' as const, icon: BookOpen },
    { label: 'Contact', page: 'contact' as const, icon: Phone },
    { label: 'Careers', page: 'careers' as const, icon: Briefcase },
  ];

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
        isScrolled 
          ? 'top-4 px-6 md:px-12' 
          : 'top-0 px-0'
      }`}
    >
      <div 
        className={`w-full transition-all duration-500 ease-out relative ${
          isScrolled 
            ? `max-w-6xl bg-slate-950/90 border border-slate-800/80 shadow-2xl shadow-slate-950/60 backdrop-blur-md py-3.5 px-6 md:px-10 ${isOpen ? 'rounded-t-3xl rounded-b-none' : 'rounded-full'}` 
            : 'max-w-7xl bg-transparent border border-transparent py-6 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="flex items-center shrink-0 cursor-pointer focus:outline-none"
          >
            <CompanyLogo className={isScrolled ? "h-10 w-auto hover:scale-105 transition-all duration-305" : "h-14 w-auto hover:scale-105 transition-all duration-305"} variant="light" />
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-0.5 bg-slate-800/40 border-0 rounded-full px-2 backdrop-blur-sm transition-all duration-500 ${
            isScrolled ? 'py-1' : 'py-1.5'
          }`}>
            {navItems.map((item) => {
              const isSelected = activePage === item.page;
              const isDropdown = item.page === 'services' || item.page === 'products' || item.page === 'downloads';
              const dropdownItems = item.page === 'services' 
                ? servicesDropdownItems 
                : item.page === 'products' 
                  ? productsDropdownItems 
                  : downloadsDropdownItems;

              if (isDropdown) {
                return (
                  <div key={item.label} className="relative group py-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/${item.page}`);
                        window.scrollTo(0, 0);
                      }}
                      className={`rounded-full font-semibold transition-all duration-305 ease-out whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-teal-400 text-white font-bold shadow-md shadow-teal-400/10'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      } ${
                        isScrolled ? 'text-[10px] px-3 py-1' : 'text-xs px-4.5 py-1.5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                    {/* Dropdown Menu Overlay */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-60 bg-slate-950/95 border border-slate-800 shadow-2xl rounded-2xl py-2.5 z-[60] backdrop-blur-md opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-305">
                      {dropdownItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (item.page === 'downloads') {
                              navigate(`/#downloads?category=${subItem.id}`);
                            } else {
                              navigate(`/${item.page}?id=${subItem.id}`);
                            }
                            window.scrollTo(0, 0);
                          }}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-teal-300 hover:bg-slate-900/80 transition-colors duration-150"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.page === 'home' ? '/' : `/${item.page}`);
                    window.scrollTo(0, 0);
                  }}
                  className={`rounded-full font-semibold transition-all duration-305 ease-out whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-teal-400 text-white font-bold shadow-md shadow-teal-400/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  } ${
                    isScrolled ? 'text-[10px] px-3.5 py-1' : 'text-xs px-4.5 py-1.5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button 
              onClick={onRequestQuote}
              className={`font-bold text-white hover:text-white bg-slate-900/80 hover:bg-teal-400 border border-teal-400 rounded-full transition-all duration-305 cursor-pointer whitespace-nowrap shadow-md shadow-teal-400/10 ${
                isScrolled ? 'text-[10px] px-3.5 py-1.5' : 'text-xs px-4.5 py-2'
              }`}
              id="header-quote-nav-btn"
            >
              Request a Quote
            </button>
            {!(window as any).VRM_CLIENT_ONLY && (
              <button
                onClick={onOpenLogin}
                className={`text-white rounded-full font-bold tracking-wide shadow-md active:translate-y-px transition-all duration-305 cursor-pointer whitespace-nowrap ${
                  isScrolled 
                    ? 'bg-teal-400 hover:bg-teal-500 text-[10px] px-4 py-1.5 shadow-teal-400/5 hover:shadow-teal-400/10' 
                    : 'bg-teal-400 hover:bg-teal-500 text-xs px-5 py-2 shadow-teal-400/10 hover:shadow-teal-400/20'
                }`}
                id="header-login-btn"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 bg-slate-955 border-x border-b border-slate-800/80 shadow-xl transition-all duration-300 ${isScrolled ? 'rounded-b-3xl' : ''}`}>
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activePage === item.page;
                const isDropdown = item.page === 'services' || item.page === 'products' || item.page === 'downloads';
                const isSubOpen = item.page === 'services' 
                  ? mobileServicesOpen 
                  : item.page === 'products' 
                    ? mobileProductsOpen 
                    : mobileDownloadsOpen;
                const setSubOpen = item.page === 'services' 
                  ? setMobileServicesOpen 
                  : item.page === 'products' 
                    ? setMobileProductsOpen 
                    : setMobileDownloadsOpen;
                const dropdownItems = item.page === 'services' 
                  ? servicesDropdownItems 
                  : item.page === 'products' 
                    ? productsDropdownItems 
                    : downloadsDropdownItems;

                if (isDropdown) {
                  return (
                    <div key={item.label} className="w-full space-y-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSubOpen(!isSubOpen);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-400 text-white font-bold' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-teal-300'}`} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${isSubOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isSubOpen && (
                        <div className="pl-8 pr-4 py-1.5 space-y-1.5 bg-slate-950/40 rounded-xl border border-slate-900">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              navigate(`/${item.page}`);
                              window.scrollTo(0, 0);
                            }}
                            className="w-full text-left py-1.5 text-xs font-bold text-teal-400 hover:text-teal-350"
                          >
                            View All {item.label}
                          </button>
                          {dropdownItems.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                                if (item.page === 'downloads') {
                                  navigate(`/#downloads?category=${subItem.id}`);
                                } else {
                                  navigate(`/${item.page}?id=${subItem.id}`);
                                }
                                window.scrollTo(0, 0);
                              }}
                              className="w-full text-left py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      navigate(item.page === 'home' ? '/' : `/${item.page}`);
                      window.scrollTo(0, 0);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-teal-400 text-white font-bold' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-teal-300'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onRequestQuote();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-500 text-white py-3 rounded-xl text-sm font-bold tracking-wide font-display shadow-lg shadow-teal-400/10 cursor-pointer"
                >
                  Request a Quote
                </button>
                {!(window as any).VRM_CLIENT_ONLY && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full flex items-center justify-center border border-slate-700 hover:bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Portal Login
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/contact');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full flex items-center justify-center border border-slate-800 hover:bg-slate-900/50 text-slate-400 py-2.5 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
