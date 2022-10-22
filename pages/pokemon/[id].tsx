import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { pokemonItem } from "../../types/pokemon";

type pokemonAPIProps = {
  pokemon: pokemonItem;
};

type getServerProps = {
  params: { id: string };
};

export async function getServerSideProps({ params }: getServerProps) {
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    return { props: { pokemon: await resp.json() } };
  } catch (error) {
    return { props: { error: "failed to load" } };
  }
}

const PokemonDetails: NextPage<pokemonAPIProps> = ({
  pokemon,
}: pokemonAPIProps) => {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen py-16">
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div className="flex flex-col md:flex-row border shadow-md rounded-xl p-8 ">
        <div className="flex items-center justify-center min-h-[18rem]">
          <img
            className="w-72 m-8"
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-4xl uppercase font-semibold capitalize-first">
            {pokemon?.name}
          </p>
          <div className="my-2">
            <h4 className="text-xl font-semibold mb-1">Species</h4>
            <p className="text-lg font-normal capitalize-first">
              {pokemon?.species.name}
            </p>
          </div>
          <div className="my-2">
            <h4 className="text-xl font-semibold mb-1">Types</h4>
            <ul className="flex flex-row gap-2">
              {pokemon?.types.map(({ type }, i) => (
                <li
                  key={`type-${i}`}
                  className="p-1.5 rounded-xl bg-slate-300 capitalize-first"
                >
                  {type.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <h4 className="text-xl font-semibold mb-1">Weight</h4>
            <p>{pokemon?.weight} lbs</p>
          </div>
          <div className="my-2">
            <h4 className="text-xl font-semibold mb-1">Stats</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-wrap">
              {pokemon?.stats.map(({ base_stat, stat }, i) => (
                <div
                  key={`stat-${i}`}
                  className="flex flex-col items-center flex-1 bg-slate-300 rounded-lg"
                >
                  <p className="font-semibold capitalize-first">{stat.name}</p>
                  <p>{base_stat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="my-2">
            <h4 className="text-xl font-semibold mb-1">Moves</h4>
            <ul className="flex flex-row gap-2 flex-wrap w-[22rem] sm:w-[28rem]">
              {pokemon?.moves.slice(0, 13).map(({ move }, i) => (
                <li
                  key={`move-${i}`}
                  className="p-1 px-2 rounded-xl bg-slate-300 capitalize-first"
                >
                  {move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
