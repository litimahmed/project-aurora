import { apiClient } from './api';
import { AboutUsData } from '@/types/aboutUs';

export const aboutUsService = {
  async getAboutUs(): Promise<AboutUsData> {
    return apiClient.get<AboutUsData>('/home/aboutnous/');
  },
};
