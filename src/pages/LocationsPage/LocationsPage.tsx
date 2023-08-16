import { PageList } from '../../components/PageList';
import { useData } from '../../context/dataProvider';

export const LocationsPage = () => {
  const { locations, setLocationPage, loading } = useData();
  return (
    <PageList title="LOCATIONS" list={locations} setPage={setLocationPage} loading={loading} />
  );
};
