module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/App_Pagamento/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/41b88_b2ffc01c._.js",
  "build/chunks/[root-of-the-server]__9843fc98._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/App_Pagamento/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];