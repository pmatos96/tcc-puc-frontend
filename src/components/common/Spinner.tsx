import { SyncLoader } from "react-spinners"

type SpinnerProps = {
    loading: boolean
}

function Spinner ({ loading }: SpinnerProps) {

    return (
        <>
        {loading &&
            <div className="h-screen w-screen fixed inset-0 flex justify-center items-center blur-bg">
                <SyncLoader
                    color="#ede8e8"
                    loading={loading}
                />
            </div>
        }
        </>
    )
}

export default Spinner;