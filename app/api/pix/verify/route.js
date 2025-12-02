import { mp } from "@/lib/mercadoPago";
import { Payment } from "mercadopago";

export async function POST(req) {
  try {
    const { id } = await req.json();

    const payment = await new Payment(mp).get({ id });

    return Response.json({
      status: payment.status,
      detail: payment.status_detail,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
