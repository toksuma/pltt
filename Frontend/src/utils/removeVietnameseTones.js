// utils/removeVietnameseTones.js
export function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/\\p{Diacritic}/gu, "")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}
