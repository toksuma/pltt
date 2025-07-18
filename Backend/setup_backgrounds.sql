-- Create backgrounds table for landing page management
CREATE TABLE IF NOT EXISTS backgrounds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    active BOOLEAN DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO backgrounds (url, active, display_order) VALUES
('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop', 1, 1),
('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop', 1, 2),
('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop', 1, 3);

-- Create index for performance
CREATE INDEX idx_backgrounds_active_order ON backgrounds (active, display_order);