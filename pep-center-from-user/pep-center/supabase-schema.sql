-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    
    -- Customer info
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    
    -- Shipping address (JSONB for flexibility)
    shipping_address JSONB,
    shipping_method TEXT,
    shipping_cost NUMERIC(10,2) DEFAULT 0,
    
    -- Order items (JSONB array)
    items JSONB DEFAULT '[]'::jsonb,
    
    -- Pricing
    subtotal NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) DEFAULT 0,
    
    -- Subscription flag
    has_subscription BOOLEAN DEFAULT false,
    
    -- Payment
    payment_method TEXT,
    payment_instructions JSONB,
    stripe_session_id TEXT,
    stripe_payment_intent_id TEXT,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    
    -- Tracking
    tracking_number TEXT,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for checkout)
CREATE POLICY "Allow anonymous inserts" ON orders
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy: Allow anonymous selects by order number (for order lookup)
CREATE POLICY "Allow order lookup" ON orders
    FOR SELECT TO anon
    USING (true);

-- Policy: Allow updates via service role (for webhooks)
CREATE POLICY "Allow service updates" ON orders
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
