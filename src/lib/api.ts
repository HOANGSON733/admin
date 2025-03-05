// api.ts
const API_URL = "http://localhost:5000/gallery"; // Backend NestJS

export const getData = async () => {
    const res = await fetch("http://localhost:5000/gallery", { cache: "no-store" });
  
    if (!res.ok) {
      console.error("Lỗi khi lấy dữ liệu:", res.status, await res.text());
      return [];
    }
  
    const json = await res.json();
  
    // Nếu API trả về object rỗng {}, gán thành mảng rỗng []
    if (!json || typeof json !== "object" || Object.keys(json).length === 0) {
      console.error("Dữ liệu API không hợp lệ:", json);
      return [];
    }
  
    // Nếu API có key "data" chứa mảng
    if (Array.isArray(json.data)) {
      return json.data;
    }
  
    // Nếu API trả về trực tiếp mảng
    if (Array.isArray(json)) {
      return json;
    }
  
    console.error("Dữ liệu không phải mảng:", json);
    return [];
  };
  

export const postData = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateData = async (id: number, data: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteData = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
