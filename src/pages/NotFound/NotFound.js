import React from 'react'
import { useNavigate } from 'react-router-dom'
import Image from "../../assets/amjilt.png"

function NotFound() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate("/")
    }
    return (
        <div className="w-full h-[900px] flex justify-center items-center" style={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
        }}>
            <div className='w-96 h-48 rounded-md border border-black bg-white flex justify-center items-center flex-col'>
                <h1>404</h1>
                <h1>Энэ Хуудас Олдсонгүй</h1>
                <button onClick={() => goBack()}>
                    Нүүр хуудас руу буцах
                </button>

            </div>

        </div>
    )
}

export default NotFound