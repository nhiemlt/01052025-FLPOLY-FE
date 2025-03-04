import { useEffect, useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import api_giaoHangNhanh from "../services/GiaoHangNhanhService";
import TotalModal from "./TotalModal";
export default function Payment({
  billToday,
  selectedTab,
  isOpenConfirm,
  isChecked,
  setIsChecked,
}) {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceID, setProvinceID] = useState();
  const [districtID, setDistrictID] = useState();
  const [wardCOde, setWardCode] = useState();
  const [isTotal, setIsTotal] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
  //Goi API province
  const fetchAPIProvince = async () => {
    try {
      const response = await api_giaoHangNhanh.getProvince();
      setProvince(response);
    } catch (error) {
      console.log("Không thể lấy được dữ liệu province", error);
    }
  };
  //Gọi API district
  const fetchAPIDistrict = async () => {
    if (!provinceID) {
      return;
    }
    try {
      const response = await api_giaoHangNhanh.getDistrict(provinceID);
      setDistrict(response);
    } catch (error) {
      console.log("Không thể lấy được dữ liệu district", error);
    }
  };
  //Gọi API ward
  const fetchAPIWard = async () => {
    if (typeof districtID === "undefined") {
      return;
    }
    try {
      const response = await api_giaoHangNhanh.getWard(districtID);
      setWard(response);
    } catch (error) {
      console.log("Không thể lấy được dữ liệu ward", error);
    }
  };

  useEffect(() => {
    fetchAPIProvince();
  }, []);

  useEffect(() => {
    fetchAPIDistrict();
  }, [provinceID]);

  useEffect(() => {
    fetchAPIWard();
  }, [districtID]);

  const radioGiaoHang = () => {
    if (billToday[selectedTab]?.tenKhachHang === null) {
      return null;
    } else {
      return (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-orange-500">Giao hàng:</h1>
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="toggle border-white bg-white [--tglbg:gray] hover:bg-white checked:[--tglbg:green]"
                defaultChecked
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-orange-500">Phí ship</h1>
            <h1 className="text-orange-500">0đ</h1>
          </div>
        </>
      );
    }
  };

  const adress = () => {
    if (!isChecked) {
      return <div className=""></div>;
    }
    if (isChecked && billToday[selectedTab]?.tenKhachHang !== null) {
      return (
        <div className="w-full p-4">
          <div className="flex flex-1">
            <div className="w-full"></div>
            <h1 className="flex items-center w-1/3">
              <MdPlace /> Chọn địa chỉ
            </h1>
          </div>
          <div className="flex flex-wrap w-full">
            <div className="row w-1/2">
              <label htmlFor="name" className="flex">
                <p className="text-red-500 text-lg">*</p>
                <h1>Họ và Tên</h1>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Họ và Tên"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="row w-1/2">
              <label htmlFor="sdt" className="flex">
                <p className="text-red-500 text-lg">*</p>
                <h1>Số điện thoại</h1>
              </label>
              <input
                id="sdt"
                type="text"
                placeholder="Số điện thoại"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="w-1/3">
              <label htmlFor="tp" className="flex">
                <p className="text-red-500 text-lg">*</p>
                <h1>Tỉnh / Thành Phố</h1>
              </label>
              <select
                id="tp"
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setProvinceID(e.target.value)}
              >
                <option disabled selected>
                  Tỉnh / Thành Phố
                </option>
                {province.map((prov) => (
                  <option key={prov.ProvinceID} value={prov.ProvinceID}>
                    {prov.ProvinceName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label htmlFor="huyen" className="flex">
                <p className="text-red-500 text-lg">*</p>
                <h1>Huyện / Quận</h1>
              </label>
              <select
                id="huyen"
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setDistrictID(e.target.value)}
              >
                <option disabled selected>
                  Huyện / Quận
                </option>
                {district.map((dis) => (
                  <option key={dis.DistrictID} value={dis.DistrictID}>
                    {dis.DistrictName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label htmlFor="xa" className="flex">
                <p className="text-red-500 text-lg">*</p>
                <h1>Xã / Phường</h1>
              </label>
              <select
                id="xa"
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setWardCode(e.target.value)}
              >
                <option disabled selected>
                  Xã / Phường
                </option>
                {ward.map((w) => (
                  <option key={w.WardCode} value={w.WardCode}>
                    {w.WardName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="place" className="flex">
              <p className="text-red-500 text-lg">*</p>
              <h1>Địa chỉ cụ thể</h1>
            </label>
            <input
              id="place"
              type="text"
              placeholder="Địa chỉ cụ thể"
              className="input input-bordered w-[400px]"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full bg-white rounde-md mt-4 border-opacity-50">
        <h1 className="text-orange-500 font-bold text-lg p-4">
          Thông tin thanh toán
        </h1>
        <hr />
        <div className="flex flex-1">
          {/* đây là bên trái */}
          <div className="w-full p-4">{adress()}</div>
          {/* đây là bên phải */}
          <div className="w-3/5 p-2 mb-4">
            <div className=" flex items-center border border-gray-300 shadow p-4 my-2 rounded-md ">
              <h1 className="text-2xl text-orange-500 ">
                <BiPurchaseTagAlt />
              </h1>
              <h1>Mã giảm giá :</h1>
              <input
                type="text"
                value="PGG002 - HIHI"
                placeholder=""
                className="input input-bordered mx-2 w-[170px]"
                disabled
              />
              <button className="btn">Chọn mã</button>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-orange-500">Tiền hàng</h1>
              <h1 className="text-orange-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(billToday[selectedTab]?.tongTien)}
              </h1>
            </div>
            <div className="flex justify-between py-2">
              <h1 className="text-orange-500">Giảm giá</h1>
              <h1 className="text-orange-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(30000)}
              </h1>
            </div>
            <div className=" flex justify-between bg-orange-400 text-white items-center border border-gray-300 shadow p-2 my-2 rounded-md ">
              <p>
                Áp dụng thành công phiếu giảm giá <strong>HIHI</strong> <br />
                giảm 25% đơn tối thiểu 300.000 đ
              </p>
              <button className="btn bg-orange-400 text-xl text-white hover:bg-orange-300">
                <MdOutlineCancel />
              </button>
            </div>
            {radioGiaoHang()}
            <div className="flex justify-between items-center py-2">
              <h1 className="text-orange-500">Khách thanh toán</h1>
              <button onClick={() => setIsTotal(true)} className="btn">
                <AiFillCreditCard />
              </button>
              <h1 className="text-orange-500">0 đ</h1>
            </div>
            <button
              onClick={() => isOpenConfirm(true)}
              className="btn w-full mb-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Xác nhân đơn hàng
            </button>
          </div>
        </div>
      </div>
      {isTotal && <TotalModal isClose={() => setIsTotal(false)} />}
    </>
  );
}
