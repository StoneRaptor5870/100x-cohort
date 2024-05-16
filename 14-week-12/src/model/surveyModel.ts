import { PrismaClient, Survey } from "@prisma/client";
export const prisma = new PrismaClient();

interface OptionData {
  id?: number;
  text: string;
}

interface QuestionData {
  id?: number;
  text: string;
  options: OptionData[];
}

interface CreateSurveyData {
  title: string;
  questions: QuestionData[];
}

interface UpdateSurveyData {
  title?: string;
  questions?: QuestionData[];
}

const surveyModel = {
  getAllSurveys: async (): Promise<Survey[]> => {
    return await prisma.survey.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  },

  getSurveyById: async (id: number): Promise<Survey | null> => {
    return await prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  },

  createSurvey: async (data: CreateSurveyData): Promise<Survey> => {
    return await prisma.survey.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map(question => ({
            text: question.text,
            options: {
              create: question.options.map(option => ({
                text: option.text,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  },

  updateSurvey: async (id: number, data: UpdateSurveyData) => {
    return await prisma.survey.update({
      where: { id },
      data: {
        title: data.title,
        questions: {
          upsert: data.questions?.map(question => ({
            where: { id: question.id || -1 }, // Use a default invalid ID for upsert
            update: {
              text: question.text,
              options: {
                upsert: question.options.map(option => ({
                  where: { id: option.id || -1 },
                  update: { text: option.text },
                  create: { text: option.text },
                })),
              },
            },
            create: {
              text: question.text,
              options: {
                create: question.options.map(option => ({
                  text: option.text,
                })),
              },
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  },

  deleteSurvey: async (id: number): Promise<Survey> => {
    return await prisma.survey.delete({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }
};

export default surveyModel;