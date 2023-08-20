import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Suspense } from 'react';
import { Loader, Box, Title, Text } from '@mantine/core';

export const EpisodesInfoPage = () => {
  const data = useLoaderData() as { episode: EpisodeData };
  return (
    <>
      <BackLink title="GO BACK TO EPISODES LIST" />
      <Box bg="#1115" p={12}>
        <Suspense fallback={<Loader color="white" />}>
          <Await resolve={data.episode} errorElement={'NOTHING FOUND HERE!'}>
            {(episode) => {
              const created = new Date(Date.parse(episode.created));
              return (
                <>
                  <Title order={3}>{episode.name}</Title>
                  <Text>
                    Episode Index:{' '}
                    <Text fw="bolder" span>
                      {episode.episode || 'Unknown'}
                    </Text>
                  </Text>

                  <Text>
                    Air Date:{' '}
                    <Text fw="bolder" span>
                      {episode.air_date}
                    </Text>
                  </Text>
                  <Text>
                    Created:{' '}
                    <Text span fw="bolder">
                      {created.toLocaleDateString()}
                    </Text>
                  </Text>
                </>
              );
            }}
          </Await>
        </Suspense>
      </Box>
    </>
  );
};
