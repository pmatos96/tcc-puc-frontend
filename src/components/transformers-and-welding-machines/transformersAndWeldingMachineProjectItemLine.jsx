import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function TransformersAndWeldingMachineProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div className="flex mt-2 mb-2">
            <label className="mr-3" for="equipmentId">Aparelho:</label>
            <select className="mr-4" name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className="mr-4" type="text" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label className="mr-3" for="voltage">Potência:</label>
            <input className="mr-4" type="text" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            <DeleteLineButton show={linesAmount > 1} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}