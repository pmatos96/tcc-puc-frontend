import BoardHeader from "../common/BoardHeader";

interface ProjectBoardProps {
    name: string;
    creationDate: Date;
}

export default function ProjectBoard ({ name, creationDate }: ProjectBoardProps) {

    return (
        <div className="flex w-2/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded">
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
            <div className="w-1/2">

            </div>
            
        </div>
    )
}