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
    
    const [isInDeletion, setIsInDeletion] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showMessageData, setShowMessageData] = useState({show: false, message:"", type: "positive"});

    const router = useRouter();

    async function deleteProject(){

        setLoading(true);
        setIsInDeletion(false);
        let messageData;
        try{
            await API.deleteProject({ id });
            messageData = {show: true, message: "Instalação excluída com sucesso!", type: "positive"};
        }
        catch(err){
            messageData = {show: true, message: "Erro ao excluir instalação", type: "negative"};
        }
        setLoading(false);
        setShowMessageData(messageData);
        router.reload();
    }

    return (
        <div className="flex w-2/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded text-slate-700">
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
                        Criado em: {new Date(creationDate).toLocaleDateString(
                            'pt-BR', 
                            { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            }
                        )}
                    </div>
                    <div className="w-1/2 flex flex-col justify-around items-center">
                        <Button name="Editar instalação" iconName="delete" effect={() => {router.push("/instalacoes/[projectId]", '/instalacoes/' + id);}}/>
                        <Button name="Excluir instalação" iconName="delete" color="bg-red-500" fontColor="text-slate-100" effect={() => {setIsInDeletion(true)}}/>
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