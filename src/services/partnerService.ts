import { apiClient } from './api';
import { Partner } from '@/types/partner';

export const partnerService = {
  async getPartners(): Promise<Partner[]> {
    return apiClient.get<Partner[]>('/home/partenaire/');
  },
  
  async getPartnerById(id: string): Promise<Partner> {
    const partners = await this.getPartners();
    const partner = partners.find(p => p.partenaire_id === id || p.id?.toString() === id);
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  },
};
