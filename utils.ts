import { Objective, Result, IndicatorType, EmployeeProfile } from './types';
import { GoogleGenAI } from "@google/genai";

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const calculateTotalWeight = (items: { weight: number }[]) => {
  return items.reduce((sum, item) => sum + item.weight, 0);
};

export const getDirectorateName = (governorate: string) => {
  if (!governorate) return "";
  return `المديرية العامة للتربية والتعليم بمحافظة ${governorate}`;
};

export const ensureUrlProtocol = (url: string) => {
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const analyzePerformance = (objectives: Objective[]): string => {
  if (objectives.length === 0) return "لا توجد بيانات كافية للتحليل.";

  // Logic simplified as per user request (no strict conditions for levels)
  // We still provide a generic analysis based on completion.
  
  let totalResults = 0;
  objectives.forEach(obj => {
    totalResults += obj.results.length;
  });

  if (totalResults > 5) {
     return "أداء مهني متميز يعكس التزاماً عالياً بالمعايير، مع توثيق شامل للأدلة والبراهين، مما يدل على كفاءة عالية في إدارة المهام.";
  } else {
     return "أداء جيد يفي بالمتطلبات الأساسية، مع وجود فرص للتحسين من خلال زيادة تنوع الأدلة وتفصيل النتائج بشكل أكبر.";
  }
};

export const generateAIAnalysis = async (profile: EmployeeProfile, objectives: Objective[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-2.5-flash";

  const prompt = `
    بصفتك خبيراً في الموارد البشرية وتقييم الأداء في وزارة التربية والتعليم، قم بصياغة "تحليل أداء عام" احترافي للموظف التالي باللغة العربية.
    
    بيانات الموظف:
    الاسم: ${profile.name}
    الوظيفة: ${profile.jobTitle}
    
    الأهداف والنتائج:
    ${objectives.map((obj, i) => `
      - هدف: ${obj.text} (الوزن: ${obj.weight}%)
      - النتائج: ${obj.results.map(r => `${r.name} (الأداء الفعلي: ${r.actualPerformance})`).join('، ')}
    `).join('\n')}

    المطلوب:
    كتابة فقرة تحليلية واحدة متماسكة (100-150 كلمة) بأسلوب رسمي، تركز على جودة الإنجاز، ودقة التوثيق، ومدى تحقيق المستهدفات. يجب أن يكون النص جاهزاً للطباعة في التقرير الرسمي مباشرة دون مقدمات أو عناوين فرعية.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || analyzePerformance(objectives);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};