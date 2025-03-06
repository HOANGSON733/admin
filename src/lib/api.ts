const API_URL = "http://localhost:5000/gallery"; // Backend NestJS

/** 
 * Lấy danh sách dữ liệu từ API 
 */
export const getData = async () => {
    try {
        const res = await fetch(API_URL, { cache: "no-store" });

        if (!res.ok) {
            console.error("Lỗi khi lấy dữ liệu:", res.status, await res.text());
            return [];
        }

        const json = await res.json();

        if (!json || typeof json !== "object" || Object.keys(json).length === 0) {
            console.error("Dữ liệu API không hợp lệ:", json);
            return [];
        }

        return Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
    } catch (error) {
        console.error("Lỗi khi gọi API getData:", error);
        return [];
    }
};

/** 
 * Thêm dữ liệu mới (hỗ trợ cả FormData cho ảnh)
 */
export const postData = async (data: FormData) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: data, // Không cần headers vì FormData tự động đặt
        });

        if (!res.ok) throw new Error(`Lỗi khi tạo dữ liệu: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** 
 * Cập nhật dữ liệu (PATCH) 
 */
export const updateData = async (id: number, data: any) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error(`Lỗi khi cập nhật dữ liệu: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/** 
 * Xóa dữ liệu 
 */
export const deleteData = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!res.ok) throw new Error(`Lỗi khi xóa dữ liệu: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return false;
    }
};

/** 
 * Tải ảnh lên server 
 */
export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file); // Đảm bảo key là "image"

    try {
        const response = await fetch("http://localhost:5000/gallery/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Response từ API upload:", data);
        return data;
    } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        return null;
    }
}




