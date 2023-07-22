import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import './main-layout.css';

const MainLayout = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Rick and Morty React-router educational app
        </h1>
      </header>
      <main className="main">
        <Navigation />
        <section className="main__center-section">
            <Outlet />
        </section>
      </main>
    </>
  );
};

export default MainLayout;
