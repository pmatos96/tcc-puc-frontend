import Navbar from "@/src/components/common/Navbar";

export default function About(){

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen w-screen bg-slate-100">
                <h1 className="p-2 text-2xl">AJUDA</h1>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 bg-[#DADADA] shadow-md rounded-[21px]">
                    <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer">person</i>
                    <span className="text-2xl">OLÁ, USUÁRIO</span>
                    <p className="p-2">Está ferramenta foi desenvolvida para facilitar a solicitação do pedido de intação de padrão de entrada para sua instalação elétrica atendida pela concessionária de energia CEMIG. Todos os cálculos feitos pela ferramenta são baseados na norma ND. 1 da Cemig</p>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer">search</i>
                    <div>
                        <p>Para usar a ferramenta basta inserir os dados nos campos em branco e o sistema irá calcular os resultados de sua instalação automaticamente.</p>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">emoji_objects</i>
                    <div>
                        <p>Na seção de ILUMINAÇÃO, insira:</p>
                        <ul className="list-disc pl-4">
                            <li>O tipo da Lâmpada (LED ou fluorescente)</li>
                            <li>A quantidade total de cada tipo</li>
                            <li>A potência da lâmpada em Watts(W)</li>
                        </ul>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">power</i>
                    <div>
                        <p>Na seção de TOMADAS, insira:</p>
                        <ul className="list-disc pl-4">
                            <li>O tipo da Cômodo (Comum ou Serviço). O tipo “Comum”  é representado pelos quartos, salas de estar, escritórios, sala de jantar, enquanto o tipo “Serviço” é representado pelas varandas, cozinhas, lavanderias e garagens</li>
                            <li>A quantidade total tomadas para cada tipo de cômodo</li>
                            <li>A tensão elétrica de funcionamento, geralmente 127V ou 220V</li>
                            <li>A corrente, geralmente 10A ou 20A</li>
                        </ul>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">iron</i>
                    <div>
                        <p>A seção de APARELHOS é destinada para os dados dos aparelhos que serão instalados na casa. Nesse campo,faça:</p>
                        <ul className="list-disc pl-4">
                            <li>Escolha o aparelho</li>
                            <li>Insira a quantidade total do aparelho</li>
                            <li>Insira a potência do aparelho em Watts(W)</li>
                        </ul>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">tools_power_drill</i>
                    <div>
                        <p>A seção de MOTORES é destinada para os dados dos motores que serão instalados na casa:</p>
                        <p>Por exemplo: motores de portão de garagem, bombas de piscina, pressurizadores, bombas para hidromassagem e etc.</p>
                        <p>Nesse campo, insira:</p>
                        <ul className="list-disc pl-4">
                            <li>Insira a potência do aparelho em Watts(W)</li>
                            <li>Insira a quantidade total do motor</li>
                            <li>Escolha o tipo entre monofásico ou trifásico. Considerar motores bifasicos como monofásicos.</li>
                        </ul>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">electric_meter</i>
                    <div>
                        <p>A seção de TRANSFORMADORES é destinada aos aparelhos como máquina de solda e transformadores de maior porte:</p>
                        <p>Nesse campo, insira:</p>
                        <ul className="list-disc pl-4">
                            <li>A potência do aparelho em Watts(W)</li>
                            <li>A quantidade total de aparelhos</li>
                        </ul>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">search</i>
                    <div>
                        <div className="flex"><span className="mr-2">Sempre que desejar adicionar mais itens em qualquer uma das seções, basta clicar no ícone:</span> <i className="material-symbols-sharp">add_circle</i></div>
                        <div className="flex"><span className="mr-2">Sempre que desejar excluir itens em qualquer uma das seções, basta clicar no ícone:</span>  <i className="material-symbols-outlined">delete</i></div>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">search</i>
                    <div>
                        <p>Depois de inserir todos os dados desejados, o sistema irá mostrar os parâmetros de sua instação na seção “RESULTADOS".</p>
                    </div>
                </div>
                <div className="m-2 relative w-[95%] min-h-max p-2 mt-2 mb-2 flex">
                    <i className="material-symbols-outlined text-[40px] mr-2 cursor-pointer">search</i>
                    <div>
                        <div className="flex"><span className="mr-2">Você pode consultar, alterar ou excluir suas instalações na aba “SUAS INSTALAÇÕES”. Para isso Basta clicar no ícone: </span> <i className="material-symbols-sharp">analytics</i></div>
                        <p>Nesta seção além de conferir os principais resultados, você pode conferir uma lista de material previamente montada de acordo com os dados inseridos nas seções acima.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}