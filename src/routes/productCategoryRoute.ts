import { Router } from "express";
import { productCategoryHandler } from "../handlers/productCategoryHandler";

const router = Router();

router.get("/", productCategoryHandler);

export default router;