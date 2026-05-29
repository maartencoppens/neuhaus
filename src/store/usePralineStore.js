import { create } from "zustand";

const usePralineStore = create((set) => ({
  messages: [],
  answers: {},
  currentQuestionIndex: 0,
  tasteTags: null,

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

  setTasteTags: (tags) =>
    set({
      tasteTags: tags,
    }),

  resetChat: () =>
    set({
      messages: [],
      answers: {},
      currentQuestionIndex: 0,
      tasteTags: null,
    }),
}));

export default usePralineStore;
