import { z } from "zod";
import { procedure, router } from "../trpc";
// import { PokemonClient } from "pokenode-ts";
import prisma from "@/server/utils/prisma";

export const appRouter = router({
  ["get-pokemon-by-id"]: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input: { id } }) => {
      //const api = new PokemonClient();
      //const pokemon = await api.getPokemonById(input.id);
      const pokemon = await prisma.pokemon.findFirst({ where: { id } });
      if (!pokemon) throw new Error("Pokemon not found");
      return pokemon;
    }),
  ["cast-vote"]: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.pokemon.update({
        where: { id: input.votedFor },
        data: { votesFor: { increment: 1 } },
      });
      await prisma.pokemon.update({
        where: { id: input.votedAgainst },
        data: { votesAgainst: { increment: 1 } },
      });
      const voteInDB = await prisma.vote.create({
        data: { ...input },
      });
      return { success: true, vote: voteInDB };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
