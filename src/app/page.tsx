import React from "react";

// Định nghĩa kiểu dữ liệu cho từng card
interface CardProps {
  title: string;
  icon: string; // Icon có thể thay thế bằng component từ thư viện icon
  stats: {
    totalItems: number;
    pendingItems?: number;
    totalViews?: number;
    topItem?: string;
    usageRate?: string;
    revenue?: string;
    responseTime?: string;
    ctr?: string;
  };
}

// Component Card
const DashboardCard: React.FC<CardProps> = ({ title, icon, stats }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {stats.totalItems !== undefined && (
          <p>
            <strong>Số lượng:</strong> {stats.totalItems}
          </p>
        )}
        {stats.pendingItems !== undefined && (
          <p>
            <strong>Đang chờ duyệt:</strong> {stats.pendingItems}
          </p>
        )}
        {stats.totalViews !== undefined && (
          <p>
            <strong>Lượt xem:</strong> {stats.totalViews}
          </p>
        )}
        {stats.topItem && (
          <p>
            <strong>Nổi bật nhất:</strong> {stats.topItem}
          </p>
        )}
        {stats.usageRate && (
          <p>
            <strong>Tỷ lệ sử dụng:</strong> {stats.usageRate}
          </p>
        )}
        {stats.revenue && (
          <p>
            <strong>Doanh thu:</strong> {stats.revenue}
          </p>
        )}
        {stats.responseTime && (
          <p>
            <strong>Thời gian phản hồi:</strong> {stats.responseTime}
          </p>
        )}
        {stats.ctr && (
          <p>
            <strong>CTR cao nhất:</strong> {stats.ctr}
          </p>
        )}
      </div>
    </div>
  );
};

// Component Dashboard
const Dashboard: React.FC = () => {
  const galleryStats = {
    totalItems: 500,
    usageRate: "70%",
    pendingItems: 20,
  };

  const blogStats = {
    totalItems: 120,
    pendingItems: 5,
    totalViews: 50000,
    topItem: "Cách tối ưu SEO cho website",
  };

  const productStats = {
    totalItems: 300,
    pendingItems: 10,
    revenue: "$50,000",
    topItem: "Smartphone X",
  };

  const serviceStats = {
    totalItems: 20,
    pendingItems: 15,
    responseTime: "2 giờ",
    topItem: "Hỗ trợ kỹ thuật",
  };

  const bannerStats = {
    totalItems: 50,
    pendingItems: 5,
    totalViews: 10000,
    ctr: "Khuyến mãi mùa hè",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Gallery Card */}
      <DashboardCard
        title="Gallery"
        icon="🖼️"
        stats={galleryStats}
      />

      {/* Blog Card */}
      <DashboardCard
        title="Blog"
        icon="📝"
        stats={blogStats}
      />

      {/* Product Card */}
      <DashboardCard
        title="Product"
        icon="🛒"
        stats={productStats}
      />

      {/* Service Card */}
      <DashboardCard
        title="Service"
        icon="😊"
        stats={serviceStats}
      />

      {/* Banner Card */}
      <DashboardCard
        title="Banner"
        icon="🌟"
        stats={bannerStats}
      />
    </div>
  );
};

export default Dashboard;