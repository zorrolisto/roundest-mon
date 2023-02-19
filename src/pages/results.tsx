import prisma from "@/server/utils/prisma";
import { AsyncReturnType } from "@/types/AsyncReturnType";
import Image from "next/image";

type PokemonQueryResult = AsyncReturnType<typeof getAllPokemonsSorted>;
const ResultsPage: React.FC<{
  pokemons: PokemonQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="text-2xl font-semibold text-primary">
        10 Most Roundest Pokemons
      </h2>
      <div className="flex flex-col">
        {props.pokemons
          .sort(
            (a, b) => getPercentageOfVotesFor(b) - getPercentageOfVotesFor(a)
          )
          .map((pokemon, idx) => (
            <PokemonVoted key={idx} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
};

const PokemonVoted = ({ pokemon }: { pokemon: PokemonQueryResult[number] }) => (
  <div className="flex items-center gap-10 justify-between my-[-0.2rem] border-b-2 border-base-content">
    <Image src={pokemon.sprite} width={128} height={128} alt="a-pokemon" />
    <strong className="capitalize">{pokemon.name} </strong>
    <p>
      ({pokemon.votesFor}/{pokemon.votesAgainst + ") "}
      {getPercentageOfVotesFor(pokemon).toFixed(2)}% roundest
    </p>
  </div>
);

const getPercentageOfVotesFor = ({
  votesFor,
  votesAgainst,
}: PokemonQueryResult[number]) => {
  const totalVotes = votesFor + votesAgainst;
  if (totalVotes === 0) return 0;
  return (votesFor / totalVotes) * 100;
};

const getAllPokemonsSorted = async () =>
  await prisma.pokemon.findMany({
    take: 10,
    orderBy: {
      votesFor: "desc",
    },
  });
export async function getStaticProps() {
  const pokemons = await getAllPokemonsSorted();
  return { props: { pokemons }, revalidate: 60 };
}

export default ResultsPage;
