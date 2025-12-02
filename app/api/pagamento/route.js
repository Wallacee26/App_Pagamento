import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nome, valor, email } = await req.json();

    // 1) Criar ID da transação
    const transactionId = `txn_${Date.now()}`;
    const dataPagamento = new Date().toISOString();

    // 2) Criar documento PDF em memória
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const chunks = [];
    const stream = doc.on("data", (chunk) => chunks.push(chunk));

    const pdfGeneration = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    // --- Conteúdo do PDF ---
    doc.fontSize(20).text("Comprovante de Pagamento", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Nome: ${nome}`);
    doc.text(`Email: ${email || "N/A"}`);
    doc.text(`Valor: R$ ${Number(valor).toFixed(2)}`);
    doc.text(`ID da transação: ${transactionId}`);
    doc.text(`Data: ${dataPagamento}`);

    doc.moveDown();
    doc.fontSize(10).text("Gerado automaticamente pelo sistema SenacLab.");

    // Finalizar PDF
    doc.end();

    const pdfBuffer = await pdfGeneration;

    // 3) Retornar PDF como base64 para o frontend
    const pdfBase64 = pdfBuffer.toString("base64");

    return NextResponse.json({
      status: "ok",
      transactionId,
      pdfBase64,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao gerar o PDF" },
      { status: 500 }
    );
  }
}
