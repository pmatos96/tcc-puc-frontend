
export default function DeleteLineButton({ show, onRemove }){

    return (
        <>
            {show && 
                <button onClick={onRemove}>    
                    <div className="flex items-center">
                        <i className="material-icons-outlined">delete</i>
                    </div>
                </button>
            }
        </>
    )
}
