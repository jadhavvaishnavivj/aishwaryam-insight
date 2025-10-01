import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Database schema mapping for natural language queries
const SCHEMA_INFO = `
You are a friendly AI assistant for Aishwaryam Group's real estate management system. You help users understand their business data.

You have access to information about:
- Customers (names, contact details, registration dates, payment amounts)
- Properties and Units (projects, status, prices, areas)
- Payments (amounts, dates, payment types)
- Projects (names, total units, available units, sold units)

When users ask questions:
1. Provide clear, conversational answers
2. Use natural language to explain the data
3. Format numbers in a readable way (use ₹ for currency)
4. Be helpful and professional

DO NOT show SQL queries or technical database details in your responses. Just answer the question naturally.
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