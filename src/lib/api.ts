const API_URL = "http://localhost:5000/gallery"; // Backend NestJS
const SERVICE_URL = "http://localhost:5000/services"; // Backend cho Service
const BLOG_URL = "http://localhost:5000/blogs"; // Backend cho Blog
const PRODUCT_URL = "http://localhost:5000/products"; // Backend cho Product
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
 * Lấy danh sách blog từ API
 */
export const getBlogs = async () => {
    try {
        const res = await fetch(BLOG_URL, { cache: "no-store" });

        if (!res.ok) {
            console.error("Lỗi khi lấy dữ liệu blog:", res.status, await res.text());
            return [];
        }

        const json = await res.json();

        if (!json || typeof json !== "object" || Object.keys(json).length === 0) {
            console.error("Dữ liệu API không hợp lệ:", json);
            return [];
        }

        return Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
    } catch (error) {
        console.error("Lỗi khi gọi API getBlogs:", error);
        return [];
    }
};


/** 
 * Lấy danh sách sản phẩm từ API
 */

export const getProducts = async () => {
    try {
        const res = await fetch(PRODUCT_URL, { cache: "no-store" });

        if (!res.ok) {
            console.error("Lỗi khi lấy sản phẩm:", res.status, res.statusText);
            return [];
        }

        const json = await res.json().catch(() => {
            console.error("Dữ liệu API không hợp lệ (không phải JSON)");
            return null;
        });

        if (!json || !json.data || !Array.isArray(json.data)) {
            console.error("Dữ liệu trả về không hợp lệ:", json);
            return [];
        }

        return json.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getProducts:", error);
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
 * Thêm blog mới
 */
export const postBlog = async (data: FormData) => {
    try {
        const res = await fetch(BLOG_URL, {
            method: "POST",
            body: data,
        });

        if (!res.ok) throw new Error(`Lỗi khi tạo blog: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


/** 
 * Thêm sản phẩm mới
 */
export const postProduct = async (data: FormData) => {
    try {
        const res = await fetch(PRODUCT_URL, {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            // Thử lấy thông tin lỗi chi tiết từ response
            const errorData = await res.json().catch(() => ({ 
                message: `Lỗi HTTP ${res.status}: ${res.statusText}` 
            }));
            console.error("Lỗi khi tạo sản phẩm:", errorData);
            return { error: errorData.message || `Lỗi HTTP ${res.status}: ${res.statusText}` };
        }

        return await res.json();
    } catch (error:any) {
        console.error("Lỗi khi post sản phẩm:", error);
        return { error: error.message || "Lỗi không xác định khi gửi dữ liệu" };
    }
};


/** 
 * Lấy chi tiết dữ liệu từ API 
 */
export const getDetail = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

        if (!res.ok) {
            console.error("Lỗi khi lấy chi tiết dữ liệu:", res.status, await res.text());
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi khi gọi API getDetail:", error);
        return null;
    }
}
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
 * Cập nhật blog
 */
export const updateBlog = async (id: number, data: { title?: string; description?: string; content?: string; images?: File[] }) => {
    try {
        const formData = new FormData();
        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.content) formData.append("content", data.content);

        // Chỉ thêm tối đa 2 ảnh vào FormData
        if (data.images) {
            data.images.slice().forEach((file, index) => {
                formData.append(`images`, file);
            });
        }

        const res = await fetch(`${BLOG_URL}/${id}`, {
            method: "PATCH",
            body: formData,
        });

        if (!res.ok) throw new Error(`Lỗi khi cập nhật blog: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


/** 
 * Cập nhật sản phẩm
 * 
 * */
export async function getProductById(id: number) {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    if (!res.ok) throw new Error("Lỗi khi tải sản phẩm");
    return res.json();
}

export const updateProduct = async (
    
    id: number,
    data: { title?: string; description?: string; content?: string; images?: File[]; gallery?: File[] }
) => {
    try {
        const formData = new FormData();

        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.content) formData.append("content", data.content);

        // Chỉ thêm 1 ảnh vào "image"
        if (data.images?.length) {
            formData.append("image", data.images[0]); // Backend nhận "image", không phải "images"
        }

        // Thêm nhiều ảnh vào "gallery"
        if (data.gallery?.length) {
            data.gallery.forEach((file) => {
                formData.append("gallery", file); // Đúng tên field backend đang nhận
            });
        }

        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: "PATCH",
            body: formData,
        });

        if (!res.ok) {
            console.error("Lỗi khi cập nhật sản phẩm:", res.status, res.statusText);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi khi update sản phẩm:", error);
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
 * Xóa blog 
 */
export const deleteBlog = async (id: number) => {
    try {
        const res = await fetch(`${BLOG_URL}/${id}`, { method: "DELETE" });

        if (!res.ok) throw new Error(`Lỗi khi xóa blog: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}



/** 
 * Xóa sản phẩm 
 */
export const deleteProduct = async (id: number) => {
    try {
        const res = await fetch(`${PRODUCT_URL}/${id}`, { method: "DELETE" });

        if (!res.ok) {
            console.error("Lỗi khi xóa sản phẩm:", res.status, res.statusText);
            return false;
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        return false;
    }
};



/** 
 * Tải ảnh lên server 
 */
// export async function uploadImage(file: File) {
//     const formData = new FormData();
//     formData.append("image", file); // Đảm bảo key là "image"

//     try {
//         const response = await fetch("http://localhost:5000/gallery/upload", {
//             method: "POST",
//             body: formData,
//         });

//         const data = await response.json();
//         console.log("Response từ API upload:", data);
//         return data;
//     } catch (error) {
//         console.error("Lỗi khi upload ảnh:", error);
//         return null;
//     }
// }
/** 
 * Tải ảnh lên server 
 */
export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await fetch("http://localhost:5000/gallery/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            console.error("Lỗi khi upload ảnh:", res.status, res.statusText);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        return null;
    }
};