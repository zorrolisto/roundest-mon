import { PokemonQueryResult } from "@/types/PokemonQueryResult";

export const getPercentageOfVotesFor = ({
  votesFor,
  votesAgainst,
}: PokemonQueryResult[number]) => {
  const totalVotes = votesFor + votesAgainst;
  if (totalVotes === 0) return 0;
  return (votesFor / totalVotes) * 100;
};