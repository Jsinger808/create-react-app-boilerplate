import express from "express"
import DatebuyController from "./datebuy.controller.js"

const router = express.Router()
router.route("/").get(DatebuyController.apiGetBuyer)
router.route("/").put(DatebuyController.apiPutBuyer)

export default router