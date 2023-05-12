import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import { IoIosRemove, IoMdDownload } from "react-icons/io";
import { currency_list } from "../../utils/currencies";
import tamga from "../../assets/Tamga/эйтай (1).png";
import { useNavigate } from "react-router-dom";
import { cdnURL, url } from "../../utils/urls";
import axios from "axios";
import Swal from "sweetalert2";
import { VscLoading } from "react-icons/vsc";
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEdit, AiOutlineFolderView } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";

function ContractList() {
	const [contractList, setContractList] = useState([]);
	const [filteredContractList, setFilteredContractList] = useState([]);
	const [contractViews, setContractViews] = useState(false);
	const [copy, setCopy] = useState(false);
	const [ViewModal, setViewModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const navigate = useNavigate();

	const arr = (x) => Array.from(x);
	const num = (x) => Number(x) || 0;
	const str = (x) => String(x);
	const isEmpty = (xs) => xs.length === 0;
	const take = (n) => (xs) => xs.slice(0, n);
	const drop = (n) => (xs) => xs.slice(n);
	const reverse = (xs) => xs.slice(0).reverse();
	const comp = (f) => (g) => (x) => f(g(x));
	const not = (x) => !x;
	const chunk = (n) => (xs) => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

	let numToWords = (n) => {
		let a = [
			"",
			"нэг",
			"хоёр",
			"гурван",
			"дөрвөн",
			"таван",
			"зургаан",
			"долоон",
			"найман",
			"есөн",
			"арван",
			"арван нэг",
			"арван хоёр",
			"арван гурван",
			"арван дөрвөн",
			"арван таван",
			"арван зургаан",
			"арван долоон",
			"арван найман",
			"арван есөн"
		];
		let b = ["", "", "хорин", "гучин", "дөчин", "тавин", "жаран", "далан", "наян", "ерэн"];
		let g = [
			"",
			"мянга",
			"сая",
			"тэрбум",
			"их наяд",
			"quadrillion",
			"quintillion",
			"sextillion",
			"septillion",
			"octillion",
			"nonillion"
		];

		let makeGroup = ([ones, tens, huns]) => {
			return [
				num(huns) === 0 ? " " : a[huns] + " зуун ",
				num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + " ") || " ",
				a[tens + ones] || a[ones]
			].join("");
		};

		let thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);

		if (typeof n === "number") return numToWords(String(n));
		if (n === "0") return "zero";
		return comp(chunk(3))(reverse)(arr(n)).map(makeGroup).map(thousand).filter(comp(not)(isEmpty)).reverse().join(" ");
	};

	const [loading, setLoading] = useState(false);
	const [contractDate, setContractDate] = useState("");
	const [contractNumber, setContractNumber] = useState("");
	const [contractFinishDate, setContractFinishDate] = useState("");
	const [contractPrice, setContractPrice] = useState("");
	const [contractPercent, setContractPercent] = useState("");
	const [contractName, setContractName] = useState("");
	const [contractPass, setContractPass] = useState("");

	const [page, setPage] = useState(true);

	function numberWithCommas(x) {
		return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const ref = React.createRef();
	const ref2 = React.createRef();
	const options = {
		orientation: "portrait",
		unit: "in",
		format: [8.5, 11]
	};

	const converterDate = (date) => {
		const conDate = date.split("-");
		return `${conDate[0]} оны ${conDate[1]} сарын ${conDate[2]}`;
	};

	let terms = [
		{
			title: "НЭГ. НИЙТЛЭГ ҮНДЭСЛЭЛ ",
			content: [
				{
					title:
						"Энэхүү гэрээний зорилго нь Гүйцэтгэгч нь Захиалагчийн захиалга, зааварчилгааны дагуу Захиалагчийн байгууллагын хэрэглэгчдэд зориулсан вэб динамик вэб хуудасыг хийж гүйцэтгэх (цаашид Ажил гэх), Захиалагч нь Гүйцэтгэгчид гэрээнд заасан ажлын хөлс төлөх хэлцлийн нөхцөл, талуудын эрх үүрэг, хүлээх хариуцлага болон эдгээртэй холбоотой бусад харилцааг зохицуулахад оршино. "
				}
			]
		},
		{
			title: "ХОЁР. ГЭРЭЭНИЙ ХУГАЦАА",
			content: [
				{
					title: `Гэрээний баталгаат хугацаа ${converterDate(contractDate)} -наас ${converterDate(
						contractFinishDate
					)} хооронд хугацаатай байна `
				},
				{
					title:
						"Зурган загвар дизайн зурагдаж захиалагч талаас баталсан өдрөөс эхлэн вэб сайт хийх хугацаа тоологдоно. Загвар зурагдах хугацаа ажлын 7 хоног байна.  "
				}
			]
		},
		{
			title: "ГУРАВ. ГЭРЭЭНИЙ ҮНЭ, ТӨЛБӨРИЙН НӨХЦӨЛ ",
			content: [
				{
					title: `Гэрээт ажлын нийт хөлс нь ${numberWithCommas(contractPrice)}₮ / ${numToWords(
						contractPrice
					)} / төгрөг байна. `
				},
				{
					title: `Захиалагч нь гэрээний үнийн дүнгийн ${numberWithCommas(
						(contractPercent / 100) * contractPrice
					)}₮ / ${numToWords(
						(contractPercent / 100) * contractPrice
					)} /  төгрөг Гүйцэтгэгчийн нэхэмжлэлийг үндэслэн шилжүүлнэ. `
				},
				{
					title: `Гэрээт ажлын дууссан дараа ажлын хөлсний ${numberWithCommas(
						contractPrice - (contractPercent / 100) * contractPrice
					)}₮ / ${numToWords(
						contractPrice - (contractPercent / 100) * contractPrice
					)} / төгрөг Гүйцэтгэгчийн нэхэмжлэлийг үндэслэн шилжүүлнэ. `
				},
				{
					title: `Ажил хүлээлцэх акт үйлдсэний дараа  засвар хийгдэх нөхцөлд засварлах ажлын хөлсийг тухайн үед талууд харилцан тохиролцоно. `
				},
				{
					title: `Дансны дугаар хаан банкны 5009375511 дансанд төлнө.  `
				}
			]
		},
		{
			title: "ДӨРӨВ. ГҮЙЦЭТГЭГЧИЙН ЭРХ, ҮҮРЭГ ",
			content: [
				{
					title: `Гүйцэтгэгч нь ажлыг Захиалагч болон Гүйцэтгэгчийн харилцан тохиролцсон загвар зааварчилгааны дагуу  гэрээнд заасан гүйцэтгэлийн хугацаанд чанартай хийж гүйцэтгэнэ.  `
				},
				{
					title: `Гүйцэтгэгч нь гэрээнд заасан баталгаат хугацаанд засвар, алдаа гэмтлийг захиалагчийн хүсэлтийн дагуу төлбөргүй хийж гүйцэтгэх үүрэгтэй бөгөөд нэмэлтээр бүтцийн өөрчлөлт, шинэчлэлт хийх тохиолдолд ажлын хөлсийг харилцан тохиролцох эрхтэй.  `
				},
				{
					title: `Гүйцэтгэгч нь харилцан тохиролцсон загвар дизайны дагуу эцсийн байдлаар баталсан загварыг захиалагчаас нэхэмжлэх эрхтэй бөгөөд баталсан загварын дагуу нэмэлт өөрчлөлтгүй түргэн шуурхай чанартай   хийж гүйцэтгэх үүрэгтэй.  `
				},
				{
					title: `Гүйцэтгэгч нь  гэрээт ажлын дагуу захиалагчид зааварчилгаа болгож, видео хичээл болон нэг удаагийн нүүр дүүргэх контентийг жишээгээр оруулж, үзүүлэх үүрэгтэй. `
				},
				{
					title: `Баталгааны хугацаа 1 жил болно. `
				}
			]
		},
		{
			title: "ТАВ. ЗАХИАЛАГЧИЙН ЭРХ, ҮҮРЭГ ",
			content: [
				{
					title: `Захиалагч нь  500 мянган төгрөгөөс дээш үнэтэй гэрээт ажил гүйцэтгүүлсэн тохиолдолд өөрийн хүссэн хар зураг, өөрийн санааг гүйцэтгэгчид гаргаж өгөх эрхтэй.  `
				},
				{
					title: `Захиалагч нь гүйцэтгэгч талтай харилцан тохиролцсон загвар дизайныг эцсийн байдлаар баталж өгөх үүрэгтэй.  `
				},
				{
					title: `Захиалагч нь  гэрээт ажлын гүйцэтгэлийн дараах засвар үйлчилгээг баталгаат хугацааны дагуу хэдийд ч  гүйцэтгэгчид хандах эрхтэй бөгөөд цаашид нүүр болон бусад хуудасны контент дүүргэх ажлыг захиалагч хариуцах үүрэгтэй.  `
				},
				{
					title: `Хэрвээ талууд нэмэлтээр ажлын хөлсөө харилцан тохиролцож, контент оруулах бол захиалагчийн зүгээс тухайн контентийг /зураг, текст/ бэлдэж өгөх үүрэгтэй. `
				},
				{
					title: `Хэрвээ гүйцэтгэгч тал гэрээгээр хүлээсэн үүргээ биелүүлээгүй эсвэл талууд харилцан тохиролцоогүй тохиолдолд захиалагч гэрээт ажлыг хүлээн авахаас татгалзаж,  гэрээг нэг талын санаачилгаар цуцлах эрхтэй. `,
					subContent: [
						{
							title: "Гүйцэтгэгч удаа дараа буюу хоёроос дээш удаа ажлыг чанарын шаардлага хангахгүйгээр  гүйцэтгэсэн; "
						},
						{
							title: "Гүйцэтгэгчийн гүйцэтгэсэн ажил нь доголдолтой, захиалагчийн шаардлагад нийцээгүй "
						}
					]
				},
				{
					title:
						"Захиалагч нь ажлын хөлс төлөхгүй хугацаа хэтэрвэл захиалагч тал нэг өдрийн 0,2 хувийн алданги торгуулийг гүйцэтгэгч талд саадгүй  төлнө. "
				}
			]
		},
		{
			title: "ЗУРГАА. БУСАД ЗҮЙЛ ",
			content: [
				{
					title: `Энэхүү гэрээтэй холбогдон гарч болзошгүй бүх санал зөрөлдөөн, маргааныг Талууд харилцан зөвшилцөх замаар шийдвэрлэнэ. Санал зөрөлдөөн, маргааныг зөвшилцөөнөөр шийдвэрлэж чадахгүй тохиолдолд Захиалагчийн харъяалах шатны шүүхээр шийдвэрлүүлнэ.  `
				},
				{
					title:
						" Энэхүү гэрээг монгол хэл дээр 2 хувь үйлдэж, тал тус бүр нэг хувийг хадгалах бөгөөд хувь тус бүр хууль зүйн адил хүчинтэй байна. "
				}
			]
		}
	];

	useEffect(() => {
		viewAllContracts();
	}, []);

	const viewAllContracts = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${url}/admin/allcontract`);
			if (data.success) {
				setLoading(false);
				setContractViews(true);
				setContractList(data.result);
				setFilteredContractList(data.result);
			}
		} catch (error) {
			setLoading(false);
			setContractViews(false);
			Swal.fire({
				icon: "error",
				title: error.message
			});
		}
	};

	const filterByName = (prop) => {
		if (contractList) {
			const contractFiltered = contractList.filter((el) => {
				if (prop === "") {
					return el;
				} else {
					return el.contractName.toLowerCase().includes(prop);
				}
			});
			return setFilteredContractList(contractFiltered);
		}
	};

	const filterByDate = (prop) => {
		if (contractList) {
			const contractFiltered = contractList.filter((el) => {
				if (prop === "") {
					return el;
				} else {
					return el.contractDate.toLowerCase().includes(prop);
				}
			});
			return setFilteredContractList(contractFiltered);
		}
	};
	const filterByNumber = (prop) => {
		if (contractList) {
			const contractFiltered = contractList.filter((el) => {
				if (prop === "") {
					return el;
				} else {
					return el.contractNumber.toLowerCase().includes(prop);
				}
			});
			return setFilteredContractList(contractFiltered);
		}
	};

	const setUpView = async (item) => {
		setContractDate(item.contractDate);
		setContractDate(item.contractDate);
		setContractFinishDate(item.contractEndDate);
		setContractName(item.contractName);
		setContractPrice(item.contractPrice);
		setContractPercent(item.contractInitialPay);
		setContractNumber(item.contractNumber);
		setViewModal(true);
		setEdit(false);
	};
	const setUpEdit = async (item) => {
		setContractDate(item.contractDate);
		setContractDate(item.contractDate);
		setContractFinishDate(item.contractEndDate);
		setContractName(item.contractName);
		setContractPrice(item.contractPrice);
		setContractPercent(item.contractInitialPay);
		setContractNumber(item.contractNumber);
		setViewModal(false);
		setEdit(true);
	};

	const EditContract = async () => {};

	return (
		<>
			<div className="w-full bg-white h-full drop-shadow-xl flex overflow-auto flex-wrap justify-start items-start">
				<div className="absolute top-2 right-2">
					<button onClick={() => navigate("/contract")} className="border p-2 rounded-md hover:underline">
						Буцах
					</button>
				</div>
				<div className="p-4 w-full flex gap-4">
					<input
						onChange={(e) => filterByName(e.target.value)}
						className="p-2 border p-2 rounded-md"
						placeholder="Нэрээр хайх"
					/>
					<input
						onChange={(e) => filterByNumber(e.target.value)}
						className="p-2 border p-2 rounded-md"
						placeholder="Гэрээний дугаараар хайх"
					/>
					<input onChange={(e) => filterByDate(e.target.value)} className="p-2 border p-2 rounded-md" type={"date"} />
				</div>
				{ViewModal ? (
					<div className="w-5/6 bg-white h-full rounded-md drop-shadow-xl flex overflow-x-scroll justify-center items-start gap-4">
						{/* <div className='absolute top-0 right-0'>
                    
                </div> */}
						<div className="absolute top-2 left-2">
							<button onClick={() => navigate("/")} className="border p-2 rounded-md hover:underline">
								Буцах
							</button>
						</div>
						<div className="absolute top-2 right-2">
							<button onClick={() => EditContract()} className="border p-2 rounded-md hover:underline">
								{loading ? <VscLoading className="animate-spin" size={30} /> : "Бүртгэх"}
							</button>
						</div>
						<div className="absolute top-2 right-32">
							<button onClick={() => viewAllContracts()} className="border p-2 rounded-md hover:underline">
								{loading ? <VscLoading className="animate-spin" size={30} /> : "Бүх гэрээ харах"}
							</button>
						</div>
						{page ? (
							<div ref={ref} className="w-[816px] bg-white h-[1104px] drop-shadow-2xl mx-auto py-[37px] px-[37px] ">
								<div className="w-full bg-white flex justify-between items-start mt-2 px-10">
									<p className="w-full text-xs text-left w-[50px] font-bold">Батлав Захирал</p>
									<p className="w-full text-xs text-left w-[50px] font-bold">Батлав Захирал</p>
								</div>
								<div className="w-full bg-white flex justify-between items-start mt-2 px-10 relative">
									<p className="w-full text-xs text-left w-[50px] font-bold">.........................</p>
									<p className="w-full text-xs text-left w-[50px] font-bold">.........................</p>
									<h1 className="text-xs absolute right-[-10px] bottom-2">С. Лхагвамандах</h1>
								</div>
								<div className="w-full bg-white flex justify-between items-start mt-2">
									<h1 className="w-full text-[15px] text-center uppercase font-bold">Ажил гүйцэтгэх гэрээ</h1>
								</div>
								<div className="w-full bg-white flex justify-between items-start mt-2">
									<p className="w-full text-[12px] text-center  ">{converterDate(contractDate)}</p>
									<p className="w-full text-[12px] text-center  ">№ {contractNumber}</p>
									<p className="w-full text-[12px] text-center ">Улаанбаатар хот</p>
								</div>
								<div className="w-full bg-white flex flex-row gap-2 items-start justify-between mt-4">
									<p className="text-[12px]">
										Энэхүү гэрээг нэг талаас “................................” ХХК-ийн гүйцэтгэх захирал
										............................... (цаашид Захиалагч гэх) нөгөө талаас ”Том-Амжилт” ХХК (цаашид
										Гүйцэтгэгч гэх)-ийг төлөөлж менежер Э. Анударь нар (цаашид хамтад нь Талууд гэх) Иргэний хуулийн
										343-358 дугаар зүйлийг үндэслэн дараахь нөхцлөөр харилцан тохиролцож энэхүү гэрээг батлав.
									</p>
								</div>
								<div className="w-full  flex justify-center items-center flex-col mt-4">
									{terms.slice(0, 4).map((item, index) => (
										<div key={index}>
											<h1 className="font-bold text-[14px] text-center mt-4 mb-4">{item.title} </h1>
											<div>
												{item?.content?.map((item, index) => (
													<div>
														<div className="w-full flex gap-4 mt-2">
															<p className="text-[12px]">{index + 1}.</p>
															<p key={index} className="text-[12px]">
																{item.title}
															</p>
														</div>
														{item?.subContent?.map((item, index) => (
															<div className="flex w-[11/12] ml-[28px] gap-4">
																<p className="text-[12px]">{index + 1}.</p>
																<p key={index} className="text-[12px]">
																	{item.title}
																</p>
															</div>
														))}
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div ref={ref2} className="w-[816px] bg-white h-[1104px] drop-shadow-2xl mx-auto py-[37px] px-[37px] ">
								<div className="w-full  flex justify-center items-center flex-col mt-2">
									{terms.slice(4, 7).map((item, index) => (
										<div key={index}>
											<h1 className="font-bold text-[14px] text-center mt-2 mb-2">{item.title} </h1>
											<div>
												{item?.content?.map((item, index) => (
													<div>
														<div className="w-full flex gap-4 mt-1">
															<p className="text-[11px]">{index + 1}.</p>
															<p key={index} className="text-[11px]">
																{item.title}
															</p>
														</div>
														{item?.subContent?.map((item, index) => (
															<div className="flex w-[11/12] ml-[28px] gap-4">
																<p className="text-[11px]">{index + 1}.</p>
																<p key={index} className="text-[11px]">
																	{item.title}
																</p>
															</div>
														))}
													</div>
												))}
											</div>
										</div>
									))}
								</div>
								<h1 className="font-bold text-[14px] text-center mt-4 mb-4">ДОЛОО. ТАЛУУДЫН АЛБАН ЁСНЫ ХАЯГ </h1>
								<div className="w-full flex justify-between items-start">
									<div className="w-full">
										<h1 className="font-bold text-[13px] mb-2">Захиалагч:</h1>
										<h1 className="text-[11px]">“....................................” ХХК</h1>
										<h1 className="text-[11px]">Улаанбаатар хот</h1>
										<h1 className="text-[11px]">Утас: ........................</h1>
										<h1 className="text-[11px]">Имэйл хаяг:.................................</h1>
										<h1 className="text-[11px]">Улсын бүртгэлийн дугаар:....................</h1>
										<h1 className="text-[11px]">Регистрийн дугаар: …...........</h1>
									</div>
									<div className="w-full">
										<h1 className="font-bold text-[13px] mb-2 ">Гүйцэтгэгч:</h1>
										<h1 className="text-[11px] ">”Том-Амжилт” ХХК</h1>
										<h1 className="text-[11px]">Улаанбаатар хот</h1>
										<h1 className="text-[11px]"> Сүхбаатар дүүрэг 1-р хороо J Tower 804 тоот Том Амжилт ХХК</h1>
										<h1 className="text-[11px]">Утас: 7711-6060</h1>
										<h1 className="text-[11px]"> Имэйл хаяг: info@amjilt.com</h1>
										<h1 className="text-[11px]">Улсын бүртгэлийн дугаар:9011253029</h1>
										<h1 className="text-[11px]">Регистрийн дугаар: 5418097</h1>
									</div>
								</div>
								<h1 className="font-bold text-[14px] text-center mt-4 mb-4">ГЭРЭЭ БАЙГУУЛСАН: </h1>
								<div className="w-full flex justify-between items-start">
									<div className="w-full">
										<h1 className="text-[12px]">Захиалагчийг төлөөлж:</h1>
										<h1 className="text-[12px]">........................................ /.................../</h1>
									</div>
									<div className="w-full">
										<h1 className="text-[12px]">Гүйцэтгэгчийг төлөөлж:</h1>
										<h1 className="text-[12px]">Э. Анударь /Э. Анударь/</h1>
									</div>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="w-full  bg-white h-full drop-shadow-xl flex overflow-auto flex-wrap justify-start items-start">
						{filteredContractList?.length !== 0 &&
							filteredContractList?.map((item, index) => (
								<div key={index} className="flex border w-48 rounded-md p-2  m-2 flex-col items-center justify-center">
									<h1> {item?.contractNumber}</h1>
									<h1> {item?.contractName}</h1>
									<h1> {item?.contractDate}</h1>
									<div className="w-full p-2 flex justify-between  items-center">
										<button
											onClick={() => {
												navigator.clipboard.writeText(
													`${cdnURL}/viewContract/${item.contractNumber}/${item.contractName}`
												);
												setCopy(item._id);
											}}
											className="hover:bg-green-400 p-2 rounded-md bg-white border"
										>
											{copy === item._id ? <IoCopy size={20} className="text-green-600" /> : <FiCopy size={20} />}
										</button>
										<button className="hover:bg-red-400 p-2 rounded-md bg-white border hover:text-white">
											<RiDeleteBin5Fill size={20} />
										</button>
										<button
											onClick={() => setUpEdit(item)}
											className="hover:bg-yellow-400 p-2 rounded-md bg-white border hover:text-white"
										>
											<AiOutlineEdit size={20} />
										</button>
										<button
											onClick={() => setUpView(item)}
											className="hover:bg-purple-400 p-2 rounded-md bg-white border hover:text-white"
										>
											<AiOutlineFolderView size={20} />
										</button>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</>
	);
}

export default ContractList;
