import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import GridItem from "../components/GridItem";
import usePralineStore from "../store/usePralineStore";
import { matchPralines } from "../helpers/matchPralines";
import database from "../data/database.json";
import "../style/pralineBox.css";
import "../style/personalMessage.css";

const BoxOverview = () => {
  const tasteTags = usePralineStore((state) => state.tasteTags);
  const selectedPraline = usePralineStore((state) => state.selectedPraline);
  const setSelectedPraline = usePralineStore(
    (state) => state.setSelectedPraline,
  );
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
        <div className="flex flex-1 flex-col gap-sm px-lg">
          <div className="praline-box">
            <div className="praline-box-rim" />
            <div className="praline-tray">
              {boxPralines.map((praline) => (
                <GridItem
                  key={praline.id}
                  praline={praline}
                  isSelected={selectedPraline?.id === praline.id}
                  onSelect={setSelectedPraline}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="flex flex-1 flex-col gap-sm px-lg"></Card>
      </div>

      <div className="col-span-2 flex h-full flex-col gap-xl">
        <Card className="flex flex-1 flex-col gap-sm px-lg">
          {selectedPraline ? (
            <div className="flex flex-1 flex-col">
              <div className="flex gap-lg">
                <img
                  src={selectedPraline.image || "/fallback.webp"}
                  alt={selectedPraline.name}
                  className="h-20 w-20 rounded-xs bg-white object-contain"
                />
                <div className="flex flex-col gap-xs">
                  <p className="label-text">praline detail</p>
                  <p className="text-lg font-bold">{selectedPraline.name}</p>
                  <p className="text-sm text-text-light">
                    {selectedPraline.filling}
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-sm">
                <p className="label-text">about</p>
                <p>{selectedPraline.description}</p>
              </div>
              <div className="border-t border-border pt-sm">
                <p className="label-text">pair with</p>
                <p>{selectedPraline.pairings?.join(", ")}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-text-light">
              Select a praline to see its details.
            </div>
          )}
          <div className="border-t border-border pt-sm">
            <Button
              className="w-full uppercase"
              label="replace praline"
              link="/Box"
              variant={"secondary"}
            />
          </div>
        </Card>

        <div className="message-card">
          <p className="message-label">Personal message</p>
          <textarea
            name="message"
            id="message"
            placeholder="Write a personal note to go with your gift..."
            className="message-textarea"
            rows={6}
          />
          <div className="message-footer">
            <span>with love</span>
          </div>
        </div>

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
