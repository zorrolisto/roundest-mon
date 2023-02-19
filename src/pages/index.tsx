import PokemonOption from "@/components/PokemonOption";
import { getOptionForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const [idsChoosed, updateChoosedIds] = useState(() => getOptionForVote());
  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({
    id: idsChoosed[0],
  });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({
    id: idsChoosed[1],
  });

  const pokemonsAreLoading =
    firstPokemon.isLoading ||
    secondPokemon.isLoading ||
    !firstPokemon.data ||
    !secondPokemon.data;

  if (pokemonsAreLoading) return null;

  const voteForRoundest = (selectedPokemonID: number) => {
    // todo: send vote to server
    updateChoosedIds(getOptionForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Click the most roundest pokemon
      </div>
      <div className="rounded p-8 flex justify-between items-center">
        <PokemonOption
          pokemon={firstPokemon.data}
          voteForThisPokemon={() => voteForRoundest(firstPokemon.data.id)}
        />
        <div className="p-6 text-xl">VS</div>
        <PokemonOption
          pokemon={secondPokemon.data}
          voteForThisPokemon={() => voteForRoundest(firstPokemon.data.id)}
        />
      </div>
    </div>
  );
}
