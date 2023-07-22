import Navbar from "@/src/components/common/Navbar";

export default function About(){

    return (
        <div>
            <Navbar/>
            <div className="h-screen w-screen bg-slate-100">
                <h1 className="p-2 text-2xl">AJUDA</h1>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 bg-[#DADADA] shadow-md rounded-[21px]">
                    <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer">person</i>
                    <span className="text-2xl">OLÁ, USUÁRIO</span>
                    <p className="p-2">Está ferramenta foi desenvolvida para facilitar a solicitação do pedido de intação de padrão de entrada para sua instalação elétrica atendida pela concessionária de energia CEMIG. Todos os cálculos feitos pela ferramenta são baseados na norma ND. 1 da Cemig</p>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer">person</i>
                    <div>
                        <span>wegwegweg</span>
                        <ul className="list-disc pl-4">
                            <li>dd</li>
                            <li>fwqfw</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}