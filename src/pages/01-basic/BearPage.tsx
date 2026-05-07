import { WhiteCard } from '../../components';
import { useBear } from '../../store';

export const BearPage = () => {
  const { blackPandaBears, increaseBlackBears, increasePandaBears, increasePolarBears, pandaBears, polarPandaBears } = useBear((state) => state);

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <ViewBear countPanda={blackPandaBears} increasePanda={increaseBlackBears} typeBear='Osos Negros' />
        <ViewBear countPanda={pandaBears} increasePanda={increasePandaBears} typeBear='Osos Pandas' />
        <ViewBear countPanda={polarPandaBears} increasePanda={increasePolarBears} typeBear='Osos Polares' />
        <AddBear />
      </div>
    </>
  );
};

type _ViewBear = {
  countPanda: number;
  increasePanda: (by: number) => void;
  typeBear: string;
}

const ViewBear = ({ countPanda, increasePanda, typeBear }: _ViewBear) => {

  return (
    <WhiteCard centered>
      <h2>{typeBear}</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePanda(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {countPanda} </span>
        <button onClick={() => increasePanda(-1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

const AddBear = () => {

  const addBear = useBear((state) => state.addBear);
  const clearBears = useBear((state) => state.clearBears);
  const bears = useBear((state) => state.bears);

  return (
    <WhiteCard centered>
      <h2>Agregar oso</h2>
      <div className="flex flex-col gap-2 mt-2">
        <button onClick={addBear}> Agregar oso</button>
        <button onClick={clearBears}>Limpiar osos</button>
      </div>
      <pre className='text-left'>
        {
          JSON.stringify(bears, null, 2)
        }
      </pre>
    </WhiteCard>
  )
}