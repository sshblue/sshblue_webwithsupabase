-- Create user_servers table to track which servers are assigned to which users
CREATE TABLE user_servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Relations
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- Server Details
    ip_address VARCHAR(45),
    ssh_port INTEGER DEFAULT 22,
    username VARCHAR(50) NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'provisioning',
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Constraints
    UNIQUE(user_id, product_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_user_servers_user ON user_servers(user_id);
CREATE INDEX idx_user_servers_product ON user_servers(product_id);
CREATE INDEX idx_user_servers_status ON user_servers(status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_user_servers_updated_at
    BEFORE UPDATE ON user_servers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
