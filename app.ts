import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { stripeService } from "./Services/stripeService.ts";


const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // Home route
    if (path === "/" && method === "GET") {
        return new Response("Welcome to the Theater API!", { status: 200 });
    }

    // API routes
    if (path.startsWith("/api")) {
        // Stripe payment routes
        if (path === "/api/payment/create-intent" && method === "POST") {
            return await stripeService.createpaymentIntent(req);
        }

        // if (path === "/api/payment/webhook" && method === "POST") {
        //     return await stripeService.handleWebhook(req);
        // }

        // Email confirmation route
        if (path === "/api/email/send-confirmation" && method === "POST") {
            return await sendConfirmationEmail(req);
        }
    }

    // If no route matches, return 404
    return new Response("Not Found", { status: 404 });
};


// Simple email sending function
async function sendConfirmationEmail(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const { email, ticketDetails } = body;

        if (!email || !ticketDetails) {
            return new Response(
                JSON.stringify({ error: "Email and ticket details are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Here you would implement your email sending logic
        // For now, we'll just simulate a successful email send
        console.log(`Sending confirmation email to ${email} for ticket ${JSON.stringify(ticketDetails)}`);

        return new Response(
            JSON.stringify({ success: true, message: "Confirmation email sent" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error:any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

console.log("Server running on http://localhost:8000");
serve(handler, { port: 8000 });