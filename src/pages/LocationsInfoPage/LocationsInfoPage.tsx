import { useLoaderData } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import './LocationsInfoPage.css';

export const LocationsInfoPage = () => {
  const location = useLoaderData() as LocationData;

  if (!location)
    return <BackLink title="NOTHING FOUND HERE! GO BACK TO LOCATIONS LIST" />;

  const created = new Date(Date.parse(location.created));

  return (
    <>
      <BackLink title="GO BACK TO LOCATIONS LIST" />
      <div className="location-info">
        <h2 className="location-info__name">{location.name}</h2>
        <p className="location-info__paragraph">
          Dimension:{' '}
          <span className="location-info__card-data">
            {location.dimension || 'Unknown'}
          </span>
        </p>

        <p className="location-info__paragraph">
          Type:{' '}
          <span className="location-info__card-data">
            {location.type}
          </span>
        </p>
        <p className="location-info__paragraph">
          Created:{' '}
          <span className="location-info__card-data">
            {created.toLocaleDateString()}
          </span>
        </p>
      </div>
    </>
  );
};
