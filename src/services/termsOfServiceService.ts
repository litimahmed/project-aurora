import { apiClient } from './api';
import { TermsOfServiceData } from '@/types/termsOfService';

export const termsOfServiceService = {
  async getTermsOfService(): Promise<TermsOfServiceData> {
    return apiClient.get<TermsOfServiceData>('/home/condition_dutilisation/');
  },
};
