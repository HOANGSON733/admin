const API_URL = "http://localhost:5000/gallery"; // Backend NestJS
const SERVICE_URL = "http://localhost:5000/services"; // Backend cho Service

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
 * Lấy danh sách dịch vụ từ API
 */
export const getServices = async () => {
    try {
        const res = await fetch(SERVICE_URL, { cache: "no-store" });

        if (!res.ok) {
            console.error("Lỗi khi lấy dữ liệu dịch vụ:", res.status, await res.text());
            return [];
        }

        const json = await res.json();

        if (!json || typeof json !== "object" || Object.keys(json).length === 0) {
            console.error("Dữ liệu API không hợp lệ:", json);
            return [];
        }

        return Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
    } catch (error) {
        console.error("Lỗi khi gọi API getServices:", error);
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
 * Thêm dịch vụ mới
 */
export const postService = async (data: FormData) => {
    try {
        const res = await fetch(SERVICE_URL, {
            method: "POST",
            body: data,
        });

        if (!res.ok) throw new Error(`Lỗi khi tạo dịch vụ: ${res.status}`);
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
 * Cập nhật dịch vụ
 */
/** 
 * Cập nhật dịch vụ với tối đa 2 ảnh
 */
export const updateService = async (id: number, data: { title?: string; description?: string; content?: string; images?: File[] }) => {
    try {
        const formData = new FormData();
        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.content) formData.append("content", data.content);

        // Chỉ thêm tối đa 2 ảnh vào FormData
        if (data.images) {
            data.images.slice(0, 2).forEach((file, index) => {
                formData.append(`images`, file);
            });
        }

        const res = await fetch(`${SERVICE_URL}/${id}`, {
            method: "PATCH",
            body: formData,
        });

        if (!res.ok) throw new Error(`Lỗi khi cập nhật dịch vụ: ${res.status}`);
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
 * Xóa dịch vụ 
 */
export const deleteService = async (id: number) => {
    try {
        const res = await fetch(`${SERVICE_URL}/${id}`, { method: "DELETE" });

        if (!res.ok) throw new Error(`Lỗi khi xóa dịch vụ: ${res.status}`);
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
