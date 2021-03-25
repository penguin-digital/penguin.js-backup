'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _actions = require('../actions');

exports.default = (0, _redux.combineReducers)({
  fields: fields,
  locals: locals,
  globals: globals,
  languages: languages,
  isSaving: isSaving,
  error: error
});


function fields() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.UPDATE_FIELDS:
      return Object.assign({}, state, action.update);
    case _actions.HYDRATE:
      return action.state.fields;
    default:
      return state;
  }
}

function locals() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.HYDRATE:
      return action.state.locals;
    default:
      return state;
  }
}

function globals() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.HYDRATE:
      return action.state.globals;
    default:
      return state;
  }
}

function languages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.HYDRATE:
      return action.state.languages;
    default:
      return state;
  }
}

function isSaving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case _actions.SAVE:
      return true;
    case _actions.SAVE_SUCCESS:
    case _actions.SAVE_FAILURE:
      return false;
    default:
      return state;
  }
}

function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case _actions.SAVE_SUCCESS:
      return null;
    case _actions.SAVE_FAILURE:
      return action.error;
    default:
      return state;
  }
}