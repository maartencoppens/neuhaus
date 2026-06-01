import { create } from "zustand";

const usePralineStore = create((set) => ({
  messages: [],
  answers: {},
  currentQuestionIndex: 0,
  tasteTags: null,
  selectedPraline: null,

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

  setSelectedPraline: (praline) =>
    set({
      selectedPraline: praline,
    }),

  resetChat: () =>
    set({
      messages: [],
      answers: {},
      currentQuestionIndex: 0,
      tasteTags: null,
      selectedPraline: null,
    }),
}));

export default usePralineStore;
