import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function LampProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div className="flex mt-2 mb-2">
            <label className="mr-3" for="equipmentId">Tipo:</label>
            <select className="mr-4" name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className="mr-4" type="number" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label className="mr-3" for="power">Potência:</label>
            <input className="mr-4" type="number" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            <DeleteLineButton show={linesAmount > 0} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}