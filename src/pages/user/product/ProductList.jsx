import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { FiSearch } from "react-icons/fi";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ProductService from "./services/ProductService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    thuongHieuIds: [],
    xuatXuIds: [],
    chatLieuIds: [],
    coAoIds: [],
    tayAoIds: [],
    mauSacIds: [],
    kichThuocIds: [],
    minPrice: 0,
    maxPrice: 1000000,
    sortBy: "id,desc"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);
  const [xuatXuOptions, setXuatXuOptions] = useState([]);
  const [chatLieuOptions, setChatLieuOptions] = useState([]);
  const [coAoOptions, setCoAoOptions] = useState([]);
  const [tayAoOptions, setTayAoOptions] = useState([]);
  const [mauSacOptions, setMauSacOptions] = useState([]);
  const [kichThuocOptions, setKichThuocOptions] = useState([]);

  useEffect(() => {
    if (filters) {
      fetchProducts();
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchProducts = async () => {
    try {
      const [sortBy, sortDir] = (filters.sortBy ?? 'id,desc').split(',');
      const response = await ProductService.getAllProducts(
        currentPage - 1,
        10,
        filters.search ?? '',
        sortBy,
        sortDir,
        filters
      );
      setProducts(response.content);
      setTotalItems(response.totalElements);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const thuongHieuResponse = await ProductService.getThuongHieu();
      setThuongHieuOptions(thuongHieuResponse.map(item => ({ value: item.id, label: item.tenThuongHieu })));

      const xuatXuResponse = await ProductService.getXuatXu();
      setXuatXuOptions(xuatXuResponse.map(item => ({ value: item.id, label: item.tenXuatXu })));

      const chatLieuResponse = await ProductService.getChatLieu();
      setChatLieuOptions(chatLieuResponse.map(item => ({ value: item.id, label: item.tenChatLieu })));

      const coAoResponse = await ProductService.getCoAo();
      setCoAoOptions(coAoResponse.map(item => ({ value: item.id, label: item.tenCoAo })));

      const tayAoResponse = await ProductService.getTayAo();
      setTayAoOptions(tayAoResponse.map(item => ({ value: item.id, label: item.tenTayAo })));

      const mauSacResponse = await ProductService.getMauSac();
      setMauSacOptions(mauSacResponse.map(item => ({ value: item.id, label: item.tenMauSac })));

      const kichThuocResponse = await ProductService.getKichThuoc();
      setKichThuocOptions(kichThuocResponse.map(item => ({ value: item.id, label: item.tenKichThuoc })));
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(totalItems / 10)) return;
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / 10);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Tất cả sản phẩm</h2>

            <div className="relative w-full max-w-xs">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="w-full rounded-md border border-gray-300 bg-white p-2 pl-10 text-sm shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </header>

          <div className="mt-8 block lg:hidden">
            <button
              className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Filters & Sorting </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <div className="hidden space-y-4 lg:block">
              <div>
                <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700">
                  Sắp xếp theo
                </label>
                <select
                  id="SortBy"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="id,desc">Mặc định</option>
                  <option value="tenSanPham,asc">Tên sản phẩm (A → Z)</option>
                  <option value="tenSanPham,desc">Tên sản phẩm (Z → A)</option>
                  <option value="gia,asc">Giá thấp đến cao</option>
                  <option value="gia,desc">Giá cao đến thấp</option>
                  <option value="soLuongDaBan,asc">Bán ít đến nhiều</option>
                  <option value="soLuongDaBan,desc">Bán nhiều đến ít</option>
                </select>
              </div>

              <div>
                <p className="block text-xs font-medium text-gray-700">Bộ lọc</p>
                <div className="mt-1 space-y-2">
                  <Select
                    isMulti
                    options={thuongHieuOptions}
                    onChange={(selected) => handleFilterChange("thuongHieuIds", selected.map(option => option.value))}
                    placeholder="Chọn thương hiệu"
                  />
                  <Select
                    isMulti
                    options={xuatXuOptions}
                    onChange={(selected) => handleFilterChange("xuatXuIds", selected.map(option => option.value))}
                    placeholder="Chọn xuất xứ"
                  />
                  <Select
                    isMulti
                    options={chatLieuOptions}
                    onChange={(selected) => handleFilterChange("chatLieuIds", selected.map(option => option.value))}
                    placeholder="Chọn chất liệu"
                  />
                  <Select
                    isMulti
                    options={coAoOptions}
                    onChange={(selected) => handleFilterChange("coAoIds", selected.map(option => option.value))}
                    placeholder="Chọn kiểu cổ áo"
                  />
                  <Select
                    isMulti
                    options={tayAoOptions}
                    onChange={(selected) => handleFilterChange("tayAoIds", selected.map(option => option.value))}
                    placeholder="Chọn kiểu tay áo"
                  />
                  <Select
                    isMulti
                    options={mauSacOptions}
                    onChange={(selected) => handleFilterChange("mauSacIds", selected.map(option => option.value))}
                    placeholder="Chọn màu sắc"
                  />
                  <Select
                    isMulti
                    options={kichThuocOptions}
                    onChange={(selected) => handleFilterChange("kichThuocIds", selected.map(option => option.value))}
                    placeholder="Chọn kích thước"
                  />

                  <div>
                    <label className="block text-xs font-medium text-gray-700">Khoảng giá</label>
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      value={[filters.minPrice, filters.maxPrice]}
                      onChange={(value) => {
                        handleFilterChange("minPrice", value[0]);
                        handleFilterChange("maxPrice", value[1]);
                      }}
                    />
                    <div className="flex justify-between text-xs">
                      <span>Từ: {filters.minPrice.toLocaleString()} VND</span>
                      <span>Đến: {filters.maxPrice.toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-white to-orange-50 transition-all duration-300 hover:shadow-2xl"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="group block relative"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.hinhAnh}
                          alt={product.tenSanPham}
                          className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-all"></div>
                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs rounded-md shadow-md">
                          {product.soLuongDaBan} đã bán
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {product.tenSanPham}
                        </h3>
                        <p className="mt-2 text-lg font-bold text-orange-500">
                          {product.gia.toLocaleString()} VND
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Số lượng còn lại: <span className="font-medium text-gray-700">{product.soLuong}</span>
                        </p>
                      </div>
                    </Link>
                  </li>

                ))}
              </ul>
              <div className="mt-8">
                <ol className="flex justify-center gap-1 text-xs font-medium">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900"
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>

                  {[...Array(totalPages).keys()].map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        className={`block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900 ${currentPage === page + 1 ? 'border-orange-600 bg-orange-600 text-dark' : ''
                          }`}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900"
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next Page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductList;