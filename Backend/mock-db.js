// Mock database for demonstration purposes
const mockBackgrounds = [
  { 
    id: 1, 
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop", 
    active: 1, 
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    id: 2, 
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop", 
    active: 1, 
    display_order: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    id: 3, 
    url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop", 
    active: 1, 
    display_order: 3,
    created_at: new Date(),
    updated_at: new Date()
  }
];

let nextId = 4;

const mockDb = {
  connect: (callback) => {
    console.log("✅ Kết nối CSDL thành công (Mock DB)");
    if (callback) callback();
  },
  
  query: (sql, params, callback) => {
    console.log("Mock DB Query:", sql);
    
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    
    setTimeout(() => {
      try {
        if (sql.includes('SELECT * FROM backgrounds WHERE active = 1')) {
          const activeBackgrounds = mockBackgrounds.filter(bg => bg.active === 1);
          callback(null, activeBackgrounds);
        } 
        else if (sql.includes('SELECT * FROM backgrounds ORDER BY display_order')) {
          const sortedBackgrounds = [...mockBackgrounds].sort((a, b) => a.display_order - b.display_order);
          callback(null, sortedBackgrounds);
        }
        else if (sql.includes('SELECT MAX(display_order)')) {
          const maxOrder = Math.max(...mockBackgrounds.map(bg => bg.display_order));
          callback(null, [{ max_order: maxOrder }]);
        }
        else if (sql.includes('INSERT INTO backgrounds')) {
          const [url, active, display_order] = params;
          const newBg = {
            id: nextId++,
            url,
            active,
            display_order,
            created_at: new Date(),
            updated_at: new Date()
          };
          mockBackgrounds.push(newBg);
          callback(null, { insertId: newBg.id, affectedRows: 1 });
        }
        else if (sql.includes('UPDATE backgrounds SET display_order')) {
          const [display_order, id] = params;
          const bg = mockBackgrounds.find(b => b.id === id);
          if (bg) {
            bg.display_order = display_order;
            bg.updated_at = new Date();
            callback(null, { affectedRows: 1 });
          } else {
            callback(null, { affectedRows: 0 });
          }
        }
        else if (sql.includes('UPDATE backgrounds SET active = NOT active')) {
          const [id] = params;
          const bg = mockBackgrounds.find(b => b.id === id);
          if (bg) {
            bg.active = bg.active === 1 ? 0 : 1;
            bg.updated_at = new Date();
            callback(null, { affectedRows: 1 });
          } else {
            callback(null, { affectedRows: 0 });
          }
        }
        else if (sql.includes('UPDATE backgrounds SET url')) {
          const [url, active, id] = params;
          const bg = mockBackgrounds.find(b => b.id === id);
          if (bg) {
            bg.url = url;
            bg.active = active;
            bg.updated_at = new Date();
            callback(null, { affectedRows: 1 });
          } else {
            callback(null, { affectedRows: 0 });
          }
        }
        else if (sql.includes('DELETE FROM backgrounds')) {
          const [id] = params;
          const index = mockBackgrounds.findIndex(b => b.id === id);
          if (index !== -1) {
            mockBackgrounds.splice(index, 1);
            callback(null, { affectedRows: 1 });
          } else {
            callback(null, { affectedRows: 0 });
          }
        }
        else {
          callback(null, { success: true });
        }
      } catch (error) {
        callback(error);
      }
    }, 100); // Simulate some network delay
  }
};

module.exports = mockDb;