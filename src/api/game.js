import axios from 'axios';

let quizUrl;
let quizGameId;
let quizGameUrl;

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

const leaderBoard = [
  {
    playerId: "3211",
    playerName: "Staszek",
    result: 12343,
    answered: 15
  },
  {
    playerId: "3211",
    playerName: "Zdzisiek",
    result: 4312,
    answered: 3
  },
  {
    playerId: "3211",
    playerName: "stefan",
    result: 33123,
    answered: 54
  }
];

const questionsLeftInSession = {};

const api = axios.create({
  baseURL: 'http://pggbomb.prometsoft.pl'
});

api.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

export const createSession = (playerName) => {
  return api.get('/rest-api/quizy?akcja=getDefaultQuiz')
    .then(result => {
      quizUrl = result.data.defaultQuizUrl;
      return api.get(quizUrl + "?akcja=checkPlayerName&playerName=" + playerName)
        .then(result => {
          return api.get(quizUrl + "?akcja=createGame&playerName=" + playerName)
            .then(result => {
              return {
                sessionId: result.data.quizGameUrl,
                timeLimit: result.data.timeLimit,
                maxPossibleTime: result.data.maxPossibleTime,
                correctAnswerTimeReward: result.data.correctAnswerTimeReward,
                wrongAnswerTimePenalty: result.data.wrongAnswerTimePenalty,
                skipAnswerTimePenalty: result.data.skipAnswerTimePenalty,
              }

            });
        })
    });
}

export const getNextQuestion = ({ sessionId }) => {
  return api.get(sessionId + "?akcja=getNextQuestion")
    .then(result => {
      var question = result.data;
      console.log(question);
      return {
        id: question.quizGameQuestionUrl,
        question: question.question,
        answer: question.answer
      }
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const saveGoodAnswer = ({ sessionId, questionId }) => {
  return api.get(questionId + "?akcja=markAsCompleted")
    .then(result => {
      return;
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const saveBadAnswer = ({ sessionId, questionId }) => {
  return api.get(questionId + "?akcja=registerWrongAnswer")
    .then(result => {
      return;
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const skipQuestion = ({ sessionId, questionId }) => {
  return api.get(questionId + "?akcja=markAsSkipped")
    .then(result => {
      return;
    }).catch(error => {
      console.log(error);
      throw error;
    });
};
export const saveWinGame = ({ sessionId, score }) => {
  return api.get(sessionId + "?akcja=finishGame")
    .then(result => {
      return;
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const saveLoseGame = ({ sessionId, score }) => {
  return api.get(sessionId + "?akcja=finishGame")
    .then(result => {
      return;
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const getLeaderboard = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ leaderBoard: leaderBoard });
    }, 500);
  });
