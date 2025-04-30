import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("user_id")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("특수문자는 사용불가"),
  body("user_pw").trim().isLength({ min: 8 }).withMessage("최소 8자이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("user_name").trim().notEmpty().withMessage("user_name을 입력"),
  body("user_email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입
// POST
// http://127.0.0.1:8080/auth/signup
router.post("/sign_up", validateSignup, authController.sign_up);

// 로그인
// POST
// http://127.0.0.1:8080/auth/login
router.post("/log_in", validateLogin, authController.log_in);

// 로그인 유지

export default router;
