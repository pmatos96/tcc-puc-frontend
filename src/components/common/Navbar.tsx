import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);
    const handleButtonClick = (destinationRoute: string) => {
        router.push('/' + destinationRoute);
    };

    useEffect(() => {
        const isLogged = !!localStorage.getItem('logged');

        setIsLogged(isLogged);
    }, [])

    return (
        <nav className="w-screen h-16 bg-amber-300 p-2 flex items-center justify-between">
            <div className="flex items-center">
                <i className="material-symbols-sharp text-[50px]">flash_on</i>
                ELECTRIC CALCULATOR - HOME EDITION
            </div>
            <div className="flex w-[50%] justify-end pr-10">
                <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer" onClick={() => handleButtonClick('')}>person</i>
                {isLogged && <i className="material-symbols-sharp text-[35px] mr-2 cursor-pointer" onClick={() => handleButtonClick('instalacoes')}>description</i>}
                <i className="material-symbols-sharp text-[40px] mr-2 cursor-pointer" onClick={() => handleButtonClick('ajuda')}>search</i>
            </div>
        </nav>
    )
}