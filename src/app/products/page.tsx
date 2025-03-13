"use client";
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Filter, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { getProducts, deleteProduct } from '@/lib/api';
const ProductAdmin = () => {
  // State cho danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  // State cho phân trang và tìm kiếm
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [categories, setCategories] = useState([]);
  
  // Số sản phẩm mỗi trang
  const productsPerPage = 10;

  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu sản phẩm');
        }
        const data = await response.json();
        setProducts(data);
        
        // Lấy danh sách danh mục duy nhất từ sản phẩm
        const uniqueCategories = [...new Set(data.map(product => product.category))].filter(Boolean);
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Không thể xóa sản phẩm');
        }
        
        // Cập nhật state sau khi xóa thành công
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    }
  };

  // Lọc sản phẩm theo tìm kiếm và danh mục
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
    );
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Xử lý sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin mr-2" />
        <span>Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        <p>Lỗi: {error}</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
          <a 
            href="/admin/products/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            Thêm sản phẩm
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('id')}>
                  <div className="flex items-center">
                    ID
                    {sortConfig.key === 'id' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Hình ảnh</th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center">
                    Tên sản phẩm
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-right cursor-pointer" onClick={() => requestSort('price')}>
                  <div className="flex items-center justify-end">
                    Giá bán
                    {sortConfig.key === 'price' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('category')}>
                  <div className="flex items-center">
                    Danh mục
                    {sortConfig.key === 'category' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Hạn sử dụng</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">N/A</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{product.name || 'Chưa có tên'}</div>
                      <div className="text-xs text-gray-500">{product.slug || 'Chưa có slug'}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-medium text-gray-900">{formatPrice(product.price)}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">{product.category || 'Chưa phân loại'}</td>
                    <td className="py-3 px-4 text-center">{formatDate(product.expiry)}</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <a 
                        href={`/admin/products/edit/${product.id}`} 
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)} 
                        className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-l border ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
              >
                Trước
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border-t border-b ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-r border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
              >
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAdmin;