import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import AnswerLabel from "../components/AnswerLabel";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questionFlow";
import usePralineStore from "../store/usePralineStore";
import { interpretUserAnswer } from "../helpers/openrouter";

const Chat = () => {
  const navigate = useNavigate();
  const [customInput, setCustomInput] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const hasStarted = useRef(false);

  const messages = usePralineStore((state) => state.messages);
  const currentQuestionIndex = usePralineStore(
    (state) => state.currentQuestionIndex,
  );

  const addMessage = usePralineStore((state) => state.addMessage);
  const saveAnswer = usePralineStore((state) => state.saveAnswer);
  const nextQuestion = usePralineStore((state) => state.nextQuestion);
  const setTasteTags = usePralineStore((state) => state.setTasteTags);
  const setBoxExplanation = usePralineStore((state) => state.setBoxExplanation);

  const messagesEndRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isMultiSelectQuestion = Boolean(currentQuestion?.multiple);

  const toAnswerArray = (answer) => {
    if (Array.isArray(answer)) return answer;
    if (answer === undefined || answer === null || answer === "") return [];
    return [answer];
  };

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

  useEffect(() => {
    setSelectedValues([]);
    setCustomInput("");
  }, [currentQuestionIndex]);

  const submitAnswer = (answerLabel, answerValue) => {
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
      setTimeout(async () => {
        addMessage({
          role: "assistant",
          content:
            "Perfect, ik stel nu jouw gepersonaliseerde pralinedoos samen.",
        });

        const finalAnswers = usePralineStore.getState().answers;

        const directTags = {
          chocolateType: toAnswerArray(finalAnswers.chocolateType),
          flavors: toAnswerArray(finalAnswers.flavors),
        };

        const hasCustomText = Object.values(finalAnswers).some((answer) =>
          toAnswerArray(answer).some(
            (value) => typeof value === "string" && value.length > 15,
          ),
        );

        let tags;

        if (hasCustomText) {
          tags = await interpretUserAnswer(finalAnswers);
        } else {
          tags = directTags;
        }

        setTasteTags(tags);
        setBoxExplanation("");

        setTimeout(() => {
          navigate("/box");
        }, 1000);
      }, 600);
    }
  };

  const handleOptionSelect = (option) => {
    if (!currentQuestion) return;

    if (!isMultiSelectQuestion) {
      submitAnswer(option.label, option.value);
      return;
    }

    setSelectedValues((prev) => {
      if (prev.includes(option.value)) {
        return prev.filter((value) => value !== option.value);
      }

      return [...prev, option.value];
    });
  };

  const submitCurrentAnswer = () => {
    if (!currentQuestion) return;

    const trimmedCustomInput = customInput.trim();

    if (isMultiSelectQuestion) {
      const values = trimmedCustomInput
        ? [...selectedValues, trimmedCustomInput]
        : selectedValues;

      if (!values.length) return;

      const labels = values.map(
        (value) =>
          currentQuestion.options.find((option) => option.value === value)
            ?.label || value,
      );

      submitAnswer(labels.join(", "), values);
      setSelectedValues([]);
      setCustomInput("");
      return;
    }

    if (!trimmedCustomInput) return;

    submitAnswer(trimmedCustomInput, trimmedCustomInput);
    setCustomInput("");
  };

  return (
    <section className="flex flex-1 w-full justify-between items-stretch gap-xl py-2xl min-h-0 overflow-hidden">
      <Card className="flex  justify-center items-center white-gradient">
        <div className="w-64 h-64 rounded-full bg-white flex flex-col justify-center items-center">
          <p className="text-center text-text-light">Progress</p>
          <p className="text-center text-text-dark">
            <span className="text-4xl">
              {Math.round((currentQuestionIndex / questions.length) * 100)}
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
              <p className="label-text">
                {isMultiSelectQuestion
                  ? "suggested • select multiple"
                  : "suggested"}
              </p>

              <div className="flex gap-xs flex-wrap">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <AnswerLabel
                      label={option.label}
                      className={
                        isMultiSelectQuestion &&
                        selectedValues.includes(option.value)
                          ? "bg-background-tertiary text-white border-background-tertiary"
                          : ""
                      }
                    />
                  </button>
                ))}
              </div>

              {isMultiSelectQuestion && (
                <button
                  type="button"
                  onClick={submitCurrentAnswer}
                  disabled={!selectedValues.length && !customInput.trim()}
                  className="w-fit mt-xs px-md py-xs bg-background-tertiary text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm selection
                </button>
              )}
            </div>

            <div className="flex justify-between gap-xs pt-xs">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitCurrentAnswer();
                }}
                placeholder={
                  isMultiSelectQuestion
                    ? "Add an extra preference and press send ..."
                    : "Or speak in your own words ..."
                }
                className="w-full focus:outline-none"
              />

              <button
                onClick={submitCurrentAnswer}
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
