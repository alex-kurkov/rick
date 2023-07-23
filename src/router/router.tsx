import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import MainLayout from '../layouts/main-layout';
import { LocationsPage } from '../pages/locations';
import locations from '../data/location.json';
import characters from '../data/characters.json';
import episodes from '../data/episodes.json';
import { EpisodesPage } from '../pages/episodes';
import { CharactersPage } from '../pages/characters';
import { RouterPaths } from './router-paths';
import { MainPage } from '../pages/main';
import { CharactersInfoPage } from '../pages/character-info';
import { EpisodesInfoPage } from '../pages/episode-info';
import { LocationsInfoPage } from '../pages/location-info';
import { NotFoundPage } from '../pages/not-found';
import { LoginPage } from '../pages/login';
import { ProtectedRoute } from '../components/hocs';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<ProtectedRoute><Outlet/></ProtectedRoute>}>
        <Route path={RouterPaths.MAIN} element={<MainPage />} />
        <Route
          path={RouterPaths.CHARACTERS}
          element={<CharactersPage />}
          loader={() => {
            return characters as CharacterData[];
          }}
        />
        <Route
          path={RouterPaths.CHARACTERS_INFO}
          element={<CharactersInfoPage />}
          loader={() => {
            return characters as CharacterData[];
          }}
        />
        <Route
          path="episodes"
          element={<EpisodesPage />}
          loader={() => {
            return episodes as EpisodeData[];
          }}
        />
        <Route
          path={RouterPaths.EPISODES_info}
          element={<EpisodesInfoPage />}
          loader={() => {
            return episodes as EpisodeData[];
          }}
        />
        <Route
          path={RouterPaths.LOCATIONS}
          element={<LocationsPage />}
          loader={() => {
            return locations as LocationData[];
          }}
        />
        <Route
          path={RouterPaths.LOCATIONS_INFO}
          loader={() => {
            return locations as LocationData[];
          }}
          element={<LocationsInfoPage />}
        />
      </Route>
      <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
