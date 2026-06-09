import React, { useState } from 'react';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import logo from '../assets/Layout/Brand/logo-colored.png';
import flagDE from '../assets/Layout1/Image/flags/DE@2x.png';

const Header = ({ setPage, setSearchQuery, user, onLogout }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
    setPage('listing');
  };

  return (
    <header className="bg-white border-b border-shade-border lg:sticky top-0 z-50 shadow-sm">
      {/* Top Header */}
      <div className="container py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
          <img src={logo} alt="Brand" className="h-[46px]" />
        </div>

        <div className="flex-1 max-w-2xl flex border-2 border-primary rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="flex-1 px-4 py-2 outline-none"
          />
          <div className="flex items-center border-l px-4 py-2 bg-white cursor-pointer hover:bg-gray-50">
            <span className="text-sm">All category</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white px-8 py-2 font-medium transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => user ? onLogout() : setPage('login')} title={user ? 'Click to logout' : 'Click to login'}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">{user ? user.username : 'Login'}</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('message')}>
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">Message</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('orders')}>
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs">Orders</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('cart')}>
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs">My cart</span>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="border-t border-shade-border bg-white overflow-x-auto lg:overflow-visible no-scrollbar">
        <div className="container py-3 flex items-center justify-between whitespace-nowrap gap-4">
          <nav className="flex items-center gap-6 font-medium text-dark">
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('listing')}>
              <Menu className="w-5 h-5" />
              <span>All category</span>
            </div>
            {user && (
              <span className="cursor-pointer text-primary font-semibold hover:underline" onClick={() => setPage('addProduct')}>+ Add Product</span>
            )}
            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); setPage('listing'); }}>Hot offers</a>
            <a href="#" className="hover:text-primary transition-colors">Gift boxes</a>
            <a href="#" className="hover:text-primary transition-colors">Projects</a>
            <a href="#" className="hover:text-primary transition-colors">Menu item</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>Help</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>

          <div className="flex items-center gap-6 font-medium text-dark">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English, PKR</span>
              <ChevronDown className="w-4 h-4 text-secondary" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Ship to</span>
              <img src={flagDE} alt="DE" className="w-5 h-3 rounded-sm shadow-sm" />
              <ChevronDown className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;