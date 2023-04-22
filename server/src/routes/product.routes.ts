import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", isAuthenticated, getProducts);
router.get("/:id", isAuthenticated, getProduct);
router.post("/", isAuthenticated, createProduct);
router.put("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

export { router as productRoutes };
