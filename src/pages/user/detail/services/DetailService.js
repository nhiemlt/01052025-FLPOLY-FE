import axios from "axios";

const DetailService = {
    async getDetailByProductId(id) {
        try {
            const response = await axios.get(`http://localhost:8080/san-pham/${id}/detail`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product data:", error);
            throw error;
        }
    },
};

export default DetailService;