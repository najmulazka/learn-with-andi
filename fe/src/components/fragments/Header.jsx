import { useEffect, useState } from 'react';
import Button from '../elements/Button';
// import Nav from '../elements/nav';
import { usera } from '../../services/whoami.service';

function Header() {
  const [profile, setProfile] = useState('');
  const [isLogin, setIslogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usera();
        setProfile(data.profilePicture);
        setIslogin(true);
      } catch (err) {
        console.log(err);
        setIslogin(false);
      }
    };
    fetchData();
  }, []);
  return (
    <header className="sticky top-0 z-10 bg-white py-1 px-4 md:py-2 md:px-20 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between flex-wrap">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
        </a>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6 md:text-base text-xs font-medium w-full md:w-auto`}>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
            <a href="/" className="hover:text-gray-500">
              Beranda
            </a>
            <a href="/#services" className="hover:text-gray-500">
              Services
            </a>
            <a href="/#testimoni" className="hover:text-gray-500">
              Testimoni
            </a>
            <a href="/#about" className="hover:text-gray-500">
              About
            </a>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex space-x-2 items-center">
          {!isLogin ? (
            <>
              <a href="/login">
                <Button variant="white" variantHover="black" textHover="white" textColor="black">
                  Sign In
                </Button>
              </a>
              {/* <a href="/Booking"> */}
              <a href="https://learnwithandi.myr.id/pl/roasting-cv-and-linkedin" target="_blank">
                <Button variant="black" variantHover="white" textHover="black" textColor="white">
                  Book Consultation
                </Button>
              </a>
            </>
          ) : (
            <>
              {/* <a href="/Booking" className="font-semibold flex items-center text-orange-500 hover:text-orange-300 py-1 md:py-2 md:px-4 px-2 text-xs md:text-base"> */}
              <a href="https://learnwithandi.myr.id/pl/roasting-cv-and-linkedin" target="_blank" className="font-semibold flex items-center text-orange-500 hover:text-orange-300 py-1 md:py-2 md:px-4 px-2 text-xs md:text-base">
                Book Consultation
              </a>
              <a href="/user">
                <img src={profile} alt="profile" className="border border-gray-500 md:h-12 md:w-12 h-8 w-8 rounded-full" />
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
