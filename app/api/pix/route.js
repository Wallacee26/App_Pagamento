import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: body.amount,
        description: "Pagamento PIX",
        payment_method_id: "pix",
        payer: {
          email: body.email,
          first_name: body.first_name,
        },
      },
    });

    return Response.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code,
      qr_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (e) {
    console.error(e);
    return new Response("Erro", { status: 500 });
  }
}
