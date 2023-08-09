import { useState } from "react";
import Button from "../common/Button"

interface ModalProps {
    setOpen: Function;
    setClose: Function;
    onComplete: Function;
}

export default function ProjectCreationModal({ setOpen, setClose, onComplete }: ModalProps){

    const [projectName, setProjectName] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    function fieldHasError(fieldName: string): boolean{

      const errorConditionsByFieldName: { [key: string]: boolean } = {
        "name": !projectName
      }

      return errorConditionsByFieldName[fieldName]
    }

    function getErrorStyle(){
      return "border border-red-500";
    }

    function verifyAndSetError(fieldName: string){
      return fieldHasError(fieldName) && showErrors ? getErrorStyle() : "";
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center blur-bg">
        <div className="min-w-[33%] min-h-[30%] bg-slate-200 rounded-md shadow-lg relative">
          <div className="flex p-10">
            <label for="name" className="mr-2">Nome da instalação</label>
            <input className={"mr-4 w-full P-2 border " + verifyAndSetError("name")} type="text" name="name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
            {fieldHasError("name") && showErrors && <span className="text-red-500 mt-1">Campo obrigatório!</span>}
          </div>
          <div className="absolute bottom-0 w-full h-20 flex justify-end items-center">
            <Button name="Cancelar" color="bg-red-600" fontColor="text-slate-100" classComplement="m-2 h-8" effect={setClose}/>
            <Button name="Criar instalação" color="bg-green-600" fontColor="text-slate-100" classComplement="m-2 h-8" effect={() => {
              setShowErrors(true);
              if(!fieldHasError("name"))
                onComplete(projectName);
            }}/>
          </div>
        </div>
      </div>
    )
}