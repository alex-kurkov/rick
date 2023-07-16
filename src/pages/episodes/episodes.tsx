import { useLoaderData } from 'react-router-dom';
import { PageList } from '../../components/page-list';

export const EpisodesPage = () => {
  const data = useLoaderData() as EpisodeData[];
  return (
    <>
      {data && Array.isArray(data) && <PageList title="EPISODES" list={data} />}
    </>
  );
};
