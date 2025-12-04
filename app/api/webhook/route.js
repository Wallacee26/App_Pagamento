// app/api/webhook/route.js
import mercadopago from "mercadopago";
import fs from "fs";
import PDFDocument from "pdfkit";

mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

export async function POST(req) {
  try {
    const payload = await req.json();

    // A doc mostra payloads com: { type: 'payment', action: 'payment.updated', data: { id: '123' } }
    // Ao receber notificação, chamar GET /v1/payments/{id} para obter dados completos.
    const eventType = payload.type || payload.topic || null;
    const dataId =
      payload.data?.id || payload.data?.object?.id || payload.id || null;

    // Responder 200 rapidamente para confirmar recebimento (doc: MP espera 200/201).
    // Mas antes, processe de forma assíncrona: buscar payment e gerar PDF se aprovado.
    if (!dataId) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Busca dados do pagamento no Mercado Pago
    const payment = await mercadopago.payment.findById(dataId);
    const p = payment.body;

    // Checar status: approved (ou 'approved' -> 'approved' é o status final)
    // Os status possíveis: pending, approved, rejected, refunded, etc.
    if (p.status === "approved") {
      // Gerar PDF de comprovante e salvar em disco
      const pdfsDir = process.env.PDFS_DIR || "./pdfs";
      if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

      const id = p.id;
      const filePath = `${pdfsDir}/comprovante-${id}.pdf`;

      // Se já existe, não sobrescrever
      if (!fs.existsSync(filePath)) {
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc
          .fontSize(18)
          .text("Comprovante de Pagamento - PIX", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Nome: ${p.payer?.first_name || ""}`);
        doc.text(`Email: ${p.payer?.email || ""}`);
        doc.text(`Valor: R$ ${(p.transaction_amount || 0).toFixed(2)}`);
        doc.text(`ID Transação (MP): ${p.id}`);
        doc.text(`Status: ${p.status}`);
        doc.text(`Data: ${new Date().toLocaleString()}`);

        // Se existir QR code base64, inserir imagem
        const qr_base64 =
          p.point_of_interaction?.transaction_data?.qr_code_base64;
        if (qr_base64) {
          const buf = Buffer.from(qr_base64, "base64");
          doc.moveDown();
          try {
            doc.image(buf, { fit: [250, 250], align: "center" });
          } catch (e) {
            console.warn("Não foi possível inserir QR no PDF:", e);
          }
        }

        doc.end();
        // aguardar fim de escrita
        await new Promise((res, rej) =>
          stream.on("finish", res).on("error", rej)
        );
      }

      // Aqui você poderia enviar e-mail com o PDF, atualizar DB, etc.
    }

    // Responder OK para MP
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Webhook erro:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
