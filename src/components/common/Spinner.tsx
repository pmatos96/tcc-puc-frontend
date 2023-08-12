import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"

type SpinnerProps = {
    loading: boolean
}

function Spinner ({ loading }: SpinnerProps) {

    const [delayMessage, setDelayMessage] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setDelayMessage("O servidor parece estar demorando um pouco a responder. Atualize a página e tente novamente.");
        }, 10*1000)
    }, [])

    return (
        <>
        {loading &&
            <div className="h-screen w-screen fixed inset-0 flex justify-center items-center blur-bg z-50">
                <SyncLoader
                    color="#ede8e8"
                    loading={loading}
                />
                {delayMessage && delayMessage.length && <p>{delayMessage}</p>}
            </div>
        }
        </>
    )
}

export default Spinner;