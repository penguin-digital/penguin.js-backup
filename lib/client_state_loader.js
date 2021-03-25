'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = createStateLoader;
function createStateLoader(_ref) {
  var stateSerializer = _ref.stateSerializer,
      fetch = _ref.fetch;

  return {
    loadObjectState: function loadObjectState(_ref2) {
      var language = _ref2.language,
          type = _ref2.type,
          id = _ref2.id,
          isNew = _ref2.isNew;

      return load([loadJSON('/objects/' + type + '.json'), loadJSON('/' + language + '/' + type + '/' + id + '.json')]);
    },
    loadPageState: function loadPageState(_ref3) {
      var language = _ref3.language,
          name = _ref3.name;

      return load([loadJSON('/pages/' + name + '.json'), loadJSON('/' + language + '/' + name + '.json')]);
    }
  };

  function loadJSON(path) {
    return fetch(path, { credentials: 'same-origin' }).then(function (res) {
      return res.json();
    });
  }

  function load(requests) {
    var promises = Promise.all(requests);
    return promises.then(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          meta = _ref5[0],
          fields = _ref5[1];

      return stateSerializer({ meta: meta, fields: fields });
    });
  }
}