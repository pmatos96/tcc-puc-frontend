
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import MotorProjectItemLine from './motorProjectItemLine.jsx';

export default function MotorsBoard(props){

    const [equipmentItems, setEquipmentItems] = useState([
        {
            equipmentId: null,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid(),
            phasesNumber: 1
        },
    ])

    function setNewEmptyEquipment(){
        setEquipmentItems([...equipmentItems, {
            equipmentId: null,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid(),
            phasesNumber: 1
        }])
    }

    function handleRemove(id) {
        setEquipmentItems(equipmentItems.filter(equipmentItem => equipmentItem.id !== id));
    }

    function handleChange({ name, value },  id) {
        setEquipmentItems(
            equipmentItems.map(equipmentItem => {
            if (equipmentItem.id === id) {
                return {
                ...equipmentItem,
                [name]: value,
                power: name === 'equipmentId' ? props.equipmentOptions.find(item => item.id === value)?.power : equipmentItem.power
                };
            }
            return equipmentItem;
            })
        );
    }

    return (
        <div className="w-3/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded">
            <h1 className="text-lg font-semibold flex">Motores  <i className="ml-2 material-icons-outlined">settings</i></h1>
            <div>
                {(equipmentItems || []).map(equipmentItem => {
                    return <MotorProjectItemLine 
                        onChange={(e) => handleChange(e, equipmentItem.id)} 
                        key={equipmentItem.id} 
                        equipmentItem={equipmentItem} 
                        onRemove={() => handleRemove(equipmentItem.id)}
                        equipmentOptions={props.equipmentOptions}
                        linesAmount={equipmentItems?.length}
                    />
                })}
            </div>
            <button onClick={() => {setNewEmptyEquipment()}}>+</button>
        </div>
    )
}
