import './App.css';
import Image from "../src/assets/amjilt.png"
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
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
        <button onClick={() => navigate("/contract")} className='w-full rounded-md border drop-shadow-xl p-2 bg-white mt-2'>
          Амжилт веб гэрээ
        </button>
      </div>

    </div>
  );
}

export default App;
