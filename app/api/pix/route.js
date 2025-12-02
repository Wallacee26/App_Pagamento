import { mp } from "@/lib/mercadoPago";
import { Payment } from "mercadopago";

export async function POST(req) {
  try {
    const { amount, description } = await req.json();

    const payment = await new Payment(mp).create({
      transaction_amount: Number(amount),
      description: description || "Pagamento PIX",
      payment_method_id: "pix",
    });

    return Response.json({
      id: payment.id,
      status: payment.status,
      qrCode: payment.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64:
        payment.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
