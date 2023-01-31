
import EquipmentsBoard from "./home/components/equipmentsBoard.jsx";

export default function Home(props) {
  return (
    <div className="bg-slate-100 w-screen h-screen p-5">
      <h1 className="text-black font-bold pb-2">Calculadora elétrica</h1>
      <EquipmentsBoard equipmentOptions={props.equipmentOptions}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const commomEquipmentTypeId = "cldg31l7i0002j9qsi1l3edig";

  const response = await fetch('http://localhost:3333/equipments/?typeId=' + commomEquipmentTypeId)

  const data = await response.json();
  return {
      props:{
          equipmentOptions: data.equipments
      }
  }
}