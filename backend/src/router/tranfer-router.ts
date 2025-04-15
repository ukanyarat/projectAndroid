import express from "express";
import * as TranferController from "../controller/tranfer-controller";

const router = express.Router();

router.get("/tranfers", TranferController.getTranfers);
router.get("/tranfers/:id", TranferController.getTranfer);
router.post("/tranfers", TranferController.createTranfer);
router.put("/tranfers/:id", TranferController.updateTranfer);
router.delete("/tranfers/:id", TranferController.deleteTranfer);

export default router;