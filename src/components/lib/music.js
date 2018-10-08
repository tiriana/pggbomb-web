import { Howl, Howler } from "howler";
import hackingTime from "../../resources/audio/Lost_Years_-_West_Side_Lane_(Mega_Drive-Genesis_Arrange).mp3";
import timeEndExplosion from "../../resources/audio/TimeEnd_explosion.mp3";

export const playHackingTime = () => play(hackingTime);
export const playMachineSound = () => null;
export const playTimeEndExplosionSound = () => playOnce(timeEndExplosion);

const howls = {};
const getHowl = (base64, loop = true) => {
  if (!howls[base64]) {
    howls[base64] = new Howl({
      src: [base64, `data:audio/mp3;base64,${base64}`],
      loop: loop,
      preload: true
    });
  }

  return howls[base64];
}

//preload
getHowl(hackingTime);
getHowl(timeEndExplosion, false);

let nowPlaying;

const play = base64 => {
  if (nowPlaying === base64) {
    return;
  }
  if (nowPlaying) {
    getHowl(nowPlaying).stop();
  }
  getHowl(base64).play();

  nowPlaying = base64;
};

const playOnce = base64 => {
  if (nowPlaying === base64) {
    return;
  }
  if (nowPlaying) {
    getHowl(nowPlaying).stop();
  }
  getHowl(base64, false).play();



  nowPlaying = base64;
};
