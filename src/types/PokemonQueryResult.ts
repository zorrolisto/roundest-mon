import { getAllPokemonsSorted } from "@/controllers/PokemonController";
import { AsyncReturnType } from "./AsyncReturnType";

export type PokemonQueryResult = AsyncReturnType<typeof getAllPokemonsSorted>;