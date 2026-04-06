type Reducer<S, A> = (state: S, action: A) => S

type Listener = () => void

type Store<S, A> = {
  getState: () => S
  dispatch: (action: A) => void
  subscribe: (listener: Listener) => () => void
}

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  let state = initialState
  const listeners = new Set<Listener>()

  return {
    getState: () => state,

    dispatch: (action) => {
      state = reducer(state, action)
      listeners.forEach((l) => l())
    },

    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
