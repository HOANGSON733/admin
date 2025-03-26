const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const BANNER_URL = `${BASE_URL}/banners`;

export const getBanners = async () => {
    try {
        const res = await fetch(BANNER_URL, { cache: "no-store" });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lỗi khi lấy dữ liệu: ${res.status} - ${errorText}`);
        }
        const json = await res.json();
        if (!json || typeof json !== "object" || Object.keys(json).length === 0) {
            throw new Error("Dữ liệu API không hợp lệ");
        }
        return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
        console.error("❌ Lỗi khi gọi API getBanners:", error);
        throw error;
    }
};


export const createBanner = async (data: FormData) => {
    try {
        console.log("📤 Dữ liệu gửi đi:", Object.fromEntries(data.entries())); // Log dữ liệu gửi lên API

        const res = await fetch(BANNER_URL, {
            method: "POST",
            body: data, // Không cần headers khi gửi FormData
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lỗi khi tạo dữ liệu: ${res.status} - ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("❌ Lỗi khi tạo banner:", error);
        return null;
    }
};

export const getBannerById = async (id: number) => {
    try {
        const response = await fetch(`${BANNER_URL}/${id}`);
        if (!response.ok) throw new Error("Lỗi khi lấy banner");
        const json = await response.json();
        return json.data || json; // Điều chỉnh dựa trên response thực tế
    } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
        throw error; // Ném lỗi để thông báo
    }
};

export const updateBanner = async (id: number, data: FormData) => {
    try {
      const response = await fetch(`${BANNER_URL}/${id}`, {
        method: "PATCH",
        body: data,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi cập nhật banner: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi cập nhật banner:", error);
      throw error; // Ném lỗi để thông báo
    }
  };

export const deleteBanner = async (id: number) => {
    try {
        const res = await fetch(`${BANNER_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Lỗi khi xóa banner");

        return await res.json();
    } catch (error) {
        console.error("Lỗi khi xóa banner:", error);
        return null;
    }
};


export const uploadImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        console.log("📤 Upload ảnh:", file.name);
        console.log("📤 Kiểm tra FormData:", formData.get("image"));

        const res = await fetch("http://localhost:5000/gallery/uploads", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lỗi khi upload ảnh: ${res.status} - ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("❌ Lỗi khi upload ảnh:", error);
        return null;
    }
};
