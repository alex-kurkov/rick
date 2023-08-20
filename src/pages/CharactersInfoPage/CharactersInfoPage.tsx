import { useLoaderData, Await } from 'react-router-dom';
import { BackLink } from '../../components/BackLink';
import { Suspense, useState } from 'react';
import { Loader, Box, Title, Text, Flex, Image, Center } from '@mantine/core';

export const CharactersInfoPage = () => {
  const data = useLoaderData() as { character: CharacterData };
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <BackLink title="GO BACK TO CHARACTERS LIST" />
      <Box bg="#1115" p={12}>
        <Flex gap={8}>
          <Suspense
            fallback={
              <Center h="auto" w="100%">
                <Loader color="white" />
              </Center>
            }>
            <Await resolve={data.character} errorElement={'NO DATA FOUND!'}>
              {(character) => {
                const created = new Date(Date.parse(character.created));
                return (
                  <>
                    <Box w={300} h="auto" pb={300} pos="relative">
                      <Center h={300} w={300} pos="absolute" top={0} left={0}>
                        {!loaded && <Loader color="white" />}
                      </Center>
                      <Image
                        pos="absolute"
                        top={0}
                        left={0}
                        maw={300}
                        radius={0}
                        onLoad={() => setLoaded(true)}
                        src={character.image}
                        alt={`avatar of ${character.name}`}
                      />
                    </Box>
                    <Flex direction="column" gap={4}>
                      <Title order={3}>{character.name}</Title>
                      <Text>
                        Status:{' '}
                        <Text span fw="bolder">
                          {character.status || 'Unknown'}
                        </Text>
                      </Text>
                      <Text>
                        Species:{' '}
                        <Text span fw="bolder">
                          {character.species || 'Unknown'}
                        </Text>
                      </Text>
                      <Text>
                        Type:{' '}
                        <Text span fw="bolder">
                          {character.type || 'N/a'}
                        </Text>
                      </Text>
                      <Text>
                        Gender:{' '}
                        <Text span fw="bolder">
                          {character.gender || 'Undefined'}
                        </Text>
                      </Text>
                      <Text>
                        Created:{' '}
                        <Text span fw="bolder">
                          {created.toLocaleDateString()}
                        </Text>
                      </Text>
                    </Flex>
                  </>
                );
              }}
            </Await>
          </Suspense>
        </Flex>
      </Box>
    </>
  );
};
