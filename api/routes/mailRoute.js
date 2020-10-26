import express from "express";
import { sendMail } from "../controllers/mailController";

const router = express.Router();

router.route("/")
    .post(sendMail);;

export default router;