import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get request data
    const { amount, donationType, projectId, projectName } = await req.json();
    
    if (!amount || amount <= 0) {
      throw new Error("Invalid donation amount");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Try to get authenticated user (optional for donations)
    let user = null;
    let customerId = null;
    
    try {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
        
        if (user?.email) {
          // Check if customer exists
          const customers = await stripe.customers.list({ email: user.email, limit: 1 });
          if (customers.data.length > 0) {
            customerId = customers.data[0].id;
          }
        }
      }
    } catch (authError) {
      console.log("No authenticated user, proceeding with guest checkout");
    }

    // Determine mode and product name
    const mode = donationType === "monthly" ? "subscription" : "payment";
    const productName = projectId === "general" 
      ? `Spende - Wo am meisten benötigt` 
      : `Spende - ${projectName || "Projekt"}`;
    
    const description = donationType === "monthly" 
      ? "Monatliche Spende für ShamSy e.V." 
      : "Einmalige Spende für ShamSy e.V.";

    // Create checkout session with dynamic pricing
    const sessionData: any = {
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: description,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
            ...(donationType === "monthly" && {
              recurring: {
                interval: "month",
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode,
      success_url: `${req.headers.get("origin")}/spenden?success=true&amount=${amount}&type=${donationType}`,
      cancel_url: `${req.headers.get("origin")}/spenden?canceled=true`,
      metadata: {
        project_id: projectId,
        project_name: projectName || "General",
        donation_type: donationType,
        amount: amount.toString(),
      },
    };

    // Add customer info if available
    if (customerId) {
      sessionData.customer = customerId;
    } else if (user?.email) {
      sessionData.customer_email = user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
