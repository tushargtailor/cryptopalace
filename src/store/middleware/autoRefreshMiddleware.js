import { fetchCoins } from "../slices/coinSlice";

const autoRefreshMiddleware = (store) => {
  let intervalId = null;
  let started = false;

  return (next) => (action) => {
    const result = next(action);

    if (!started) {
      started = true;

      store.dispatch(fetchCoins());

      intervalId = setInterval(() => {
        store.dispatch(fetchCoins());
      }, 30000);
    }

    return result;
  };
};

export default autoRefreshMiddleware;
