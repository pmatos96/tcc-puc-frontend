import { useEffect, useState } from "react";

interface MessageInput {

    text: string;
    type: "positive" | "negative" | "neutral";
    show: boolean;
    setShow: Function;
}

function Message ({ text, type, show, setShow }: MessageInput){
    
    const [isShowing, setIsShowing] = useState(false);

    const hideMessage = () => {
        setIsShowing(false);
    }

    const messageIconByType = {
        "positive": <i className="material-icons-outlined text-green-600 ml-2">check</i>,
        "negative": <i className="material-icons-outlined text-red-600 ml-2">close</i>,
        "neutral": <></>
    }

    useEffect(() => {
        if(show){
            setIsShowing(true);
            setShow(false);
        }
    }, [show])

    useEffect(() => {
        if(isShowing){
            setTimeout(hideMessage, 1.5*1000);
        }
    }, [isShowing])

    return (
        <>
        {isShowing &&
            <div className="h-screen w-screen fixed inset-0 flex justify-center items-center z-50">
                <div className="w-[40%] h-[30%] bg-slate-100 rounded-lg flex items-center justify-center text-2xl p-10 text-slate-800 shadow-2xl">
                    {text}{messageIconByType[type]}
                </div>
                
            </div>
        }
        </>
    )
}

export default Message