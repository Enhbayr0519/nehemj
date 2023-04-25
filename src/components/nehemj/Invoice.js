import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import { IoIosRemove, IoMdDownload } from "react-icons/io";
import { currency_list } from "../../utils/currencies";
import tamga from "../../assets/Tamga/эйтай (1).png";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/urls";
import axios from "axios";
import { auth } from "../../App";

function Invoice() {
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
	}, [navigate, user]);

	const [invoiceCompanyName, setInvoiceCompanyName] = useState("Том-Амжилт");
	const [invoiceCompanyAddress, setInvoiceCompanyAddress] = useState("Сүхбаатар, 1-р хороо, J Hotel office, 804 тоот");
	const [invoiceCompanyNumber, setInvoiceCompanyNumber] = useState("86486060");
	const [invoiceCompanyEmail, setInvoiceCompanyEmail] = useState("info@amjilt.com");
	const [invoiceCompanyBank, setInvoiceCompanyBank] = useState("Хаан Банк");
	const [invoiceCompanyBankAccount, setInvoiceCompanyBankAccount] = useState("5009375511");
	const [invoiceCompanyRegister, setInvoiceCompanyRegister] = useState("5418097");

	const [PayCompanyName, setPayCompanyName] = useState("");
	const [PayCompanyAddress, setPayCompanyAddress] = useState("");
	const [PayCompanyContract, setPayCompanyContract] = useState("");
	const [PayCompanyInvoiceDate, setPayCompanyInvoiceDate] = useState("");
	const [PayCompanyPayDate, setPayCompanyPayDate] = useState("");

	const [productList, setProductList] = useState([]);

	const [product, setProduct] = useState("Вебсайт урьдчилгаа төлбөр");
	const [quantity, setQuantity] = useState(1);
	const [perProductPrice, setPerProductPrice] = useState(750000);
	const [perProductCurrency, setPerProductCurrency] = useState("₮");
	const [perProductCurrencyRate, setPerProductCurrencyRate] = useState(1);

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
	const options = {
		orientation: "portrait",
		unit: "in",
		format: [5.83, 8.27]
	};

	return (
		<div className="w-full md:h-screen  gap-2 flex md:flex-row flex-col md:justify-between  md:items-center item-start p-4">
			<div className="md:w-2/6 w-full bg-white md:h-screen  overflow-auto rounded-md drop-shadow-xl p-4 flex flex-col">
				<div className="overflow-auto ">
					<div className="mt-4">
						<label className="w-full p-2 rounded-md border bg-amber-300">Нэхэмжлэгч</label>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyName"
							value={invoiceCompanyName}
							onChange={(e) => setInvoiceCompanyName(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyAddress"
							value={invoiceCompanyAddress}
							onChange={(e) => setInvoiceCompanyAddress(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyNumber"
							value={invoiceCompanyNumber}
							onChange={(e) => setInvoiceCompanyNumber(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyEmail"
							value={invoiceCompanyEmail}
							onChange={(e) => setInvoiceCompanyEmail(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyBank"
							value={invoiceCompanyBank}
							onChange={(e) => setInvoiceCompanyBank(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyBankAccount"
							value={invoiceCompanyBankAccount}
							onChange={(e) => setInvoiceCompanyBankAccount(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="invoiceCompanyRegister"
							value={invoiceCompanyRegister}
							onChange={(e) => setInvoiceCompanyRegister(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="w-full p-2 rounded-md border bg-purple-300">Төлөгч</label>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="Төлөгч Байгууллагын нэр:"
							value={PayCompanyName}
							onChange={(e) => setPayCompanyName(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="Төлөгч Хаяг:"
							value={PayCompanyAddress}
							onChange={(e) => setPayCompanyAddress(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							placeholder="Төлөгч Гэрээний №:"
							value={PayCompanyContract}
							onChange={(e) => setPayCompanyContract(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							type={"date"}
							placeholder="Төлөгч Нэхэмжилсэн огноо:"
							value={PayCompanyInvoiceDate}
							onChange={(e) => setPayCompanyInvoiceDate(e.target.value)}
						/>
						<input
							className="w-full border p-2 rounded-md mt-2"
							type={"date"}
							placeholder="Төлөгч Төлбөр хийх хугацаа:"
							value={PayCompanyPayDate}
							onChange={(e) => setPayCompanyPayDate(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="w-full p-2 rounded-md border bg-green-300">Бараа нэмэх</label>
						<button
							className={`border p-2 rounded-md mx-2 ${withTax ? "bg-green-400" : "bg-red-400"}`}
							onClick={() => setWithTax(!withTax)}
						>
							{withTax ? "НӨАТ" : "НӨАТ-гүй"}
						</button>
						<input
							className="w-full border p-2 rounded-md mt-2"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
							placeholder="Гүйлгээний утга"
						/>
						<input
							type={"number"}
							min="1"
							step="any"
							className="w-full border p-2 rounded-md mt-2"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							placeholder="Тоо хэмжээ"
						/>
						<input
							type={"number"}
							min="1"
							step="any"
							className="w-full border p-2 rounded-md mt-2"
							value={perProductPrice}
							onChange={(e) => setPerProductPrice(e.target.value)}
							placeholder="Нэгжийн үнэ"
						/>
						<select
							className="w-full border p-2 rounded-md mt-2"
							value={perProductCurrency}
							onChange={(e) => setPerProductCurrency(e.target.value)}
						>
							<option label="Мөнгөн тэмдэгт солих" />
							{currency_list.map((item, index) => (
								<option key={index} label={item.name} value={item.symbol} />
							))}
						</select>
						<input
							type={"number"}
							min="1"
							step="any"
							className="w-full border p-2 rounded-md mt-2"
							value={perProductCurrencyRate}
							onChange={(e) => setPerProductCurrencyRate(e.target.value)}
							placeholder="Ханш"
						/>
						<button
							className="w-full border p-2 rounded-md mt-2 uppercase hover:bg-green-300"
							onClick={() => addProductToList()}
						>
							нэмэх
						</button>
					</div>
					{productList.length !== 0 && (
						<div className="mt-4 border border-black p-2 rounded-md">
							{productList.map((item, index) => (
								<div
									key={index}
									className="w-full p-2 border-b-2 border-b-black rounded-md h-12 flex mt-2 justify-between items-center"
								>
									<div className="gap-2 flex">
										<h1>{item.product}</h1>
										<h1>x</h1>
										<h1>{item.quantity}</h1>
									</div>
									<div>
										<button
											className="hover:bg-red-400 hover:text-white rounded-md h-10 w-10 flex justify-center items-center"
											onClick={() => removeProduct(item)}
										>
											<IoIosRemove />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
					<Pdf targetRef={ref} filename={`${PayCompanyName}_нэхэмжлэх.pdf`} options={options} x={-0.1} y={0} scale={1}>
						{({ toPdf }) => (
							<button
								className="w-full bg-red-600 border mt-2 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 flex md:hidden"
								onClick={toPdf}
							>
								<IoMdDownload size={30} />
							</button>
						)}
					</Pdf>
				</div>
			</div>
			<div className="md:w-4/6 w-full bg-white  h-auto rounded-md drop-shadow-xl flex justify-center items-center md:py-[50px]">
				<div className="absolute top-2 left-2">
					<button onClick={() => navigate("/")} className="border p-2 rounded-md hover:underline">
						Буцах
					</button>
				</div>
				<div className="absolute top-0 right-0 hidden md:flex">
					<Pdf targetRef={ref} filename={`${PayCompanyName}_нэхэмжлэх.pdf`} options={options} x={-0.1} y={0} scale={1}>
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
				<div ref={ref} className="w-[595px] bg-white h-[842px] drop-shadow-2xl mx-auto py-[37px] px-[37px] ">
					<div className="w-full bg-white flex justify-between items-start mt-2">
						<p className="w-full text-xs text-left">НХ Маягт Т-1</p>
						<p className="w-full text-xs text-right">
							СЭЗ-ийн сайд, ҮСГ-ын даргын 2018 оны 12-р сарын 5-ны 347 тоот тушаалын хавсралт
						</p>
					</div>
					<div className="w-full bg-white flex justify-between items-start mt-2">
						<h1 className="w-full text-[20px] text-center uppercase font-bold">нэхэмжлэл №</h1>
					</div>
					<div className="w-full bg-white flex flex-row gap-2 items-start justify-between mt-2">
						<div className="w-full">
							<div className="my-2 p-2">
								<h4 className="font-bold">Нэхэмжилсэн:</h4>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Байгууллагын нэр:</p>
								<p className="text-[13px] ">{invoiceCompanyName}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Хаяг:</p>
								<p className="text-[13px] ">{invoiceCompanyAddress}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Утас, факс:</p>
								<p className="text-[13px] ">{invoiceCompanyNumber}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px] whitespace-nowrap">Э. Шуудан:</p>
								<p className="text-[13px] ">{invoiceCompanyEmail}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Банкны нэр:</p>
								<p className="text-[13px] ">{invoiceCompanyBank}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px] whitespace-nowrap">Дансны дугаар:</p>
								<p className="text-[13px] ">{invoiceCompanyBankAccount}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px] whitespace-nowrap">Регистрийн дугаар:</p>
								<p className="text-[13px] ">{invoiceCompanyRegister}</p>
							</div>
						</div>
						<div className="w-full">
							<div className="my-2 p-2">
								<h4 className="font-bold">Төлөгч:</h4>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px] min-w-[120px]">Байгууллагын нэр:</p>
								<p className="text-[13px] ">{PayCompanyName}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Хаяг:</p>
								<p className="text-[13px]  ">{PayCompanyAddress}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Регистрийн №:</p>
								<p className="text-[13px]  ">{PayCompanyContract}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1">
								<p className="text-[12px]">Нэхэмжилсэн огноо:</p>
								<p className="text-[13px]  ">{PayCompanyInvoiceDate}</p>
							</div>
							<div className="w-full flex gap-1 justify-start items-start mt-1 flex-wrap">
								<p className="text-[12px]">Төлбөр хийх хугацаа:</p>
								<p className="text-[13px]  ">{PayCompanyPayDate}</p>
							</div>
						</div>
					</div>
					<div className="w-full  flex justify-center items-center flex-col mt-2">
						<table className="border w-full mx-auto">
							<thead>
								<tr>
									<th className="border border-black">
										<p className="text-[12px]">№</p>
									</th>
									<th className="border border-black">
										<p className="text-[12px]">Гүйлгээний утга</p>
									</th>
									<th className="border border-black">
										<p className="text-[12px]">Тоо хэмжээ</p>
									</th>
									<th className="border border-black">
										<p className="text-[12px]">Нэгжийн үнэ</p>
									</th>
									<th className="border border-black">
										<p className="text-[12px]">Нийт үнэ</p>
									</th>
								</tr>
							</thead>
							<tbody>
								{productList.length !== 0 ? (
									productList.map((item, index) => (
										<tr>
											<td className="border border-black">
												<p className="text-[12px] text-center">{index + 1}</p>
											</td>
											<td className="border border-black">
												<p className="text-[12px] text-center">{item.product}</p>
											</td>
											<td className="border border-black">
												<p className="text-[12px] text-center">{item.quantity}</p>
											</td>
											<td className="border border-black">
												<p className="text-[12px] text-center">
													{numberWithCommas(item.perProductPrice)}
													{item.perProductCurrency}
												</p>
											</td>
											<td className="border border-black">
												<p className="text-[12px] text-center">
													{numberWithCommas(item.perProductPrice * item.perProductCurrencyRate * item.quantity)}₮
												</p>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td className="border border-black">
											<p className="text-[12px] text-center">1</p>
										</td>
										<td className="border border-black">
											<p className="text-[12px] text-center">Вебсайт урьдчилгаа төлбөр</p>
										</td>
										<td className="border border-black">
											<p className="text-[12px] text-center">1</p>
										</td>
										<td className="border border-black">
											<p className="text-[12px] text-center">$60</p>
										</td>
										<td className="border border-black">
											<p className="text-[12px] text-center">192,000</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div className="w-full flex justify-end items-start mt-1">
							<div className="w-48">
								<table className="w-full">
									<tbody>
										<tr>
											<th className="border border-black">
												<p className="text-[12px] text-center">Дүн</p>
											</th>
											<td className="border border-black">
												<p className="text-[12px] text-center">{numberWithCommas(totalUsingMap)}₮</p>
											</td>
										</tr>
										<tr>
											<th className="border border-black">
												<p className="text-[12px] text-center">НӨАТ</p>
											</th>
											<td className="border border-black">
												{withTax ? (
													<p className="text-[12px] text-center">{numberWithCommas(totalUsingMap * 0.1)}₮</p>
												) : (
													<p className="text-[12px] text-center">{0}₮</p>
												)}
											</td>
										</tr>
										<tr>
											<th className="border border-black">
												<p className="text-[12px] text-center">Нийт Дүн</p>
											</th>
											<td className="border border-black">
												{withTax ? (
													<p className="text-[12px] text-center">
														{numberWithCommas(totalUsingMap + totalUsingMap * 0.1)}₮
													</p>
												) : (
													<p className="text-[12px] text-center">{numberWithCommas(totalUsingMap)}₮</p>
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					{/* <div className='w-full  flex justify-start items-start flex-col mt-2'>
                        <h1 className='text-left text-xs'>
                            Мөнгөн дүн____________________________________________________________________
                            <br />
                            <br />
                            _________________________________________________________________________болно.
                        </h1>

                    </div> */}
					<div className="w-full flex justify-between items-start gap-2 mt-4 flex flex-row ">
						<div className="flex flex-col justify-center items-center w-1/6 p-4">
							<h1 className="text-center text-[12px]">Тамга</h1>
							<img
								src={tamga}
								alt="tamga"
								className="w-[130px] h-[130px] absolute object-contain rotate-[-5deg] bottom-50 left-[27px]"
							/>
						</div>
						<div className="flex flex-col w-5/6 relative">
							<h1 className="text-left text-[12px] mt-2 hidden sm:block">
								Дарга_____________________________________ / ___________________ /
							</h1>
							<h1 className="text-left text-[12px] mt-2 sm:hidden">Дарга__________________ / ___________________ /</h1>
							<h1 className="text-left  text-[12px] mt-2 hidden sm:block">
								Нэхэмжлэл бичсэн_________________________ / С. Бүжинханд /
							</h1>
							<h1 className="text-left  text-[12px] mt-2 sm:hidden whitespace-nowrap">
								Нэхэмжлэл бичсэн____С. Бүжинханд____ /
							</h1>
							<h1 className="text-left  text-[12px] mt-2 hidden sm:block">
								Нэхэмжлэл хүлээн авсан____________________ / ___________________ /
							</h1>
							<h1 className="text-left  text-[12px] mt-2 sm:hidden">Нэхэмжлэл хүлээн авсан____________________ /</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Invoice;
