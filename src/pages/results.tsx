import { PokemonVoted } from "@/components/PokemonVoted";
import { getAllPokemonsSorted } from "@/controllers/PokemonController";
import { getPercentageOfVotesFor } from "@/lib/percentage.helper";
import { PokemonQueryResult } from "@/types/PokemonQueryResult";

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

export async function getStaticProps() {
  const pokemons = await getAllPokemonsSorted();
  return { props: { pokemons }, revalidate: 60 };
}

export default ResultsPage;
