import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const { data: privacyData, isLoading, error } = usePrivacyPolicy();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !privacyData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{t('privacyPage.errorLoading')}</p>
            <Link to="/">
              <Button variant="outline">{t('privacyPage.backToHome')}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {t('privacyPage.backToHome')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              {privacyData.titre && (
                <h1 className="text-4xl md:text-5xl font-bold">
                  {privacyData.titre}
                </h1>
              )}
            </div>
            
            <div className="flex gap-4 text-sm text-muted-foreground mb-8">
              {privacyData.date_creation && (
                <span>{t('privacyPage.lastUpdated')} {new Date(privacyData.date_creation).toLocaleDateString('en-GB')}</span>
              )}
              {privacyData.version && (
                <span>Version {privacyData.version}</span>
              )}
            </div>

            {privacyData.contenu && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {privacyData.contenu}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
