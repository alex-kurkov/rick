import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const CharactersPage = () => {
  const { characters } = useData();
  return <PageList title="CHARACTERS" list={characters} />;
};
