import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "../axios";

/**
 * Quản lý ảnh nền landing page: thêm, xóa, kích hoạt, kéo thả sắp xếp thứ tự.
 * - Không dùng icon, chỉ nút text, tối giản UI.
 * - Comment tổng quan sau import.
 * - Comment rõ cho từng khối/hàm chính.
 * - Làm gọn code, không đổi logic.
 */

// Sortable Item Component: hiển thị từng ảnh nền, nút xóa/kích hoạt, kéo thả
const SortableItem = ({ id, background, onDelete, onToggleActive }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md border-2 overflow-hidden ${
        background.active ? "border-yellow-500" : "border-gray-200"
      }`}
    >
      <div className="relative">
        <img
          src={background.url}
          alt={`Background ${background.id}`}
          className="w-full h-32 object-cover"
          onError={(e) => {
            e.target.src = "/uploads/bg1.jpg"; // Fallback image
          }}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onToggleActive(background.id)}
            className={`p-1 rounded text-white text-xs ${
              background.active
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
            title={background.active ? "Deactivate" : "Activate"}
          >
            {/* Đổi icon mắt bằng text */}
            {background.active ? "👁" : "🙈"}
          </button>
          <button
            onClick={() => onDelete(background.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
            title="Delete"
          >
            {/* Đổi icon thùng rác bằng text */}
            Xóa
          </button>
        </div>
        {background.active && (
          <span className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
            Đang sử dụng
          </span>
        )}
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 truncate">{background.url}</p>
          <p className="text-xs text-gray-400">
            Thứ tự: {background.display_order}
          </p>
        </div>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          {/* Đổi icon kéo bằng text */}
          ≡
        </div>
      </div>
    </div>
  );
};

const BackgroundManager = () => {
  // State lưu danh sách background, trạng thái upload, nhập url, loading, error
  const [backgrounds, setBackgrounds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo sensors cho kéo thả (chuột & bàn phím)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Lấy danh sách background khi load trang
  useEffect(() => {
    fetchBackgrounds();
    // eslint-disable-next-line
  }, []);

  // Lấy backgrounds từ backend
  const fetchBackgrounds = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/backgrounds");
      setBackgrounds(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
      setError("Không thể tải danh sách backgrounds");
    } finally {
      setLoading(false);
    }
  };

  // Thêm background từ URL
  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!urlInput) return;

    try {
      setUploading(true);
      const response = await axios.post("/api/backgrounds", {
        url: urlInput,
        active: 0,
      });

      if (response.data.success) {
        await fetchBackgrounds(); // Làm mới danh sách
        setUrlInput("");
      } else {
        setError("Thêm background không thành công.");
      }
    } catch (error) {
      console.error("Error adding background:", error);
      setError("Không thể thêm background");
    } finally {
      setUploading(false);
    }
  };

  // Xóa background
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh nền này?")) {
      try {
        await axios.delete(`/api/backgrounds/${id}`);
        await fetchBackgrounds();
      } catch (error) {
        console.error("Error deleting background:", error);
        setError("Không thể xóa background");
      }
    }
  };

  // Bật/tắt trạng thái active
  const handleToggleActive = async (id) => {
    try {
      await axios.put(`/api/backgrounds/${id}/toggle`);
      await fetchBackgrounds();
    } catch (error) {
      console.error("Error toggling background:", error);
      setError("Không thể cập nhật trạng thái background");
    }
  };

  // Kéo thả sắp xếp lại thứ tự background
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = backgrounds.findIndex((item) => item.id === active.id);
      const newIndex = backgrounds.findIndex((item) => item.id === over.id);

      const newBackgrounds = arrayMove(backgrounds, oldIndex, newIndex);
      setBackgrounds(newBackgrounds);

      // Update order in backend
      try {
        const backgroundIds = newBackgrounds.map((bg) => bg.id);
        await axios.put("/api/backgrounds/reorder", { backgroundIds });
      } catch (error) {
        console.error("Error updating order:", error);
        setError("Không thể cập nhật thứ tự");
        await fetchBackgrounds();
      }
    }
  };

  // Loading hiển thị khi lấy dữ liệu
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Quản lý ảnh nền Landing Page</h2>
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form thêm background qua URL */}
      <form className="mb-6 bg-gray-50 p-4 rounded-lg" onSubmit={handleAddUrl}>
        <label className="block mb-2 font-medium text-gray-700">
          Thêm ảnh nền bằng đường dẫn URL:
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Dán link hình ảnh (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Đang thêm..." : "Thêm"}
          </button>
        </div>
      </form>

      {/* Danh sách background, drag/sort được */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">
          Danh sách ảnh nền ({backgrounds.length})
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Kéo thả để sắp xếp thứ tự hiển thị. Ảnh có biểu tượng 👁 sẽ được hiển thị trên trang chủ.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={backgrounds.map((bg) => bg.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backgrounds.map((background) => (
              <SortableItem
                key={background.id}
                id={background.id}
                background={background}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {backgrounds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Chưa có ảnh nền nào. Hãy thêm ảnh nền đầu tiên!
          </p>
        </div>
      )}
    </div>
  );
};

export default BackgroundManager;