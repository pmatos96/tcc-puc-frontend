
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import OutletProjectItemLine from './outletProjectItemLine.jsx';

export default function OutletsBoard(props){

    const [equipmentItems, setEquipmentItems] = useState([
        {
            equipmentId: null,
            amount: 1,
            power: 1270,
            id: uuid(),
            phasesNumber: 1,
            roomId: null,
            voltage: 127,
            current: 10
        },
    ])

    function setNewEmptyEquipment(){
        setEquipmentItems([...equipmentItems, {
            equipmentId: null,
            amount: 1,
            power: 1270,
            id: uuid(),
            phasesNumber: 1,
            roomId: null,
            voltage: 127,
            current: 10
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
                power: equipmentItem.voltage * equipmentItem.current
                };
            }
            return equipmentItem;
            })
        );
    }

    return (
        <div className="w-3/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded">
            <h1 className="text-lg font-semibold flex">Tomadas <i className="ml-2 material-icons-outlined">electrical_services</i></h1>
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
            <button onClick={() => {setNewEmptyEquipment()}}>+</button>
        </div>
    )
}
