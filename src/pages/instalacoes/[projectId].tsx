
import EquipmentsBoard from "../../components/equipments/equipmentsBoard.jsx";
import LampsBoard from "../../components/lamps/lampsBoard";
import MotorsBoard from "../../components/motors/motorsBoard";
import TransformersAndWeldingMachinesBoard from "../../components/transformers-and-welding-machines/transformersAndWeldingMachinesBoard";
import OutletsBoard from "../../components/outlets/outletsBoard";
import { useRouter } from "next/router.js";
import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import Button from "../../../src/components/common/Button";
import Spinner from "../../../src/components/common/Spinner";
import Message from "../../../src/components/common/Message";
import BoardHeader from "@/src/components/common/BoardHeader.jsx";
import Navbar from "@/src/components/common/Navbar.tsx";


export default function Project(props: any) {

  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [projectData, setProjectData] = useState();

  const [itemsBoardComponents, setItemsBoardComponents] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [projectItems, setProjectItems] = useState({
    "equipments": [],
    "motors": [],
    "lamps": [],
    "transformersAndWeldMachines": [],
    "outlets": []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessageData, setShowMessageData] = useState({show: false, message:"", type: "positive"});

  const checkErrorByBoardKey = (key) => {
    const errorConditionsMap = {
      "equipments": !projectItems.equipments.every(item => {
        return (
          item.amount > 0 &&
          item.power > 0
        )
      }),
      "motors": !projectItems.motors.every(item => {
        return (
          item.amount > 0 &&
          item.power > 0
        )
      }),
      "lamps": !projectItems.lamps.every(item => {
        return (
          item.amount > 0 &&
          item.power > 0
        )
      }),
      "transformersAndWeldMachines": !projectItems.transformersAndWeldMachines.every(item => {
        return (
          item.amount > 0 &&
          item.power > 0
        )
      }),
      "outlets": !projectItems.outlets.every(item => {
        return (
          item.amount > 0
        )
      })
    }

    return errorConditionsMap[key]
  }

  async function initializeProjectData(){
    
    const data = await API.getProjectById(projectId);
    setProjectData(data);
  }
  
  async function initializeProjectItems(){

    const items = await API.getProjectItems(projectId);
    console.log(items)
    let projectItemsMap = {};

    Object.keys(projectItems).forEach(boardType => {
      projectItemsMap[boardType] = (items || []).filter(item => item.boardType == boardType);
    })

    setProjectItems(projectItemsMap);
  }

  function updateProjectItems(identifier: string, childItems: object[]){
    setProjectItems(prevState => {

      return {...prevState, [identifier]: childItems};
    });
    setIsEditing(true)
  }

  function projectHasNoErrors(){

    let boardKeysWithItems = Object.keys(projectItems).filter(key => {
      return projectItems[key] && 
        projectItems[key].length > 0
    })
    
    return boardKeysWithItems && 
      boardKeysWithItems.length > 0 && 
      boardKeysWithItems.every(key => {
        console.log(checkErrorByBoardKey(key), key)
        return !checkErrorByBoardKey(key)
      })
  }

  function atLeastOneBoardFilled(){
    return !!Object.keys(projectItems).find(boardKey => {
      return projectItems[boardKey].length > 0;
    })
  }

  async function saveProjectItems() {
    setShowErrors(true)
    if(projectHasNoErrors()){
      setLoading(true);
      let result = await API.createProjectItems({ projectItems, projectId});
      setLoading(false);
      setShowMessageData({
        show: true,
        message: result.error ? "Erro ao salvar a instalação" : "Instalação salva com sucesso!",
        type: result.error ? "negative" : "positive"
      });
      setShowErrors(false)
    }
  }

  function handleSaveButton() {
    setIsSaving(true);
    saveProjectItems();
    setIsSaving(false);
    setIsEditing(false);
  }

  useEffect(() => {

    if(isSaving)
      saveProjectItems();

  }, [isSaving]);

  useEffect(() => {
    initializeProjectData();
    initializeProjectItems();
  }, [])

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <Navbar/>
      <h1 className="text-black text-[22px] font-bold pb-2 ml-[2.5%]">DIMENSIONADOR DE INSTALAÇÃO</h1>
      <h2 className="ml-[2.5%]">{projectData?.name}</h2>
      <div className="w-[95%] ml-[2.5%] min-h-[10px] bg-[#DADADA] rounded-[21px] p-5 mt-4 mb-4">
        Olá! Nesta seção da ferramenta, você deverá informar as informações dos elementos que constituirão a carga elétrica de sua instalação. Você deverá inserir os elementos de iluminação, tomadas, aparelhos elétricos, motores e transfdormadores (caso os possua). Insira também a quantidade, potência e tipo quando necessário. Após inserir todos os dados necessário, o sistema irá mostrar todos os parâmetros da sua instalação. Você pode conferir no rótulo RESULTADOS no final da página.
      </div>
      <Spinner loading={loading}/>
      <Message text={showMessageData.message} type={showMessageData.type} show={showMessageData.show} setShow={setShowMessageData}/>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <EquipmentsBoard showErrors={showErrors} items={projectItems} isEditing={isEditing} setIsEditing={setIsEditing} equipmentOptions={props.equipmentOptions} updateProjectItems={updateProjectItems}/>
        <MotorsBoard showErrors={showErrors} items={projectItems} isEditing={isEditing} setIsEditing={setIsEditing} equipmentOptions={props.motorOptions} updateProjectItems={updateProjectItems}/>
        <LampsBoard showErrors={showErrors} items={projectItems} isEditing={isEditing} setIsEditing={setIsEditing} equipmentOptions={props.lampOptions} updateProjectItems={updateProjectItems}/>
        <TransformersAndWeldingMachinesBoard showErrors={showErrors} isEditing={isEditing} items={projectItems} setIsEditing={setIsEditing} equipmentOptions={props.transformerAndWeldingMachinesOptions} updateProjectItems={updateProjectItems}/>
        <OutletsBoard showErrors={showErrors} items={projectItems} isEditing={isEditing} setIsEditing={setIsEditing} equipmentOptions={props.outletOptions} roomOptions={props.roomOptions} updateProjectItems={updateProjectItems}/>
      </div>
      <div className="w-[95%] ml-[2.5%] min-h-[10px] bg-amber-300 rounded-[21px] p-5 mt-4 mb-4">
        <BoardHeader title="RESULTADOS" iconName="analytics"/>
        <p>
          POTÊNCIA DEMANDADA TOTAL:  0000 W (0000 KVA) <br/>

          DISJUNTOR GERAL: 00 A (CURVA C) <br/>
          
          CONDUTOR DE ALIMENTAÇÃO: 0X00 MM² <br/>

          CONDUTOR DE ATERRAMENTO: 0X00 MM² <br/>

          ELETRODUTO: DIÃMETRO 00 MM (00 POLEGADAS) <br/>

          QUANTIDADE DE ELETRODOS:  00 POLEGADAS <br/>

        </p>
      </div>
      {isEditing && !isSaving && 
        <>
        {isEditing && !atLeastOneBoardFilled() && <p className="text-red-500 block text-center">Não foi possível criar uma instalação sem nenhum dado fornecido. Favor inserir dados completos em ao menos uma das seções acima.</p>}
        <div className="bg-slate-100 relative h-[200px] w-full border-red-800 flex justify-center items-center">
          <Button name="Salvar instalação" classComplement="w-64" effect={() => {handleSaveButton()}}/>
        </div>
        </>
      }
    </div>
  )
}

export const getServerSideProps = async () => {
  const commomEquipmentTypeId = "cldg31l7i0002j9qsi1l3edig";
  const lampEquipmentTypeId = "cldg31zmv0006j9qsji8aer2x";
  const motorEquipmentTypeId = "cldg31ppp0004j9qsmm0i9oj7"
  const outletEquipmentTypeId = "cle0j3i2c0000j9zobqkc70xg";
  const transformerAndWeldingMachinesTypeId = "cle0jbyve0003j9zo1tryviuk";

  const equipmentsResponse = await fetch(process.env.SERVER_URL + 'equipments/');
  const equipmentData = await equipmentsResponse.json();

  const roomsResponse = await fetch(process.env.SERVER_URL + 'rooms/');
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