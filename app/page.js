import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full bg-emerald-950 flex flex-col justify-center items-center">

      <h1 className="text-3xl text-green-400">API Pix Playground</h1>

      <div className="w-[400px] h-[500px] bg-gray-950 rounded-2xl">
        <div className="ml-10 space-y-10 mt-30">

          <div>
          <p className=" text-gray-400 font-mano text-sm font-bold">Nome pessoa</p>
          <input 
            type="text"
            className=" p-2 rounded-md w-80 h-10 text-black bg-gray-800 placeholder-gray-600"
            placeholder="Seu nome ..."
            />
          </div>

           <div>
          <p className=" text-gray-400 font-mano text-sm font-bold">Valor do Teste (R$)</p>
          <input 
            type="text"
            className=" p-2 rounded-md w-80 h-10 text-black bg-gray-800 placeholder-gray-600"
            placeholder="0,00"
            />
          </div>

           <div>
          <p className=" text-gray-400 font-mano text-sm font-bold">Descrição (Opcional)</p>
          <input 
            type="text"
            className=" p-2 rounded-md w-80 h-10 text-black bg-gray-800 placeholder-gray-600"
            placeholder="Ex: Pagamento Loja Teste"
            />
          </div> 

        </div>

        <div className="ml-10 mt-5">
        <button className="w-80 h-10 rounded-xl bg-green-400">Gerar Qr Code </button>
        </div>

      </div>

    </div>
  );
}
