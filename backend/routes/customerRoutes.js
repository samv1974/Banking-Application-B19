import express from "express"
import registerController from "../controllers/customerRegisterController.js"
import userController from "../controllers/userController.js"

const router = express.Router()

router.post("/register/personalDetails",registerController.registerCustomer)
router.post("/register/updateMobile",registerController.updateMobile)
router.post("/register/verifyMobile",registerController.verifyMobile)
router.post("/register/updateEmail",registerController.updateEmail)
router.post("/register/verifyEmail",registerController.verifyEmail)
router.post("/register/employmentDetails",registerController.employmentDetails)
router.post("/register/loginDetails",registerController.loginDetails)

router.post("/user/login",userController.login)

export default router