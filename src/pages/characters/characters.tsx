import { useLoaderData } from 'react-router-dom';
import { PageList } from '../../components/page-list';

export const CharactersPage = () => {
  const data = useLoaderData() as CharacterData[];
  return (
    <>
      {data && Array.isArray(data) && (
        <PageList title="CHARACTERS" list={data} />
      )}
    </>
  );
};
