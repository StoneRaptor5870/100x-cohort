import { PrismaClient, Survey } from "@prisma/client";
const prisma = new PrismaClient();

const surveyModel = {
  getAllSurveys: async (): Promise<Survey[]> => {
    return await prisma.survey.findMany();
  },

  getSurveyById: async (id: number): Promise<Survey | null> => {
    return await prisma.survey.findUnique({ where: { id } });
  },

  createSurvey: async (data: Omit<Survey, "id">): Promise<Survey> => {
    return await prisma.survey.create({ data });
  },

  updateSurvey: async (id: number, data: Partial<Survey>): Promise<Survey> => {
    return await prisma.survey.update({ where: { id }, data });
  },

  deleteSurvey: async (id: number): Promise<Survey> => {
    return await prisma.survey.delete({ where: { id } });
  },
};

export default surveyModel;
