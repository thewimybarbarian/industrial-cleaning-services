-- Industrial Cleaning Services CRM Schema
-- Run this in the Supabase SQL Editor

-- Customers table
CREATE TABLE customers (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  address       TEXT NOT NULL,
  city          TEXT NOT NULL,
  zip           TEXT NOT NULL,
  notes         TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_customers_email ON customers (email);

-- Bookings table
CREATE TABLE bookings (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id     UUID REFERENCES customers(id) ON DELETE CASCADE,
  bedrooms        SMALLINT NOT NULL,
  bathrooms       SMALLINT NOT NULL,
  frequency       TEXT NOT NULL CHECK (frequency IN ('once', 'weekly', 'biweekly', 'monthly')),
  scheduled_date  DATE NOT NULL,
  scheduled_time  TEXT NOT NULL,
  price           INTEGER NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_date   ON bookings (scheduled_date);

-- Invoices table
CREATE TABLE invoices (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id      UUID REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id     UUID REFERENCES customers(id) ON DELETE CASCADE,
  invoice_number  TEXT NOT NULL UNIQUE,
  amount          INTEGER NOT NULL,
  status          TEXT NOT NULL DEFAULT 'unpaid'
                    CHECK (status IN ('unpaid', 'paid', 'void')),
  issued_at       TIMESTAMPTZ DEFAULT now(),
  paid_at         TIMESTAMPTZ,
  notes           TEXT DEFAULT ''
);

CREATE INDEX idx_invoices_status ON invoices (status);

-- Enable Row Level Security (service role bypasses RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices  ENABLE ROW LEVEL SECURITY;
