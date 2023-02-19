import { z } from "zod";
import { procedure, router } from "../trpc";
import { PokemonClient } from "pokenode-ts";

export const appRouter = router({
  ["get-pokemon-by-id"]: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: String(pokemon.sprites.front_default),
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
