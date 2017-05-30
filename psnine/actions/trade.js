import React, { ToastAndroid } from 'react-native';
import * as ActionTypes from '../constants/actionTypes';

import { fetchTrades } from '../dao';

export function getList(page = 1, {
  type = 'all', 
  pf = 'all', 
  lang = 'all', 
  title = '',
  province = 'all',
  ob = 'obdate',
  category = 'all'
}) {
  return dispatch => {
    return fetchTrades({ page, category, type, pf, lang, province, ob, title })
      .then(response => {
        dispatch(gotList(response, page));
      }).catch(err => {
        console.error('communityError', err)
        dispatch(gotListError());
        global.toast && global.toast('网络错误', 2000);
      });
  }
}

function gotList(argument, page) {
  return {
    type: ActionTypes.GET_TRADE_SUCCESS,
    value: argument,
    page: page,
  };
}

function gotListError() {
  return {
    type: ActionTypes.GET_TRADE_ERROR,
  };
}
