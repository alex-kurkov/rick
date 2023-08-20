import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Suspense } from 'react';
import { Loader, Box, Title, Text } from '@mantine/core';

export const LocationsInfoPage = () => {
  const data = useLoaderData() as { location: LocationData };
  return (
    <>
      <BackLink title="GO BACK TO LOCATIONS LIST" />
      <Box bg="#1115" p={12}>
        <Suspense fallback={<Loader color='white'/>}>
          <Await resolve={data.location} errorElement={'NOTHING FOUND HERE!'}>
            {(location) => {
              const created = new Date(Date.parse(location.created));
              return (
                <>
                  <Title order={3}>{location.name}</Title>
                  <Text>
                    Dimension:{' '}
                    <Text fw="bolder" span>
                      {location.dimension || 'Unknown'}
                    </Text>
                  </Text>

                  <Text>
                    Type:{' '}
                    <Text fw="bolder" span>
                      {location.type}
                    </Text>
                  </Text>
                  <Text>
                    Created:{' '}
                    <Text fw="bolder" span>
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
