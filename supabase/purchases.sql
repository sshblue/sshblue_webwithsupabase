-- Create an enum for order status
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'active', 'cancelled', 'suspended');

-- Create purchases table
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- User Information
    user_id UUID NOT NULL REFERENCES auth.users(id),
    
    -- Server Configuration
    product_id UUID NOT NULL REFERENCES products(id),
    server_name VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    os_name VARCHAR(100) NOT NULL,
    os_version VARCHAR(50) NOT NULL,
    
    -- Resources
    cpu_cores INTEGER NOT NULL,
    ram_gb INTEGER NOT NULL,
    storage_gb INTEGER NOT NULL,
    bandwidth_tb DECIMAL(10,2) NOT NULL,
    
    -- Additional Options
    backup_enabled BOOLEAN DEFAULT false,
    ddos_protection BOOLEAN DEFAULT false,
    managed_support BOOLEAN DEFAULT false,
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    ram_price DECIMAL(10,2) DEFAULT 0,
    storage_price DECIMAL(10,2) DEFAULT 0,
    options_price DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    
    -- Server Status
    status order_status DEFAULT 'pending',
    ip_address VARCHAR(45),
    ssh_port INTEGER DEFAULT 22,
    
    -- Metadata
    notes TEXT,
    tags TEXT[]
);

-- Create index for common queries
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_created ON purchases(created_at);

-- Add RLS policies
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Users can only see their own purchases
CREATE POLICY "Users can view their own purchases"
    ON purchases FOR SELECT
    USING (auth.uid() = user_id);

-- Users can only insert their own purchases
CREATE POLICY "Users can create their own purchases"
    ON purchases FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only update their own pending purchases
CREATE POLICY "Users can update their pending purchases"
    ON purchases FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending')
    WITH CHECK (auth.uid() = user_id AND status = 'pending');
