const router = require("express").Router();
const UserService = require("../services/UserService");
const {
  loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn,
  passwordVerifyMiddleware,
} = require("../../../middlewares/auth-middlewares.js");
const userRoles = require("../../users/constants/userRoles.js");
const statusCodes = require("../../../../constants/statusCodes.js");

router.post("/login", notLoggedIn, loginMiddleware);

router.post("/verify-password", passwordVerifyMiddleware);

router.post("/logout", verifyJWT, async (req, res, next) => {
  try {
    const domain = req.headers.origin
      ? new URL(req.headers.origin).hostname // Pega o domínio real do usuário
      : undefined; // Se não existir, mantém indefinido para funcionar localmente

    res.clearCookie("jwt", { domain, path: "/" });
    res.status(204).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await UserService.create(req.body);
    res.status(statusCodes.created).end();
  } catch (error) {
    next(error);
  }
});

router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(statusCodes.success).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/user", verifyJWT, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await UserService.getById(req.user.id);
      res.status(statusCodes.success).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", verifyJWT, async (req, res, next) => {
  try {
    const user = await UserService.getById(req.params.id);

    res.status(statusCodes.success).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyJWT, async (req, res, next) => {
  try {
    await UserService.update(req.params.id, req.body, req.user);
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      await UserService.delete(req.params.id, req.user.id);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
