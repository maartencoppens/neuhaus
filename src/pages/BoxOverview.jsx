import React, { useEffect } from "react";
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
  const boxPralines = usePralineStore((state) => state.boxPralines);
  const selectedPraline = usePralineStore((state) => state.selectedPraline);
  const setSelectedPraline = usePralineStore(
    (state) => state.setSelectedPraline,
  );
  const setBoxPralines = usePralineStore((state) => state.setBoxPralines);
  const selectedPralineIndex = usePralineStore(
    (state) => state.selectedPralineIndex,
  );
  const setSelectedPralineIndex = usePralineStore(
    (state) => state.setSelectedPralineIndex,
  );
  const isReplacePickerOpen = usePralineStore(
    (state) => state.isReplacePickerOpen,
  );
  const openReplacePicker = usePralineStore((state) => state.openReplacePicker);
  const closeReplacePicker = usePralineStore(
    (state) => state.closeReplacePicker,
  );
  useEffect(() => {
    const matchedPralines = matchPralines(database.pralines, tasteTags, 16);
    setBoxPralines(matchedPralines);
  }, [tasteTags]);

  const replacePraline = (nextPraline) => {
    if (selectedPralineIndex === null) {
      return;
    }

    usePralineStore
      .getState()
      .replaceBoxPraline(selectedPralineIndex, nextPraline);
    closeReplacePicker();
  };

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
                  onSelect={(selectedItem) => {
                    setSelectedPraline(selectedItem);
                    setSelectedPralineIndex(
                      boxPralines.findIndex(
                        (item) => item.id === selectedItem.id,
                      ),
                    );
                  }}
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
                <div className="flex flex-col gap-xs pb-sm">
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
          {selectedPraline && (
            <div className="border-t border-border pt-sm">
              <Button
                className="w-full uppercase"
                label="replace praline"
                variant="secondary"
                onClick={openReplacePicker}
              />
            </div>
          )}
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

      {isReplacePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-lg">
          <Card className="max-h-[80vh] w-full max-w-4xl overflow-hidden bg-background-primary px-lg py-md">
            <div className="flex items-center justify-between gap-md border-b border-border pb-sm">
              <div>
                <p className="label-text">replace praline</p>
                <p className="text-sm text-text-light">
                  Choose a praline to swap in.
                </p>
              </div>
              <Button
                label="close"
                variant="secondary"
                onClick={closeReplacePicker}
              />
            </div>

            <div className="mt-md grid max-h-[64vh] grid-cols-2 gap-sm overflow-y-auto pr-xs md:grid-cols-4">
              {database.pralines.map((praline) => (
                <button
                  key={praline.id}
                  type="button"
                  onClick={() => replacePraline(praline)}
                  className={`flex flex-col gap-xs rounded-xs border p-sm text-left hover:bg-background-secondary ${
                    selectedPraline?.id === praline.id
                      ? "border-primary bg-background-secondary"
                      : "border-border"
                  }`}
                >
                  <img
                    src={praline.image || "/fallback.webp"}
                    alt={praline.name}
                    className="h-20 w-full rounded-xs bg-white object-contain"
                  />
                  <span className="text-sm font-semibold">{praline.name}</span>
                  <span className="text-xs text-text-light">
                    {praline.filling}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};

export default BoxOverview;
