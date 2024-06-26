import { Request, Response } from "express";
import { prisma } from "../model/surveyModel"
import surveyModel from "../model/surveyModel";

export const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const surveys = await surveyModel.getAllSurveys();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching surveys' });
  }
}

export const getSurveyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const survey = await surveyModel.getSurveyById(Number(id));
    if (survey) {
      res.status(200).json(survey);
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching survey' });
  }
}

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newSurvey = await surveyModel.createSurvey(data);
    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(500).json({ message: 'Error creating survey' });
  }
}

export const updateSurvey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedSurvey = await surveyModel.updateSurvey(Number(id), data);
    res.status(200).json(updatedSurvey);
  } catch (error) {
    res.status(500).json({ message: 'Error updating survey' });
  }
}

export const deleteSurvey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
     // First, find the questions related to the survey
    const questions = await prisma.question.findMany({
      where: {
        surveyId: Number(id)
      }
    });

    // Next, delete the options related to each question
    for (const question of questions) {
      await prisma.option.deleteMany({
        where: {
          questionId: question.id
        }
      });
    }

    // Then, delete the questions themselves
    await prisma.question.deleteMany({
      where: {
        surveyId: Number(id)
      }
    });

    // Finally, delete the survey
    await surveyModel.deleteSurvey(Number(id));
    res.status(200).json({ message: 'Survey deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting survey'+ (error as Error).message});
  }
}