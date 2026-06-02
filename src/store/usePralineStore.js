import { create } from "zustand";

const usePralineStore = create((set) => ({
  messages: [],
  answers: {},
  currentQuestionIndex: 0,
  tasteTags: null,
  boxExplanation: "",
  boxPralines: [],
  selectedPraline: null,
  selectedPralineIndex: null,
  isReplacePickerOpen: false,

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

  setBoxExplanation: (boxExplanation) =>
    set({
      boxExplanation,
    }),

  setBoxPralines: (pralines) =>
    set({
      boxPralines: pralines,
    }),

  setSelectedPraline: (praline) =>
    set({
      selectedPraline: praline,
    }),

  setSelectedPralineIndex: (index) =>
    set({
      selectedPralineIndex: index,
    }),

  replaceBoxPraline: (index, nextPraline) =>
    set((state) => {
      return {
        boxPralines: state.boxPralines.map((praline, currentIndex) =>
          currentIndex === index ? nextPraline : praline,
        ),
        selectedPraline: nextPraline,
      };
    }),

  openReplacePicker: () =>
    set({
      isReplacePickerOpen: true,
    }),

  closeReplacePicker: () =>
    set({
      isReplacePickerOpen: false,
    }),

  resetChat: () =>
    set({
      messages: [],
      answers: {},
      currentQuestionIndex: 0,
      tasteTags: null,
      boxExplanation: "",
      boxPralines: [],
      selectedPraline: null,
      selectedPralineIndex: null,
      isReplacePickerOpen: false,
    }),
}));

export default usePralineStore;
