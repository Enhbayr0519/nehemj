import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import { IoIosRemove, IoMdDownload } from "react-icons/io";
import { currency_list } from "../../utils/currencies";
import tamga from "../../assets/Tamga/эйтай (1).png";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/urls";
import axios from "axios";
import { auth } from "../../App";

function Contract() {
	const navigate = useNavigate();
	const user = auth.currentUser;
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (user) {
			// const authenticate = async () => {
			//     const { data } = await axios.get(`${url}/admin/auth`)
			//     if (data.success) {
			//         return
			//     } else {
			//         navigate("/login")
			//     }
			// }
			// authenticate()
		} else {
			navigate("/login");
		}
	}, [navigate]);

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

	const [contractDate, setContractDate] = useState("");
	const [contractNumber, setContractNumber] = useState("");
	const [contractFinishDate, setContractFinishDate] = useState("");
	const [contractPrice, setContractPrice] = useState("");
	const [contractPercent, setContractPercent] = useState("");

	const [productList, setProductList] = useState([]);

	const [product, setProduct] = useState("");
	const [quantity, setQuantity] = useState("");
	const [perProductPrice, setPerProductPrice] = useState("");
	const [perProductCurrency, setPerProductCurrency] = useState("");
	const [perProductCurrencyRate, setPerProductCurrencyRate] = useState("");

	const [page, setPage] = useState(false);

	const [withTax, setWithTax] = useState(false);

	const addProductToList = () => {
		let obj = {
			product: product,
			quantity: quantity,
			perProductPrice: perProductPrice,
			perProductCurrency: perProductCurrency,
			perProductCurrencyRate: perProductCurrencyRate
		};
		setProductList([...productList, obj]);
	};

	const removeProduct = (product) => {
		let filteredArray = productList.filter((item) => item !== product);
		setProductList(filteredArray);
	};

	function numberWithCommas(x) {
		return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function findSumUsingMap() {
		let t = 0;
		productList?.forEach((item) => {
			if (item) {
				let total = item.perProductPrice * item.perProductCurrencyRate * item.quantity;
				return (t = t + total);
			}
		});
		return t;
	}
	const totalUsingMap = findSumUsingMap();

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

	return (
		<div className="w-full h-screen gap-2 flex justify-between items-center p-4">
			<div className="w-1/6 bg-white h-full overflow-auto rounded-md drop-shadow-xl p-4 flex flex-col">
				<div className="mt-4">
					<input
						type={"date"}
						className="w-full border p-2 rounded-md mt-2"
						placeholder="Гэрээний өдөр"
						value={contractDate}
						onChange={(e) => setContractDate(e.target.value)}
					/>
					<input
						className="w-full border p-2 rounded-md mt-2"
						placeholder="Гэрээний №"
						value={contractNumber}
						onChange={(e) => setContractNumber(e.target.value)}
					/>
					<input
						type={"date"}
						className="w-full border p-2 rounded-md mt-2"
						placeholder="Дуусах хугацаа"
						value={contractFinishDate}
						onChange={(e) => setContractFinishDate(e.target.value)}
					/>
					<input
						className="w-full border p-2 rounded-md mt-2"
						placeholder="Гэрээний үнэ"
						value={contractPrice}
						onChange={(e) => setContractPrice(e.target.value)}
					/>
					<input
						type={"number"}
						className="w-full border p-2 rounded-md mt-2"
						placeholder="Гэрээний хувь"
						value={contractPercent}
						onChange={(e) => setContractPercent(e.target.value)}
					/>
					<Pdf targetRef={ref} filename="гэрээ.pdf" options={options} x={0} y={0} scale={1}>
						{({ toPdf }) => (
							<button
								className="w-full flex bg-red-600 border mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
								onClick={toPdf}
							>
								<IoMdDownload size={30} /> хуудас 1
							</button>
						)}
					</Pdf>
					<Pdf targetRef={ref2} filename="гэрээ.pdf" options={options} x={0} y={0} scale={1}>
						{({ toPdf }) => (
							<button
								className="w-full flex bg-red-600 border mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
								onClick={toPdf}
							>
								<IoMdDownload size={30} /> хуудас 2
							</button>
						)}
					</Pdf>

					<button
						className={`border p-2 rounded-md ${page ? "bg-green-400" : "bg-white"}`}
						onClick={() => setPage(true)}
					>
						хуудас 1
					</button>
					<button
						className={`border p-2 rounded-md ${page ? "bg-white" : "bg-green-400"}`}
						onClick={() => setPage(false)}
					>
						хуудас 2
					</button>
				</div>
			</div>
			<div className="w-5/6 bg-white h-full rounded-md drop-shadow-xl flex overflow-x-scroll justify-center items-start gap-4">
				{/* <div className='absolute top-0 right-0'>
                    
                </div> */}
				<div className="absolute top-2 left-2">
					<button onClick={() => navigate("/")} className="border p-2 rounded-md hover:underline">
						Буцах
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
								............................... (цаашид Захиалагч гэх) нөгөө талаас ”Том-Амжилт” ХХК (цаашид Гүйцэтгэгч
								гэх)-ийг төлөөлж менежер С. Бүжинханд нар (цаашид хамтад нь Талууд гэх) Иргэний хуулийн 343-358 дугаар
								зүйлийг үндэслэн дараахь нөхцлөөр харилцан тохиролцож энэхүү гэрээг батлав.
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
								<h1 className="text-[12px]">С. Бүжинханд /С. Бүжинханд/</h1>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Contract;
