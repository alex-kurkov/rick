import { useLoaderData } from 'react-router-dom';
import { PageList } from '../../components/page-list';

export const LocationsPage = () => {
  const data = useLoaderData() as LocationData[];
  return (
    <>
      {data && Array.isArray(data) && (
        <PageList title="LOCATIONS" list={data} />
      )}
    </>
  );
};
