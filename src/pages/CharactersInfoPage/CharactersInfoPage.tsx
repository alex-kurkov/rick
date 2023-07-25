import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Suspense } from 'react';
import { Loader } from '../../components/Loader';
import './CharactersInfoPage.css';

export const CharactersInfoPage = () => {
  const data = useLoaderData() as { character: CharacterData };
  
  return (
    <>
      <BackLink title="GO BACK TO CHARACTERS LIST" />
      <Suspense fallback={<Loader location="inline" />}>
        <Await resolve={data.character} errorElement={'NO DATA FOUND!'}>
          {(character) => {
            const created = new Date(Date.parse(character.created));
            return (
              <div className="character-info">
                <div className="character-info__card">
                  <img
                    src={character.image}
                    alt={`avatar of ${character.name}`}
                    className="character-info__image"
                  />
                  <div className="character-info__data-wrap">
                    <h2 className="character-info__name">{character.name}</h2>
                    <p className="character-info__paragraph">
                      Status:{' '}
                      <span className="character-info__card-data">
                        {character.status || 'Unknown'}
                      </span>
                    </p>
                    <p className="character-info__paragraph">
                      Species:{' '}
                      <span className="character-info__card-data">
                        {character.species || 'Unknown'}
                      </span>
                    </p>
                    <p className="character-info__paragraph">
                      Type:{' '}
                      <span className="character-info__card-data">
                        {character.type || 'N/a'}
                      </span>
                    </p>
                    <p className="character-info__paragraph">
                      Gender:{' '}
                      <span className="character-info__card-data">
                        {character.gender || 'Undefined'}
                      </span>
                    </p>
                    <p className="character-info__paragraph">
                      Created:{' '}
                      <span className="character-info__card-data">
                        {created.toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};
