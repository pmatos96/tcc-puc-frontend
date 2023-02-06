import { useEffect } from "react";

export default function MotorProjectItemLine({ equipmentItem, onRemove, onChange, roomOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div>
            {console.log(roomOptions)}
            <label for="roomId">Tipo de cômodo:</label>
            <select name="roomId" id="roomId" onChange={handleInputChange}>
                {
                    (roomOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label for="amount">Quantidade:</label>
            <input type="text" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label for="voltage">Tensão (V):</label>
            <select name="voltage" id="voltage">
                <option value="127">127</option>
                <option value="220">220</option>
            </select>
            <label for="current">Corrente (A):</label>
            <select name="current" id="current">
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            {linesAmount > 1 && <button onClick={() => onRemove(equipmentItem.id)}>Remover</button>}
        </div>
    )
}