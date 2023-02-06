
import EquipmentsBoard from "../components/equipments/equipmentsBoard.jsx";
import LampsBoard from "../components/lamps/lampsBoard";
import MotorsBoard from "../components/motors/motorsBoard";
import TransformersAndWeldingMachinesBoard from "../components/transformers-and-welding-machines/transformersAndWeldingMachinesBoard";
import OutletsBoard from "../components/outlets/outletsBoard";

export default function Home(props) {
  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <h1 className="text-black font-bold pb-2">Calculadora elétrica</h1>
      <div className="w-full h-full flex flex-col justify-start">
        <EquipmentsBoard equipmentOptions={props.equipmentOptions}/>
        <MotorsBoard equipmentOptions={props.motorOptions}/>
        <LampsBoard equipmentOptions={props.lampOptions}/>
        <TransformersAndWeldingMachinesBoard equipmentOptions={props.equipmentOptions}/>
        <OutletsBoard roomOptions={props.roomOptions}/>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const commomEquipmentTypeId = "cldg31l7i0002j9qsi1l3edig";
  const lampEquipmentTypeId = "cldg31zmv0006j9qsji8aer2x";
  const motorEquipmentTypeId = "cldg31ppp0004j9qsmm0i9oj7"

  const equipmentsResponse = await fetch('http://localhost:3333/equipments/');
  const equipmentData = await equipmentsResponse.json();

  const roomsResponse = await fetch('http://localhost:3333/rooms/');
  const roomData = await roomsResponse.json();

  return {
      props:{
          equipmentOptions: equipmentData.equipments.filter(equipment => equipment.typeId === commomEquipmentTypeId),
          lampOptions: equipmentData.equipments.filter(equipment => equipment.typeId === lampEquipmentTypeId),
          motorOptions: equipmentData.equipments.filter(equipment => equipment.typeId === motorEquipmentTypeId),
          roomOptions: roomData.rooms
      }
  }
}