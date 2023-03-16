import Button from "@/src/components/common/Button";
import ProjectBoard from "@/src/components/projects/ProjectBoard"
import { useState } from "react"

export default function Projects() {

    const [creationModalOpen, setCreationModalOpen] = useState(true);

    const projects = [
        {
            name: "Minha casa",
            createdAt: new Date(),
        },
        {
            name: "Casinha do cachorro",
            createdAt: new Date(),
        }
    ]

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <h1 className="text-black font-bold pb-2">Minhas instalações</h1>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {projects.map(project => {
            return <ProjectBoard name={project.name} creationDate={project.createdAt}/>
        })}
        <ProjectBoard newProjectEffect={() => {setCreationModalOpen(true)}}/>
      </div>
      {creationModalOpen && 
      <div className="absolute top-0 w-screen h-screen flex justify-center items-center blur-bg">
        <div className="min-w-[33%] min-h-[20%] bg-slate-200 rounded-md shadow-lg relative">
          <div className="flex p-10">
            <label for="name" className="mr-2">Nome da instalação</label>
            <input className="mr-4 w-full P-2" type="text" name="name"/>
          </div>
          <div className="absolute bottom-0 w-full flex justify-end items-center">
            <Button name="Cancelar" color="bg-red-600" fontColor="text-slate-100" classComplement="m-2" effect={() => {setCreationModalOpen(false)}}/>
            <Button name="Criar instalação" color="bg-green-600" fontColor="text-slate-100" classComplement="m-2"/>
          </div>
        </div>
      </div>}
    </div>
  )
}

export const getServerSideProps = async () => {

  return {
      props:{
    
      }
  }
}