import { MouseEventHandler } from "react";

type EffectFunction = Function
interface ButtonProps {
    name: string;
    iconName?: string;
    color?: string;
    fontColor?: string;
    classComplement?: string;
    effect?: Function;
}

export default function Button({ name, iconName, color, fontColor, classComplement, effect}: ButtonProps){

    const getClassName = () => {
        return "text-center mb-2 leading-[20px] min-w-50 h-10 p-6 rounded-md flex items-center justify-center cursor-pointer shadow-md " + fontColor + " " + (color || "bg-amber-300") + " " + classComplement;
    }

    return (
        <div className={getClassName()} onClick={effect}>
            {iconName && <i style={{fontSize: "30px"}} className="ml-2 material-icons-outlined mr-2">{iconName}</i>}
            {(name || "Botão").split(" ").map(item => {
                return <>
                    {(item || "").toLocaleUpperCase()} <br/>
                </>
            })}
        </div>
    )
}