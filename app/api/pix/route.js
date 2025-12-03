import { mp } from "@/lib/mercadoPago";
import { Payment } from "mercadopago";

export async function POST(req) {
  try {
    const { amount, description, email } = await req.json();

    const payment = await new Payment(mp).create({
      body: {
        transaction_amount: Number(amount),
        description: description || "Pagamento PIX",
        payment_method_id: "pix",
        import { mp } from "@/lib/mercadoPago";
        import { Payment } from "mercadopago";

        export async function POST(req) {
          try {
            const { amount, description, email } = await req.json();

            const payment = await new Payment(mp).create({
              body: {
                transaction_amount: Number(amount),
                description: description || "Pagamento PIX",
                payment_method_id: "pix",
                payer: {
                  email: email || "teste@teste.com",
                },
              },
            });

            return Response.json({
              id: payment.id,
              status: payment.status,
              qrCode: payment.point_of_interaction.transaction_data.qr_code,
              qrCodeBase64: payment.point_of_interaction.transaction_data.qr_code_base64,
            });
          } catch (error) {
            console.log("ERRO MERCADO PAGO:", error);

            // Mercado Pago SDK returns structured errors; try to extract status/code
            const status = (error && error.status) || 400;
            const message = (error && error.message) || "Erro desconhecido do Mercado Pago";

            return Response.json({ error: message }, { status });
          }
        }
