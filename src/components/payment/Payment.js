import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import { IoIosRemove, IoMdDownload } from "react-icons/io";
import logo from "../../assets/logo.jpg";
import tamga from "../../assets/Tamga/эйтай (1).png";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/urls";
import axios from "axios";
import { IoRemove } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { auth } from "../../App";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

function Payment() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (user) {
      // const authenticate = async () => {
      //   const { data } = await axios.get(`${url}/admin/auth`);
      //   if (data.success) {
      //     return;
      //   } else {
      //     navigate("/login");
      //   }
      // };
      // authenticate();
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  const [List, setList] = useState([]);

  const [typeName, setTypeName] = useState("Танилцуулга сайт");
  const [tool, setTool] = useState("Wordpress");
  const [Price, setPrice] = useState(2000000);
  const [time, setTime] = useState("Ажлын 10 хоног");
  const [explenation, setExplenation] = useState([
    {
      name: "Өгөгдсөн хар зургийн дагуу вэб сайтын дизайныг зурна",
    },
    {
      name: "Мэдээний модуль",
    },
    {
      name: "Слайд удирдах модуль",
    },
    {
      name: "Цэс удирдах модуль",
    },
    {
      name: "Вэбийн үг солих модуль",
    },
    {
      name: "Админ удирдлага",
    },
    {
      name: "Слайд зурагны модуль",
    },
    {
      name: "Цэс удирдах модуль",
    },
    {
      name: "Хуудас удирдах модуль",
    },
    {
      name: "Үг солих модуль",
    },
    {
      name: "1 жилийн баталгаат хугацаа",
    },
    {
      name: "Гар утас, таблет гэх мэт бүх төрлийн төхөөрөмжүүд дээр таарч ажиллах",
    },
    {
      name: "Сургалт зөвлөгөө үйлчилгээ",
    },
  ]);
  const [jobType, setJobtype] = useState("Танилцуулга сайт");
  const [payment, setPayment] = useState(
    "Урьдчилгаа 50% + Хүлээлгэн өгсний дараа 50%"
  );
  const [option, setOption] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [explenationName, setExplenationName] = useState("");
  const [cacheItem, setCacheItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dragId, setDragId] = useState();

  const addToExplenation = () => {
    let obj = {
      name: explenationName,
    };
    setExplenation([...explenation, obj]);
    setExplenationName("");
  };
  const removeExplanetion = (typeName) => {
    let filteredArray = explenation?.filter((item) => item !== typeName);
    setExplenation(filteredArray);
  };

  const addtypeNameToList = () => {
    let obj = {
      typeName: typeName,
      tool: tool,
      Price: Price,
      discount: discount,
      explenation: explenation,
    };
    setList([...List, obj]);
    setExplenation([]);
    setPrice("");
    setDiscount("");
    setTypeName("");
  };

  const removetypeName = (typeName) => {
    let filteredArray = List?.filter((item) => item !== typeName);
    setList(filteredArray);
  };

  const converterDate = (date) => {
    const conDate = date?.split("-");
    return `${conDate[0]} оны ${conDate[1]} сарын ${conDate[2]}`;
  };

  const ref = React.createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [5.83, 8.27],
  };

  function numberWithCommas(x) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const setUpEdit = (item) => {
    const savedData = item;
    removetypeName(item);
    setTypeName(savedData.typeName);
    setTool(savedData.tool);
    setPrice(savedData.Price);
    setDiscount(savedData.discount);
    setExplenation(savedData.explenation);
    setEdit(true);
  };

  const applyEdit = () => {
    addtypeNameToList();
    setEdit(false);
  };

  const handleDrop = (ev) => {
    console.log(ev.currentTarget.id);
    let temp = [...explenation];
    let save = explenation[dragId];
    temp.splice(dragId, 1);
    temp.splice(ev.currentTarget.id, 0, save);
    setExplenation(temp);
  };

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  return (
    <div className="w-full md:h-screen  gap-2 flex md:flex-row flex-col md:justify-between  md:items-center item-start p-4">
      <div className="md:w-2/6 w-full bg-white md:h-screen  overflow-auto rounded-md drop-shadow-xl p-4 flex flex-col">
        <div className="mt-4">
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            placeholder="App / Web"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Захиалагч байгууллага"
          />
          <input
            type={"date"}
            className="w-full border p-2 rounded-md mt-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Захиалагч байгууллага"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={jobType}
            onChange={(e) => setJobtype(e.target.value)}
            placeholder="Ажлын нэр"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            placeholder="Төлбөрийн нөхцөл"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Гүйцэтгэх хугацаа"
          />

          <input
            className="w-full border p-2 rounded-md mt-2"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            placeholder="Төрөл"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            placeholder="Tool"
          />
          <input
            type={"number"}
            className="w-full border p-2 rounded-md mt-2"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Үндсэн үнэ"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={discount}
            type={"number"}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Хөнгөлөх хувь"
          />

          <div className="w-full flex h-12 justify-center items-center gap-2">
            <input
              className="w-full border p-2 rounded-md mt-2"
              value={explenationName}
              onChange={(e) => setExplenationName(e.target.value)}
              placeholder="Тайлбар нэмэх"
            />
            <button
              onClick={() => addToExplenation()}
              className="px-4 py-2 mt-2 rounded-md bg-green-500"
            >
              +
            </button>
          </div>
          <label>Тайлбар</label>
          {explenation?.map((item, index) => (
            <div
              id={index}
              key={index}
              draggable={true}
              onDragOver={(ev) => ev.preventDefault()}
              onDragStart={handleDrag}
              onDrop={handleDrop}
              className="w-full border rounded-md  mt-2 p-2 justify-between items-center flex"
            >
              <h1 className="w-48 overflow-auto"> {item.name}</h1>
              <div className="w-48 flex gap-2 justify-center items-center">
                <button onClick={() => removeExplanetion(item)}>
                  <IoRemove />
                </button>
              </div>
            </div>
          ))}
          {edit ? (
            <button
              className="w-full border p-2 rounded-md mt-2 uppercase hover:bg-green-300"
              onClick={() => applyEdit()}
            >
              засах
            </button>
          ) : (
            <button
              className="w-full border p-2 rounded-md mt-2 uppercase hover:bg-green-300"
              onClick={() => addtypeNameToList()}
            >
              нэмэх
            </button>
          )}

          <Pdf
            targetRef={ref}
            filename={`${companyName}_үнийн_санал.pdf`}
            options={options}
            x={0}
            y={0}
            scale={0.9}
          >
            {({ toPdf }) => (
              <button
                className="w-full bg-red-600 border border-collapse mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                onClick={toPdf}
              >
                <IoMdDownload size={30} />
              </button>
            )}
          </Pdf>
        </div>
        {List.length !== 0 && (
          <div className="mt-4 border border-black p-2 rounded-md border-collapse">
            {List.map((item, index) => (
              <div
                key={index}
                className="w-full p-2 border-b-2 border-collapse border-b-black rounded-md h-12 flex mt-2 justify-between items-center"
              >
                <div className="gap-2 flex">
                  <h1>{item.typeName}</h1>
                </div>
                <div className="flex w-48 justify-center items-center">
                  <button
                    className="hover:bg-yellow-400 hover:text-white rounded-md h-10 w-10 flex justify-center items-center"
                    onClick={() => setUpEdit(item)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="hover:bg-red-400 hover:text-white rounded-md h-10 w-10 flex justify-center items-center"
                    onClick={() => removetypeName(item)}
                  >
                    <IoIosRemove />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="'md:w-4/6 w-full bg-white  h-auto rounded-md drop-shadow-xl flex justify-center items-center">
        <div className="absolute top-2 left-2">
          <button
            onClick={() => navigate("/")}
            className="border p-2 rounded-md hover:underline border-collapse"
          >
            Буцах
          </button>
        </div>
        <div className="absolute top-0 right-0">
          <Pdf
            targetRef={ref}
            filename={`${companyName}_үнийн_санал.pdf`}
            options={options}
            x={0}
            y={0}
            scale={0.9}
          >
            {({ toPdf }) => (
              <button
                className="border-collapse w-full bg-red-600 border mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                onClick={toPdf}
              >
                <IoMdDownload size={30} />
              </button>
            )}
          </Pdf>
        </div>
        <div
          ref={ref}
          className="w-[595px] bg-white min-h-[842px] drop-shadow-2xl mx-auto pb-[20px] "
          wrap={false}
        >
          <img src={logo} className="w-[595px]" />
          <div className="w-full h-full px-[20px] -mt-20">
            <div className="w-full bg-white flex justify-between items-start mt-4 flex-col justify-center mt-2">
              <h2 className="w-full text-center font-bold">
                {option ? option : "Вэб сайт"} хийх
              </h2>
              <h1 className="w-full text-[14px] text-center uppercase font-bold">
                Үнийн санал
              </h1>
            </div>
            <div className="w-full bg-white flex justify-between items-start mt-4">
              <p className="w-full text-[12px]">
                Захиалагч байгууллага танаа: {companyName}
              </p>
              <p className="w-full text-[12px] text-center flex space-x-8 self-end justify-center ml-10">
                <p>Огноо: {converterDate(date)}</p>
              </p>
            </div>
            <div className="w-full  flex justify-center items-center flex-col mt-5">
              <table className="border w-full mx-auto table-fixed border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">Ажлын нэр</p>
                    </td>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">{jobType}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">
                        Гүйцэтгэх хугацаа
                      </p>
                    </td>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">{time}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">
                        Төлбөрийн нөхцөл
                      </p>
                    </td>
                    <td className="border border-black border-collapse">
                      <p className="text-[12px] text-center">{payment}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="border w-full mx-auto mt-7 border-collapse">
                <thead>
                  <tr>
                    <th className="border border-black w-[10px] border-collapse">
                      <p className="text-[12px] ">Төрөл</p>
                    </th>
                    <th className="border border-black border-collapse">
                      <p className="text-[12px]">Үндсэн үнэ</p>
                    </th>
                    {List.length ? (
                      List.filter((item) => item.discount).length > 0 && (
                        <th className="border border-black w-[10px border-collapse">
                          <p className="text-[12px]">Хөнгөлсөн үнэ</p>
                        </th>
                      )
                    ) : (
                      <th className="border border-black w-[10px border-collapse">
                        <p className="text-[12px]">Хөнгөлсөн үнэ</p>
                      </th>
                    )}

                    <th className="border border-black border-collapse">
                      <p className="text-[12px]">Тайлбар</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {List?.length !== 0 ? (
                    List?.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-black px-2 border-collapse">
                          <p className="text-[12px] text-center">
                            {item.typeName}
                          </p>
                          <p className="text-[12px] text-center">
                            {item.tool ? `/${item.tool}/` : ""}
                          </p>
                        </td>
                        <td className="border border-black border-collapse">
                          <p className="text-[12px] text-center">
                            {numberWithCommas(item.Price)}₮
                          </p>
                        </td>
                        {List.length &&
                          List.filter((item) => item.discount).length > 0 && (
                            <td className="border border-black border-collapse">
                              <p className="text-[12px] text-center">
                                {numberWithCommas(item.discount)}
                              </p>
                            </td>
                          )}
                        {/* <td className="border border-black">
                        <p className="text-[11px] text-center">
                          {numberWithCommas(item.discount)}
                        </p>
                      </td> */}
                        <td className="border border-black border-collapse">
                          <div className="text-[12px] text-left flex flex-col items-start">
                            <div className="text-center flex flex-col items-start">
                              {item.explenation.map((item, index) => (
                                <p key={index} className="text-left break-all">
                                  {item.name && `-${item.name}`}
                                </p>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-black border-collapse">
                        <p className="text-[12px] text-center">
                          Танилцуулга сайт/Wordpress/
                        </p>
                      </td>
                      <td className="border border-black border-collapse">
                        <p className="text-[12px] text-center">2,000,000₮</p>
                      </td>
                      <td className="border border-black border-collapse">
                        <p className="text-[12px] text-center">1,500,000₮</p>
                      </td>
                      <td className="border border-black border-collapse">
                        <div className="text-[12px] text-center flex flex-col items-start">
                          <p className="text-left">
                            - Өгөгдсөн хар зургийн дагуу вэб сайтын дизайныг
                            зурна
                          </p>
                          <p className="text-left">- Мэдээний модуль</p>
                          <p className="text-left">- Слайд удирдах модуль </p>
                          <p className="text-left">- Цэс удирдах модуль</p>
                          <p className="text-left">- Вэбийн үг солих модуль</p>
                          <p className="text-left">- Админ удирдлага</p>
                          <p className="text-left">- Слайд зурагны модуль</p>
                          <p className="text-left">- Цэс удирдах модуль</p>
                          <p className="text-left">- Хуудас удирдах модуль</p>
                          <p className="text-left"> - Үг солих модуль</p>
                          <p className="text-left">
                            - 1 жилийн баталгаат хугацаа
                          </p>
                          <p className="text-left">
                            - Гар утас, таблет гэх мэт бүх төрлийн төхөөрөмжүүд
                            дээр таарч ажиллах
                          </p>
                          <p className="text-left">
                            - Сургалт зөвлөгөө үйлчилгээ
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center items-center mt-1 mt-20">
              <div className="absolute">
                <img src={tamga} className="w-24 h-24 rotate-[-8deg] ml-7" />
              </div>
              <div className="flex">
                <h1 className="text-[12px]">
                  Үнийн санал гаргасан:.................../С. Эвшинхорлоо/
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
