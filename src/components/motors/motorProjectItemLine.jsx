import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function OutletProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount }){

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div className="flex mt-2 mb-2">
            <label className="mr-3" for="equipmentId">Modelo:</label>
            <select className="mr-4" name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id} selected={equipmentItem.equipmentId == optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className="mr-4" type="number" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            <label className="mr-3" for="power">Potência (elétrica):</label>
            <input className="mr-3" type="number" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            <label className="mr-3" for="phasesNumber">Tipo:</label>
            <select className="mr-4" name="phasesNumber" id="phasesNumber" onChange={handleInputChange}>
                <option value="1" selected={equipmentItem.phasesNumber == 1}>Monofásico</option>
                <option value="3" selected={equipmentItem.phasesNumber == 3}>Trifásico</option>
            </select>
            <DeleteLineButton show={linesAmount > 0} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}