
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import EquipmentProjectItemLine from "./equipmentProjectItemLine.jsx";

export default function EquipmentsBoard(props){

    const [equipmentItems, setEquipmentItems] = useState([
        {
            equipmentId: null,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid()
        },
    ])

    function setNewEmptyEquipment(){
        setEquipmentItems([...equipmentItems, {
            equipmentId: null,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid()
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
            <h1 className="text-lg font-semibold">Aparelhos</h1>
            <div>
                {(equipmentItems || []).map(equipmentItem => {
                    return <EquipmentProjectItemLine 
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
