import { Objective, Result, IndicatorType } from './types';

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