export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FIREBASE':
      return { ...state, checkouts: action.data };
    case 'NEW_CHECKOUT': {
      const temp = { ...state.checkouts };
      console.log(temp);
      return { ...state };
    }
    case 'SET_STORE_NAME':
      return { ...state, currentStore: action.data };
    case 'SHOW_ORDER_DETAILS':
      return { ...state, showOrderDetails: !state.showOrderDetails };
    case 'ORDER_DETAILS_DATA':
      return { ...state, currentOrderDetails: action.data };
    default:
      return state;
  }
}
