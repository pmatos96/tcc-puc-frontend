import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function LampProjectItemLine({ equipmentItem, onRemove, onChange, equipmentOptions, linesAmount, showErrors }){

    function fieldHasError(fieldName){

        const errorConditionsByFieldName = {
          "amount": !equipmentItem.amount,
          "power": !equipmentItem.power
        }
  
        return errorConditionsByFieldName[fieldName]
    }

    function getErrorStyle(){
        return "border border-red-500";
    }

    function verifyAndSetError(fieldName){
        return fieldHasError(fieldName) && showErrors ? getErrorStyle() : "";
    }

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: e.target.value });
    }

    return (
        <div className="flex mt-2 mb-2">
            <label className="mr-3" for="equipmentId">Tipo:</label>
            <select className="mr-4" name="equipmentId" id="equipmentId" onChange={handleInputChange}>
                {
                    (equipmentOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id} selected={equipmentItem.equipmentId == optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className={"mr-4" + verifyAndSetError("amount")} type="number" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            {fieldHasError("amount") && showErrors && <span className="text-red-500 mt-1">Campo obrigatório!</span>}
            <label className="mr-3" for="power">Potência:</label>
            <input className={"mr-4" + verifyAndSetError("power")} type="number" name="power" onChange={handleInputChange} value={equipmentItem.power}/>
            {fieldHasError("power") && showErrors && <span className="text-red-500 mt-1">Campo obrigatório!</span>}
            <DeleteLineButton show={linesAmount > 0} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}