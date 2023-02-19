import { getOptionForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

type Pokemon = {
  sprites: { front_default: string };
  name: string;
};

function PokemonOption({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="w-fit h-fit pb-6 flex flex-col justify-center items-center rounded-lg border-4 border-base-200 hover:bg-base-200 hover:cursor-pointer">
      <Image
        src={String(pokemon.sprites.front_default)}
        width={128}
        height={128}
        alt="a-pokemon"
      />
      <p className="text-xl capitalize mt-[-1.5rem]">{pokemon.name}</p>
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

  console.log("firstPokemon");
  console.log(firstPokemon);
  console.log("secondPokemon ");
  console.log(secondPokemon);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which pokemon is roundest?</div>
      <div className="rounded p-8 flex justify-between items-center">
        <PokemonOption pokemon={firstPokemon.data as Pokemon} />
        <div className="p-8">VS</div>
        <PokemonOption pokemon={secondPokemon.data as Pokemon} />
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
