import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { amount, customerName } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "brl",

      // Stripe v20 – não use payment_method_types
      paymentMethodConfiguration: "pmc_PIX",

      metadata: {
        customerName,
      },
    });

    // Stripe v20 – nextAction mudou
    const pixInfo = paymentIntent.nextAction?.pixDisplayQrCode;

    return Response.json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      qrCode: pixInfo?.imageUrlPng,
      qrCodeText: pixInfo?.qrCode,
      expiresAt: paymentIntent.expiresAt,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
