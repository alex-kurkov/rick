import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const LocationsPage = () => {
  const { locations } = useData();
  return <PageList title="LOCATIONS" list={locations} />;
};
