export type pokemonApiResponseType = {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type pokemonItem = {
  name: string;
  moves: { move: { name: string; url: string } }[];
  sprites: { front_default: string };
  species: {
    name: string;
    url: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  types: { slot: number; type: { name: string; url: string } }[];
  weight: number;
};
