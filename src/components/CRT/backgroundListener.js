const callbacks = [];

export const onChanged = cb => callbacks.push(cb);
export const reset = () => {
  while (callbacks.length) { callbacks.pop(); }
}

const STATES = {
  NORMAL: "",
  WARNING: "warning",
  DANGER: "danger"
};

const setState = state => callbacks.forEach(cb => cb(state));

export const setNormal = () => setState(STATES.NORMAL);
export const setWarning = () => setState(STATES.WARNING);
export const setDanger = () => setState(STATES.DANGER);

export default {
  onChanged, setNormal, setWarning, setDanger
}
