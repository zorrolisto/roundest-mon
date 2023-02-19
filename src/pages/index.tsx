import { getOptionForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

type Pokemon = {
  id: number;
  sprite: string;
  name: string;
};

function PokemonOption({
  pokemon,
  voteForThisPokemon,
}: {
  pokemon: Pokemon;
  voteForThisPokemon: () => void;
}) {
  return (
    <div
      className="w-fit h-fit pb-3 flex flex-col justify-center items-center rounded-lg border-4 border-base-200 hover:bg-base-200 hover:cursor-pointer"
      onClick={voteForThisPokemon}
    >
      <Image
        src={String(pokemon.sprite)}
        width={128}
        height={128}
        alt="a-pokemon"
      />
      <p className="text-xl capitalize mt-[-1.0rem]">{pokemon.name}</p>
    </div>
  );
}

export default function Home({ ids }: { ids: number[] }) {
  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: ids[0] });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: ids[1] });

  const pokemonsAreLoading =
    firstPokemon.isLoading ||
    secondPokemon.isLoading ||
    !firstPokemon.data ||
    !secondPokemon.data;

  if (pokemonsAreLoading) return null;

  const voteForRoundest = (selectedPokemonID: number) => {
    console.log("selectedPokemonID")
    console.log(selectedPokemonID)
    // todo
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

export async function getServerSideProps() {
  const ids = getOptionForVote();
  return {
    props: { ids }, // will be passed to the page component as props
  };
}
