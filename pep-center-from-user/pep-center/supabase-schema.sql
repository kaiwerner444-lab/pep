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

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    subscription_tier INTEGER DEFAULT 0,
    billing_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

-- Service role can manage all profiles
CREATE POLICY "Service can manage profiles" ON profiles
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, subscription_tier)
    VALUES (NEW.id, NEW.email, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Add user_id to orders table for tracking
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Update orders policy to allow users to view their own orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR customer_email = auth.jwt()->>'email');
