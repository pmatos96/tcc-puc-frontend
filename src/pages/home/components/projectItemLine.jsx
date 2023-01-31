import { useEffect } from "react";

export default function ProjectItemLine({ equipment, onRemove, onChange, equipmentOptions }){

    let equipments = ["a", "b", "c"];

    function handleValueByFieldName({ value, name }){
        const fieldHandlingConfig = {
            'amount': ()=>{return value.replace(/[^\d]/g, '')},
            'power': ()=>{return value.replace(/[^\d,]/g, "")}
        }

        return fieldHandlingConfig[name]();
    }

    function handleInputChange(e) {
        onChange({ name: e.target.name, value: handleValueByFieldName(e.target) });
    }

    function handleEquipmentSelection(e){

        let equipmentSelected = equipmentOptions.find(option => option.id === e.target.value)

        onChange({ name: 'power', value: equipmentSelected.power});
    }

    return (
        <div>
            <label for="equipments">Aparelho:</label>
            <select name="equipments" id="equipments" onChange={(e) => handleEquipmentSelection(e)}>
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
            <button onClick={() => onRemove(equipment.id)}>Remover</button>
        </div>
    )
}