import Button from "@/src/components/common/Button";
import ProjectCreationModal from "@/src/components/instalacoes/projectCreationModal";
import ProjectBoard from "@/src/components/projects/ProjectBoard"
import API from "@/src/services/api";
import { useRouter } from "next/router";
import { useState } from "react"

export default function Projects({ projects }: any) {

    const router = useRouter();

    const [creationModalOpen, setCreationModalOpen] = useState(false);

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <h1 className="text-black font-bold pb-2">Minhas instalações</h1>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {projects.map(project => {
            return <ProjectBoard name={project.name} creationDate={project.createdAt} id={project.id} key={project.id}/>
        })}
        <ProjectBoard newProjectEffect={() => {setCreationModalOpen(true)}}/>
      </div>
      {creationModalOpen && 
        <ProjectCreationModal 
          setOpen={() => {setCreationModalOpen(true)}} 
          setClose={() => {setCreationModalOpen(false)}}
          onComplete={async (name: string) => {
            let newProject = await API.createProject({ name });
            setCreationModalOpen(false);
            router.push("/instalacoes/[projectId]", '/instalacoes/' + newProject.id);
          }}
        />
      }
    </div>
  )
}

export const getServerSideProps = async () => {

  const projects = await API.getProjects();
  return {
      props:{
        projects: projects
      }
  }
}