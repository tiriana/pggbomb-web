import PropTypes from "prop-types";

const APIPropType = PropTypes.shape({
  createSession: PropTypes.func.isRequired,
  getNextQuestion: PropTypes.func.isRequired,
  saveGoodAnswer: PropTypes.func.isRequired,
  saveBadAnswer: PropTypes.func.isRequired,
  skipQuestion: PropTypes.func.isRequired,
  saveWinGame: PropTypes.func.isRequired,
  saveLoseGame: PropTypes.func.isRequired,
  getLeaderboard: PropTypes.func.isRequired
});

export default APIPropType;
