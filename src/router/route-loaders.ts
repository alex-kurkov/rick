import { defer } from 'react-router-dom';
import { listsApi } from '../api/listsApi';

export const characterInfoLoader = ({
  params,
}: {
  params: { id?: string };
  }) => {
  const characterPromise = listsApi.getCharacter(params?.id ?? '');
  return defer({ character: characterPromise });
};
export const episodeInfoLoader = async ({
  params,
}: {
  params: { id?: string };
}) => {
  const data = await listsApi.getEpisode(params?.id ?? '');
  return data || null;
};
export const locationInfoLoader = async ({
  params,
}: {
  params: { id?: string };
}) => {
  const data = await listsApi.getLocation(params?.id ?? '');
  return data || null;
};
