import { useEffect } from "react";

export default function OutletProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div>
            <label className="mr-3" for="equipmentId">Modelo:</label>
            <select className="mr-4" name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className="mr-4" type="text" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label className="mr-3" for="power">Potência (elétrica):</label>
            <input className="mr-3" type="text" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            <label className="mr-3" for="phasesNumber">Tipo:</label>
            <select className="mr-4" name="phasesNumber" id="phasesNumber" onChange={handleInputChange}>
                <option value="1">Monofásico</option>
                <option value="3">Trifásico</option>
            </select>
            {linesAmount > 1 && <button onClick={() => onRemove(equipmentItem.id)}>Remover</button>}
        </div>
    )
}