import { useLoaderData } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import './EpisodesInfoPage.css';

export const EpisodesInfoPage = () => {
  const episode = useLoaderData() as EpisodeData;

  if (!episode)
    return <BackLink title="NOTHING FOUND HERE! GO BACK TO EPISODES LIST" />;

  const created = new Date(Date.parse(episode.created));

  return (
    <>
      <BackLink title="GO BACK TO EPISODES LIST" />
      <div className="episode-info">
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
      </div>
    </>
  );
};
