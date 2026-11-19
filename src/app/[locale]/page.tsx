import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import TopicLinks from '@/components/TopicLinks';
import NearbyLinks from '@/components/NearbyLinks';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HistoryTimeline />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <TopicLinks locale={locale} />
        <NearbyLinks locale={locale} />
        <Gallery />
        <Reviews />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
