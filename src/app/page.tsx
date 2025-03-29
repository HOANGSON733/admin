// pages/dashboard.js
"use client"
import React, { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState('Gallery');
  
  // Dữ liệu mẫu cho Gallery
  const galleryItems = [
    { id: 1, title: 'Kiểu tóc nam 2025', imageUrl: '/placeholder-1.jpg', views: 120 },
    { id: 2, title: 'Kiểu tóc nữ mùa xuân', imageUrl: '/placeholder-2.jpg', views: 185 },
    { id: 3, title: 'Tóc nhuộm highlight', imageUrl: '/placeholder-3.jpg', views: 97 },
    { id: 4, title: 'Uốn xoăn Hàn Quốc', imageUrl: '/placeholder-4.jpg', views: 156 },
  ];
  
  // Dữ liệu mẫu cho Blog
  const blogPosts = [
    { id: 1, title: '5 cách chăm sóc tóc mùa hè', date: '2025-03-25', views: 320, comments: 15 },
    { id: 2, title: 'Bí quyết để tóc khỏe mạnh', date: '2025-03-20', views: 256, comments: 8 },
    { id: 3, title: 'Xu hướng tóc 2025', date: '2025-03-15', views: 412, comments: 23 },
  ];
  
  // Dữ liệu mẫu cho Product
  const products = [
    { id: 1, name: 'Dầu gội Salon Pro', price: '280,000 VNĐ', stock: 25, sales: 42 },
    { id: 2, name: 'Dầu xả dưỡng tóc', price: '230,000 VNĐ', stock: 18, sales: 37 },
    { id: 3, name: 'Serum dưỡng tóc cao cấp', price: '490,000 VNĐ', stock: 12, sales: 20 },
    { id: 4, name: 'Sáp vuốt tóc nam', price: '180,000 VNĐ', stock: 30, sales: 65 },
  ];
  
  // Dữ liệu mẫu cho Service
  const services = [
    { id: 1, name: 'Cắt tóc nam', price: '100,000 - 150,000 VNĐ', bookings: 45 },
    { id: 2, name: 'Cắt tóc nữ', price: '150,000 - 200,000 VNĐ', bookings: 38 },
    { id: 3, name: 'Nhuộm tóc', price: '500,000 - 1,200,000 VNĐ', bookings: 32 },
    { id: 4, name: 'Uốn tóc', price: '500,000 - 1,500,000 VNĐ', bookings: 28 },
    { id: 5, name: 'Gội đầu dưỡng sinh', price: '100,000 VNĐ', bookings: 50 },
  ];
  
  // Dữ liệu mẫu cho Banner
  const banners = [
    { id: 1, title: 'Khuyến mãi mùa hè', status: 'Active', impressions: 1250, clicks: 83 },
    { id: 2, title: 'Ưu đãi khách hàng mới', status: 'Active', impressions: 980, clicks: 75 },
    { id: 3, title: 'Combo cắt + gội', status: 'Inactive', impressions: 0, clicks: 0 },
    { id: 4, title: 'Giảm giá sản phẩm', status: 'Scheduled', impressions: 0, clicks: 0 },
  ];

  // Render nội dung tương ứng với tab đang chọn
  const renderContent = () => {
    switch(activeTab) {
      case 'Gallery':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quản lý Thư viện Ảnh</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Thêm ảnh mới</button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {galleryItems.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Xóa</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'Blog':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quản lý Bài viết</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Viết bài mới</button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bình luận</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogPosts.map(post => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.comments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Xóa</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'Product':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quản lý Sản phẩm</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Thêm sản phẩm</button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã bán</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Xóa</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'Service':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quản lý Dịch vụ</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Thêm dịch vụ</button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên dịch vụ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lần đặt</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map(service => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.bookings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Xóa</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'Banner':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quản lý Banner</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Thêm banner</button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt hiển thị</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt click</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {banners.map(banner => (
                    <tr key={banner.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{banner.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          banner.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          banner.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {banner.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.impressions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{banner.clicks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Xóa</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      default:
        return <div>Chọn tab để xem nội dung</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard Salon Tóc</title>
        <meta name="description" content="Dashboard quản lý salon tóc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Thanh điều hướng phía trên */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">SALON TÓC VIỆT</h1>
            </div>
            <div>
              <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-400">
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Container chính */}
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar với các tab như yêu cầu */}
        <div className="bg-white w-64 shadow-lg">
          <div className="py-4">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('Gallery')}
                  className={`w-full text-left py-2 px-4 flex items-center ${activeTab === 'Gallery' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Blog')}
                  className={`w-full text-left py-2 px-4 flex items-center ${activeTab === 'Blog' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Product')}
                  className={`w-full text-left py-2 px-4 flex items-center ${activeTab === 'Product' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Service')}
                  className={`w-full text-left py-2 px-4 flex items-center ${activeTab === 'Service' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Banner')}
                  className={`w-full text-left py-2 px-4 flex items-center ${activeTab === 'Banner' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM3 9l9-6 9 6" />
                  </svg>
                  Banner
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}