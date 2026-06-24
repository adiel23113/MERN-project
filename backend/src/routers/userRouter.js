import express from "express";
import { getUsers,getUser } from "../controllers/userController.js";
const userRouter = express.Router();


userRouter.get("/",getUsers);


userRouter.get("/profile", (req, res) => {
  res.status(200).send({
    message: "users were returned her profile",
    users: user,
  });
});
userRouter.get('/:id', getUser);

export default userRouter;