import { useEffect } from "react";

export default function ProjectItemLine({ equipment, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div>
            <label for="equipmentId">Aparelho:</label>
            <select name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label for="amount">Quantidade:</label>
            <input type="text" name="amount" onChange={handleInputChange} value={equipment.amount}/>
            <label for="power">Potência:</label>
            <input type="text" name="power" onChange={handleInputChange} value={equipment.power}/>
            {linesAmount > 1 && <button onClick={() => onRemove(equipment.id)}>Remover</button>}
        </div>
    )
}