import { Hero } from "@/components/hero";
import { PresenceMenu } from "@/components/presence-menu";
import { Talks } from "@/components/talks";
import { Expertise } from "@/components/expertise";
import { TrackRecord } from "@/components/track-record";
import { Writing } from "@/components/writing";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <PresenceMenu />
      <Talks />
      <Expertise />
      <TrackRecord />
      <Writing />
      <Contact />
    </>
  );
}
