export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FIREBASE':
      return { ...state, checkouts: action.data };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
