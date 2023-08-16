/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  createContext,
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
  setCharacterPage: Dispatch<SetStateAction<number | null>>;
  setLocationPage: Dispatch<SetStateAction<number | null>>;
  setEpisodePage: Dispatch<SetStateAction<number | null>>;
  loading: boolean;
}

const initData = {
  locations: [],
  episodes: [],
  characters: [],
};

const DataContext = createContext<DataContextInterface>({
  ...initData,
  setCharacterPage: () => {},
  setLocationPage: () => {},
  setEpisodePage: () => {},
  loading: false,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<DataInterface>(initData);
  const [characterPage, setCharacterPage] = useState<number | null>(1);
  const [episodePage, setEpisodePage] = useState<number | null>(1);
  const [locationPage, setLocationPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);

  const setNewData = (
    key: keyof DataInterface,
    data: DataInterface[keyof DataInterface]
  ) => {
    setData((state) => ({
      ...state,
      [key]: getUniqueIdArr([...state[key], ...data]),
    }));
    setLoading(false);
  };

  const loadCharacters = () => {
    if (!characterPage) return;
    setLoading(true);
    listsApi.getCharacters(characterPage).then((resData) => {
      if (!resData) return;
      setNewData('characters', resData.results);
      if (resData.info.pages === characterPage) {
        setCharacterPage(null);
      }
    });
  };

  const loadEpisodes = () => {
    if (!episodePage) return;
    setLoading(true);
    listsApi.getEpisodes(episodePage).then((resData) => {
      if (!resData) return;
      setNewData('episodes', resData.results);
      if (resData.info.pages === episodePage) {
        setEpisodePage(null);
      }
    });
  };

  const loadLocations = () => {
    if (!locationPage) return;
    setLoading(true);
    listsApi.getLocations(locationPage).then((resData) => {
      if (!resData) return;
      setNewData('locations', resData.results);
      if (resData.info.pages === locationPage) {
        setLocationPage(null);
      }
    });
  };

  useEffect(() => {
    if (characterPage === null) return;
    loadCharacters();
  }, [characterPage]);
  
  useEffect(() => {
    if (episodePage === null) return;
    loadLocations();
  }, [locationPage]);
  
  useEffect(() => {
    if (episodePage === null) return;
    loadEpisodes();
  }, [episodePage]);

  return (
    <DataContext.Provider
      value={{ ...data, setCharacterPage, setEpisodePage, setLocationPage, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
