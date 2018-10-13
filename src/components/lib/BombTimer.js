import Stopwatch from "timer-stopwatch";

const STATUS = {
  STOPPED: 0,
  RUNNING: 1,
  COMPLETE: 2
};

class BombTimer {
  constructor({ time, tickMS = 1000 / 20, almostDoneMS = 10000, maxTimeLimit }) {
    this.time = time;
    this.tickMS = tickMS;
    this.almostDoneMS = almostDoneMS;
    this.maxTimeLimit = maxTimeLimit;

    console.log({ time, tickMS, almostDoneMS })

    this._createStopwatch(this.time, this.tickMS, this.almostDoneMS);
  }

  static EVENTS = {
    TICK: "TICK",
    ALMOST_DONE: "ALMOST_DONE",
    DONE: "DONE"
  };

  onTick(cb) {
    this._stopwatch.onTime(cb);
  }

  unbindTick() {
    this._stopwatch.removeAllListeners('time');
  }

  onAlmostDone(cb) {
    this._stopwatch.onAlmostDone(cb);
  }

  onDone(cb) {
    this._stopwatch.onDone(cb);
  }

  start() {
    this._stopwatch.start();
  }

  stop() {
    this._stopwatch.stop();
  }

  isRunning() {
    return this._stopwatch.state === STATUS.RUNNING;
  }

  isStopped() {
    return this._stopwatch.state === STATUS.STOPPED;
  }

  isDone() {
    return this._stopwatch.state === STATUS.COMPLETE;
  }

  _createStopwatch(ms, refreshRateMS, almostDoneMS) {
    this._stopwatch = new Stopwatch(ms, {
      refreshRateMS,
      almostDoneMS
    });
  }

  get ms() { return this._stopwatch.ms; }

  changeTime(timeDiffMS) {
    if (this.isDone()) {
      return;
    }

    if(this._stopwatch.ms + timeDiffMS >= this.maxTimeLimit){
      this._stopwatch.reset(this.maxTimeLimit);
    }
    
    const isRunning = this.isRunning();

    if (this._stopwatch.ms + timeDiffMS <= 0) {
      this.stop();
      this._stopwatch.emit('done');
      this._stopwatch.doneFired = true;
    } else {
      this._stopwatch.reset(this._stopwatch.ms + timeDiffMS);
    }


    isRunning && this.start();
  }
}

export default BombTimer;
