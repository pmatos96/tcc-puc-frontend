
interface ButtonProps {
    name: string;
    iconName: string;
    color?: string;
}

export default function Button({ name, iconName, color}: ButtonProps){

    const getClassName = () => {
        return "w-40 h-10 rounded-md flex items-center justify-center border-solid border-2 border-slate-400 cursor-pointer" + " " + (color || "bg-amber-300");
    }

    return (
        <div className={getClassName()}>
            {name || "Botão"}
            <i style={{fontSize: "30px"}} className="ml-2 material-icons-outlined">{iconName}</i>
        </div>
    )
}