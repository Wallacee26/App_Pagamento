// app/api/status/route.js
import mercadopago from "mercadopago";

mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return new Response(JSON.stringify({ error: "id obrigatório" }), {
      status: 400,
    });

  try {
    const payment = await mercadopago.payment.findById(id);
    return new Response(JSON.stringify(payment.body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erro consultar status:", err);
    return new Response(
      JSON.stringify({ error: "erro ao consultar payment" }),
      { status: 500 }
    );
  }
}
