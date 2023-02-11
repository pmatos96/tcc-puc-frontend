
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import OutletProjectItemLine from './outletProjectItemLine.jsx';
import BoardHeader from '../common/BoardHeader.jsx';

export default function OutletsBoard(props){

    function getNewEquipmentData (){
        return {
            equipmentId: props.equipmentOptions[0]?.id,
            amount: 1,
            power: 1270,
            id: uuid(),
            phasesNumber: 1,
            roomId: props.roomOptions[0]?.id,
            voltage: 127,
            current: 10
        }
    }

    const [equipmentItems, setEquipmentItems] = useState([
        getNewEquipmentData()
    ])

    function setNewEmptyEquipment(){
        setEquipmentItems([...equipmentItems, getNewEquipmentData()])
    }

    function handleRemove(id) {
        setEquipmentItems(equipmentItems.filter(equipmentItem => equipmentItem.id !== id));
    }

    function handleChange({ name, value },  id) {

        const voltagesByPhasesNumber = {
            127: 1,
            220: 2
        }

        setEquipmentItems(
            equipmentItems.map(equipmentItem => {
            if (equipmentItem.id === id) {
                return {
                    ...equipmentItem,
                    [name]: value,
                    power: name === 'voltage' ? value * equipmentItem.current : (name === 'current' ? value * equipmentItem.voltage : equipmentItem.power),
                    phasesNumber: name === 'voltage' ? voltagesByPhasesNumber[value] || 1 : equipmentItem.phasesNumber
                };
            }
            return equipmentItem;
            })
        );
    }

    return (
        <div className="w-3/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded">
            <BoardHeader title="Tomadas" iconName="electrical_services"/>
            <div>
                {(equipmentItems || []).map(equipmentItem => {
                    return <OutletProjectItemLine 
                        onChange={(e) => handleChange(e, equipmentItem.id)} 
                        key={equipmentItem.id} 
                        equipmentItem={equipmentItem}
                        roomOptions={props.roomOptions}
                        onRemove={() => handleRemove(equipmentItem.id)}
                        linesAmount={equipmentItems?.length}
                    />
                })}
            </div>
            <button onClick={() => {setNewEmptyEquipment()}}>
                <i className="material-icons-outlined">add_box</i>
            </button>
        </div>
    )
}
