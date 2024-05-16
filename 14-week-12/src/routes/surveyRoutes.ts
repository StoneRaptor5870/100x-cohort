import { Router } from "express";
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
} from "../controllers/surveyController";

export const surveyRouter = Router();

surveyRouter.get("/", getAllSurveys);
surveyRouter.get("/:id", getSurveyById);
surveyRouter.post("/", createSurvey);
surveyRouter.put("/:id", updateSurvey);
surveyRouter.delete("/:id", deleteSurvey);
