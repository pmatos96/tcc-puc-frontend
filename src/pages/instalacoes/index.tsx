import ProjectBoard from "@/src/components/projects/ProjectBoard"

export default function Projects(props) {

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
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {

//   const equipmentsResponse = await fetch('http://localhost:3333/equipments/');
//   const equipmentData = await equipmentsResponse.json();

//   const roomsResponse = await fetch('http://localhost:3333/rooms/');
//   const roomData = await roomsResponse.json();

  return {
      props:{
    
      }
  }
}