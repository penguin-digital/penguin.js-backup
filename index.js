import { combineReducers, createStore } from 'redux';

var HYDRATE = 'HYDRATE';
var UPDATE_FIELDS = 'UPDATE_FIELDS';
var SAVE = 'SAVE';
var SAVE_SUCCESS = 'SAVE_SUCCESS';
var SAVE_FAILURE = 'SAVE_FAILURE';
var PUBLISH = 'PUBLISH';
var PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
var PUBLISH_FAILURE = 'PUBLISH_FAILURE';

function update(update) {
  return { type: UPDATE_FIELDS, update: update };
}

function saveSuccess() {
  return { type: SAVE_SUCCESS };
}

function saveFailure() {
  return { type: SAVE_FAILURE };
}

var createState = (function (_ref) {
  var config = _ref.config;

  var _parseKeyConfig = parseKeyConfig(config.globals),
      globalKeys = _parseKeyConfig.keys,
      globalNotLocalized = _parseKeyConfig.notLocalized;

  return function (_ref2) {
    var fields = _ref2.fields,
        meta = _ref2.meta,
        language = _ref2.language;
    return {
      fields: fields,
      locals: { notLocalized: parseKeyConfig(meta.keys).notLocalized },
      globals: {
        keys: globalKeys,
        notLocalized: globalNotLocalized
      },
      languages: config.languages
    };
  };
});

function parseKeyConfig() {
  var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var keys = cfg.map(function (field) {
    return typeof field === 'string' ? field : field[0];
  });
  var notLocalized = cfg.reduce(function (noLangFields, key) {
    var fieldName = typeof key === 'string' ? key : key[0];
    var opts = (typeof key === 'string' ? null : key[1]) || {};
    var localized = opts.localized == null ? true : opts.localized;
    return !localized ? noLangFields.concat([fieldName]) : noLangFields;
  }, []);
  return { keys: keys, notLocalized: notLocalized };
}

var reduce = combineReducers({
  fields: fields,
  locals: locals,
  globals: globals,
  languages: languages,
  isSaving: isSaving,
  isPublishing: isPublishing,
  error: error$1
});

function fields() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case UPDATE_FIELDS:
      return Object.assign({}, state, action.update);
    case HYDRATE:
      return action.state.fields;
    default:
      return state;
  }
}

function locals() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case HYDRATE:
      return action.state.locals;
    default:
      return state;
  }
}

function globals() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case HYDRATE:
      return action.state.globals;
    default:
      return state;
  }
}

function languages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case HYDRATE:
      return action.state.languages;
    default:
      return state;
  }
}

function isSaving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case SAVE:
      return true;
    case SAVE_SUCCESS:
    case SAVE_FAILURE:
      return false;
    default:
      return state;
  }
}

function isPublishing() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case PUBLISH:
      return true;
    case PUBLISH_SUCCESS:
    case PUBLISH_FAILURE:
      return false;
    default:
      return state;
  }
}

function error$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case PUBLISH_SUCCESS:
    case SAVE_SUCCESS:
      return null;
    case PUBLISH_FAILURE:
    case SAVE_FAILURE:
      return action.error;
    default:
      return state;
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

function createServerRenderer(_ref) {
  var components = _ref.components;

  return function render(_ref2, $) {
    var config = _ref2.config,
        fields = _ref2.fields,
        meta = _ref2.meta,
        language = _ref2.language;

    var state = createState({ config: config })({ fields: fields, meta: meta, language: language });
    var store = createStore(reduce, state);
    $('[data-component]').each(function () {
      var el = $(this);
      var component = components[el.attr('data-component')];
      if (!component) return;
      var ctx = { store: store, language: language };
      var markupProps = JSON.parse(el.attr('data-props') || '{}');
      var res = component(ctx, markupProps);
      if (typeof res === 'string') el.html(res);else if (typeof res.replace === 'string') el.replaceWith($(res.replace));else {
        if (_typeof(res.attrs) === 'object') {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.keys(res.attrs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              if (typeof res.attrs[key] !== 'string') continue;
              el.attr(key, res.attrs[key]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    });
    return $;
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$1 = createCommonjsModule(function (module, exports) {
'use strict';

exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function defaultEqualityCheck(a, b) {
  return a === b;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastArgs === null || lastArgs.length !== args.length || !args.every(function (value, index) {
      return equalityCheck(value, lastArgs[index]);
    })) {
      lastResult = func.apply(undefined, args);
    }
    lastArgs = args;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    memoizeOptions[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      funcs[_key3] = arguments[_key3];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      return resultFunc.apply(undefined, arguments);
    }].concat(memoizeOptions));

    var selector = function selector(state, props) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var params = dependencies.map(function (dependency) {
        return dependency.apply(undefined, [state, props].concat(args));
      });
      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
    };

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      values[_key5] = arguments[_key5];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}
});

var index_4 = index$1.createSelector;

var localFields = index_4(function (_ref) {
  var fields = _ref.fields;
  return fields;
}, globalKeys, function (fields, globalKeys) {
  return Object.keys(fields).reduce(function (localFields, key) {
    return globalKeys.indexOf(key) === -1 ? Object.assign({}, localFields, defineProperty({}, key, fields[key])) : localFields;
  }, {});
});

var globalFields = index_4(function (_ref2) {
  var fields = _ref2.fields;
  return fields;
}, globalKeys, function (fields, globalKeys) {
  return Object.keys(fields).reduce(function (globalFields, key) {
    return globalKeys.indexOf(key) > -1 ? Object.assign({}, globalFields, defineProperty({}, key, fields[key])) : globalFields;
  }, {});
});

var localNoLangFields = function localNoLangFields(_ref3) {
  var notLocalized = _ref3.locals.notLocalized;
  return notLocalized;
};
var globalNoLangFields = function globalNoLangFields(_ref4) {
  var notLocalized = _ref4.globals.notLocalized;
  return notLocalized;
};







function globalKeys(_ref8) {
  var keys = _ref8.globals.keys;

  return keys;
}

function createClientRuntime(_ref) {
  var components = _ref.components;

  var isMounted = false;
  var middleware = window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  };
  var els = document.querySelectorAll('[data-component]');
  return function run(_ref2) {
    var config = _ref2.config,
        fields = _ref2.fields,
        meta = _ref2.meta,
        language = _ref2.language;

    // Mount editing mode
    if (isMounted) return;
    var hooks = [];
    var storeEnhancer = middleware;
    var state = createState({ config: config })({ fields: fields, meta: meta, language: language });
    var store = createStore(reduce, state, storeEnhancer);[].slice.call(els).forEach(function (el) {
      var name = el.getAttribute('data-component');
      var component = components[name];
      if (!component) {
        el.innerHTML = 'Unable to resolve component \'' + name + '\'';
      } else {
        var ctx = Object.assign({ store: store, language: language }, process.env.PENGUIN_ENV === 'development' ? {
          save: function save(callback) {
            hooks.filter(function (h) {
              return h && typeof h.save === 'function';
            }).forEach(function (h) {
              return h.save();
            });
            _save(store, callback);
          },
          destroy: function destroy(callback) {
            hooks.filter(function (h) {
              return h && typeof h.destroy === 'function';
            }).forEach(function (h) {
              return h.destroy();
            });
            _destroy(store, callback);
          },
          publish: function publish(callback) {
            hooks.filter(function (h) {
              return h && typeof h.publish === 'function';
            }).forEach(function (h) {
              return h.publish();
            });
            _publish(store, callback);
          }
        } : null);
        var props = JSON.parse(el.getAttribute('data-props') || '{}');
        hooks.push(component(ctx, props, el));
      }
    });
    isMounted = true;
  };
}

function _save(store) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var put = function put(url, o, done) {
    var xhr = new window.XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onerror = function () {
      return done(xhr);
    };
    xhr.onload = function () {
      if ((xhr.status / 100 | 0) !== 2) return done(xhr);
      done(null, xhr);
    };
    xhr.send(JSON.stringify(o));
  };
  var saveFields = function saveFields(pathname, data, _ref3, done) {
    var noLang = _ref3.noLang,
        language = _ref3.language;

    var notLocalized = Object.keys(data).reduce(function (fields, key) {
      return noLang.indexOf(key) > -1 ? Object.assign({}, fields, defineProperty({}, key, data[key])) : fields;
    }, {});
    var localized = Object.keys(data).reduce(function (fields, key) {
      return noLang.indexOf(key) === -1 ? Object.assign({}, fields, defineProperty({}, key, data[key])) : fields;
    }, {});
    var pending = 2;
    var sync = function sync(err, xhr) {
      if (err) {
        pending = 0;return done(err);
      }
      if (--pending === 0) done(null);
    };
    put('/not_localized' + pathname + '.json', notLocalized, sync);
    put('/' + language + pathname + '.json', localized, sync);
  };
  var state = store.getState();
  var parts = window.location.pathname.split('/').slice(1);
  var language = parts[0];
  var pathname = '/' + parts.slice(1).join('/');
  store.dispatch({ type: SAVE });
  var pending = 2;
  var sync = function sync(err) {
    if (err) {
      pending = 0;
      callback(err);
      return { type: SAVE_FAILURE, error: err };
    }
    if (--pending === 0) {
      callback();
      store.dispatch({ type: SAVE_SUCCESS });
    }
  };
  saveFields('', globalFields(state), {
    noLang: globalNoLangFields(state),
    language: language
  }, sync);
  saveFields(pathname, localFields(state), {
    noLang: localNoLangFields(state),
    language: language
  }, sync);
}

function _publish(store) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var xhr = new window.XMLHttpRequest();
  xhr.open('POST', '/api/v1/publish', true);
  xhr.onerror = function () {
    return store.dispatch({ PUBLISH_FAILURE: PUBLISH_FAILURE, error: xhr });
  };
  xhr.onload = function () {
    if ((xhr.status / 100 | 0) !== 2) {
      callback(xhr);
      return store.dispatch({ type: PUBLISH_FAILURE, error: xhr });
    }
    callback();
    store.dispatch({ type: PUBLISH_SUCCESS });
  };
  store.dispatch({ type: PUBLISH });
  xhr.send();
}

function _destroy(store) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var parts = window.location.pathname.split('/').slice(1);
  if (parts.length < 3) return;
  var xhr = new window.XMLHttpRequest();
  xhr.open('DELETE', '/' + parts.slice(1).join('/'), true);
  xhr.onerror = function () {
    return store.dispatch({ SAVE_FAILURE: SAVE_FAILURE, error: xhr });
  };
  xhr.onload = function () {
    if ((xhr.status / 100 | 0) !== 2) {
      callback(xhr);
      return store.dispatch({ type: SAVE_FAILURE, error: xhr });
    }
    callback();
    store.dispatch({ type: SAVE_SUCCESS });
  };
  store.dispatch({ type: SAVE });
  xhr.send();
}

export { createServerRenderer as createServerRuntime, createClientRuntime, HYDRATE, UPDATE_FIELDS, SAVE, SAVE_SUCCESS, SAVE_FAILURE, PUBLISH, PUBLISH_SUCCESS, PUBLISH_FAILURE, update, saveSuccess, saveFailure };
