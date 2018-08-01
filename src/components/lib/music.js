import { Howl, Howler } from "howler";
import hackingTime from "../../resources/audio/Lost_Years_-_West_Side_Lane_(Mega_Drive-Genesis_Arrange).mp3";
import machineSounds from "../../resources/audio/Start_IDLEscreenBackground.mp3";

export const playHackingTime = () => play(hackingTime);
export const playMachineSound = () => play(machineSounds);

const howls = {};
const getHowl = base64 => {
  if (!howls[base64]) {
    howls[base64] = new Howl({
      src: `data:audio/mp3;base64,${base64}`,
      loop: true,
      preload: true
    });
  }

  return howls[base64];
}

//preload
getHowl(hackingTime);
getHowl(machineSounds);

let nowPlaying;

const play = base64 => {
  if (nowPlaying === base64) {
    return;
  }
  if (nowPlaying) {
    getHowl(nowPlaying).stop();
  }
  getHowl(base64).play();

  console.log("odtwarzam muzykę");

  nowPlaying = base64;
};
