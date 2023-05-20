import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import BoardHeader from "../common/BoardHeader";
import Button from "../common/Button";
import ProjectDeletionModal from "../instalacoes/ProjectDeletionModal";

type EffectFunction = MouseEventHandler<HTMLDivElement>
interface ProjectBoardProps {
    name?: string;
    creationDate?: Date;
    newProjectEffect?: EffectFunction;
    id: string;
}

export default function ProjectBoard ({ name, creationDate, newProjectEffect, id }: ProjectBoardProps) {
    
    const [isInDeletion, setIsInDeletion] = useState(false);

    const router = useRouter();

    function deleteProject(){
        setIsInDeletion(false);
    }

    return (
        <div className="flex w-2/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded text-slate-700">
            {isInDeletion && 
            <ProjectDeletionModal 
                setOpen={() => {setIsInDeletion(true)}}
                setClose={() => {setIsInDeletion(false)}}
                onComplete={deleteProject}
            />}
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