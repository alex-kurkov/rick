import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const EpisodesPage = () => {
  const { episodes } = useData();
  return <PageList title="EPISODES" list={episodes} />;
};
