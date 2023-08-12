import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import BoardHeader from "../common/BoardHeader";
import Button from "../common/Button";
import ProjectDeletionModal from "../instalacoes/ProjectDeletionModal";
import API from "@/src/services/api";
import Spinner from "../common/Spinner";
import Message from "../common/Message";

type EffectFunction = MouseEventHandler<HTMLDivElement>
interface ProjectBoardProps {
    name?: string;
    creationDate?: Date;
    newProjectEffect?: EffectFunction;
    id: string;
}

export default function ProjectBoard ({ name, creationDate, newProjectEffect, id }: ProjectBoardProps) {
    
    type messageDataType = {show: boolean, message: string, type: string};

    const [isInDeletion, setIsInDeletion] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showMessageData, setShowMessageData] = useState<messageDataType>({show: false, message:"", type: "positive"});

    const router = useRouter();

    async function deleteProject(){

        setLoading(true);
        setIsInDeletion(false);
        let messageData: messageDataType | undefined;
        try{
            await API.deleteProject({ id });
            messageData = {show: true, message: "Instalação excluída com sucesso!", type: "positive"};
            router.replace(router.asPath)
        }
        catch(err){
            messageData = {show: true, message: "Erro ao excluir instalação", type: "negative"};
        }
        finally {
            setLoading(false);
            if(messageData){
                setShowMessageData(messageData);
            }
            setTimeout(() => {router.reload()}, 1000);
        }
    }

    return (
        <div className="flex w-[95%] min-h-max p-2 mt-2 mb-2 bg-[#DADADA] shadow-md rounded-[21px] text-black">
            {isInDeletion && 
            <ProjectDeletionModal 
                setOpen={() => {setIsInDeletion(true)}}
                setClose={() => {setIsInDeletion(false)}}
                onComplete={deleteProject}
            />}
            <Spinner loading={loading}/>
            <Message text={showMessageData.message} type={showMessageData.type} show={showMessageData.show} setShow={setShowMessageData}/>
            { name && creationDate ? 
                <>
                    <div className="h-full w-1/2">
                        <BoardHeader title={name} iconName="bolt"/>
                        <p>
                            POTÊNCIA DEMANDADA TOTAL:  XXXX W (XXXX KVA) <br/>

                            DISJUNTOR GERAL: XX A (CURVA C) <br/>

                            CONDUTOR DE ALIMENTAÇÃO: YxYY mm² <br/>

                            CONDUTOR DE ATERRAMENTO: YxYY mm² <br/>

                            ELETRODUTO: DIÂMETRO YY mm (YY POLEGADAS) <br/>

                            QUANTIDADE DE ELETRODOS:  YY POLEGADAS <br/>
                        </p>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <Button name="Editar instalação" iconName="settings" effect={() => {router.push("/instalacoes/[projectId]", '/instalacoes/' + id);}}/>
                        <Button name="Excluir instalação" iconName="delete" color="bg-red-500" fontColor="text-slate-100" effect={() => {setIsInDeletion(true)}}/>
                        <div>
                            <h1 className="text-[22px] mb-2">ORÇAMENTO PRÉVIO</h1>
                            <ul className="list-disc pl-4">
                                <li>FIOS:  R$ XX,XX</li>
                                <li>TOMADAS:  R$ XX,XX</li>
                                <li>LÂMPADAS: R$ XX,XX</li>
                                <li>ELETRODUTOS:  R$ XX,XX</li>
                            </ul>
                            <br/>
                            FIOS:  R$ XX,XX
                            <br/>
                            Criado em: {new Date(creationDate).toLocaleDateString(
                            'pt-BR', 
                            { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            }
                        )}
                        </div>
                    </div>
                </>
                :
                    <div className="w-full flex justify-center items-center cursor-pointer" onClick={newProjectEffect}>
                        <i style={{fontSize: "100px"}} className="ml-2 material-icons-outlined">add_box</i>
                        <h1 className="text-2xl"><b>Nova instalação</b></h1>
                    </div>
            }
        </div>
    )
}