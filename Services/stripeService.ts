import Stripe from "https://esm.sh/stripe@12.4.0";

const STRIPE_SECRET_KEY =  "sk_test_51QyWMfQIfffWksP3k1jEsbWB6cSxC7FAEakfOTsyaPwnWocNPGCPCWYI97oy2UHhVVEx806MQvkzxDz5NAPz4x7d00spAzFWXr";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "your_webhook_secret_here";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

export const stripeService = {

    async createpaymentIntent(req: Request): Promise<Response> {
        try {
            const body = await req.json();
            const {amount, currency = "usd", metadata, movieDetails} = body;
            console.log( "movieDetails", movieDetails)
            console.log( "amount", amount * 100)
            console.log( "currency", currency)
            console.log( "metadata", metadata)


            if(!amount) {
                return new Response(
                    JSON.stringify({ error: "Amount is required" }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount:Math.round(amount * 100),
            //     currency,
            //     metadata,
            //     automatic_payment_methods: {
            //         enabled: true,
            //     },
            // });

            return new Response(
                JSON.stringify({ clientSecret: "paymentIntent.client_secret",  paymentIntentId: "paymentIntent.id" }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )

            // return new Response(
            //     JSON.stringify({ clientSecret: paymentIntent.client_secret,  paymentIntentId: paymentIntent.id }),
            //     { status: 200, headers: { "Content-Type": "application/json" } }
            // );

        }catch (error) {
            throw error;
        }
    }


}