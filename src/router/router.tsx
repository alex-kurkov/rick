import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { RouterPaths } from './router-paths';
import { NotFoundPage } from '../pages/NotFoundPage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/hocs';
import { DataProvider } from '../context/dataProvider';
import { generateLazyComponent } from '../utils/generateLazyComponent';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route
        element={
          <ProtectedRoute>
            <DataProvider>
              <Outlet />
            </DataProvider>
          </ProtectedRoute>
        }>
        <Route
          path={RouterPaths.MAIN}
          element={generateLazyComponent('MainPage')}
        />
        <Route
          path={RouterPaths.CHARACTERS}
          element={generateLazyComponent('CharactersPage')}
        />
        <Route
          path={RouterPaths.CHARACTERS_INFO}
          element={generateLazyComponent('CharactersInfoPage')}
          lazy={async () => {
            const loader = await import('./route-loaders').then(
              (module) => module.characterInfoLoader
            );
            return { loader };
          }}
        />
        <Route
          path="episodes"
          element={generateLazyComponent('EpisodesPage')}
        />
        <Route
          path={RouterPaths.EPISODES_info}
          element={generateLazyComponent('EpisodesInfoPage')}
          lazy={async () => {
            const loader = await import('./route-loaders').then(
              (module) => module.episodeInfoLoader
            );
            return { loader };
          }}
        />
        <Route
          path={RouterPaths.LOCATIONS}
          element={generateLazyComponent('LocationsPage')}
        />
        <Route
          path={RouterPaths.LOCATIONS_INFO}
          element={generateLazyComponent('LocationsInfoPage')}
          lazy={async () => {
            const loader = await import('./route-loaders').then(
              (module) => module.locationInfoLoader
            );
            return { loader };
          }}
        />
      </Route>
      <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
