// src/api/product/controllers/product.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    // Acción pública para actualizar stock desde frontend/backend
    async updateStock(ctx) {
      try {
        // Seguridad opcional: chequeo de header secreto (ver sección "Seguridad")
        const secretHeader = ctx.request.header["x-update-stock-secret"];
        if (
          process.env.UPDATE_STOCK_SECRET &&
          secretHeader !== process.env.UPDATE_STOCK_SECRET
        ) {
          return ctx.unauthorized("Invalid secret");
        }

        const { productId, quantitySold } = ctx.request.body;
        if (!productId || typeof quantitySold === "undefined") {
          return ctx.badRequest("Missing productId or quantitySold");
        }

        const qty = Number(quantitySold);

        // For Strapi v5, productId can be either numeric ID or documentId
        let whereClause;
        if (isNaN(Number(productId))) {
          // It's a documentId (string)
          whereClause = { documentId: productId };
        } else {
          // It's a numeric id
          whereClause = { id: Number(productId) };
        }

        const product = await strapi.db
          .query("api::product.product")
          .findOne({ where: whereClause });
        if (!product) return ctx.notFound("Product not found");

        const current = Number(product.availableQuantity ?? 0);
        const newQuantity = current - qty;

        const updated = await strapi.db.query("api::product.product").update({
          where: whereClause,
          data: {
            availableQuantity: newQuantity,
            inStock: newQuantity > 0,
          },
          populate: true,
        });

        ctx.send({ message: "Stock updated", productId, newQuantity, updated });
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  })
);
