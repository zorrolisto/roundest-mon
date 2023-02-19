import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";

export default function PokemonOption({
  pokemon,
  voteForThisPokemon,
}: {
  pokemon: Pokemon;
  voteForThisPokemon: () => void;
}) {
  return (
    <div
      className="w-fit h-fit pb-3 px-3 flex flex-col justify-center items-center rounded-lg border-4 border-base-200 hover:bg-base-200 hover:cursor-pointer"
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
