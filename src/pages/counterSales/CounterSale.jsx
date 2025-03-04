import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import HoaDonService from "./services/HoaDonService";
import AddProductModal from "./component/AddProductModal";
import SanPhamChiTietService from "./services/SanPhamChiTietService";
import { FaRegTrashAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import HoaDonChiTietService from "./services/HoaDonChiTietService";
import ConfirmModal from "./component/ConfirmModal";
import Payment from "./component/Payment";
import KhachHangModal from "./component/KhachHangModal";
import KhachHangService from "./services/KhachHangService";
import axios from "axios";
export default function CounterSale() {
  const [newBill, setNewBill] = useState({
    idKhachHang: null,
    idNhanVien: 1,
    idPhieuGiamGia: null,
    ghiChu: "",
    hoTenNguoiNhan: "",
    soDienThoai: "",
    email: "",
    diaChiNhanHang: "",
    ngayNhanMongMuon: "",
    ngayDuKienNhan: "",
    phiShip: 0,
    tongTien: 0,
  });

  const [billToday, setBillToDay] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isProductModal, setIsProductModal] = useState(false);
  const [spcts, setSpct] = useState([]);
  const [sanPhamGioHang, setSanPhamGioHang] = useState([]);
  const [idHD, setIdHD] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [idHDCT, setIDHDCT] = useState(0);
  const [khList, setKhList] = useState([]);
  const [isModalKH, setIsModalKH] = useState(false);
  const [isConfirmTaoHoaDon, setIsConfirmTaoHoaDon] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [billDetailsCount, setBillDetailsCount] = useState({});

  const handleCreateBill = async () => {
    if (billToday.length > 8) {
      toast.error("Số lượng hóa đơn chờ tối đa là 9");
      return;
    }
    try {
      const response = await HoaDonService.AddHoaDon(newBill);
      const createBill = response.data;
      toast.success("Tạo hóa đơn thành công");
      setSelectedTab(billToday?.length);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //Gọi API cập nhật trạng thái hóa đơn
  const handleUpdateTrangThaiHoaDon = () => {
    const fetchUpdateTrangThaiHoaDon = async () => {
      try {
        const response = await HoaDonService.UpdateTrangThaiHD(idHD);
        toast.success("Đã xác nhận hóa đơn.");
      } catch (error) {
        toast.error("Thay đổi hóa đơn thất bại");
        console.log("Thay đổi hóa đơn thất bại", error);
      }
    };
    fetchUpdateTrangThaiHoaDon();
  };
  //Gọi API Tahy đổi khách hàng của Hóa đơn
  const handleUpdateKhOfHd = (idKH) => {
    const fetchUpdateKHOfHoaDon = async () => {
      try {
        const response = await HoaDonService.UpdateKhachHang(idHD, idKH);
        fetchBillToday();
        toast.success("Đã thêm khách hàng.");
      } catch (error) {
        toast.error("Thêm khách hàng vào hóa đơn thất bại");
        console.log("Thêm khách hàng thất bại", error);
      }
    };
    fetchUpdateKHOfHoaDon();
  };

  //Gọi API để load hóa đơn đang chờ của ngày hiện tại
  const fetchBillToday = async () => {
    try {
      const response = await HoaDonService.HoaDonHomNay();
      setBillToDay(response);
      setIdHD(response[selectedTab].id);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách hóa đơn hôm nay", error);
    }
  };
  const fetchSanPhamChiTiet = async () => {
    try {
      const response = await SanPhamChiTietService.GetAll();
      setSpct(response);
    } catch (error) {
      console.log("khong thể tải được danh sách san phẩm chi tiết", error);
    }
  };
  const fecthSanPhamGioHang = async () => {
    try {
      const response = await HoaDonChiTietService.getSPCTByIDHoaDon(
        billToday[selectedTab].id
      );

      setSanPhamGioHang(response);
    } catch (error) {
      console.log(
        "Lỗi khi gọi api hóa đơn chi tiết",
        `Và hóa đơn:${billToday[selectedTab].id}`,
        error
      );
    }
  };
  const fetchDelete = async (id) => {
    try {
      const response = await HoaDonChiTietService.deleteHDCT(id);
      if (response) {
        fetchBillToday();
        toast.success("Đã xóa sản phẩm ra khỏi giỏ hàng");
      } else {
        toast.error("Lỗi khi xóa sản phẩm ra giỏ hàng. Vui lòng thử lại");
      }
    } catch (error) {
      console.log("Lỗi khi xóa HDCT", error);
      toast.error("Có lỗi xảy ra khi xóa hóa đơn chi tiết.");
    }
  };
  const fetchDataKhachHang = async () => {
    try {
      const response = await KhachHangService.getAllKH();
      setKhList(response);
    } catch (error) {
      console.log("Lỗi khi gọi API khách hàng", error);
    }
  };

  const handleModalKH = () => {
    fetchDataKhachHang();
    setIsModalKH(true);
  };

  useEffect(() => {
    fetchBillToday();
    console.log("Đã gọi fecthToday");
  }, [selectedTab]);

  useEffect(() => {
    fetchSanPhamChiTiet();
  }, [sanPhamGioHang]);

  useEffect(() => {
    if (typeof billToday[selectedTab]?.id === "undefined") {
      console.log("");
    } else {
      fecthSanPhamGioHang();
    }
  }, [billToday[selectedTab]]);

  const handleDaTa = () => {
    fetchBillToday();
  };

  const handleGetIdHDCT = (id) => {
    setIDHDCT(id);
    setIsConfirm(true);
  };
  const handlePrevQuantity = (hdct) => {
    if (!hdct?.id || !hdct?.soLuong) {
      console.log("Không tìm thất hdctId hoặc số lượng");
      return;
    }
    if (hdct.soLuong > 1) {
      const newQuantity = Number(hdct.soLuong - 1);
      const fetchUpdateSoLuong = async () => {
        try {
          const response = await HoaDonChiTietService.updateSoLuongHDCT(
            hdct.id,
            newQuantity
          );
          if (response) {
            fetchBillToday();
          }
        } catch (error) {
          console.log("Lỗi khi cập nhật số lượng chi tiết", error);
        }
      };
      fetchUpdateSoLuong(hdct.id);
    } else {
      toast.error("Số lượng tối thiểu là 1");
      return;
    }
  };

  const handleIncreQuantity = (hdct) => {
    // console.log(quantity);
    if (!hdct?.id) {
      console.log("Không tìm thất hdctId ");
      return;
    }
    if (hdct.soLuongTon === 0) {
      toast.error("Số lượng sản phẩm trong kho đã hết");
      return;
    }
    if (hdct.soLuong < 10000) {
      const newQuantity = Number(hdct.soLuong + 1);
      //   console.log(quantity);
      const fetchUpdateSoLuong = async () => {
        try {
          const response = await HoaDonChiTietService.updateSoLuongHDCT(
            hdct.id,
            newQuantity
          );
          if (response) {
            fetchBillToday();
          }
        } catch (error) {
          console.log("Lỗi khi cập nhật số lượng chi tiết", error);
        }
      };
      fetchUpdateSoLuong();
    } else {
      toast.success("Số lượng vượt quá số lượng tồn");
      return;
    }
  };

  const changeIDHoaDon = (index, id) => {
    setSelectedTab(index);
    setIdHD(id);
    setIsChecked(false);
  };
  //hàm thay đổi idHD
  useEffect(() => {
    // Gọi API để lấy số chi tiết hóa đơn bằng Axios
    axios
      .get("http://localhost:8080/api/hdct/count")
      .then((response) => {
        setBillDetailsCount(response.data); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [sanPhamGioHang]);
  //Hàm đếm số lượng hóa đơn chi tiết
  const tabHD = () => {
    if (billToday.length < 0) {
      return (
        <div className="flex justify-center items-center bg-white shadow rounded mt-4 w-full h-[60px]">
          <h1 className="text-lg text-orange-600 font-bold">
            Danh sách hóa đơn chờ trống !
          </h1>
        </div>
      );
    } else {
      return (
        <>
          <div className=" tabs w-1200px overflow-x-auto flex border-b max-w-full px-2 py-4 ">
            {billToday.map((bill, i) => (
              <div
                className={`indicator w-[120px] px-1 py-2 mx-2 
                  cursor-pointer rounded-lg focus:outline-none shadow ${
                    selectedTab === i
                      ? "border-b-2 border-orange-500 bg-orange-500 text-white font-bold "
                      : "text-gray-500 "
                  }text-sm transition-all duration-300 ease-in-out`}
                key={bill?.id}
                onClick={() => changeIDHoaDon(i, bill.id)} // Cập nhật tab được chọn
              >
                <span className="indicator-item badge badge-warning">
                  {billDetailsCount[bill.id] || 0}
                </span>
                <div className="flex justify-between items-center space-x-6 px-1">
                  <p className="text-xs">
                    Hóa đơn {i + 1} <br />
                  </p>
                  <p className="text-red-500 hover:text-white hover:bg-red-500 rounded-lg">
                    <GiCancel />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow rounded py-4 px-4 mt-4">
            <div className="flex items-center justify-between ">
              <p className="text-sm text-orange-500 ">
                Hóa đơn: {billToday[selectedTab]?.maHoaDon}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsProductModal(true)}
                  className="btn px-4 py-1 border border-orange-500 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Thêm sản phẩm
                </button>
                <button className="btn px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
                  Quét QR
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const sanPhamTable = () => {
    if (sanPhamGioHang.length === 0) {
      return (
        <>
          <h1 className="text-2xl text-orange-600 text-center font-bold mb-4  ">
            Giỏ hàng
          </h1>
          <div
            onClick={() => setIsProductModal(true)}
            className="btn flex justify-center items-center w-full h-[400px] mt-4 bg-white hover:bg-gray-100 rounded-lg border border-1 shadow-md"
          >
            <h1 className="text-2xl font-bold text-orange-600">
              Chưa có sản phẩn nào trong giỏ hàng !! <br />
              <p className="text-base">(click để thêm sản phẩm)</p>
            </h1>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-1 justify-between items-center">
            <h1 className="w-full text-2xl text-orange-600 text-center font-bold">
              Giỏ hàng
            </h1>
          </div>
          <table className="table table-auto min-h-[300px] w-full bg-white rounded-lg shadow overflow-y-auto text-center text-xs mt-4 max-h-[600px]">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Ảnh</th>
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Tổng Tiền</th>
                <th className="px-4 py-2">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {sanPhamGioHang.map((sp, i) => (
                <tr key={sp?.id} className="hover:bg-gray-100 text-center">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      className="skeleton h-32 w-32 object-cover"
                      src={sp?.hinhAnh}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-base font-bold">
                      {sp.tenSanPham} [{sp?.tenMauSac} - {sp?.tenKichThuoc}]
                    </p>
                    <p>Mã SP: SPCT{sp?.idSPCT}</p>
                    <p>
                      Đơn giá:{" "}
                      <strong className="text-orange-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(sp?.donGia)}
                      </strong>
                    </p>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePrevQuantity(sp)}
                      className="btn hover:bg-orange-500 py-2 px-4"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={sp?.soLuong}
                      // defaultValue={sp?.soLuong}
                      className="input w-[80px] mx-2"
                      readOnly
                    />
                    <button
                      onClick={() => handleIncreQuantity(sp)}
                      className="btn hover:bg-orange-500 py-2 px-4"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sp?.thanhTien)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleGetIdHDCT(sp?.id)}
                      className="btn bg-white text-orange-500"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };
  const thongTinKH = () => {
    if (!billToday[selectedTab]?.tenKhachHang) {
      return (
        <div className="flex w-full flex-col border-opacity-50">
          <div className="flex justify-between items-center bg-white rounded-md shadow h-20 px-4 ">
            <h1 className="text-orange-500 font-bold text-lg">
              Thông tin khách hàng
            </h1>
            <button
              onClick={handleModalKH}
              className="btn bg-orange-500 hover:bg-orange-600 text-white"
            >
              Thêm khách hàng
            </button>
          </div>
          <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow h-20 ">
            <h1 className="text-orange-500">Tên khách hàng:</h1>
            <h1 className="text-orange-500 text-lg font-bold">Khách hàng lẻ</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-white rounded-lg shadow ">
          <div className="flex justify-between items-center bg-white h-20 px-4 ">
            <h1 className="text-orange-500 font-bold text-lg">
              Thông tin khách hàng
            </h1>
            <div className="flex space-x-2">
              <button className="btn text-base font-medium">
                {billToday[selectedTab]?.tenKhachHang}
                <p className="text-red-600">X</p>
              </button>
              <button
                onClick={handleModalKH}
                className="btn bg-orange-500 hover:bg-orange-600 text-white"
              >
                Thay đổi khách hàng
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2">
              <div className="flex space-x-4 items-center mx-3 p-4 ">
                <h1 className="text-orange-500">Tên khách hàng:</h1>
                <h1 className="text-orange-500 text-sm font-bold">
                  {billToday[selectedTab]?.tenKhachHang}
                </h1>
              </div>
              <div className="flex space-x-4 items-center mx-3 p-4">
                <h1 className="text-orange-500">Email:</h1>
                <h1 className="text-orange-500 text-sm font-bold">
                  {billToday[selectedTab]?.email}
                </h1>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex space-x-4 items-center mx-3 p-4 ">
                <h1 className="text-orange-500">Ngày sinh:</h1>
                <h1 className="text-orange-500 text-sm font-bold">
                  {billToday[selectedTab]?.ngaySinh}
                </h1>
              </div>
              <div className="flex space-x-4 items-center mx-3 p-4 ">
                <h1 className="text-orange-500">Số điện thoại:</h1>
                <h1 className="text-orange-500 text-sm font-bold">
                  {billToday[selectedTab]?.soDienThoai}
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex space-x-4 bg-white shadow rounded py-4 px-4">
        <button
          onClick={handleCreateBill}
          className="btn text-base font-normal bg-orange-500 hover:bg-orange-600 text-white "
        >
          Tạo hóa đơn mới
        </button>
      </div>
      {tabHD()}
      <div className="bg-white rounded-lg shadow px-4 py-4 my-4">
        {sanPhamTable()}
      </div>

      <AddProductModal
        spcts={spcts}
        isOpen={isProductModal}
        isClose={setIsProductModal}
        hoaDon={idHD}
        handleDaTa={handleDaTa}
      />
      {isConfirm && (
        <ConfirmModal
          hideConfirm={setIsConfirm}
          idHDCT={idHDCT}
          fetchDelete={fetchDelete}
        />
      )}
      {isModalKH && (
        <KhachHangModal
          khList={khList}
          isClose={setIsModalKH}
          handleUpdateKhOfHd={handleUpdateKhOfHd}
        />
      )}
      {thongTinKH()}
      <Payment
        billToday={billToday}
        selectedTab={selectedTab}
        isOpenConfirm={setIsConfirmTaoHoaDon}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {isConfirmTaoHoaDon && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm p-4">
            <h3 className="font-bold text-lg text-orange-500 ">Xác nhận</h3>
            <p className="py-3 ">Xác nhận tạo hóa đơn !</p>
            <div className="modal-action flex justify-center gap-3">
              <button
                onClick={() => setIsConfirmTaoHoaDon(false)}
                className="btn bg-orange-500 hover:bg-orange-600 text-white px-4"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setIsConfirmTaoHoaDon(false)}
                className="btn px-4"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
