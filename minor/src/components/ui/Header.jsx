import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import logo from './companylogo.jpg'
const Header = (companyname) => {

 console.log(companyname)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Data Submission Due', message: 'Q4 innovation metrics due in 3 days', time: '2 hours ago', unread: true },
    { id: 2, title: 'Benchmark Report Ready', message: 'Your industry comparison report is available', time: '5 hours ago', unread: true },
    { id: 3, title: 'New Research Published', message: 'AI Innovation Trends 2024 added to repository', time: '1 day ago', unread: false },
  ]);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem('company')
    navigate('/login');
}

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/organization-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Your analytics workspace'
    },
    { 
      label: 'Submit Data', 
      path: '/data-submission', 
      icon: 'Upload',
      description: 'Input innovation metrics'
    },
    { 
      label: 'Analytics', 
      path: '/analytics-visualization', 
      icon: 'BarChart3',
      description: 'Explore data insights'
    },
    { 
      label: 'Knowledge', 
      path: '/knowledge-repository', 
      icon: 'BookOpen',
      description: 'Research & resources'
    },
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveRoute = (path) => {
    if (path === '/organization-dashboard') {
      return location?.pathname === '/organization-dashboard' || location?.pathname === '/researcher-dashboard';
    }
    if (path === '/analytics-visualization') {
      return location?.pathname === '/analytics-visualization' || location?.pathname === '/benchmarking-comparison';
    }
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/organization-dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Innovation Excellence</h1>
              <p className="text-xs text-muted-foreground -mt-1">Analytics Portal</p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted cursor-pointer ${
                        notification?.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{notification?.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                        </div>
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <img src={logo} className='rounded-full'></img>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-foreground">{companyname.companyname}</p>
                <p className="text-xs text-muted-foreground">Innovation Manager</p>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden lg:block" />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-50 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-foreground">{companyname.companyname}</p>
                  <p className="text-sm text-muted-foreground">Innovation Manager</p>
                  <p className="text-xs text-muted-foreground mt-1">TechCorp Industries</p>
                </div>
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/organizationprofile')}  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Building2" size={16} className="mr-2" />
                    Organization
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Preferences
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </Button>
                  <div className="border-t border-border my-2"></div>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-error" onClick={logout}>
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <div>
                  <p className="font-medium">{item?.label}</p>
                  <p className="text-xs opacity-75">{item?.description}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;