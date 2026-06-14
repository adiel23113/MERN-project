import express from "express";
import { getUsers } from "../controllers/userController.js";
const userRouter = express.Router();


userRouter.get("/",getUsers);



userRouter.get("/profile", (req, res) => {
  res.status(200).send({
    message: "users were returned her profile",
    users: users,
  });
});

export default userRouter;