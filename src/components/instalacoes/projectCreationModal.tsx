import { useState } from "react";
import Button from "../common/Button"

interface ModalProps {
    setOpen: Function;
    setClose: Function;
    onComplete: Function;
}

export default function ProjectCreationModal({ setOpen, setClose, onComplete }: ModalProps){

    const [projectName, setProjectName] = useState("");

    return (
        <div className="fixed inset-0 flex justify-center items-center blur-bg">
        <div className="min-w-[33%] min-h-[20%] bg-slate-200 rounded-md shadow-lg relative">
          <div className="flex p-10">
            <label for="name" className="mr-2">Nome da instalação</label>
            <input className="mr-4 w-full P-2" type="text" name="name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
          </div>
          <div className="absolute bottom-0 w-full flex justify-end items-center">
            <Button name="Cancelar" color="bg-red-600" fontColor="text-slate-100" classComplement="m-2" effect={setClose}/>
            <Button name="Criar instalação" color="bg-green-600" fontColor="text-slate-100" classComplement="m-2" effect={() => {onComplete(projectName)}}/>
          </div>
        </div>
      </div>
    )
}