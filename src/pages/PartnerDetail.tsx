/**
 * Partner Detail Page
 * 
 * Dynamic page displaying comprehensive information about a specific partner.
 * Includes company details, collaboration information, statistics, and impact metrics.
 */

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, MapPin, TrendingUp, Users, CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPartnerById } from "@/data/partnersData";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePartner } from "@/hooks/usePartners";

const PartnerDetail = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const { t } = useTranslation();
  
  // Try to get partner from API first, fallback to hardcoded data
  const { data: apiPartner, isLoading } = usePartner(partnerId || '');
  const hardcodedPartner = partnerId ? getPartnerById(partnerId) : undefined;
  
  // Merge API data with hardcoded data (API takes priority for available fields)
  const partner = apiPartner ? {
    id: partnerId || '',
    name: apiPartner.nom_partenaire,
    logo: hardcodedPartner?.logo || '',
    description: apiPartner.description,
    industry: apiPartner.type_partenaire || hardcodedPartner?.industry || 'Other',
    founded: hardcodedPartner?.founded || 'N/A',
    headquarters: apiPartner.adresse ? `${apiPartner.adresse}` : hardcodedPartner?.headquarters || 'N/A',
    about: apiPartner.description,
    collaboration: {
      startDate: new Date(apiPartner.date_deb).getFullYear().toString(),
      services: hardcodedPartner?.collaboration.services || [],
      impact: hardcodedPartner?.collaboration.impact || ''
    },
    stats: hardcodedPartner?.stats || [],
    website: apiPartner.site_web,
    gallery: hardcodedPartner?.gallery
  } : hardcodedPartner;
  if (!partner) {
    return <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('partner.notFound')}</h1>
            <p className="text-muted-foreground mb-8">{t('partner.notFoundDesc')}</p>
            <Link to="/#partnerships">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('partner.backToPartnerships')}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link to="/#partnerships">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('nav.partnerships')}
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border border-border p-12">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
            
            <div className="relative grid md:grid-cols-[1.5fr,1fr] gap-16 items-center">
              <div className="space-y-6">
                <Badge className="mb-2 text-sm px-4 py-1.5">{partner.industry}</Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">{partner.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">{partner.description}</p>
                
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.founded')}</p>
                      <p className="font-semibold text-lg">{partner.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.headquarters')}</p>
                      <p className="font-semibold text-lg">{partner.headquarters}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.partnershipSince')}</p>
                      <p className="font-semibold text-lg">{partner.collaboration.startDate}</p>
                    </div>
                  </div>
                </div>

                {/* Contact & Social Information */}
                <div className="pt-6 border-t border-border/50 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {apiPartner?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${apiPartner.email}`} className="text-primary hover:underline">
                          {apiPartner.email}
                        </a>
                      </div>
                    )}
                    {apiPartner?.telephone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${apiPartner.telephone}`} className="text-primary hover:underline">
                          {apiPartner.telephone}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {(apiPartner?.facebook || apiPartner?.instagram || apiPartner?.tiktok) && (
                    <div className="flex gap-3 mt-4">
                      {apiPartner.facebook && (
                        <a href={apiPartner.facebook} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      )}
                      {apiPartner.instagram && (
                        <a href={apiPartner.instagram} target="_blank" rel="noopener noreferrer"
                           className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                      {apiPartner.tiktok && (
                        <a href={apiPartner.tiktok} target="_blank" rel="noopener noreferrer"
                           className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                  
                  {apiPartner?.date_fin && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      Partnership Period: {new Date(apiPartner.date_deb).toLocaleDateString()} - {new Date(apiPartner.date_fin).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {partner.website && <div className="pt-4">
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline" className="gap-2">
                        {t('partner.visitWebsite')}
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>}
              </div>

              <div className="h-full min-h-[300px] relative">
                <div className="sticky top-8 h-full rounded-2xl flex items-center justify-center p-8">
                  <img src={partner.logo} alt={partner.name} className="relative w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>


        {/* About Section - Full Width Editorial */}
        <section className="mb-32">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative mb-16">
                <div className="absolute -left-8 top-0 text-[12rem] font-black text-primary/5 leading-none select-none">"</div>
                <div className="relative">
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-black mb-12 leading-tight">
                    {t('partner.aboutTitle')} {partner.name}
                  </h3>
                  
                  <div className="space-y-8">
                    <p className="text-2xl md:text-3xl text-foreground leading-relaxed font-light">
                      {partner.about}
                    </p>
                    
                    <div className="border-l-4 border-primary pl-8 py-4">
                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
                        {t('partner.aboutQuote').replace('{name}', partner.name).replace('{industry}', partner.industry.toLowerCase())}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary mb-3">
                          <Users className="w-5 h-5" />
                          <span className="font-semibold text-sm uppercase tracking-wider">{t('partner.collaboration')}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('partner.collaborationDesc')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary mb-3">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-semibold text-sm uppercase tracking-wider">{t('partner.innovation')}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('partner.innovationDesc')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary mb-3">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold text-sm uppercase tracking-wider">{t('partner.results')}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('partner.resultsDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section - Creative Bento Grid */}
        {partner.gallery && partner.gallery.length > 0 && (
          <section className="container mx-auto px-6 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-black mb-3">{t('partner.galleryTitle')}</h3>
                <p className="text-muted-foreground text-lg">{t('partner.gallerySubtitle')}</p>
              </div>

              {/* Asymmetric Bento Grid */}
              <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
                {/* Large Feature Image - Spans 2 rows, 8 columns on desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="col-span-12 md:col-span-8 row-span-2 relative group overflow-hidden rounded-3xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={partner.gallery[0]}
                    alt={`${partner.name} showcase 1`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-background font-bold text-lg">{t('partner.featureHighlight')}</p>
                  </div>
                </motion.div>

                {/* Two Stacked Images */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="col-span-6 md:col-span-4 row-span-1 relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={partner.gallery[1] || partner.gallery[0]}
                    alt={`${partner.name} showcase 2`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="col-span-6 md:col-span-4 row-span-1 relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={partner.gallery[2] || partner.gallery[0]}
                    alt={`${partner.name} showcase 3`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                {/* Wide Panoramic Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="col-span-12 md:col-span-7 row-span-1 relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={partner.gallery[3] || partner.gallery[0]}
                    alt={`${partner.name} showcase 4`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                {/* Square Accent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="col-span-12 md:col-span-5 row-span-1 relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={partner.gallery[4] || partner.gallery[0]}
                    alt={`${partner.name} showcase 5`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}


        {/* Impact - Full Width Feature */}
        <section className="container mx-auto px-6 mb-32">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="relative">
            
          </motion.div>
        </section>

         {/* CTA Section - Split Design */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border">
            {/* Left Side - Dark */}
            <div className="bg-foreground text-background p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                {t('partner.readyToPartner')}
              </h2>
              <p className="text-background/80 text-lg mb-8 font-light">
                {t('partner.readyToPartnerDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="secondary" asChild className="font-semibold">
                  <Link to="/contact">{t('partner.startConversation')}</Link>
                </Button>
              </div>
            </div>
            
            {/* Right Side - Light with gradient */}
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative">
                <p className="text-muted-foreground mb-6 text-lg">
                  {t('partner.exploreMore')}
                </p>
                <Button size="lg" variant="outline" asChild className="font-semibold">
                  <Link to="/#partnerships">{t('partner.viewAllPartners')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default PartnerDetail;