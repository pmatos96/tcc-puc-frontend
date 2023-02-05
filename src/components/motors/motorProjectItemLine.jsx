import { useEffect } from "react";

export default function MotorProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div>
            <label for="equipmentId">Modelo:</label>
            <select name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label for="amount">Quantidade:</label>
            <input type="text" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label for="power">Potência (elétrica):</label>
            <input type="text" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            <label for="phasesNumber">Tipo:</label>
            <select name="phasesNumber" id="phasesNumber" onChange={handleInputChange}>
                <option value="1">Monofásico</option>
                <option value="3">Trifásico</option>
            </select>
            {linesAmount > 1 && <button onClick={() => onRemove(equipmentItem.id)}>Remover</button>}
        </div>
    )
}