import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const EpisodesPage = () => {
  const { episodes, setEpisodePage, loading } = useData();
  return (
    <PageList
      title="EPISODES"
      list={episodes}
      setPage={setEpisodePage}
      loading={loading}
    />
  );
};
