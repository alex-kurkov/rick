import axios from 'axios';

interface ListDataResponse<
  T extends CharacterData | EpisodeData | LocationData
> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

class ListsApi {

  protected baseUrl = 'https://rickandmortyapi.com/api';

  protected client = axios.create({
    baseURL: this.baseUrl,
    timeout: 10000,
  });

  protected errorHandler = (e: Error) => {
    console.error(e.message);
  };

  public getCharacters(page: number) {
    return this.client
      .get<ListDataResponse<CharacterData>>('/character', {
        params: { page },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }

  public getCharacter(id: string) {
    return this.client
      .get<CharacterData>(`/character/${id}`)
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }

  public getLocations(page: number) {
    return this.client
      .get<ListDataResponse<LocationData>>('/location', {
        params: { page },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }

  public getLocation(id: string) {
    return this.client
      .get<LocationData>(`/location/${id}`)
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }
  
  public getEpisodes(page: number) {
    return this.client
      .get<ListDataResponse<EpisodeData>>('/episode', {
        params: { page },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }

  public getEpisode(id: string) {
    return this.client
      .get<EpisodeData>(`/episode/${id}`)
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        throw new Error('response ended with no results');
      })
      .catch(this.errorHandler);
  }
}

export const listsApi = new ListsApi();
