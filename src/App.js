import './App.css';
import Image from "../src/assets/amjilt.png"
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react"
import axios from "axios"
import { url } from './utils/urls';

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      const authenticate = async () => {
        try {
          const { data } = await axios.get(`${url}/admin/auth`)
          if (data.success) {
            return
          } else {
            navigate("/login")
          }
        } catch (error) {
          if (error) {
            navigate("/login")
          }
        }
      }
      authenticate()
    }
    else {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <div className="w-full h-[900px] flex justify-center items-center" style={{
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    }}>
      <div className='w-96 h-96 rounded-xl border drop-shadow-2xl bg-white p-2'>
        <button onClick={() => navigate("/invoice")} className='w-full rounded-md border drop-shadow-xl p-2 bg-white mt-2'>
          Амжилт веб нэхэмж
        </button>
        {/* <button onClick={() => navigate("/contract")} className='w-full rounded-md border drop-shadow-xl p-2 bg-white mt-2'>
          Амжилт веб гэрээ
        </button> */}
        <button onClick={() => navigate("/payment")} className='w-full rounded-md border drop-shadow-xl p-2 bg-white mt-2'>
          Амжилт веб үнийн санал
        </button>
      </div>

    </div>
  );
}

export default App;
