import Image from "next/image";

export const LoadingPokemon = () => (
  <div className="py-16 my-1 px-12">
    <Image alt="loading" width={36} height={36} src="loading.svg" />
  </div>
);
