import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const CharactersPage = () => {
  const { characters, setCharacterPage, loading } = useData();
  return (
    <PageList
      title="CHARACTERS"
      list={characters}
      setPage={setCharacterPage}
      loading={loading}
    />
  );
};
