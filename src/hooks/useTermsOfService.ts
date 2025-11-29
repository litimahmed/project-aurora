import { useQuery } from '@tanstack/react-query';
import { termsOfServiceService } from '@/services/termsOfServiceService';
import { TermsOfServiceData } from '@/types/termsOfService';

export const useTermsOfService = () => {
  return useQuery<TermsOfServiceData>({
    queryKey: ['termsOfService'],
    queryFn: termsOfServiceService.getTermsOfService,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
