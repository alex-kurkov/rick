import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Suspense } from 'react';
import { Loader } from '../../components/Loader';
import './EpisodesInfoPage.css';

export const EpisodesInfoPage = () => {
  const data = useLoaderData() as { episode: EpisodeData };
  return (
    <>
      <BackLink title="GO BACK TO EPISODES LIST" />
      <div className="episode-info">
        <Suspense fallback={<Loader location='inline'/>}>
          <Await resolve={data.episode} errorElement={'NOTHING FOUND HERE!'}>
            {(episode) => {
              const created = new Date(Date.parse(episode.created));
              return (
                <>
                  <h2 className="episode-info__name">{episode.name}</h2>
                  <p className="episode-info__paragraph">
                    Episode Index:{' '}
                    <span className="episode-info__card-data">
                      {episode.episode || 'Unknown'}
                    </span>
                  </p>

                  <p className="episode-info__paragraph">
                    Air Date:{' '}
                    <span className="episode-info__card-data">
                      {episode.air_date}
                    </span>
                  </p>
                  <p className="episode-info__paragraph">
                    Created:{' '}
                    <span className="episode-info__card-data">
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
