import Button from "@/src/components/common/Button";
import Navbar from "@/src/components/common/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login(){

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState();

    const testUserLogin = "admin";
    const testUserPassword = "admin"
    const router = useRouter();

    const signIn = () => {

        if (login !== testUserLogin) {
            console.log(login)
            setLoginError("Login incorreto!");
            return;
        }

        if (password !== testUserPassword) {
            setLoginError("Senha incorreta!");
            return
        }

        localStorage.setItem('logged', true);
        router.push('/instalacoes')
    }

    useEffect(() => {
        localStorage.removeItem('logged');

    }, [])

    return (
        <div>
            <Navbar/>
            <div className="h-screen-minus-64 w-screen bg-slate-100 flex justify-center items-center">
                <div className="bg-[#DADADA] rounded-[21px] h-[30vh]">
                    <div className="flex justify-start items-end">
                        <i className="material-symbols-sharp text-[40px] ml-10 mr-2">person</i>
                        <span className="">OLÁ, EFETUE SEU LOGIN</span>
                    </div>
                    <div>
                        <div className="w-full pl-10 pt-2">
                            <label className="mr-3" for="login">LOGIN:</label>
                            <input onChange={(e) => setLogin(e.target.value)} value={login} className="rounded-[21px] min-w-[250px]" type="text" name="login"/>
                        </div>
                        <div className="w-full pl-10 pt-2 pr-10">
                            <label className="mr-3" for="password">SENHA:</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-[21px] min-w-[250px]" type="password" name="password"/>
                        </div>
                        {loginError && <div className="pl-10 text-red-500">{loginError}</div>}
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <Button name="ENTRAR" classComplement="w-24 mr-4 rounded-[21px] border-0 inline-block" effect={signIn}/>
                        <Button name="CADASTRAR" color="bg-white" classComplement="w-32 rounded-[21px] border-0 inline-block"/>
                    </div>
                </div>
            </div>
        </div>
    )
}