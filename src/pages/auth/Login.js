
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import axios from "axios"
import { url } from '../../utils/urls';
import Image from "../../assets/amjilt.png"
import Swal from 'sweetalert2'


function Login() {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            authenticate()
        }
        else {
            navigate("/login");
        }
    }, [navigate, refresh]);

    const authenticate = async () => {
        const { data } = await axios.get(`${url}/admin/auth`)
        if (data.success) {
            navigate("/")
        } else {
            navigate("/login")
        }
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("email", email)
        formdata.append("password", password)

        const { data } = await axios.post(`${url}/admin/login`, formdata)
        if (!data.success) {
            Swal.fire({
                icon: "error",
                title: data.result
            })
        }
        if (data.success) {
            setRefresh(old => old + 1)
            localStorage.setItem("token", data.token)
            window.location.reload()
            navigate("/")
            Swal.fire({
                icon: "success",
                title: "Logged In"
            })
        }
    }

    return (
        <div className="w-full h-[900px] flex justify-center items-center" style={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
        }}>
            <div className='w-96 h-48 rounded-md bg-white drop-shadow-2xl flex flex-col justify-center items-center p-4'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type={"email"} className='border w-5/6 p-2 rounded-md mt-2' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type={"password"} className='border w-5/6 p-2 rounded-md mt-2' />
                <button onClick={(e) => login(e)} className='border w-5/6 p-2 rounded-md mt-2'>
                    Login
                </button>
            </div>

        </div>
    )
}

export default Login