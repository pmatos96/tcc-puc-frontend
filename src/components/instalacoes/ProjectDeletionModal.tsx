import { useState } from "react";
import Button from "../common/Button"

interface ModalProps {
    setOpen: Function;
    setClose: Function;
    onComplete: Function;
}

export default function ProjectDeletionModal({ setOpen, setClose, onComplete }: ModalProps){

    return (
        <div className="fixed inset-0 flex justify-center items-center blur-bg">
        <div className="min-w-[33%] min-h-[20%] bg-slate-200 rounded-md shadow-lg relative">
          <div className="w-full h-36 p-8 text-lg flex justify-start items-center">
            <p>Tem certeza que deseja excluir esta instalação?</p>
          </div>
          <div className="absolute bottom-0 w-full flex justify-end items-center">
            <Button name="Não" color="bg-red-600" fontColor="text-slate-100" classComplement="m-2" effect={setClose}/>
            <Button name="Sim" color="bg-green-600" fontColor="text-slate-100" classComplement="m-2" effect={() => {onComplete()}}/>
          </div>
        </div>
      </div>
    )
}