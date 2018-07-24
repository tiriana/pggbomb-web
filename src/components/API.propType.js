import PropTypes from "prop-types";

const APIPropType = PropTypes.shape({
  createGame: PropTypes.func,
  getQuestion: PropTypes.func,
  saveGoodAnswer: PropTypes.func,
  saveBadAnswer: PropTypes.func,
  skipQuestion: PropTypes.func,
  saveWinGame: PropTypes.func,
  saveLoseGame: PropTypes.func,
  getLeaderboard: PropTypes.func,
});

export default APIPropType;
