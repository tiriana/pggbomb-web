import { Howl, Howler } from "howler";
import soundTyping from "../../resources/audio/TYPE.mp3";
import wrongLetter from "../../resources/audio/wrong_letter.mp3";
import beep from "../../resources/audio/1beep.mp3";
import correctAnswer from "../../resources/audio/CorrectAnswer.mp3";
import skippedQuestion from "../../resources/audio/SkipQuestion.mp3"

export const playTypingSound = () => play(soundTyping);
export const playWrongLetterSound = () => play(wrongLetter);
export const playBeep = () => play(beep);
export const playCorrectAnswerSound = () => play(correctAnswer);
export const playSkippedQuestionSound = () => play(skippedQuestion);

const howls = {};
const getHowl = base64 => {
  if (!howls[base64]) {
    howls[base64] = new Howl({
      src: [base64, `data:audio/mp3;base64,${base64}`],
      loop: false,
      preload: true
    });
  }

  return howls[base64];
}
const play = base64 => {
  getHowl(base64).play();
};
