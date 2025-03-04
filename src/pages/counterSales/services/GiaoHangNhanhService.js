import axios from "axios";
import { TOKEN_GHN } from "../../../api/endPoints";

const api_giaoHangNhanh = {
  async getProvince() {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            "Content-Type": "application/json",
            Token: TOKEN_GHN,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Lỗi khi gọi API province", error);
      throw error;
    }
  },
  async getDistrict(provinceID) {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        {
          headers: {
            "Content-Type": "application/json",
            Token: TOKEN_GHN,
          },
          params: {
            province_id: provinceID,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Lỗi khi gọi API district", error);
      throw error;
    }
  },
  async getWard(districtID) {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          headers: {
            "Content-Type": "application/json",
            Token: TOKEN_GHN,
          },
          params: {
            district_id: districtID,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Lỗi khi gọi API ward", error);
      throw error;
    }
  },
};
export default api_giaoHangNhanh;
