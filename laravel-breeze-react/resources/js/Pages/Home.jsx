import React, { useRef } from "react";
import { usePage } from "@inertiajs/react";

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import AboutSection from "@/Components/AboutSection";
import ScheduleSection from "@/Components/ScheduleSection";
import SpeakerSection from "@/Components/SpeakerSection";
import TicketPricing from "@/Components/TicketSection";
import SectionTransition from "@/Components/SectionTransition";
import FooterSponsors from "@/Components/FooterSponsors";
import FlashMessage from "@/Components/FlashMessage";

export default function Home() {

  const { hero_section, about_section, event_days, speakers_event, tickets_event } =
    usePage().props;

 
  const aboutRef = useRef(null);
  const speakersRef = useRef(null);
  const scheduleRef = useRef(null);
  const ticketsRef = useRef(null);
  const contactsRef = useRef(null);

 
  const handleScrollToSection = (sectionName) => {
    switch (sectionName) {
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "speakers":
        speakersRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "schedule":
        scheduleRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "tickets":
        ticketsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;

     case"contacts":
     contactsRef.current?.scrollIntoView({behavior:"smooth"});
     break;
        
      case "home":
      default:
        
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col">
   
      <FlashMessage />
      
      <Header onScrollToSection={handleScrollToSection} />

      <HeroSection hero_section={hero_section} />

      <main className="w-full flex flex-col px-4 py-8">

    
        <SectionTransition>
          {/* Оборачиваем AboutSection в <section ref={aboutRef}> */}
          <section ref={aboutRef}>
            <AboutSection about_section={about_section} />
          </section>
        </SectionTransition>

      
        <SectionTransition>
          <section ref={speakersRef}>
            <SpeakerSection speakers_event={speakers_event} />
          </section>
        </SectionTransition>

       
        <SectionTransition>
          <section ref={scheduleRef}>
            <ScheduleSection event_days={event_days} />
          </section>
        </SectionTransition>

        <SectionTransition>
          <section ref={ticketsRef}>
            <TicketPricing tickets_event={tickets_event} />
          </section>
        </SectionTransition>
      </main>

<section ref={contactsRef}>
      <Footer />
      <FooterSponsors />

      </section> 
    </div>
  );
}
