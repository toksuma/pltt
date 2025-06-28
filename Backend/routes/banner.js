import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM banners ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Error fetching banners:", err);
      return res.status(500).json({ error: "Error fetching banners" });
    }
    res.json(results);
  });
});
router.get("/active", (req, res) => {
  db.query(
    "SELECT * FROM banners WHERE active = 1 ORDER BY id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error("Error fetching active banner:", err);
        return res.status(500).json({ error: "Error fetching active banner" });
      }
      res.json(results[0] || null);
    }
  );
});

router.post("/", (req, res) => {
  const { title, description, image_url, active } = req.body;

  const insertBanner = () => {
    db.query(
      "INSERT INTO banners (title, description, image_url, active) VALUES (?, ?, ?, ?)",
      [title, description, image_url, active ? 1 : 0],
      (err) => {
        if (err) {
          console.error("Error adding banner:", err);
          return res.status(500).json({ error: "Error adding banner" });
        }
        res.json({ success: true });
      }
    );
  };

  if (active) {
    db.query("UPDATE banners SET active = 0", (err) => {
      if (err) {
        console.error("Error updating active status:", err);
        return res.status(500).json({ error: "Error updating active status" });
      }
      insertBanner();
    });
  } else {
    insertBanner();
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM banners WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting banner:", err);
      return res.status(500).json({ error: "Error deleting banner" });
    }
    res.json({ success: true });
  });
});

router.put("/:id/activate", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE banners SET active = 0", (err) => {
    if (err) return res.status(500).json({ error: "Error updating banners" });
    db.query("UPDATE banners SET active = 1 WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ error: "Error activating banner" });
      res.json({ success: true });
    });
  });
});

export default router;
