import { useQuery } from '@tanstack/react-query';
import { partnerService } from '@/services/partnerService';
import { Partner } from '@/types/partner';

export const usePartners = () => {
  return useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: partnerService.getPartners,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePartner = (id: string) => {
  return useQuery<Partner>({
    queryKey: ['partner', id],
    queryFn: () => partnerService.getPartnerById(id),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};
