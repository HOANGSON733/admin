import DashboardCard from "@/components/Dashboard/Dashboard";
import { FaUsers, FaDollarSign, FaHandScissors  } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Grid layout để hiển thị đẹp trên các màn hình */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Doanh thu tháng" count="50.000.000 VND" icon={<FaDollarSign />} />
        <DashboardCard title="Số lượng khách hàng" count="125" icon={<FaUsers />} />
        <DashboardCard title="Dịch vụ phổ biến" count="Cắt tóc, Gội đầu" icon={<FaHandScissors  />} />
      </div>
    </div>
  );
};

export default Dashboard;
