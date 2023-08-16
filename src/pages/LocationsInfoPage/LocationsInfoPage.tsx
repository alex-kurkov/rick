import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import './LocationsInfoPage.css';
import { Suspense } from 'react';
import { Loader } from '../../components/Loader';

export const LocationsInfoPage = () => {
  const data = useLoaderData() as { location: LocationData };
  return (
    <>
      <BackLink title="GO BACK TO LOCATIONS LIST" />
      <div className="location-info">
        <Suspense fallback={<Loader location="inline" />}>
          <Await resolve={data.location} errorElement={'NOTHING FOUND HERE!'}>
            {(location) => {
              const created = new Date(Date.parse(location.created));
              return (
                <>
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
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
};
