import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Database schema mapping for natural language queries
const SCHEMA_INFO = `
You are an AI assistant for Aishwaryam Group's real estate management system. You help analyze business data and generate SQL queries.

IMPORTANT: You can only generate SELECT queries. Never generate INSERT, UPDATE, DELETE, or any data modification queries.

Database Schema (PostgreSQL):
- customers: customer data (id, first_name, last_name, mobile, total_amount, registration_date)
- units: property units (id, project_name, status, price, area)
- payments: payment records (id, customer_id, amount, payment_date, payment_type)
- projects: real estate projects (id, name, total_units, available_units, sold_units)

Sample queries you can generate:
1. "How many customers do we have?" → SELECT COUNT(*) as total_customers FROM customers
2. "Show recent payments" → SELECT * FROM payments ORDER BY payment_date DESC LIMIT 10
3. "Which project has most sales?" → SELECT project_name, COUNT(*) as sales FROM units WHERE status = 'sold' GROUP BY project_name ORDER BY sales DESC LIMIT 5
4. "List overdue customers" → SELECT c.first_name, c.last_name, c.mobile FROM customers c WHERE c.id IN (SELECT DISTINCT customer_id FROM payments WHERE payment_date < CURRENT_DATE - INTERVAL '30 days')

Always respond with:
1. A natural language explanation
2. If applicable, a simple SELECT query
3. Format results in a user-friendly way

Respond only with valid PostgreSQL SELECT statements when SQL is needed.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Call Lovable AI to process the query
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SCHEMA_INFO },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;

    // For demo purposes, simulate some data responses
    let mockData = null;
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('customer') && lowerMessage.includes('count')) {
      mockData = [{ total_customers: 3145 }];
    } else if (lowerMessage.includes('recent payment')) {
      mockData = [
        { customer_name: 'Rajesh Kumar', amount: 250000, payment_date: '2024-01-15', payment_type: 'Bank Transfer' },
        { customer_name: 'Priya Sharma', amount: 180000, payment_date: '2024-01-14', payment_type: 'Cheque' },
        { customer_name: 'Amit Patel', amount: 320000, payment_date: '2024-01-13', payment_type: 'NEFT' }
      ];
    } else if (lowerMessage.includes('project') && lowerMessage.includes('sales')) {
      mockData = [
        { project_name: 'AISHWARYAM COURTYARD PHASE 2', sales_count: 156 },
        { project_name: 'AISHWARYAM COMFORT', sales_count: 142 },
        { project_name: 'AISHWARYAM MELODY', sales_count: 128 }
      ];
    } else if (lowerMessage.includes('overdue')) {
      mockData = [
        { customer_name: 'Suresh Reddy', mobile: '9876543210', days_overdue: 45 },
        { customer_name: 'Kavitha Nair', mobile: '9765432109', days_overdue: 32 },
        { customer_name: 'Ravi Krishnan', mobile: '9654321098', days_overdue: 28 }
      ];
    }

    return new Response(
      JSON.stringify({
        response: aiResponse,
        data: mockData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Chat AI error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process your request. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});