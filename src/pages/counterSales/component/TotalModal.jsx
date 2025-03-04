export default function TotalModal({ isClose }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box relative w-[600px]">
        <h1 className="text-lg text-orange-500 font-medium">Thanh toán</h1>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-sm">Tổng tiền cần thanh toán:</h1>
          <h1>0 đ</h1>
        </div>
        <h1 className="text-sm mt-2">Số tiền:</h1>
        <input
          type="number"
          className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 "
        />
        <h1 className="text-sm mt-2">Tiền thiếu: 0đ</h1>
        <div className="flex justify-center space-x-4 p-4">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="hidden peer/tien-mat"
            id="tien-mat"
            defaultChecked
          />
          <label
            htmlFor="tien-mat"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer 
        peer-checked/tien-mat:bg-orange-500 peer-checked/tien-mat:text-white peer-checked/tien-mat:border-orange-500 transition-all"
          >
            Tiền Mặt
          </label>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="hidden peer/chuyen-khoan"
            id="chuyen-khoan"
          />
          <label
            htmlFor="chuyen-khoan"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer 
        peer-checked/chuyen-khoan:bg-orange-500 peer-checked/chuyen-khoan:text-white peer-checked/chuyen-khoan:border-orange-500 transition-all"
          >
            Chuyển khoản
          </label>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã giao dịch</th>
              <th>Phương thức</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className=""></tr>
          </tbody>
        </table>

        <div className="flex flex-1 mt-4">
          <div className="w-2/3"></div>
          <div className="flex space-x-4 ">
            <button onClick={isClose} className="btn">
              Hủy
            </button>
            <button className="btn bg-orange-500 hover:bg-orange-600 text-white">
              Xác nhận
            </button>
          </div>
        </div>
        {/* {nút xác nhận} */}
      </div>
    </div>
  );
}
