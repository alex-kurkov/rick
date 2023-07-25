/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { listsApi } from '../api/listsApi';
import { getUniqueIdArr } from '../utils/getUniqueIdArr';

interface DataInterface {
  locations: LocationData[];
  episodes: EpisodeData[];
  characters: CharacterData[];
}

interface DataContextInterface extends DataInterface {
  loadCharacters: () => void;
  loadLocations: () => void;
  loadEpisodes: () => void;
}

const initData = {
  locations: [],
  episodes: [],
  characters: [],
};

const DataContext = createContext<DataContextInterface>({
  ...initData,
  loadCharacters: () => {},
  loadLocations: () => {},
  loadEpisodes: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<DataInterface>(initData);
  const [characterPage, setCharacterPage] = useState<number | null>(1);
  const [episodePage, setEpisodePage] = useState<number | null>(1);
  const [locationPage, setLocationPage] = useState<number | null>(1);

  const setNewData = (
    key: keyof DataInterface,
    data: DataInterface[keyof DataInterface]
  ) => {
    setData((state) => ({
      ...state,
      [key]: getUniqueIdArr([...state[key], ...data]),
    }));
  };

  const loadCharacters = useCallback(() => {
    if (!characterPage) return;
    listsApi.getCharacters(characterPage).then((resData) => {
      if (!resData) return;
      setNewData('characters', resData.results);

      const nextPage =
        resData.info.pages > characterPage ? characterPage + 1 : null;

      setCharacterPage(nextPage);
    });
  }, []);

  const loadEpisodes = useCallback(() => {
    if (!episodePage) return;

    listsApi.getEpisodes(episodePage).then((resData) => {
      if (!resData) return;
      setNewData('episodes', resData.results);

      const nextPage =
        resData.info.pages > episodePage ? episodePage + 1 : null;

      setEpisodePage(nextPage);
    });
  }, []);

  const loadLocations = useCallback(() => {
    if (!locationPage) return;

    listsApi.getLocations(locationPage).then((resData) => {
      if (!resData) return;
      setNewData('locations', resData.results);

      const nextPage =
        resData.info.pages > locationPage ? locationPage + 1 : null;

      setLocationPage(nextPage);
    });
  }, []);

  useEffect(() => {
    loadCharacters();
    loadEpisodes();
    loadLocations();
  }, []);

  return (
    <DataContext.Provider
      value={{ ...data, loadCharacters, loadEpisodes, loadLocations }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
