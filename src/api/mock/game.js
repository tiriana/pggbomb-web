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
    question: "Słownie 4 + 3",
    answer: "SIEDEM"
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

export const createSession = ({ playerName }) =>
  new Promise(resolve => {
    setTimeout(() => {
      ++numOfSessions;
      resolve({ sessionId: numOfSessions });
    }, 1000);
  });
let lastQuestionId = 0;

export const getNextQuestion = ({ sessionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        questionsMock[(sessionId + lastQuestionId++) % questionsMock.length]
      );
    }, 1000);
  });

export const saveGoodAnswer = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const saveBadAnswer = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const skipQuestion = ({ sessionId, questionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const saveWinGame = ({ sessionId, time }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const saveLoseGame = ({ sessionId, time }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const getLeaderboard = ({ sessionId }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(leaderboard);
    }, 1000);
  });
