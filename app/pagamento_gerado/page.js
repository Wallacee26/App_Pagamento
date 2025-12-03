import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiPrinter } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

export default function Home() {
  return (
    <div className="w-full h-full bg-emerald-950 flex flex-col justify-center items-center">
      <h1 className="text-3xl text-green-400">API Pix Playground</h1>

      <div className="w-[800px] h-[700px] bg-gray-950 rounded-2xl flex flex-col justify-start items-center space-y-5 mb-5">
        <div className=" w-[800px] h-[150px] bg-green-950/90   rounded-t-2xl flex flex-col justify-center items-center">
          <IoMdCheckmarkCircleOutline
            size={32}
            className="bg-green-500 text-green-200 p-1 rounded-4xl"
          />
          <h1 className="text-green-800 font-bold text-2xl">
            {" "}
            Pagamento Gerado
          </h1>
          <p className="text-green-600">Aguardando confirmação</p>
        </div>

        <div className="w-[700px] h-[250px] border border-gray-300 flex justify-center items-center  ">
          oi
        </div>

        <div className="w-[700px] h-20 border border-gray-300  flex justify-center items-center  ">
          oi
        </div>

        <button className="w-[700px] h-10 border border-green-400 text-green-400  flex justify-center items-center  ">
          Copiar codigo PIX
        </button>

        <div className="w-[500px] h-20  flex flex-col  justify-center items-start ml-10  p-10 ">
          <div className="flex justify-between w-96">
            <h1 className="flex justify-between">Valor</h1>

            <h1>R$</h1>
          </div>

          <div className="flex justify-between w-96">
            <h1 className="flex justify-between">Dev-aluno</h1>

            <h1>Cosme</h1>
          </div>

          <div className="flex justify-between w-96">
            <h1 className="flex justify-between">Id</h1>

            <h1>219031</h1>
          </div>

        </div>


          <div className="flex space-x-5  mb-5 ">
             <button className="w-[200px] h-10  text-green-400  flex justify-center items-center  ">
              <TfiReload className="mr-2"/>
          Novo
        </button>

         <button className="w-[200px] h-10 border border-green-400 text-green-400  flex justify-center items-center   ">
          <FiPrinter  className="mr-2" />
          Imprimir
        </button>

            
          </div>
      </div>
    </div>
  );
}
