import axios from 'axios';

let quizUrl;
let quizGameId;
let quizGameUrl;

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
        answer: question.answer,
        category: question.category
      }
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const saveGoodAnswer = ({ sessionId, questionId }) => {
  return api.get(questionId + "?akcja=markAsCompleted")
    .then(result => {
      return {
        timeShift: result.data.timeShift,
        totalScore: result.data.totalScore
      };
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
      return {
        timeShift: result.data.timeShift,
        totalScore: result.data.totalScore
      };
    }).catch(error => {
      console.log(error);
      throw error;
    });
};
export const saveWinGame = ({ sessionId, score }) => {
  return api.get(sessionId + "?akcja=finishGame")
    .then(result => {
      return {
        totalScore: result.data.totalScore
      }
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const saveLoseGame = ({ sessionId, score }) => {
  return api.get(sessionId + "?akcja=finishGame")
    .then(result => {
      return {
        totalScore: result.data.totalScore
      }
    }).catch(error => {
      console.log(error);
      throw error;
    });
};

export const getLeaderboard = (limit = 17) => {
  return api.get(quizUrl + "?akcja=getLeaderboard&limit=" + limit)
    .then(result => {
      var leaderBoardMapped = result.data.leaderboard.map((score) => {
        return {
          playerId: score.quizGameId,
          playerName: score.playerName,
          result: score.score,
          answered: 0
        }
      });
      return {
        leaderBoard: leaderBoardMapped
      };
    }).catch(error => {
      console.log(error);
      throw error;
    });
};
