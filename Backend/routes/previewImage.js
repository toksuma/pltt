const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// Công cụ lấy link ảnh đại diện từ url bên ngoài. Trả về ảnh og:image hoặc ảnh đầu tiên trên trang.

const router = express.Router();

/**
 * Lấy link ảnh đại diện từ url truyền vào (ưu tiên og:image, nếu không lấy ảnh đầu tiên trong body)
 * Trả về đường dẫn ảnh tuyệt đối, hoặc báo lỗi nếu không tìm được ảnh.
 */
router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Thiếu URL" });

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    // Ưu tiên thẻ og:image
    let image = $('meta[property="og:image"]').attr("content");

    // Nếu không có thì lấy ảnh đầu tiên trong body
    if (!image) {
      image = $("img").first().attr("src");
    }

    // Nếu không tìm thấy ảnh
    if (!image || typeof image !== "string") {
      return res.status(404).json({ error: "Không tìm thấy ảnh phù hợp" });
    }

    // Chuyển sang URL tuyệt đối nếu là link tương đối
    let absoluteUrl;
    try {
      absoluteUrl = new URL(image, url).href;
    } catch (e) {
      return res.status(500).json({ error: "Lỗi tạo đường dẫn ảnh", details: e.message });
    }

    res.json({ image: absoluteUrl });
  } catch (err) {
    res.status(500).json({
      error: "Không lấy được ảnh",
      details: err.message,
    });
  }
});

module.exports = router;