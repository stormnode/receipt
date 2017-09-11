import { combineReducers } from 'redux'

/*
import {
  CHECKOUT_SUCCESS
} from '../constants/ActionTypes'
*/

import {
  CHECKOUT_SUCCESS,
  RECEIVE_RECEIPTS
} from '../constants/ActionTypes'

const initialState = {}

const receiptDetail = (action) => {
  return {
    cart:action.cart,
    timestamp : Date.now(),
    total: 31.55,
    user: "a@b.edu"
 }
}

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
*/

function *Counter() {
	let count = 0;
	while(true) {
		yield count++;
	}
}

const counter = Counter();

const receipts = (state = initialState.addedCarts, action) => {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      let mycounter = counter.next().value;
      let myreceipt = receiptDetail(action);
      return { ...state,
        [mycounter] : myreceipt
      }
    default:
      return {...state}
  }
}


const byReceiptId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RECEIPTS:
      return {
        ...state,
        ...action.receipts.reduce((obj, receipt) => {
          obj[receipt.id] = receipt
          return obj
        }, {})
      }
    default:
      const { receiptId } = action
      if (receiptId) {
        return {
          ...state,
          [receiptId]: receipts(state[receiptId], action)
        }
      }
      return state
  }
}

const receiptIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RECEIPTS:
      return action.receipts.map(receipt => receipt.id)
    default:
      return state
  }
}

export default combineReducers({
  byReceiptId,
  receiptIds,
  receipts
})

export const getReceipt = (state, id) =>
    state.byReceiptId[id]

export const getVisibleReceipts = state =>
  state.visibleIds.map(id => getReceipt(state, id))

// export default receipts