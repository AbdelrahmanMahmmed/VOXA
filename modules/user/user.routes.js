const express = require("express");
const userController = require("./user.controller");
const { ProtectedRoters, allwedTo } = require("../../shared/middlewares/auth");
const { UpdatedUserValidator, UpdatedUserForRoleValidator } = require("./user.validators");
const { upload } = require("../../shared/utils/UploadImage");

const router = express.Router();

router.get("/verify/:token", userController.verify);

router.use(ProtectedRoters);

router
  .route("/me")
  .get(userController.getUser)
  .put(UpdatedUserValidator, userController.UpdateName)
  .delete(userController.deleteUser);

router.get("/characters", userController.GetAllCharacters);

router.put("/update-avatar", upload.single("avatar"), userController.uploadImageProfile);

router.post("/send-verification", userController.sendVerification);

router.use(allwedTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

router.route("/:id/role").put(UpdatedUserForRoleValidator, userController.UpdateRoles);

// Export the router to be used in the main app
module.exports = router;
