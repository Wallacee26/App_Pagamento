import MercadoPagoConfig from "mercadopago";

 const accessToken = process.env.MP_ACCESS_TOKEN;

 if (!accessToken) {
   throw new Error(
     "Missing MP_ACCESS_TOKEN environment variable. Create a .env.local with MP_ACCESS_TOKEN=TEST-... for development."
   );
 }

 if (!accessToken.startsWith("TEST-") && process.env.NODE_ENV !== "production") {
   console.warn(
     "Warning: A live Mercado Pago access token is configured in a non-production environment.\n" +
       "This can trigger 'Unauthorized use of live credentials' errors. Use a TEST token for local development or set NODE_ENV=production when using live keys."
   );
 }

 export const mp = new MercadoPagoConfig({
   accessToken,
 });
