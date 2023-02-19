import PokemonOption from "@/components/PokemonOption";
import { getOptionForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const LoadingPokemon = () => (
  <div className="py-16 my-1 px-6">Loading Pokemon</div>
);
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

  const voteMutation = trpc["cast-vote"].useMutation();

  const voteForRoundest = (selectedPokemonID: number) => {
    voteMutation.mutate({
      votedFor: selectedPokemonID,
      votedAgainst: idsChoosed.filter((id) => id !== selectedPokemonID)[0],
    });
    updateChoosedIds(getOptionForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Click the most roundest pokemon
      </div>
      <div className="rounded p-8 flex justify-between items-center">
        {pokemonsAreLoading && <LoadingPokemon />}
        {!pokemonsAreLoading && (
          <PokemonOption
            pokemon={firstPokemon.data}
            voteForThisPokemon={() => voteForRoundest(firstPokemon.data.id)}
          />
        )}
        <div className="p-6 text-xl">VS</div>
        {pokemonsAreLoading && <LoadingPokemon />}
        {!pokemonsAreLoading && (
          <PokemonOption
            pokemon={secondPokemon.data}
            voteForThisPokemon={() => voteForRoundest(firstPokemon.data.id)}
          />
        )}
      </div>
    </div>
  );
}
