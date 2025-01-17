import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PopupConfirmation from '../elements/PopupConfirmation';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';

function Sidebar(props) {
  const { role } = props;
  const navigate = useNavigate();
  const [isPopupLogout, setIsPopupLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : '';
  };

  const handleLogoutClick = () => {
    setIsPopupLogout(true);
  };

  const handleConfirm = () => {
    navigate(role === 'admin' ? '/login-admin' : '/');
    role === 'admin' ? CookiesStorage.remove(CookiesKey.TokenAdmin) : CookiesStorage.remove(CookiesKey.AuthToken);
    role === 'admin' && localStorage.removeItem('bookingData');
  };

  const handleCancel = () => {
    setIsPopupLogout(false);
  };

  const links =
    role === 'admin'
      ? [
          { path: '/admin', label: 'Dashboard', icon: 'M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20Z' },
          {
            path: '/admin/testimoni',
            label: 'Testimoni',
            icon: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z',
          },
          {
            path: '/admin/faq',
            label: 'FAQ',
            icon: 'M8 18H18.2372L20 19.3851V9H21C21.5523 9 22 9.44772 22 10V23.5L17.5455 20H9C8.44772 20 8 19.5523 8 19V18ZM5.45455 16L1 19.5V4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V16H5.45455Z',
          },
          {
            path: '/admin/landing-job',
            label: 'Landing a Job',
            icon: 'M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM12.0049 20.0027C16.4232 20.0027 20.0049 16.421 20.0049 12.0027C20.0049 7.58447 16.4232 4.00275 12.0049 4.00275C7.5866 4.00275 4.00488 7.58447 4.00488 12.0027C4.00488 16.421 7.5866 20.0027 12.0049 20.0027ZM8.50488 14.0027H14.0049C14.281 14.0027 14.5049 13.7789 14.5049 13.5027C14.5049 13.2266 14.281 13.0027 14.0049 13.0027H10.0049C8.62417 13.0027 7.50488 11.8835 7.50488 10.5027C7.50488 9.12203 8.62417 8.00275 10.0049 8.00275H11.0049V6.00275H13.0049V8.00275H15.5049V10.0027H10.0049C9.72874 10.0027 9.50488 10.2266 9.50488 10.5027C9.50488 10.7789 9.72874 11.0027 10.0049 11.0027H14.0049C15.3856 11.0027 16.5049 12.122 16.5049 13.5027C16.5049 14.8835 15.3856 16.0027 14.0049 16.0027H13.0049V18.0027H11.0049V16.0027H8.50488V14.0027Z',
          },
          {
            path: '/admin/linkedin-profile',
            label: 'Linkedin Profile',
            icon: 'M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z',
          },
        ]
      : [
          { path: '/user', label: 'Dashboard', icon: 'M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20Z' },
          {
            path: '/user/landing-job',
            label: 'Landing a Job',
            icon: 'M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM12.0049 20.0027C16.4232 20.0027 20.0049 16.421 20.0049 12.0027C20.0049 7.58447 16.4232 4.00275 12.0049 4.00275C7.5866 4.00275 4.00488 7.58447 4.00488 12.0027C4.00488 16.421 7.5866 20.0027 12.0049 20.0027ZM8.50488 14.0027H14.0049C14.281 14.0027 14.5049 13.7789 14.5049 13.5027C14.5049 13.2266 14.281 13.0027 14.0049 13.0027H10.0049C8.62417 13.0027 7.50488 11.8835 7.50488 10.5027C7.50488 9.12203 8.62417 8.00275 10.0049 8.00275H11.0049V6.00275H13.0049V8.00275H15.5049V10.0027H10.0049C9.72874 10.0027 9.50488 10.2266 9.50488 10.5027C9.50488 10.7789 9.72874 11.0027 10.0049 11.0027H14.0049C15.3856 11.0027 16.5049 12.122 16.5049 13.5027C16.5049 14.8835 15.3856 16.0027 14.0049 16.0027H13.0049V18.0027H11.0049V16.0027H8.50488V14.0027Z',
          },
          {
            path: '/user/linkedin-profile',
            label: 'Linkedin Profile',
            icon: 'M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z',
          },
          {
            path: '/user/profession',
            label: 'Professions',
            icon: 'M11 14.0619V20H13V14.0619C16.9463 14.554 20 17.9204 20 22H4C4 17.9204 7.05369 14.554 11 14.0619ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z',
          },
        ];

  return (
    <div>
      {isPopupLogout && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="logout" />}
      <div className="w-full flex flex-row md:flex-col justify-between md:justify-start md:w-80 md:h-screen py-3.5 px-4 md:py-4 md:px-16 md:border-r-2 md:border-gray-200 bg-white md:fixed left-0">
        <div className="mb-0 md:mb-6">
          <Link to={role === 'admin' ? '#' : '/'}>
            <img src="/logo.png" alt="Logo" className="h-11 md:h-12" />
          </Link>
        </div>
        <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {links.map((link) => (
          <div className="md:py-2 hidden md:block" key={link.path}>
            <Link to={link.path} className={`flex space-x-2 ${isActive(link.path)}`}>
              {/* <img src={link.icon} alt={link.label} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-6 ${location.pathname === link.path ? 'text-blue-500' : 'text-gray-500'}`}>
                <path d={link.icon}></path>
              </svg>
              <div>{link.label}</div>
            </Link>
          </div>
        ))}

        <div className="fixed bottom-4 hidden md:block">
          <button className="text-blue-500 flex flex-row space-x-2" onClick={() => handleLogoutClick()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6">
              <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
            </svg>
            <div>Logout</div>
          </button>
        </div>
      </div>

      {/* responsife mobile */}
      {links.map((link) => (
        <div className={`py-1.5 px-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`} key={link.path}>
          <Link to={link.path} className={`flex space-x-2 ${isActive(link.path)}`}>
            {/* <img src={link.icon} alt={link.label} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-6 ${location.pathname === link.path ? 'text-blue-500' : 'text-gray-500'}`}>
              <path d={link.icon}></path>
            </svg>
            <div>{link.label}</div>
          </Link>
        </div>
      ))}

      <button className={` ${isMobileMenuOpen ? 'block' : 'hidden'} py-1 px-4 text-blue-500 flex flex-row space-x-2`} onClick={() => handleLogoutClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6">
          <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
        </svg>
        <div>Logout</div>
      </button>
    </div>
  );
}

export default Sidebar;
