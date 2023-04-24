
import EquipmentsBoard from "../../components/equipments/equipmentsBoard.jsx";
import LampsBoard from "../../components/lamps/lampsBoard";
import MotorsBoard from "../../components/motors/motorsBoard";
import TransformersAndWeldingMachinesBoard from "../../components/transformers-and-welding-machines/transformersAndWeldingMachinesBoard";
import OutletsBoard from "../../components/outlets/outletsBoard";
import { useRouter } from "next/router.js";
import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import Button from "../../../src/components/common/Button";

export default function Project(props: any) {

  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [projectData, setProjectData] = useState();

  const [itemsBoardComponents, setItemsBoardComponents] = useState([]);
  
  const [projectItems, setProjectItems] = useState({
    "equipments": [],
    "motors": [],
    "lamps": [],
    "transformersAndWeldMachines": [],
    "outlets": []
  });

  const boardRefs = useRef([])

  const addBoardRef = (ref) => {
    boardRefs.current.push(ref);
  };

  const handleButtonClick = () => {
    const boardData = boardRefs.current.map(ref => ref.getChildData());
    console.log(boardData)
    // const flattenedChildData = [].concat(...childData);
    // setParentArray(flattenedChildData);
  };

  async function initializeProjectData(){
    
    const data = await API.getProjectById(projectId);

    setProjectData(data);
  }
  
  function updateProjectItems(identifier: string, childItems: object[]){
    setProjectItems(prevState => {

      return {...prevState, [identifier]: childItems};
    });
  }

  function handleSaveButton() {
    // console.log(itemsBoardComponents)

    boardRefs.current.forEach(boardRef => {
      // board.props.updateProjectItems();
      console.log(boardRef)
    })

  }

  useEffect(() => {
    initializeProjectData();

    let boardComponents = [
      <EquipmentsBoard onMount={addBoardRef} equipmentOptions={props.equipmentOptions} updateProjectItems={updateProjectItems}/>,
      <MotorsBoard onMount={addBoardRef} equipmentOptions={props.motorOptions} updateProjectItems={updateProjectItems}/>,
      <LampsBoard onMount={addBoardRef} equipmentOptions={props.lampOptions} updateProjectItems={updateProjectItems}/>,
      <TransformersAndWeldingMachinesBoard onMount={addBoardRef} equipmentOptions={props.transformerAndWeldingMachinesOptions} updateProjectItems={updateProjectItems}/>,
      <OutletsBoard onMount={addBoardRef} equipmentOptions={props.outletOptions} roomOptions={props.roomOptions} updateProjectItems={updateProjectItems}/>,
    ]

    setItemsBoardComponents(boardComponents);
  }, [])

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <h1 className="text-black font-bold pb-2">Calculadora elétrica</h1>
      <h2>{projectData?.name}</h2>
      <div className="w-full h-full flex flex-col justify-start">
        {itemsBoardComponents}
        <div className="fixed h-full w-[35%] top-0 right-0 border-red-800">
          <Button name="Salvar instalação" classComplement="absolute top-24" effect={() => {handleButtonClick()}}/>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const commomEquipmentTypeId = "cldg31l7i0002j9qsi1l3edig";
  const lampEquipmentTypeId = "cldg31zmv0006j9qsji8aer2x";
  const motorEquipmentTypeId = "cldg31ppp0004j9qsmm0i9oj7"
  const outletEquipmentTypeId = "cle0j3i2c0000j9zobqkc70xg";
  const transformerAndWeldingMachinesTypeId = "cle0jbyve0003j9zo1tryviuk";

  const equipmentsResponse = await fetch('http://localhost:3333/equipments/');
  const equipmentData = await equipmentsResponse.json();

  const roomsResponse = await fetch('http://localhost:3333/rooms/');
  const roomData = await roomsResponse.json();

  return {
      props:{
          equipmentOptions: equipmentData.equipments.filter(equipment => equipment.typeId === commomEquipmentTypeId),
          lampOptions: equipmentData.equipments.filter(equipment => equipment.typeId === lampEquipmentTypeId),
          motorOptions: equipmentData.equipments.filter(equipment => equipment.typeId === motorEquipmentTypeId),
          outletOptions: equipmentData.equipments.filter(equipment => equipment.typeId === outletEquipmentTypeId),
          transformerAndWeldingMachinesOptions: equipmentData.equipments.filter(equipment => equipment.typeId === transformerAndWeldingMachinesTypeId),
          roomOptions: roomData.rooms
      }
  }
}