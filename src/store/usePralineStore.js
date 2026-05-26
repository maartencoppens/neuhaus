import { create } from "zustand";

const useChocolateStore = create((set) => ({
  messages: [],
  answers: {},
  currentQuestionIndex: 0,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  saveAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  resetChat: () =>
    set({
      messages: [],
      answers: {},
      currentQuestionIndex: 0,
    }),
}));

export default useChocolateStore;
