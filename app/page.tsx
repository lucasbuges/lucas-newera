import { Hero } from "@/components/hero";
import { Offers } from "@/components/offers";
import { Expertise } from "@/components/expertise";
import { TrackRecord } from "@/components/track-record";
import { Writing } from "@/components/writing";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Offers />
      <Expertise />
      <TrackRecord />
      <Writing />
      <Contact />
    </>
  );
}
