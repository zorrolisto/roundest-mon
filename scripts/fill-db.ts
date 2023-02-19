import prisma from "../src/server/utils/prisma";
import { PokemonClient } from "pokenode-ts";

const doBackFill = async () => {
  const api = new PokemonClient();
  const allPokemon = await api.listPokemons(0, 493);
  const formattedPokemon = allPokemon.results.map((p, idx) => ({
    id: idx + 1,
    name: p.name,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      idx + 1
    }.png`,
    votesFor: 0,
    votesAgainst: 0,
  }));
  await prisma.pokemon.createMany({ data: formattedPokemon });
};

doBackFill();
