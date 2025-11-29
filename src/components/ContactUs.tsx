/**
 * @file ContactUs.tsx
 * @description This component renders the "Contact Us" section on the homepage.
 * It displays contact information such as email, phone, address, and business hours,
 * along with a call-to-action to send a message. The component is animated with Framer Motion.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { useContactInfo } from "@/hooks/useContactInfo";

/**
 * @component ContactUs
 * @description The main "Contact Us" section component.
 */
const ContactUs = () => {
  // Hook to get the translation function.
  const { t } = useTranslation();
  const { data: apiData } = useContactInfo();
  
  // An object containing the contact information (API data OR hardcoded fallback).
  const contactInfo = {
    email: apiData?.email || "contact@toorrii.com",
    phone: apiData?.telephone || "+213 (0) 123 456 789",
    address: apiData?.adresse ? `${apiData.adresse}, ${apiData.ville}, ${apiData.wilaya}` : "Algiers, Algeria",
    hours: apiData?.horaires || t("contact.hoursValue")
  };
  
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated section header. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Grid of contact information cards. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Animated card for email. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.email")}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated card for phone. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.phone")}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated card for location. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.location")}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated card for business hours. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("contact.hours")}</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.hours}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Animated call-to-action section to send a message. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">{t("contact.getStarted")}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("contact.getStartedDesc")}
          </p>
          <Button size="lg" className="group">
            {t("contact.sendMessage")}
            <Mail className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
