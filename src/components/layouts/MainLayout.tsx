import { Outlet } from 'react-router-dom';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';

/**
 * Layout principal con Navbar y Footer
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
