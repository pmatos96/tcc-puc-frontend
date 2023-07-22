
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import EquipmentProjectItemLine from "./equipmentProjectItemLine.jsx";
import BoardHeader from "../common/BoardHeader";

export default function EquipmentsBoard(props){

    const boardType = 'equipments';

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
                    power: Number(name === 'equipmentId' ? props.equipmentOptions.find(item => item.id === value)?.power : equipmentItem.power),
                    [name]: value,
                    };
                }
                return equipmentItem;
            })
        )
    }

    return (
        <div className="relative w-[95%] min-h-max p-2 mt-2 mb-2 bg-[#DADADA] shadow-md rounded-[21px]">
            <BoardHeader title="Aparelhos" iconName="blender"/>
            <div>
                {(props.items[boardType] || []).map(equipmentItem => {
                    return <EquipmentProjectItemLine 
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
            <button className="absolute top-0 right-0 mt-2 mr-2" onClick={() => {setNewEmptyEquipment()}}>
                <i className="material-symbols-sharp">add_circle</i>
            </button>
        </div>
    )
}
