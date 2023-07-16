
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import LampProjectItemLine from './lampProjectItemLine.jsx';
import BoardHeader from '../common/BoardHeader.jsx';

export default function LampsBoard(props){

    const boardType = 'lamps';

    function getNewEquipmentData (){
        return {
            equipmentId: props?.equipmentOptions[0]?.id,
            amount: 1,
            power: props?.equipmentOptions[0]?.power || "",
            id: uuid()
        }
    }

    function setNewEmptyEquipment(){
        if(!props.isEditing)
            props.setIsEditing(true);
        
        props.updateProjectItems(
            boardType,
            [...props.items[boardType], getNewEquipmentData ()]
        )
    }

    function handleRemove(id) {

        if(!props.isEditing)
            props.setIsEditing(true);

        props.updateProjectItems(
            boardType,
            props.items[boardType].filter(equipmentItem => equipmentItem.id !== id)
        )
    }

    function handleChange({ name, value },  id) {
        if(!props.isEditing)
            props.setIsEditing(true);

        props.updateProjectItems(
            boardType,
            props.items[boardType].map(equipmentItem => {
                if (equipmentItem.id === id) {
                    return {
                    ...equipmentItem,
                    power: name === 'equipmentId' ? props.equipmentOptions.find(item => item.id === value)?.power : equipmentItem.power,
                    [name]: value,
                    };
                }
                return equipmentItem;
                })
        )
    }

    return (
        <div className="w-[95%] min-h-max p-2 mt-2 mb-2 bg-[#DADADA] shadow-md rounded-[21px]">
            <BoardHeader title="Iluminação" iconName="emoji_objects"/>
            <div>
                {(props.items[boardType] || []).map(equipmentItem => {
                    return <LampProjectItemLine 
                        onChange={(e) => handleChange(e, equipmentItem.id)} 
                        key={equipmentItem.id} 
                        equipmentItem={equipmentItem} 
                        onRemove={() => handleRemove(equipmentItem.id)}
                        equipmentOptions={props.equipmentOptions}
                        linesAmount={props.items[boardType]?.length}
                        showErrors={props.showErrors}
                    />
                })}
            </div>
            <button onClick={() => {setNewEmptyEquipment()}}>
                <i className="material-icons-outlined">add_box</i>
            </button>
        </div>
    )
}
