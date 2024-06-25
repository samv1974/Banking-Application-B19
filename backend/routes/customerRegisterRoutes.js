import express from "express"
import controller from "../controllers/customerRegisterController.js"

const router = express.Router()

router.post("/personalDetails",controller.registerCustomer)
router.post("/updateMobile",controller.updateMobile)
router.post("/verifyMobile",controller.verifyMobile)
router.post("/updateEmail",controller.updateEmail)
router.post("/verifyEmail",controller.verifyEmail)

export default router