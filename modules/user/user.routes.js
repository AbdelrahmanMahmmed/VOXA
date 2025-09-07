const express = require("express");
const {
  getUser,
  UpdateUser,
  deleteUser,
  getAllUsers,
  UpdateRoles,
  GetAllCharacters,
  uploadImageProfile,
  UpdateName,
  sendVerification,
  verify,
} = require("./user.controller");
const { ProtectedRoters, allwedTo } = require("../../shared/middlewares/auth");
const {
  UpdatedUserValidator,
  UpdatedUserForRoleValidator,
} = require("./user.validators");
const { upload } = require("../../shared/utils/UploadImage");

const router = express.Router();

router.get("/verify/:token", verify);

router.use(ProtectedRoters);

router
  .route("/me")
  .get(getUser)
  .put(UpdatedUserValidator, UpdateName)
  .delete(deleteUser);

router.get("/characters", GetAllCharacters);

router.put("/update-avatar", upload.single("avatar"), uploadImageProfile);

router.post("/send-verification", sendVerification);

router.use(allwedTo("admin"));
router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(getUser)
  .put(UpdatedUserValidator, UpdateUser)
  .delete(deleteUser);

router.route("/:id/role").put(UpdatedUserForRoleValidator, UpdateRoles);

// Export the router to be used in the main app
module.exports = router;
