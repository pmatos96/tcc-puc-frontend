import { useEffect } from "react";
import DeleteLineButton from "../common/DeleteLineButton";

export default function MotorProjectItemLine({ equipmentItem, onRemove, onChange, roomOptions, linesAmount, showErrors }){

    function fieldHasError(fieldName){

        const errorConditionsByFieldName = {
          "amount": !equipmentItem.amount
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
            {console.log(roomOptions)}
            <label className="mr-3" for="roomId">Tipo de cômodo:</label>
            <select className="mr-4" name="roomId" id="roomId" onChange={handleInputChange}>
                {
                    (roomOptions || []).map((optionItem, index) => {
                        return <option value={optionItem.id} selected={equipmentItem.equipmentId == optionItem.id}>{optionItem.name}</option>
                    })
                }
            </select>
            <label className="mr-3" for="amount">Quantidade:</label>
            <input className={"mr-4" + verifyAndSetError("amount")} type="number" name="amount" onChange={handleInputChange} value={equipmentItem.amount}/>
            {fieldHasError("amount") && showErrors && <span className="text-red-500 mt-1">Campo obrigatório!</span>}
            <label className="mr-3" for="voltage">Tensão (V):</label>
            <select className="mr-4" name="voltage" id="voltage" onChange={handleInputChange}>
                <option value="127" selected={equipmentItem.voltage == 127}>127</option>
                <option value="220" selected={equipmentItem.voltage == 220}>220</option>
            </select>
            <label className="mr-3" for="current">Corrente (A):</label>
            <select className="mr-4" name="current" id="current" onChange={handleInputChange}>
                <option value="10" selected={equipmentItem.current == 10}>10</option>
                <option value="20" selected={equipmentItem.current == 20}>20</option>
            </select>
            <DeleteLineButton show={linesAmount > 0} onRemove={() => onRemove(equipmentItem.id)}/>
        </div>
    )
}