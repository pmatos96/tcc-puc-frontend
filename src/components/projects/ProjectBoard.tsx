import { MouseEventHandler } from "react";
import BoardHeader from "../common/BoardHeader";
import Button from "../common/Button";

type EffectFunction = MouseEventHandler<HTMLDivElement>
interface ProjectBoardProps {
    name?: string;
    creationDate?: Date;
    newProjectEffect?: EffectFunction;
}

export default function ProjectBoard ({ name, creationDate, newProjectEffect }: ProjectBoardProps) {

    return (
        <div className="flex w-2/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded text-slate-700">
            { name && creationDate ? 
                <>
                    <div className="h-full w-1/2">
                        <BoardHeader title={name} iconName="bolt"/>
                        Criado em: {creationDate.toLocaleDateString(
                            'pt-BR', 
                            { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            }
                        )}
                    </div>
                    <div className="w-1/2 flex flex-col justify-around items-center">
                        <Button name="Editar instalação" iconName="delete"/>
                        <Button name="Excluir instalação" iconName="delete" color="bg-red-500" fontColor="text-slate-100"/>
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