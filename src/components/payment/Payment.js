import React, { useState } from "react";
import Pdf from "react-to-pdf";
import { IoIosRemove, IoMdDownload } from "react-icons/io";
import logo from "../../assets/logo.jpeg";

function Payment() {
  const [List, setList] = useState([]);

  const [typeName, setTypeName] = useState("");
  const [tool, setTool] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [time, setTime] = useState("");
  const [explenation, setExplenation] = useState([]);
  const [jobType, setJobtype] = useState("");
  const [payment, setPayment] = useState("");
  const [option, setOption] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState();

  const addtypeNameToList = () => {
    let obj = {
      typeName: typeName,
      tool: tool,
      discountedPrice: discountedPrice,
      time: time,
      explenation: explenation,
    };
    setList([...List, obj]);
  };

  const removetypeName = (typeName) => {
    let filteredArray = List.filter((item) => item !== typeName);
    setList(filteredArray);
  };

  
  const converterDate = (date) => {
    const conDate = date.split("-");
    return `${conDate[0]} оны ${conDate[1]} сарын ${conDate[2]}`;
  };

  const ref = React.createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11],
  };

  return (
    <div className="w-full h-screen gap-2 flex justify-between items-center p-4">
      <div className="w-2/6 bg-white h-full overflow-auto rounded-md drop-shadow-xl p-4 flex flex-col">
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
            className="w-full border p-2 rounded-md mt-2"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Хөнгөлсөн үнэ"
          />
          <input
            className="w-full border p-2 rounded-md mt-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Гүйцэтгэх хугацаа"
          />

          <textarea
            className="w-full border p-2 rounded-md mt-2"
            value={explenation}
            onChange={(e) => setExplenation(e.target.value)}
            placeholder="Тайлбар нэмэх"
          />
          <button
            className="w-full border p-2 rounded-md mt-2 uppercase hover:bg-green-300"
            onClick={() => addtypeNameToList()}
          >
            нэмэх
          </button>
        </div>
        {List.length !== 0 && (
          <div className="mt-4 border border-black p-2 rounded-md">
            {List.map((item, index) => (
              <div
                key={index}
                className="w-full p-2 border-b-2 border-b-black rounded-md h-12 flex mt-2 justify-between items-center"
              >
                <div className="gap-2 flex">
                  <h1>{item.typeName}</h1>
                  <h1>x</h1>
                  <h1>{item.tool}</h1>
                </div>
                <div>
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
      <div className="w-4/6 bg-white h-full rounded-md drop-shadow-xl flex justify-center items-center">
        <div className="absolute top-0 right-0">
          <Pdf
            targetRef={ref}
            filename="нэхэмжлэх.pdf"
            options={options}
            x={-0.1}
            y={0}
            scale={1}
          >
            {({ toPdf }) => (
              <button
                className="w-full bg-red-600 border mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                onClick={toPdf}
              >
                <IoMdDownload size={30} />
              </button>
            )}
          </Pdf>
        </div>
        <div
          ref={ref}
          className="w-[595px] bg-white h-[842px] drop-shadow-2xl mx-auto py-[37px] px-[37px] "
        >
          <img src={logo} className="w-[150px] flex mx-auto" />
          <div className="w-full bg-white flex justify-between items-start mt-2 flex-col justify-center mt-5">
            <h2 className="w-full text-center font-bold">
              {option ? option : "Вэб сайт"} хийх
            </h2>
            <h1 className="w-full text-[15px] text-center uppercase font-bold">
              Үнийн санал
            </h1>
          </div>
          <div className="w-full bg-white flex justify-between items-start mt-2">
            <p className="w-full text-[12px] ">
              Захиалагч байгууллага танаа: {companyName}
            </p>
            <p className="w-full text-[12px] text-center flex space-x-8 self-end justify-center ml-10">
              <p>Огноо:     {converterDate(date)}</p>
            </p>
          </div>
          <div className="w-full bg-white flex flex-row gap-2 items-start justify-between mt-2">
            <p></p>
          </div>
          <div className="w-full  flex justify-center items-center flex-col mt-2">
            <table className="border w-full mx-auto table-fixed">
              <tbody>
                <tr>
                  <td className="border border-black">
                    <p className="text-[12px] text-center">Ажлын нэр</p>
                  </td>
                  <td className="border border-black">
                    <p className="text-[12px] text-center">{jobType}</p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black">
                    <p className="text-[12px] text-center">Төлбөрийн нөхцөл</p>
                  </td>
                  <td className="border border-black">
                    <p className="text-[12px] text-center">{payment}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="border w-full mx-auto mt-20">
              <thead>
                <tr>
                  <th className="border border-black">
                    <p className="text-[12px]">Төрөл</p>
                  </th>
                  <th className="border border-black">
                    <p className="text-[12px]"></p>
                  </th>
                  <th className="border border-black">
                    <p className="text-[12px]">Хөнгөлсөн үнэ</p>
                  </th>
                  <th className="border border-black">
                    <p className="text-[12px]">Гүйцэтгэх хугацаа</p>
                  </th>
                  <th className="border border-black">
                    <p className="text-[12px]">Тайлбар</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {List.length !== 0 ? (
                  List.map((item, index) => (
                    <tr>
                      <td className="border border-black">
                        <p className="text-[12px] text-center">
                          {item.typeName}
                        </p>
                      </td>
                      <td className="border border-black">
                        <p className="text-[12px] text-center">{item.tool}</p>
                      </td>
                      <td className="border border-black">
                        <p className="text-[12px] text-center">
                          {item.discountedPrice}
                        </p>
                      </td>
                      <td className="border border-black">
                        <p className="text-[12px] text-center">{item.time}</p>
                      </td>
                      <td className="border border-black">
                        <div className="text-[12px] text-center flex flex-col items-start">
                          <p
                            className="text-[12px] text-center"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {item.explenation}
                          </p>
                          {/* {item.explenation.map((sentence) => (
                            <p>{sentence}</p>
                          ))} */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-black">
                      <p className="text-[12px] text-center">
                        Танилцуулга сайт
                      </p>
                    </td>
                    <td className="border border-black">
                      <p className="text-[12px] text-center">Wordpress</p>
                    </td>
                    <td className="border border-black">
                      <p className="text-[12px] text-center">3,500,000₮</p>
                    </td>
                    <td className="border border-black">
                      <p className="text-[12px] text-center">Ажлын 10 хоног</p>
                    </td>
                    <td className="border border-black">
                      <div className="text-[12px] text-center flex flex-col items-start">
                        <p>
                          - Өгөгдсөн хар зургийн дагуу вэб сайтын дизайныг зурна
                        </p>
                        <p>- Мэдээний модуль</p>
                        <p>- Слайд удирдах модуль </p>
                        <p>- Цэс удирдах модуль</p>
                        <p>- Вэбийн үг солих модуль</p>
                        <p>- Админ удирдлага</p>
                        <p>- Слайд зурагны модуль</p>
                        <p>- Цэс удирдах модуль</p>
                        <p>- Хуудас удирдах модуль</p>
                        <p> - Үг солих модуль</p>
                        <p>- 1 жилийн баталгаат хугацаа</p>
                        <p>
                          - Гар утас, таблет гэх мэт бүх төрлийн төхөөрөмжүүд
                          дээр таарч ажиллах
                        </p>
                        <p>- Сургалт зөвлөгөө үйлчилгээ</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
