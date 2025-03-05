import { useEffect, useState } from "react";
import { getData } from "@/services/api";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData("gallery").then(setData); // Thay 'users' bằng endpoint của bạn
  }, []);

  return (
    <div>
      <h1>Danh sách người dùng</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
