import { Router } from "express";
import { signinSchema, signupSchema } from "@repo/schemas";
import { SigninHandler, SignupHandler } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";

const authRouter: Router = Router();


authRouter.post('/signup', validate(signupSchema), SignupHandler)
authRouter.post('/signin', validate(signinSchema), SigninHandler)

export default authRouter;