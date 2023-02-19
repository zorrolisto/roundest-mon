import Image from "next/image";
import { getPercentageOfVotesFor } from "@/lib/percentage.helper";
import { PokemonQueryResult } from "@/types/PokemonQueryResult";

export const PokemonVoted = ({
  pokemon,
}: {
  pokemon: PokemonQueryResult[number];
}) => (
  <div className="flex items-center gap-10 justify-between my-[-0.2rem] border-b-2 border-base-content">
    <Image src={pokemon.sprite} width={128} height={128} alt="a-pokemon" />
    <strong className="capitalize">{pokemon.name} </strong>
    <p>
      ({pokemon.votesFor}/{pokemon.votesAgainst + ") "}
      {getPercentageOfVotesFor(pokemon).toFixed(2)}% roundest
    </p>
  </div>
);
