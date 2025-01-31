-- Create an enum for server status
CREATE TYPE server_status AS ENUM ('available', 'reserved', 'maintenance');

-- Create products table for SSH servers
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Server Details
    name VARCHAR(255) NOT NULL,
    description TEXT,
    server_type VARCHAR(50) NOT NULL, -- e.g., 'VPS', 'Dedicated', 'Shared'
    
    -- Technical Specifications
    cpu_cores INTEGER NOT NULL,
    ram_gb INTEGER NOT NULL,
    storage_gb INTEGER NOT NULL,
    bandwidth_tb DECIMAL(10,2) NOT NULL,
    location VARCHAR(100) NOT NULL, -- Physical location of the server
    
    -- Pricing
    price_per_month DECIMAL(10,2) NOT NULL,
    setup_fee DECIMAL(10,2) DEFAULT 0,
    
    -- Server Status and Management
    status server_status DEFAULT 'available',
    ip_address VARCHAR(45), -- Supports both IPv4 and IPv6
    ssh_port INTEGER DEFAULT 22,
    
    -- Operating System
    os_name VARCHAR(100) NOT NULL,
    os_version VARCHAR(50) NOT NULL,
    
    -- Additional Features
    backup_included BOOLEAN DEFAULT false,
    ddos_protection BOOLEAN DEFAULT false,
    managed_support BOOLEAN DEFAULT false,
    
    -- Metadata
    is_active BOOLEAN DEFAULT true,
    tags TEXT[] -- Array of tags for filtering/categorization
);

-- Create an index on commonly queried fields
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_location ON products(location);
CREATE INDEX idx_products_price ON products(price_per_month);

-- Add some sample data
INSERT INTO products (
    name,
    description,
    server_type,
    cpu_cores,
    ram_gb,
    storage_gb,
    bandwidth_tb,
    location,
    price_per_month,
    os_name,
    os_version,
    tags
) VALUES 
(
    'Starter VPS',
    'Perfect for development and testing environments',
    'VPS',
    2,
    4,
    80,
    2.0,
    'Paris, France',
    19.99,
    'Ubuntu',
    '22.04 LTS',
    ARRAY['starter', 'development', 'vps']
),
(
    'Business Pro',
    'Ideal for production workloads and small businesses',
    'VPS',
    4,
    8,
    160,
    5.0,
    'Frankfurt, Germany',
    39.99,
    'Debian',
    '11',
    ARRAY['business', 'production', 'vps']
),
(
    'Enterprise Dedicated',
    'High-performance dedicated server with premium support',
    'Dedicated',
    8,
    32,
    500,
    10.0,
    'Amsterdam, Netherlands',
    99.99,
    'Ubuntu',
    '22.04 LTS',
    ARRAY['enterprise', 'dedicated', 'high-performance']
);
