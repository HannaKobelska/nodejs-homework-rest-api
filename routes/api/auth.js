const express = require("express");

const ctrl = require("../../controllers/auth")

const { ctrlWrapper } = require("../../helpers");

const {validateBody, authenticate, upload} = require("../../middlewares")

const {schemas} = require("../../models/user")

const router = express.Router();

// signup
router.post("/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.patch("/updatesubscription", authenticate, validateBody(schemas.updateUserSubscriptionSchema), ctrlWrapper(ctrl.updateUserSubscription))

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;