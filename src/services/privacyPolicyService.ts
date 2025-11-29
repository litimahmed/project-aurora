import { apiClient } from './api';
import { PrivacyPolicyData } from '@/types/privacyPolicy';

export const privacyPolicyService = {
  async getPrivacyPolicy(): Promise<PrivacyPolicyData> {
    return apiClient.get<PrivacyPolicyData>('/home/politique_confidentialite/');
  },
};
