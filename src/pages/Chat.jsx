import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import AnswerLabel from "../components/AnswerLabel";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questionFlow";
import usePralineStore from "../store/usePralineStore";

const Chat = () => {
  const navigate = useNavigate();
  const [customInput, setCustomInput] = useState("");

  const hasStarted = useRef(false);

  const messages = usePralineStore((state) => state.messages);
  const currentQuestionIndex = usePralineStore(
    (state) => state.currentQuestionIndex,
  );

  const addMessage = usePralineStore((state) => state.addMessage);
  const saveAnswer = usePralineStore((state) => state.saveAnswer);
  const nextQuestion = usePralineStore((state) => state.nextQuestion);

  const messagesEndRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (hasStarted.current) return;

    if (messages.length === 0 && currentQuestion) {
      addMessage({
        role: "assistant",
        content: currentQuestion.question,
      });

      hasStarted.current = true;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAnswer = (answerLabel, answerValue) => {
    addMessage({
      role: "user",
      content: answerLabel,
    });
    saveAnswer(currentQuestion.id, answerValue);

    const nextIndex = currentQuestionIndex + 1;
    const nextQuestionData = questions[nextIndex];

    if (nextQuestionData) {
      setTimeout(() => {
        addMessage({
          role: "assistant",
          content: nextQuestionData.question,
        });

        nextQuestion();
      }, 600);
    } else {
      setTimeout(() => {
        addMessage({
          role: "assistant",
          content:
            "Perfect, ik stel nu jouw gepersonaliseerde pralinedoos samen.",
        });

        setTimeout(() => {
          navigate("/box");
        }, 1000);
      }, 600);
    }
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;

    handleAnswer(customInput, customInput);
    setCustomInput("");
  };

  return (
    <section className="flex flex-1 w-full justify-between items-stretch gap-xl py-2xl min-h-0 overflow-hidden">
      <Card className="flex  justify-center items-center white-gradient">
        <div className="w-64 h-64 rounded-full bg-white flex flex-col justify-center items-center">
          <p className="text-center text-text-light">Progress</p>
          <p className="text-center text-text-dark">
            <span className="text-4xl">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.length) * 100,
              )}
            </span>
            %
          </p>
        </div>
      </Card>

      <Card className="flex min-h-0 overflow-hidden flex-col justify-between">
        <div className="flex w-full gap-sm px-lg border-b border-border pb-lg">
          <div className="rounded-full w-fit bg-background-tertiary p-sm">
            <img src="/icons/star.svg" alt="stars" className="w-sm h-sm" />
          </div>

          <div className="flex flex-col justify-center gap-xs">
            <p className="font-regular">Sommelier · Élise</p>
            <p className="label-text">In conversation</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 px-lg py-lg overflow-y-auto flex flex-col gap-sm">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-md py-sm ${
                  message.role === "user"
                    ? "bg-background-tertiary text-white"
                    : "bg-background-secondary text-text-dark"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {currentQuestion && (
          <div className="pt-md px-lg border-t border-border">
            <div className="flex flex-col gap-sm border-b border-border pb-md">
              <p className="label-text">suggested</p>

              <div className="flex gap-xs flex-wrap">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.label, option.value)}
                  >
                    <AnswerLabel label={option.label} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-xs pt-xs">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCustomSubmit();
                }}
                placeholder="Or speak in your own words ..."
                className="w-full focus:outline-none"
              />

              <button
                onClick={handleCustomSubmit}
                className="bg-background-tertiary rounded-full p-sm w-fit"
              >
                <img
                  src="/icons/send.svg"
                  alt="send button"
                  className="w-sm h-sm"
                />
              </button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};

export default Chat;
