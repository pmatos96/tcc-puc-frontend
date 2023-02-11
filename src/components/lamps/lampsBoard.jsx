
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import LampProjectItemLine from './lampProjectItemLine.jsx';
import BoardHeader from '../common/BoardHeader.jsx';

export default function LampsBoard(props){

    function getNewEquipmentData (){
        return {
            equipmentId: props?.equipmentOptions[0]?.id,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid()
        }
    }

    const [equipmentItems, setEquipmentItems] = useState([
        getNewEquipmentData ()
    ])

    function setNewEmptyEquipment(){
        setEquipmentItems([...equipmentItems, getNewEquipmentData ()])
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
                power: name === 'equipmentId' ? props.equipmentOptions.find(item => item.id === value)?.power : equipmentItem.power,
                [name]: value,
                };
            }
            return equipmentItem;
            })
        );
    }

    return (
        <div className="w-3/5 min-h-max p-2 mt-2 mb-2 bg-slate-300 shadow-md rounded">
            <BoardHeader title="Iluminação" iconName="emoji_objects"/>
            <div>
                {(equipmentItems || []).map(equipmentItem => {
                    return <LampProjectItemLine 
                        onChange={(e) => handleChange(e, equipmentItem.id)} 
                        key={equipmentItem.id} 
                        equipmentItem={equipmentItem} 
                        onRemove={() => handleRemove(equipmentItem.id)}
                        equipmentOptions={props.equipmentOptions}
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
