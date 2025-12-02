import { stripe } from "@/lib/stripe";

export async function POST(req) {
  const { paymentIntentId } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return Response.json({
      status: paymentIntent.status,
      paymentMethod: paymentIntent.paymentMethod, // confirma que foi PIX
      amount: paymentIntent.amount,
      confirmed: paymentIntent.status === "succeeded",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
