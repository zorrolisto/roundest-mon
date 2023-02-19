import prisma from "@/server/utils/prisma";

export const getAllPokemonsSorted = async () =>
  await prisma.pokemon.findMany({
    take: 10,
    orderBy: {
      votesFor: "desc",
    },
  });
