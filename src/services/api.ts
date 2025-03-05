const API_URL = "http://localhost:5000/"; // Đổi thành URL backend của bạn

export const getData = async (gallery: string) => {
  const res = await fetch(`${API_URL}/${gallery}`);
  return res.json();
};

export const postData = async (gallery: string, data: any) => {
  const res = await fetch(`${API_URL}/${gallery}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateData = async (gallery: string, id: number, data: any) => {
  const res = await fetch(`${API_URL}/${gallery}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
