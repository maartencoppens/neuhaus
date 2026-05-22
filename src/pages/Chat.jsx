import React from "react";
import Card from "../components/Card";
import AnswerLabel from "../components/AnswerLabel";

const Chat = () => {
  return (
    <section className="flex flex-1 w-full justify-between items-stretch gap-xl py-2xl">
      <Card className="flex h-full justify-center items-center white-gradient">
        <div className="w-64 h-64 rounded-full bg-white flex flex-col justify-center items-center">
          <p className="text-center text-text-light">Progress</p>
          <p className="text-center text-text-dark">
            <span className="text-4xl">33</span>%
          </p>
        </div>
      </Card>
      <Card className={"flex h-full flex-col justify-between"}>
        <div className="flex w-full gap-sm px-lg border-b border-border pb-lg">
          <div className="rounded-full w-fit bg-background-tertiary p-sm">
            <img src="/icons/star.svg" alt="stars" className="w-sm h-sm" />
          </div>
          <div className="flex flex-col justify-center gap-xs">
            <p className="font-regular">Sommelier · Élise</p>
            <p className="label-text">In conversation</p>
          </div>
        </div>

        <div className="h-full">{/* Hier komt conversation*/}</div>
        <div className="pt-md px-lg border-t border-border">
          <div className="flex flex-col gap-sm border-b border-border pb-md">
            <p className="label-text">suggested</p>
            <div className="flex gap-xs">
              <AnswerLabel label="Label" />
              <AnswerLabel label="Label" />
              <AnswerLabel label="Label" />
            </div>
          </div>
          <div className="flex justify-between gap-xs pt-xs">
            <input
              type="text"
              placeholder="Or speak in your own words ..."
              className="w-full focus:outline-none"
            />
            <button className="bg-background-tertiary rounded-full p-sm w-fit">
              <img
                src="/icons/send.svg"
                alt="send button"
                className="w-sm h-sm"
              />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Chat;
