import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function MotorProjectItemLine({ equipmentItem, onRemove, onChange, roomOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div className="flex mt-2 mb-2">
            {console.log(roomOptions)}
            <label className="mr-3" for="roomId">Tipo de cômodo:</label>
            <select className="mr-4" name="roomId" id="roomId" onChange={handleInputChange}>
                {
                    (roomOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className="mr-4" type="text" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label className="mr-3" for="voltage">Tensão (V):</label>
            <select className="mr-4" name="voltage" id="voltage">
                <option value="127">127</option>
                <option value="220">220</option>
            </select>
            <label className="mr-3" for="current">Corrente (A):</label>
            <select className="mr-4" name="current" id="current">
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <DeleteLineButton show={linesAmount > 1} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}