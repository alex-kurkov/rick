declare global {
  export interface LocationData {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
  };
  export interface EpisodeData {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    created: string;
  };
  export interface CharacterData {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: string;
  };
}

export {};
