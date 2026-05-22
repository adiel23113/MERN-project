import express from "express";

const userRouter = express.Router();

const users = [
  { id: 1, name: "Adiel bhuiya" },
  { id: 2, name: "saimor rohoman" },
  { id: 3, name: "eyamin sami" },
];

userRouter.get("/", (req, res) => {
  res.status(200).send({
    message: "users were returned",
    users: users,
  });
});


userRouter.get("/profile", (req, res) => {
  res.status(200).send({
    message: "users were returned her profile",
    users: users,
  });
});

export default userRouter;