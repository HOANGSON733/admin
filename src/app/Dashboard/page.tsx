// pages/dashboard.js
"use client"
import React, { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  // Dữ liệu mẫu cho lịch hẹn
  const [appointments, setAppointments] = useState([
    { id: 1, clientName: 'Nguyễn Văn A', service: 'Cắt tóc', stylist: 'Trần Thị B', date: '2025-03-29', time: '10:00', status: 'confirmed' },
    { id: 2, clientName: 'Lê Thị C', service: 'Nhuộm tóc', stylist: 'Phạm Văn D', date: '2025-03-29', time: '11:30', status: 'confirmed' },
    { id: 3, clientName: 'Hoàng Văn E', service: 'Uốn tóc', stylist: 'Trần Thị B', date: '2025-03-29', time: '14:00', status: 'pending' },
    { id: 4, clientName: 'Đỗ Thị F', service: 'Cắt + Gội', stylist: 'Nguyễn Văn G', date: '2025-03-30', time: '09:00', status: 'confirmed' },
  ]);

  // Dữ liệu mẫu cho nhân viên
  const [stylists, setStylists] = useState([
    { id: 1, name: 'Trần Thị B', specialization: 'Cắt tóc, Uốn tóc', appointments: 15 },
    { id: 2, name: 'Phạm Văn D', specialization: 'Nhuộm tóc, Ép tóc', appointments: 12 },
    { id: 3, name: 'Nguyễn Văn G', specialization: 'Cắt tóc, Gội đầu', appointments: 10 },
  ]);

  // Dữ liệu mẫu cho doanh thu
  const revenueData = {
    daily: '5,500,000 VNĐ',
    weekly: '32,000,000 VNĐ',
    monthly: '120,000,000 VNĐ',
  };

  // Dữ liệu mẫu cho dịch vụ phổ biến
  const topServices = [
    { name: 'Cắt tóc', count: 45, revenue: '9,000,000 VNĐ' },
    { name: 'Nhuộm tóc', count: 32, revenue: '16,000,000 VNĐ' },
    { name: 'Uốn tóc', count: 28, revenue: '14,000,000 VNĐ' },
    { name: 'Gội đầu', count: 50, revenue: '5,000,000 VNĐ' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard Salon Tóc</title>
        <meta name="description" content="Dashboard quản lý salon tóc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Thanh điều hướng */}
      {/* <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">SALON TÓC VIỆT</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700">Dashboard</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Lịch hẹn</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Khách hàng</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Nhân viên</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Dịch vụ</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Báo cáo</a>
                </div>
              </div>
            </div>
            <div>
              <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-400">
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Nội dung chính */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Thống kê tổng quan */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-semibold mb-4">Tổng quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Lịch hẹn hôm nay</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">3</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Tổng số nhân viên</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stylists.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Doanh thu hôm nay</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{revenueData.daily}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Khách hàng mới (tháng)</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch hẹn hôm nay */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lịch hẹn hôm nay</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ Thêm lịch hẹn</button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân viên</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments
                  .filter(appointment => appointment.date === '2025-03-29')
                  .map(appointment => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.clientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.stylist}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Sửa</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Hủy</a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hàng dưới với 2 phần: nhân viên và dịch vụ phổ biến */}
        <div className="px-4 py-6 sm:px-0 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nhân viên */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Nhân viên</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên môn</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lịch hẹn</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stylists.map(stylist => (
                    <tr key={stylist.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stylist.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stylist.specialization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stylist.appointments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dịch vụ phổ biến */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Dịch vụ phổ biến</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lần</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topServices.map((service, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.count}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}