import { getOptionForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";

export default function Home({ options }: { options: Array<Number> }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which pokemon is roundest?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center">
        <div className="w-16 h-16 bg-red-800">{String(options[0])}</div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-blue-800">{String(options[1])}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const [first, second] = getOptionForVote();
  return {
    props: { options: [first, second] }, // will be passed to the page component as props
  };
}
