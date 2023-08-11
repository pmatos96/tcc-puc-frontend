import Button from "@/src/components/common/Button";
import Navbar from "@/src/components/common/Navbar";
import Spinner from "@/src/components/common/Spinner";
import ProjectCreationModal from "@/src/components/instalacoes/projectCreationModal";
import ProjectBoard from "@/src/components/projects/ProjectBoard"
import API from "@/src/services/api";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react"

export default function Projects({ projects }: any) {

    const router = useRouter();

    const [creationModalOpen, setCreationModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem('logged');

    if(!isLogged) {
      router.replace('/')
    }
  }, [router])

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <Navbar/>
      <h1 className="text-black font-bold text-[24px] pb-2 pt-2 ml-[2.5%]">SUAS INSTALAÇÕES:</h1>
      <Spinner loading={loading}/>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {projects.sort((a: {createdAt: Date}, b: {createdAt: Date}) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((project: { name: string | undefined; createdAt: Date | undefined; id: string; }) => {
            return <ProjectBoard name={project.name} creationDate={project.createdAt} id={project.id} key={project.id}/>
        })}
        <ProjectBoard newProjectEffect={() => { setCreationModalOpen(true); } } id={""}/>
      </div>
      {creationModalOpen && 
        <ProjectCreationModal 
          setOpen={() => {setCreationModalOpen(true)}} 
          setClose={() => {setCreationModalOpen(false)}}
          onComplete={async (name: string) => {
            setLoading(true);
            let newProject = await API.createProject({ name });
            console.log(newProject)
            setLoading(false);
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