import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import GridItem from "../components/GridItem";
import usePralineStore from "../store/usePralineStore";
import { matchPralines } from "../helpers/matchPralines";
import database from "../data/database.json";

const BoxOverview = () => {
  const tasteTags = usePralineStore((state) => state.tasteTags);
  const [boxPralines, setBoxPralines] = useState([]);
  useEffect(() => {
    const matchedPralines = matchPralines(database.pralines, tasteTags, 16);
    setBoxPralines(matchedPralines);
  }, [tasteTags]);
  console.log(boxPralines);

  useEffect(() => {
    const brokenImages = [];

    Promise.all(
      database.pralines.map((praline) => {
        return new Promise((resolve) => {
          const img = new Image();

          img.onload = resolve;

          img.onerror = () => {
            brokenImages.push({
              name: praline.name,
              image: praline.image,
            });

            resolve();
          };

          img.src = praline.image;
        });
      }),
    ).then(() => {
      console.table(brokenImages);
      console.log(`Found ${brokenImages.length} broken images`);
    });
  }, []);

  return (
    <section className="grid flex-1 grid-cols-5 items-stretch gap-xl py-2xl">
      <div className="col-span-3 flex h-full flex-col gap-xl">
        <Card className="flex flex-1 flex-col gap-sm px-lg white-gradient">
          <div className="grid grid-cols-4 justify-center items-center gap-sm">
            {boxPralines.map((praline) => (
              <GridItem key={praline.id} praline={praline} />
            ))}
          </div>
        </Card>

        <Card className="flex flex-1 flex-col gap-sm px-lg"></Card>
      </div>

      <div className="col-span-2 flex h-full flex-col gap-xl">
        <Card className="flex flex-1 flex-col gap-sm px-lg">
          <div className="flex gap-lg">
            <img src="/fallback.webp" alt="praline" />
            <div className="flex flex-col gap-xs">
              <p className="label-text">praline detail</p>
              <p className="text-lg font-bold">Praline Naam</p>
            </div>
          </div>
          <div className="border-t border-border pt-sm">
            <p className="label-text">pair with</p>
            <div className="w-full h-4">{/* Hier komt de pairing info */}</div>
            <Button
              className="w-full uppercase"
              label="replace praline"
              link="/Box"
              variant={"secondary"}
            />
          </div>
        </Card>

        <Card className="flex flex-1 flex-col gap-sm px-lg">
          <p className="label-text">Personal message</p>
          <textarea
            name="message"
            id="message"
            className="border border-border h-full focus:outline-none p-0.5"
          ></textarea>
        </Card>

        <Button
          label="Proceed to checkout"
          link="/checkout"
          className="w-full uppercase"
        />
      </div>
    </section>
  );
};

export default BoxOverview;
