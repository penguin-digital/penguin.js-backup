'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createServerRenderer;

var _redux = require('redux');

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createServerRenderer(_ref) {
  var components = _ref.components;

  return function render(_ref2, $) {
    var config = _ref2.config,
        fields = _ref2.fields,
        meta = _ref2.meta,
        language = _ref2.language;

    var state = (0, _state2.default)({ config: config })({ fields: fields, meta: meta, language: language });
    var store = (0, _redux.createStore)(_reducers2.default, state);
    $('[data-component]').each(function () {
      var el = $(this);
      var component = components[el.attr('data-component')];
      if (!component) return;
      var markupProps = JSON.parse(el.attr('data-props') || '{}');
      var res = component(Object.assign({}, markupProps, { store: store, language: language }));
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