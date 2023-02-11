
export default function BoardHeader({ iconName, title }){

    return (
        <h1 className="text-2xl font-semibold flex mt-4 mb-6">
            {title} <i style={{fontSize: "30px"}} className="ml-2 material-icons-outlined">{iconName}</i>
        </h1>
    )
}
