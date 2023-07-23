import { RouterPaths } from "../router/router-paths";

export interface NavigationRoute {
  to: RouterPaths
  id: string
  name: string
}

export const NAV_ROUTES: NavigationRoute[] = [
  {
    to: RouterPaths.MAIN,
    id: 'erwlfi872jejdcs',
    name: 'main',
  },
  {
    to: RouterPaths.CHARACTERS,
    id: '86wlfijejdcs',
    name: 'characters',
  },
  {
    to: RouterPaths.EPISODES,
    id: 'wlfijwef1ejdcs',
    name: 'episodes',
  },
  {
    to: RouterPaths.LOCATIONS,
    id: 'e4twlfijejdcs',
    name: 'locations',
  },
];
