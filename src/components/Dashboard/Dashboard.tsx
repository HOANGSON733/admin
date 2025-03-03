import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon }) => {
  return (
    <Card className="shadow-md p-4 flex items-center space-x-4 border border-gray-200">
      <div className="text-4xl text-blue-500">{icon}</div>
      <div>
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-1 text-xl font-bold">{count}</CardContent>
      </div>
    </Card>
  );
};

export default DashboardCard;
