import axios from 'axios';
import type { MushroomData, PredictionResult, Metrics } from '../types/mushroom';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mushroomApi = {
  predict: async (mushroomData: MushroomData): Promise<PredictionResult> => {
    const response = await api.post<PredictionResult>('/predict', mushroomData);
    return response.data;
  },

  predictBatch: async (mushroomList: MushroomData[]): Promise<PredictionResult[]> => {
    const response = await api.post<PredictionResult[]>('/predict/batch', mushroomList);
    return response.data;
  },

  getMetrics: async (): Promise<Metrics> => {
    const response = await api.get<Metrics>('/metrics');
    return response.data;
  },

  recalculateMetrics: async (): Promise<{ message: string; metrics: Metrics }> => {
    const response = await api.post<{ message: string; metrics: Metrics }>('/metrics/recalculate');
    return response.data;
  },
};

export default api;




