import React from "react";
import Button from "../components/Button";
import InfoLabel from "../components/InfoLabel";

const Home = () => {
  return (
    <section className="h-screen w-full flex justify-between items-center gap-3xl">
      <div className="w-1/2 flex flex-col gap-xl">
        <h1 className="text-hero font-bold">
          Discover Your
          <br />
          <span className="text-text-light">Chocolate</span>
          <br />
          Personality
        </h1>
        <p>
          Meet the Chocolate Sommelier AI — a quiet conversation that unfolds
          your palate, then curates nine pralines hand-finished by our Brussels
          maîtres chocolatiers.
        </p>
        <Button label="Start your tasting journey" link="/chat" />
        <div className="flex flex-col gap-xs">
          <InfoLabel icon="verified" label="Belgian craftmanship" />
          <InfoLabel icon="delivery" label="snelle en gekoelde levering" />
          <InfoLabel icon="present" label="gratis persoonlijke boodschap" />
        </div>
      </div>
      <div className="w-1/2">
        <img src="/hero.jpeg" alt="Homepage image" className="w-full" />
      </div>
    </section>
  );
};

export default Home;
