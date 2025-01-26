import { Router } from "express";
import {
  getGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  selfDestruct,
} from "../controllers/gadget.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getGadgets); // Protect this route
router.post("/add", authenticate, addGadget); 
router.patch("/:id", authenticate, authorize(["admin"]), updateGadget); // Only admin can update gadget
router.delete("/:id", authenticate, authorize(["admin"]), deleteGadget); // Only admin can delete gadget
router.post("/:id/self-destruct", authenticate, selfDestruct);

export default router;
