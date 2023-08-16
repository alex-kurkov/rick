import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ErrorBoundary } from '../components/hocs';
import './MainLayout.css';

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
          <ErrorBoundary>
              <Outlet />
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
};

export default MainLayout;
