import axios from "axios";
const HoaDonService = {
  async getHoaDon(maHoaDon) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hoa-don/${maHoaDon}`
      );
      return response.data;
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu hóa đơn theo mã", error);
      throw error;
    }
  },
  async ThemSPVaoGioHang(data) {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/ban-hang/addHdct`,
        data
      );
      return response.data;
    } catch (error) {
      console.log("Lỗi khi gọi API thêm hóa đơn chi tiết", error);
      throw error;
    }
  },
};
export default HoaDonService;
