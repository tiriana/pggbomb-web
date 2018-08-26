let numOfSessions = 0;

const questionsMock = [
  {
    id: 1,
    question: "Słownie 1 + 1",
    answer: "DWA"
  },
  {
    id: 2,
    question: "Słownie 1 + 2",
    answer: "TRZY"
  },
  {
    id: 3,
    question: "Dwa wyrazy",
    answer: "Dwa wyrazy"
  },
  {
    id: 4,
    question: "Wpisz aż pięć wyrazów",
    answer: "Wpisz aż pięć wyrazów"
  },
  {
    id: 5,
    question: "Twoja stara je",
    answer: "Banana"
  },
  {
    id: 6,
    question: "Najdłuższe polskie słowo",
    answer: "Nie znam"
  }
];

const leaderboard = {
  0: {
    playerName: "Staszek",
    result: 123.43,
    answered: 15
  },
  1: {
    playerName: "Zdzisiek",
    result: 43.12,
    answered: 3
  },
  2: {
    playerName: "stefan",
    result: 331.23,
    answered: 54
  }
};

const questionsLeftInSession = {};

export const createSession = ({ playerName }) =>
  new Promise(resolve => {
    setTimeout(() => {
      ++numOfSessions;
      questionsLeftInSession[numOfSessions] = [...questionsMock].sort(
        Math.random
      );
      resolve({ sessionId: numOfSessions });
    }, 500);
  });

export const getNextQuestion = ({ sessionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(questionsLeftInSession[numOfSessions].pop());
    }, 500);
  });

export const saveGoodAnswer = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export const saveBadAnswer = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export const skipQuestion = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export const saveWinGame = ({ sessionId, score }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export const saveLoseGame = ({ sessionId, score }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export const getLeaderboard = ({ sessionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(leaderboard);
    }, 500);
  });
