import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";

const PokemonOption: React.FC<{
  pokemon: Pokemon;
  voteForThisPokemon: () => void;
}> = (props) => (
  <div
    className="w-fit h-fit pb-3 px-3 flex flex-col justify-center items-center rounded-lg border-4 border-base-200 hover:bg-base-200 hover:cursor-pointer"
    onClick={props.voteForThisPokemon}
  >
    <Image
      src={String(props.pokemon.sprite)}
      width={128}
      height={128}
      alt="a-pokemon"
    />
    <p className="text-xl capitalize mt-[-1.0rem]">{props.pokemon.name}</p>
  </div>
);

export default PokemonOption;
