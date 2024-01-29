/*!
 * Tenuki v0.3.1 (https://github.com/aprescott/tenuki)
 * Copyright © 2016-2019 Adam Prescott.
 * Licensed under the MIT license.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tenuki=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.Game = require("./lib/game")["default"];
exports.Client = require("./lib/client")["default"];
exports.utils = require("./lib/utils")["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHBvcnRzIiwiR2FtZSIsInJlcXVpcmUiLCJDbGllbnQiLCJ1dGlscyJdLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuR2FtZSA9IHJlcXVpcmUoXCIuL2xpYi9nYW1lXCIpLmRlZmF1bHQ7XG5leHBvcnRzLkNsaWVudCA9IHJlcXVpcmUoXCIuL2xpYi9jbGllbnRcIikuZGVmYXVsdDtcbmV4cG9ydHMudXRpbHMgPSByZXF1aXJlKFwiLi9saWIvdXRpbHNcIikuZGVmYXVsdDtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBTyxDQUFDQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBUTtBQUM1Q0YsT0FBTyxDQUFDRyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBUTtBQUNoREYsT0FBTyxDQUFDSSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBUSJ9
},{"./lib/client":3,"./lib/game":6,"./lib/utils":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
var _intersection = _interopRequireDefault(require("./intersection"));
var _zobrist = _interopRequireDefault(require("./zobrist"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var BoardState = function BoardState(_ref) {
  var moveNumber = _ref.moveNumber,
    playedPoint = _ref.playedPoint,
    color = _ref.color,
    pass = _ref.pass,
    blackPassStones = _ref.blackPassStones,
    whitePassStones = _ref.whitePassStones,
    intersections = _ref.intersections,
    blackStonesCaptured = _ref.blackStonesCaptured,
    whiteStonesCaptured = _ref.whiteStonesCaptured,
    capturedPositions = _ref.capturedPositions,
    koPoint = _ref.koPoint,
    boardSize = _ref.boardSize;
  this.moveNumber = moveNumber;
  this.playedPoint = playedPoint;
  this.color = color;
  this.pass = pass;
  this.blackPassStones = blackPassStones;
  this.whitePassStones = whitePassStones;
  this.intersections = intersections;
  this.blackStonesCaptured = blackStonesCaptured;
  this.whiteStonesCaptured = whiteStonesCaptured;
  this.capturedPositions = capturedPositions;
  this.koPoint = koPoint;
  this.boardSize = boardSize;
  this._positionHash = _zobrist["default"].hash(boardSize, intersections);
  Object.freeze(this);
};
BoardState.prototype = {
  copyWithAttributes: function copyWithAttributes(attrs) {
    var retrieveProperties = function retrieveProperties(_ref2) {
      var moveNumber = _ref2.moveNumber,
        playedPoint = _ref2.playedPoint,
        color = _ref2.color,
        pass = _ref2.pass,
        blackPassStones = _ref2.blackPassStones,
        whitePassStones = _ref2.whitePassStones,
        intersections = _ref2.intersections,
        blackStonesCaptured = _ref2.blackStonesCaptured,
        whiteStonesCaptured = _ref2.whiteStonesCaptured,
        capturedPositions = _ref2.capturedPositions,
        koPoint = _ref2.koPoint,
        boardSize = _ref2.boardSize;
      return {
        moveNumber: moveNumber,
        playedPoint: playedPoint,
        color: color,
        pass: pass,
        blackPassStones: blackPassStones,
        whitePassStones: whitePassStones,
        intersections: intersections,
        blackStonesCaptured: blackStonesCaptured,
        whiteStonesCaptured: whiteStonesCaptured,
        capturedPositions: capturedPositions,
        koPoint: koPoint,
        boardSize: boardSize
      };
    };
    var existingAttrs = retrieveProperties(this);
    var newAttrs = retrieveProperties(Object.assign(existingAttrs, attrs));
    return new BoardState(newAttrs);
  },
  _capturesFrom: function _capturesFrom(y, x, color) {
    var _this = this;
    var capturedNeighbors = this.neighborsFor(y, x).filter(function (neighbor) {
      // TODO: this value of 1 is potentially weird.
      // we're checking against the move before the stone we just played
      // where this space is not occupied yet. things should possibly be
      // reworked.
      console.log('neighbor.isEmpty() =', neighbor.isEmpty(), ' | neighbor.value =', neighbor.value, ' | y, x =', neighbor.y, ", ", neighbor.x);
      return !neighbor.isEmpty() && neighbor.value !== color && _this.libertiesAt(neighbor.y, neighbor.x) === 1;
    });
    // if (capturedNeighbors) { console.log('capturedNeighbors = ', capturedNeighbors); }

    var capturedStonesNoBlue = _utils["default"].flatMap(capturedNeighbors, function (neighbor) {
      return _this.groupAt(neighbor.y, neighbor.x);
    });
    var capturedStones = capturedStonesNoBlue.filter(function (obj) {
      return obj.value !== 'blue';
    });
    if (capturedStones) {
      console.log('_capturesFrom >> capturedStones = ', capturedStones);
    }
    return _utils["default"].unique(capturedStones);
  },
  _updateIntersection: function _updateIntersection(intersection, intersections, color) {
    return intersections.map(function (i) {
      if (i.y === intersection.y && i.x === intersection.x) {
        return new _intersection["default"](i.y, i.x, color);
      } else {
        return i;
      }
    });
  },
  _removeIntersection: function _removeIntersection(intersection, intersections) {
    return this._updateIntersection(intersection, intersections, "empty");
  },
  _withoutIntersectionsMatching: function _withoutIntersectionsMatching(condition) {
    var newPoints = this.intersections.map(function (i) {
      if (condition(i)) {
        return new _intersection["default"](i.y, i.x, "empty");
      } else {
        return i;
      }
    });
    return this._withNewPoints(newPoints);
  },
  _withNewPoints: function _withNewPoints(newPoints) {
    return this.copyWithAttributes({
      intersections: newPoints
    });
  },
  nextColor: function nextColor() {
    if (this.color === "black") {
      return "white";
    } else {
      return "black";
    }
  },
  yCoordinateFor: function yCoordinateFor(y) {
    return this.boardSize - y;
  },
  xCoordinateFor: function xCoordinateFor(x) {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
    return letters[x];
  },
  playPass: function playPass(color) {
    var stateInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: null,
      color: color,
      pass: true,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: this.intersections,
      blackStonesCaptured: this.blackStonesCaptured,
      whiteStonesCaptured: this.whiteStonesCaptured,
      capturedPositions: [],
      koPoint: null,
      boardSize: this.boardSize
    };
    stateInfo[color + "PassStones"] += 1;
    var newState = new BoardState(stateInfo);
    return newState;
  },
  _simpleKoPoint: function _simpleKoPoint() {
    var simpleKoPoint = null;
    if (this.playedPoint) {
      var _this$playedPoint = this.playedPoint,
        y = _this$playedPoint.y,
        x = _this$playedPoint.x;
      if (this.capturedPositions.length === 1 && this.groupAt(y, x).length === 1 && this.inAtari(y, x)) {
        simpleKoPoint = this.capturedPositions[0];
      }
    }
    return simpleKoPoint;
  },
  playAt: function playAt(y, x, playedColor) {
    var _this2 = this;
    var capturedPositions = this._capturesFrom(y, x, playedColor);
    console.log('playAt >> capturedPositions =', capturedPositions);
    if (capturedPositions) {
      capturedPositions = capturedPositions.filter(function (obj) {
        return obj.value !== 'blue';
      });
      console.log('capturedPositions =', capturedPositions);
    }
    var playedPoint = this.intersectionAt(y, x);
    var newPoints = this.intersections;
    capturedPositions.forEach(function (i) {
      newPoints = _this2._removeIntersection(i, newPoints);
    });
    newPoints = this._updateIntersection(playedPoint, newPoints, playedColor);
    var newTotalBlackCaptured = this.blackStonesCaptured + (playedColor === "black" ? 0 : capturedPositions.length);
    var newTotalWhiteCaptured = this.whiteStonesCaptured + (playedColor === "white" ? 0 : capturedPositions.length);
    var boardSize = this.boardSize;
    var moveInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: Object.freeze({
        y: y,
        x: x
      }),
      color: playedColor,
      pass: false,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: newPoints,
      blackStonesCaptured: newTotalBlackCaptured,
      whiteStonesCaptured: newTotalWhiteCaptured,
      capturedPositions: capturedPositions,
      boardSize: boardSize
    };
    var withPlayedPoint = new BoardState(moveInfo);
    var possibleKoPoint = withPlayedPoint._simpleKoPoint();
    if (possibleKoPoint) {
      moveInfo["koPoint"] = {
        y: possibleKoPoint.y,
        x: possibleKoPoint.x
      };
    } else {
      moveInfo["koPoint"] = null;
    }
    return new BoardState(moveInfo);
  },
  intersectionAt: function intersectionAt(y, x) {
    if (y >= this.boardSize || x >= this.boardSize) {
      throw new Error("Intersection at (".concat(y, ", ").concat(x, ") would be outside the board"));
    }
    if (y < 0 || x < 0) {
      throw new Error("Intersection position cannot be negative, but was given (".concat(y, ", ").concat(x, ")"));
    }
    return this.intersections[y * this.boardSize + x];
  },
  groupAt: function groupAt(y, x) {
    var startingPoint = this.intersectionAt(y, x);
    var _this$partitionTraver = this.partitionTraverse(startingPoint, function (neighbor) {
        return neighbor.sameColorAs(startingPoint);
      }),
      _this$partitionTraver2 = _slicedToArray(_this$partitionTraver, 2),
      group = _this$partitionTraver2[0],
      _ = _this$partitionTraver2[1];
    return group;
  },
  libertiesAt: function libertiesAt(y, x) {
    var _this3 = this;
    var point = this.intersectionAt(y, x);
    var emptyPoints = _utils["default"].flatMap(this.groupAt(point.y, point.x), function (groupPoint) {
      return _this3.neighborsFor(groupPoint.y, groupPoint.x).filter(function (intersection) {
        return intersection.isEmpty();
      });
    });
    return _utils["default"].unique(emptyPoints).length;
  },
  inAtari: function inAtari(y, x) {
    return this.libertiesAt(y, x) === 1;
  },
  neighborsFor: function neighborsFor(y, x) {
    var neighbors = [];
    if (x > 0) {
      neighbors.push(this.intersectionAt(y, x - 1));
    }
    if (x < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y, x + 1));
    }
    if (y > 0) {
      neighbors.push(this.intersectionAt(y - 1, x));
    }
    if (y < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y + 1, x));
    }
    return neighbors;
  },
  positionSameAs: function positionSameAs(otherState) {
    return this._positionHash === otherState._positionHash && this.intersections.every(function (point) {
      return point.sameColorAs(otherState.intersectionAt(point.y, point.x));
    });
  },
  // Iterative depth-first search traversal. Start from
  // startingPoint, iteratively follow all neighbors.
  // If inclusionConditionis met for a neighbor, include it
  // otherwise, exclude it. At the end, return two arrays:
  // One for the included neighbors, another for the remaining neighbors.
  partitionTraverse: function partitionTraverse(startingPoint, inclusionCondition) {
    var checkedPoints = [];
    var boundaryPoints = [];
    var pointsToCheck = [];
    pointsToCheck.push(startingPoint);
    while (pointsToCheck.length > 0) {
      var point = pointsToCheck.pop();
      if (checkedPoints.indexOf(point) > -1) {
        // skip it, we already checked
      } else {
        checkedPoints.push(point);
        this.neighborsFor(point.y, point.x).forEach(function (neighbor) {
          if (checkedPoints.indexOf(neighbor) > -1) {
            // skip this neighbor, we already checked it
          } else {
            if (inclusionCondition(neighbor)) {
              pointsToCheck.push(neighbor);
            } else {
              boundaryPoints.push(neighbor);
            }
          }
        });
      }
    }
    return [checkedPoints, _utils["default"].unique(boundaryPoints)];
  }
};
BoardState._initialFor = function (boardSize, handicapStones, bluePosition) {
  this._cache = this._cache || {};
  this._cache[boardSize] = this._cache[boardSize] || {};
  if (this._cache[boardSize][handicapStones]) {
    return this._cache[boardSize][handicapStones];
  }
  var emptyPoints = Array.apply(null, Array(boardSize * boardSize));
  emptyPoints = emptyPoints.map(function (x, i) {
    return new _intersection["default"](Math.floor(i / boardSize), i % boardSize);
  });

  // emptyPoints[60] = new Intersection(3, 3, 'blue');

  // console.log(`bluePosition.yPos = ${bluePosition.yPos}, bluePosition.xPos = ${bluePosition.xPos}`);
  var blueArrIndex = Number(bluePosition.yPos) * 19 + Number(bluePosition.xPos);
  // console.log(`blueArrIndex = ${blueArrIndex}`);
  emptyPoints[blueArrIndex] = new _intersection["default"](Number(bluePosition.yPos), Number(bluePosition.xPos), 'blue');
  // console.log('emptyPoints =', emptyPoints);

  var hoshiOffset = boardSize > 11 ? 3 : 2;
  var hoshiPoints = {
    topRight: {
      y: hoshiOffset,
      x: boardSize - hoshiOffset - 1
    },
    bottomLeft: {
      y: boardSize - hoshiOffset - 1,
      x: hoshiOffset
    },
    bottomRight: {
      y: boardSize - hoshiOffset - 1,
      x: boardSize - hoshiOffset - 1
    },
    topLeft: {
      y: hoshiOffset,
      x: hoshiOffset
    },
    middle: {
      y: (boardSize + 1) / 2 - 1,
      x: (boardSize + 1) / 2 - 1
    },
    middleLeft: {
      y: (boardSize + 1) / 2 - 1,
      x: hoshiOffset
    },
    middleRight: {
      y: (boardSize + 1) / 2 - 1,
      x: boardSize - hoshiOffset - 1
    },
    middleTop: {
      y: hoshiOffset,
      x: (boardSize + 1) / 2 - 1
    },
    middleBottom: {
      y: boardSize - hoshiOffset - 1,
      x: (boardSize + 1) / 2 - 1
    }
  };
  var handicapPlacements = {
    0: [],
    1: [],
    2: [hoshiPoints.topRight, hoshiPoints.bottomLeft],
    3: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight],
    4: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft],
    5: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middle],
    6: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight],
    7: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middle],
    8: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom],
    9: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom, hoshiPoints.middle]
  };
  handicapPlacements[handicapStones].forEach(function (p) {
    emptyPoints[p.y * boardSize + p.x] = new _intersection["default"](p.y, p.x, "black");
  });
  var initialState = new BoardState({
    color: handicapStones > 1 ? "black" : "white",
    moveNumber: 0,
    intersections: Object.freeze(emptyPoints),
    blackStonesCaptured: 0,
    whiteStonesCaptured: 0,
    whitePassStones: 0,
    blackPassStones: 0,
    boardSize: boardSize
  });
  this._cache[boardSize][handicapStones] = initialState;
  // console.log('initialState =', initialState);
  return initialState;
};
var _default = exports["default"] = BoardState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9pbnRlcnNlY3Rpb24iLCJfem9icmlzdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfc2xpY2VkVG9BcnJheSIsImFyciIsImkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsImxlbiIsImxlbmd0aCIsImFycjIiLCJyIiwibCIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsImUiLCJ1IiwiYSIsImYiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJCb2FyZFN0YXRlIiwiX3JlZiIsIm1vdmVOdW1iZXIiLCJwbGF5ZWRQb2ludCIsImNvbG9yIiwicGFzcyIsImJsYWNrUGFzc1N0b25lcyIsIndoaXRlUGFzc1N0b25lcyIsImludGVyc2VjdGlvbnMiLCJibGFja1N0b25lc0NhcHR1cmVkIiwid2hpdGVTdG9uZXNDYXB0dXJlZCIsImNhcHR1cmVkUG9zaXRpb25zIiwia29Qb2ludCIsImJvYXJkU2l6ZSIsIl9wb3NpdGlvbkhhc2giLCJoYXNoIiwiZnJlZXplIiwiY29weVdpdGhBdHRyaWJ1dGVzIiwiYXR0cnMiLCJyZXRyaWV2ZVByb3BlcnRpZXMiLCJfcmVmMiIsImV4aXN0aW5nQXR0cnMiLCJuZXdBdHRycyIsImFzc2lnbiIsIl9jYXB0dXJlc0Zyb20iLCJ5IiwieCIsIl90aGlzIiwiY2FwdHVyZWROZWlnaGJvcnMiLCJuZWlnaGJvcnNGb3IiLCJmaWx0ZXIiLCJuZWlnaGJvciIsImNvbnNvbGUiLCJsb2ciLCJpc0VtcHR5IiwibGliZXJ0aWVzQXQiLCJjYXB0dXJlZFN0b25lc05vQmx1ZSIsImZsYXRNYXAiLCJncm91cEF0IiwiY2FwdHVyZWRTdG9uZXMiLCJ1bmlxdWUiLCJfdXBkYXRlSW50ZXJzZWN0aW9uIiwiaW50ZXJzZWN0aW9uIiwibWFwIiwiX3JlbW92ZUludGVyc2VjdGlvbiIsIl93aXRob3V0SW50ZXJzZWN0aW9uc01hdGNoaW5nIiwiY29uZGl0aW9uIiwibmV3UG9pbnRzIiwiX3dpdGhOZXdQb2ludHMiLCJuZXh0Q29sb3IiLCJ5Q29vcmRpbmF0ZUZvciIsInhDb29yZGluYXRlRm9yIiwibGV0dGVycyIsInBsYXlQYXNzIiwic3RhdGVJbmZvIiwibmV3U3RhdGUiLCJfc2ltcGxlS29Qb2ludCIsInNpbXBsZUtvUG9pbnQiLCJfdGhpcyRwbGF5ZWRQb2ludCIsImluQXRhcmkiLCJwbGF5QXQiLCJwbGF5ZWRDb2xvciIsIl90aGlzMiIsImludGVyc2VjdGlvbkF0IiwiZm9yRWFjaCIsIm5ld1RvdGFsQmxhY2tDYXB0dXJlZCIsIm5ld1RvdGFsV2hpdGVDYXB0dXJlZCIsIm1vdmVJbmZvIiwid2l0aFBsYXllZFBvaW50IiwicG9zc2libGVLb1BvaW50IiwiRXJyb3IiLCJjb25jYXQiLCJzdGFydGluZ1BvaW50IiwiX3RoaXMkcGFydGl0aW9uVHJhdmVyIiwicGFydGl0aW9uVHJhdmVyc2UiLCJzYW1lQ29sb3JBcyIsIl90aGlzJHBhcnRpdGlvblRyYXZlcjIiLCJncm91cCIsIl8iLCJfdGhpczMiLCJwb2ludCIsImVtcHR5UG9pbnRzIiwiZ3JvdXBQb2ludCIsIm5laWdoYm9ycyIsInBvc2l0aW9uU2FtZUFzIiwib3RoZXJTdGF0ZSIsImV2ZXJ5IiwiaW5jbHVzaW9uQ29uZGl0aW9uIiwiY2hlY2tlZFBvaW50cyIsImJvdW5kYXJ5UG9pbnRzIiwicG9pbnRzVG9DaGVjayIsInBvcCIsImluZGV4T2YiLCJfaW5pdGlhbEZvciIsImhhbmRpY2FwU3RvbmVzIiwiYmx1ZVBvc2l0aW9uIiwiX2NhY2hlIiwiYXBwbHkiLCJNYXRoIiwiZmxvb3IiLCJibHVlQXJySW5kZXgiLCJOdW1iZXIiLCJ5UG9zIiwieFBvcyIsImhvc2hpT2Zmc2V0IiwiaG9zaGlQb2ludHMiLCJ0b3BSaWdodCIsImJvdHRvbUxlZnQiLCJib3R0b21SaWdodCIsInRvcExlZnQiLCJtaWRkbGUiLCJtaWRkbGVMZWZ0IiwibWlkZGxlUmlnaHQiLCJtaWRkbGVUb3AiLCJtaWRkbGVCb3R0b20iLCJoYW5kaWNhcFBsYWNlbWVudHMiLCJwIiwiaW5pdGlhbFN0YXRlIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2JvYXJkLXN0YXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IEludGVyc2VjdGlvbiBmcm9tIFwiLi9pbnRlcnNlY3Rpb25cIjtcbmltcG9ydCBab2JyaXN0IGZyb20gXCIuL3pvYnJpc3RcIjtcblxuY29uc3QgQm9hcmRTdGF0ZSA9IGZ1bmN0aW9uKHsgbW92ZU51bWJlciwgcGxheWVkUG9pbnQsIGNvbG9yLCBwYXNzLCBibGFja1Bhc3NTdG9uZXMsIHdoaXRlUGFzc1N0b25lcywgaW50ZXJzZWN0aW9ucywgYmxhY2tTdG9uZXNDYXB0dXJlZCwgd2hpdGVTdG9uZXNDYXB0dXJlZCwgY2FwdHVyZWRQb3NpdGlvbnMsIGtvUG9pbnQsIGJvYXJkU2l6ZSB9KSB7XG4gIHRoaXMubW92ZU51bWJlciA9IG1vdmVOdW1iZXI7XG4gIHRoaXMucGxheWVkUG9pbnQgPSBwbGF5ZWRQb2ludDtcbiAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICB0aGlzLnBhc3MgPSBwYXNzO1xuICB0aGlzLmJsYWNrUGFzc1N0b25lcyA9IGJsYWNrUGFzc1N0b25lcztcbiAgdGhpcy53aGl0ZVBhc3NTdG9uZXMgPSB3aGl0ZVBhc3NTdG9uZXM7XG4gIHRoaXMuaW50ZXJzZWN0aW9ucyA9IGludGVyc2VjdGlvbnM7XG4gIHRoaXMuYmxhY2tTdG9uZXNDYXB0dXJlZCA9IGJsYWNrU3RvbmVzQ2FwdHVyZWQ7XG4gIHRoaXMud2hpdGVTdG9uZXNDYXB0dXJlZCA9IHdoaXRlU3RvbmVzQ2FwdHVyZWQ7XG4gIHRoaXMuY2FwdHVyZWRQb3NpdGlvbnMgPSBjYXB0dXJlZFBvc2l0aW9ucztcbiAgdGhpcy5rb1BvaW50ID0ga29Qb2ludDtcbiAgdGhpcy5ib2FyZFNpemUgPSBib2FyZFNpemU7XG4gIHRoaXMuX3Bvc2l0aW9uSGFzaCA9IFpvYnJpc3QuaGFzaChib2FyZFNpemUsIGludGVyc2VjdGlvbnMpO1xuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5Cb2FyZFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgY29weVdpdGhBdHRyaWJ1dGVzOiBmdW5jdGlvbihhdHRycykge1xuICAgIGNvbnN0IHJldHJpZXZlUHJvcGVydGllcyA9ICh7IG1vdmVOdW1iZXIsIHBsYXllZFBvaW50LCBjb2xvciwgcGFzcywgYmxhY2tQYXNzU3RvbmVzLCB3aGl0ZVBhc3NTdG9uZXMsIGludGVyc2VjdGlvbnMsIGJsYWNrU3RvbmVzQ2FwdHVyZWQsIHdoaXRlU3RvbmVzQ2FwdHVyZWQsIGNhcHR1cmVkUG9zaXRpb25zLCBrb1BvaW50LCBib2FyZFNpemUgfSkgPT4gKHsgbW92ZU51bWJlciwgcGxheWVkUG9pbnQsIGNvbG9yLCBwYXNzLCBibGFja1Bhc3NTdG9uZXMsIHdoaXRlUGFzc1N0b25lcywgaW50ZXJzZWN0aW9ucywgYmxhY2tTdG9uZXNDYXB0dXJlZCwgd2hpdGVTdG9uZXNDYXB0dXJlZCwgY2FwdHVyZWRQb3NpdGlvbnMsIGtvUG9pbnQsIGJvYXJkU2l6ZSB9KTtcbiAgICBjb25zdCBleGlzdGluZ0F0dHJzID0gcmV0cmlldmVQcm9wZXJ0aWVzKHRoaXMpO1xuICAgIGNvbnN0IG5ld0F0dHJzID0gcmV0cmlldmVQcm9wZXJ0aWVzKE9iamVjdC5hc3NpZ24oZXhpc3RpbmdBdHRycywgYXR0cnMpKTtcblxuICAgIHJldHVybiBuZXcgQm9hcmRTdGF0ZShuZXdBdHRycyk7XG4gIH0sXG5cbiAgX2NhcHR1cmVzRnJvbTogZnVuY3Rpb24oeSwgeCwgY29sb3IpIHtcbiAgICBjb25zdCBjYXB0dXJlZE5laWdoYm9ycyA9IHRoaXMubmVpZ2hib3JzRm9yKHksIHgpLmZpbHRlcihuZWlnaGJvciA9PiB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHZhbHVlIG9mIDEgaXMgcG90ZW50aWFsbHkgd2VpcmQuXG4gICAgICAvLyB3ZSdyZSBjaGVja2luZyBhZ2FpbnN0IHRoZSBtb3ZlIGJlZm9yZSB0aGUgc3RvbmUgd2UganVzdCBwbGF5ZWRcbiAgICAgIC8vIHdoZXJlIHRoaXMgc3BhY2UgaXMgbm90IG9jY3VwaWVkIHlldC4gdGhpbmdzIHNob3VsZCBwb3NzaWJseSBiZVxuICAgICAgLy8gcmV3b3JrZWQuXG4gICAgICBjb25zb2xlLmxvZygnbmVpZ2hib3IuaXNFbXB0eSgpID0nLCBuZWlnaGJvci5pc0VtcHR5KCksICcgfCBuZWlnaGJvci52YWx1ZSA9JywgbmVpZ2hib3IudmFsdWUsICcgfCB5LCB4ID0nLCBuZWlnaGJvci55LCBcIiwgXCIsIG5laWdoYm9yLngpO1xuICAgICAgcmV0dXJuICFuZWlnaGJvci5pc0VtcHR5KCkgJiYgbmVpZ2hib3IudmFsdWUgIT09IGNvbG9yICYmIHRoaXMubGliZXJ0aWVzQXQobmVpZ2hib3IueSwgbmVpZ2hib3IueCkgPT09IDE7XG4gICAgfSk7XG4gICAgLy8gaWYgKGNhcHR1cmVkTmVpZ2hib3JzKSB7IGNvbnNvbGUubG9nKCdjYXB0dXJlZE5laWdoYm9ycyA9ICcsIGNhcHR1cmVkTmVpZ2hib3JzKTsgfVxuXG4gICAgY29uc3QgY2FwdHVyZWRTdG9uZXNOb0JsdWUgPSB1dGlscy5mbGF0TWFwKGNhcHR1cmVkTmVpZ2hib3JzLCBuZWlnaGJvciA9PiB0aGlzLmdyb3VwQXQobmVpZ2hib3IueSwgbmVpZ2hib3IueCkpO1xuICAgIGNvbnN0IGNhcHR1cmVkU3RvbmVzID0gY2FwdHVyZWRTdG9uZXNOb0JsdWUuZmlsdGVyKG9iaiA9PiBvYmoudmFsdWUgIT09ICdibHVlJyk7XG4gICAgaWYgKGNhcHR1cmVkU3RvbmVzKSB7XG4gICAgICBjb25zb2xlLmxvZygnX2NhcHR1cmVzRnJvbSA+PiBjYXB0dXJlZFN0b25lcyA9ICcsIGNhcHR1cmVkU3RvbmVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHV0aWxzLnVuaXF1ZShjYXB0dXJlZFN0b25lcyk7XG4gIH0sXG5cbiAgX3VwZGF0ZUludGVyc2VjdGlvbjogZnVuY3Rpb24oaW50ZXJzZWN0aW9uLCBpbnRlcnNlY3Rpb25zLCBjb2xvcikge1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb25zLm1hcChpID0+IHtcbiAgICAgIGlmIChpLnkgPT09IGludGVyc2VjdGlvbi55ICYmIGkueCA9PT0gaW50ZXJzZWN0aW9uLngpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnNlY3Rpb24oaS55LCBpLngsIGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIF9yZW1vdmVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uKGludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl91cGRhdGVJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBpbnRlcnNlY3Rpb25zLCBcImVtcHR5XCIpO1xuICB9LFxuXG4gIF93aXRob3V0SW50ZXJzZWN0aW9uc01hdGNoaW5nOiBmdW5jdGlvbihjb25kaXRpb24pIHtcbiAgICBjb25zdCBuZXdQb2ludHMgPSB0aGlzLmludGVyc2VjdGlvbnMubWFwKGkgPT4ge1xuICAgICAgaWYgKGNvbmRpdGlvbihpKSkge1xuICAgICAgICByZXR1cm4gbmV3IEludGVyc2VjdGlvbihpLnksIGkueCwgXCJlbXB0eVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpdGhOZXdQb2ludHMobmV3UG9pbnRzKTtcbiAgfSxcblxuICBfd2l0aE5ld1BvaW50czogZnVuY3Rpb24obmV3UG9pbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weVdpdGhBdHRyaWJ1dGVzKHsgaW50ZXJzZWN0aW9uczogbmV3UG9pbnRzIH0pO1xuICB9LFxuXG4gIG5leHRDb2xvcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuY29sb3IgPT09IFwiYmxhY2tcIikge1xuICAgICAgcmV0dXJuIFwid2hpdGVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiYmxhY2tcIjtcbiAgICB9XG4gIH0sXG5cbiAgeUNvb3JkaW5hdGVGb3I6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZFNpemUgLSB5O1xuICB9LFxuXG4gIHhDb29yZGluYXRlRm9yOiBmdW5jdGlvbih4KSB7XG4gICAgY29uc3QgbGV0dGVycyA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSlwiLCBcIktcIiwgXCJMXCIsIFwiTVwiLCBcIk5cIiwgXCJPXCIsIFwiUFwiLCBcIlFcIiwgXCJSXCIsIFwiU1wiLCBcIlRcIl07XG5cbiAgICByZXR1cm4gbGV0dGVyc1t4XTtcbiAgfSxcblxuICBwbGF5UGFzczogZnVuY3Rpb24oY29sb3IpIHtcbiAgICBjb25zdCBzdGF0ZUluZm8gPSB7XG4gICAgICBtb3ZlTnVtYmVyOiB0aGlzLm1vdmVOdW1iZXIgKyAxLFxuICAgICAgcGxheWVkUG9pbnQ6IG51bGwsXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBwYXNzOiB0cnVlLFxuICAgICAgYmxhY2tQYXNzU3RvbmVzOiB0aGlzLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgIHdoaXRlUGFzc1N0b25lczogdGhpcy53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICBpbnRlcnNlY3Rpb25zOiB0aGlzLmludGVyc2VjdGlvbnMsXG4gICAgICBibGFja1N0b25lc0NhcHR1cmVkOiB0aGlzLmJsYWNrU3RvbmVzQ2FwdHVyZWQsXG4gICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkOiB0aGlzLndoaXRlU3RvbmVzQ2FwdHVyZWQsXG4gICAgICBjYXB0dXJlZFBvc2l0aW9uczogW10sXG4gICAgICBrb1BvaW50OiBudWxsLFxuICAgICAgYm9hcmRTaXplOiB0aGlzLmJvYXJkU2l6ZVxuICAgIH07XG5cbiAgICBzdGF0ZUluZm9bY29sb3IgKyBcIlBhc3NTdG9uZXNcIl0gKz0gMTtcblxuICAgIGNvbnN0IG5ld1N0YXRlID0gbmV3IEJvYXJkU3RhdGUoc3RhdGVJbmZvKTtcblxuICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgfSxcblxuICBfc2ltcGxlS29Qb2ludDogZnVuY3Rpb24oKSB7XG4gICAgbGV0IHNpbXBsZUtvUG9pbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucGxheWVkUG9pbnQpIHtcbiAgICAgIGNvbnN0IHsgeSwgeCB9ID0gdGhpcy5wbGF5ZWRQb2ludDtcblxuICAgICAgaWYgKHRoaXMuY2FwdHVyZWRQb3NpdGlvbnMubGVuZ3RoID09PSAxICYmIHRoaXMuZ3JvdXBBdCh5LCB4KS5sZW5ndGggPT09IDEgJiYgdGhpcy5pbkF0YXJpKHksIHgpKSB7XG4gICAgICAgIHNpbXBsZUtvUG9pbnQgPSB0aGlzLmNhcHR1cmVkUG9zaXRpb25zWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzaW1wbGVLb1BvaW50O1xuICB9LFxuXG4gIHBsYXlBdDogZnVuY3Rpb24oeSwgeCwgcGxheWVkQ29sb3IpIHtcbiAgICBsZXQgY2FwdHVyZWRQb3NpdGlvbnMgPSB0aGlzLl9jYXB0dXJlc0Zyb20oeSwgeCwgcGxheWVkQ29sb3IpO1xuICAgIGNvbnNvbGUubG9nKCdwbGF5QXQgPj4gY2FwdHVyZWRQb3NpdGlvbnMgPScsIGNhcHR1cmVkUG9zaXRpb25zKTtcbiAgICBpZiAoY2FwdHVyZWRQb3NpdGlvbnMpIHtcbiAgICAgIGNhcHR1cmVkUG9zaXRpb25zID0gY2FwdHVyZWRQb3NpdGlvbnMuZmlsdGVyKG9iaiA9PiBvYmoudmFsdWUgIT09ICdibHVlJyk7XG4gICAgICBjb25zb2xlLmxvZygnY2FwdHVyZWRQb3NpdGlvbnMgPScsIGNhcHR1cmVkUG9zaXRpb25zKTtcbiAgICB9XG4gICAgbGV0IHBsYXllZFBvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcbiAgICBsZXQgbmV3UG9pbnRzID0gdGhpcy5pbnRlcnNlY3Rpb25zO1xuXG4gICAgY2FwdHVyZWRQb3NpdGlvbnMuZm9yRWFjaChpID0+IHtcbiAgICAgIG5ld1BvaW50cyA9IHRoaXMuX3JlbW92ZUludGVyc2VjdGlvbihpLCBuZXdQb2ludHMpO1xuICAgIH0pO1xuXG4gICAgbmV3UG9pbnRzID0gdGhpcy5fdXBkYXRlSW50ZXJzZWN0aW9uKHBsYXllZFBvaW50LCBuZXdQb2ludHMsIHBsYXllZENvbG9yKTtcblxuICAgIGNvbnN0IG5ld1RvdGFsQmxhY2tDYXB0dXJlZCA9IHRoaXMuYmxhY2tTdG9uZXNDYXB0dXJlZCArIChwbGF5ZWRDb2xvciA9PT0gXCJibGFja1wiID8gMCA6IGNhcHR1cmVkUG9zaXRpb25zLmxlbmd0aCk7XG4gICAgY29uc3QgbmV3VG90YWxXaGl0ZUNhcHR1cmVkID0gdGhpcy53aGl0ZVN0b25lc0NhcHR1cmVkICsgKHBsYXllZENvbG9yID09PSBcIndoaXRlXCIgPyAwIDogY2FwdHVyZWRQb3NpdGlvbnMubGVuZ3RoKTtcblxuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IHRoaXMuYm9hcmRTaXplO1xuXG4gICAgY29uc3QgbW92ZUluZm8gPSB7XG4gICAgICBtb3ZlTnVtYmVyOiB0aGlzLm1vdmVOdW1iZXIgKyAxLFxuICAgICAgcGxheWVkUG9pbnQ6IE9iamVjdC5mcmVlemUoeyB5LCB4IH0pLFxuICAgICAgY29sb3I6IHBsYXllZENvbG9yLFxuICAgICAgcGFzczogZmFsc2UsXG4gICAgICBibGFja1Bhc3NTdG9uZXM6IHRoaXMuYmxhY2tQYXNzU3RvbmVzLFxuICAgICAgd2hpdGVQYXNzU3RvbmVzOiB0aGlzLndoaXRlUGFzc1N0b25lcyxcbiAgICAgIGludGVyc2VjdGlvbnM6IG5ld1BvaW50cyxcbiAgICAgIGJsYWNrU3RvbmVzQ2FwdHVyZWQ6IG5ld1RvdGFsQmxhY2tDYXB0dXJlZCxcbiAgICAgIHdoaXRlU3RvbmVzQ2FwdHVyZWQ6IG5ld1RvdGFsV2hpdGVDYXB0dXJlZCxcbiAgICAgIGNhcHR1cmVkUG9zaXRpb25zOiBjYXB0dXJlZFBvc2l0aW9ucyxcbiAgICAgIGJvYXJkU2l6ZTogYm9hcmRTaXplXG4gICAgfTtcblxuICAgIGNvbnN0IHdpdGhQbGF5ZWRQb2ludCA9IG5ldyBCb2FyZFN0YXRlKG1vdmVJbmZvKTtcblxuICAgIGNvbnN0IHBvc3NpYmxlS29Qb2ludCA9IHdpdGhQbGF5ZWRQb2ludC5fc2ltcGxlS29Qb2ludCgpO1xuXG4gICAgaWYgKHBvc3NpYmxlS29Qb2ludCkge1xuICAgICAgbW92ZUluZm9bXCJrb1BvaW50XCJdID0geyB5OiBwb3NzaWJsZUtvUG9pbnQueSwgeDogcG9zc2libGVLb1BvaW50LnggfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZUluZm9bXCJrb1BvaW50XCJdID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvYXJkU3RhdGUobW92ZUluZm8pO1xuICB9LFxuXG4gIGludGVyc2VjdGlvbkF0OiBmdW5jdGlvbih5LCB4KSB7XG4gICAgaWYgKHkgPj0gdGhpcy5ib2FyZFNpemUgfHwgeCA+PSB0aGlzLmJvYXJkU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnRlcnNlY3Rpb24gYXQgKCR7eX0sICR7eH0pIHdvdWxkIGJlIG91dHNpZGUgdGhlIGJvYXJkYCk7XG4gICAgfVxuXG4gICAgaWYgKHkgPCAwIHx8IHggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludGVyc2VjdGlvbiBwb3NpdGlvbiBjYW5ub3QgYmUgbmVnYXRpdmUsIGJ1dCB3YXMgZ2l2ZW4gKCR7eX0sICR7eH0pYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uc1t5KnRoaXMuYm9hcmRTaXplICsgeF07XG4gIH0sXG5cbiAgZ3JvdXBBdDogZnVuY3Rpb24oeSwgeCkge1xuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbkF0KHksIHgpO1xuXG4gICAgY29uc3QgW2dyb3VwLCBfXSA9IHRoaXMucGFydGl0aW9uVHJhdmVyc2Uoc3RhcnRpbmdQb2ludCwgbmVpZ2hib3IgPT4ge1xuICAgICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHN0YXJ0aW5nUG9pbnQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9LFxuXG4gIGxpYmVydGllc0F0OiBmdW5jdGlvbih5LCB4KSB7XG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbkF0KHksIHgpO1xuXG4gICAgY29uc3QgZW1wdHlQb2ludHMgPSB1dGlscy5mbGF0TWFwKHRoaXMuZ3JvdXBBdChwb2ludC55LCBwb2ludC54KSwgZ3JvdXBQb2ludCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5uZWlnaGJvcnNGb3IoZ3JvdXBQb2ludC55LCBncm91cFBvaW50LngpLmZpbHRlcihpbnRlcnNlY3Rpb24gPT4gaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdXRpbHMudW5pcXVlKGVtcHR5UG9pbnRzKS5sZW5ndGg7XG4gIH0sXG5cbiAgaW5BdGFyaTogZnVuY3Rpb24oeSwgeCkge1xuICAgIHJldHVybiB0aGlzLmxpYmVydGllc0F0KHksIHgpID09PSAxO1xuICB9LFxuXG4gIG5laWdoYm9yc0ZvcjogZnVuY3Rpb24oeSwgeCkge1xuICAgIGNvbnN0IG5laWdoYm9ycyA9IFtdO1xuXG4gICAgaWYgKHggPiAwKSB7XG4gICAgICBuZWlnaGJvcnMucHVzaCh0aGlzLmludGVyc2VjdGlvbkF0KHksIHggLSAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHggPCAodGhpcy5ib2FyZFNpemUgLSAxKSkge1xuICAgICAgbmVpZ2hib3JzLnB1c2godGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4ICsgMSkpO1xuICAgIH1cblxuICAgIGlmICh5ID4gMCkge1xuICAgICAgbmVpZ2hib3JzLnB1c2godGhpcy5pbnRlcnNlY3Rpb25BdCh5IC0gMSwgeCkpO1xuICAgIH1cblxuICAgIGlmICh5IDwgKHRoaXMuYm9hcmRTaXplIC0gMSkpIHtcbiAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uQXQoeSArIDEsIHgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmVpZ2hib3JzO1xuICB9LFxuXG4gIHBvc2l0aW9uU2FtZUFzOiBmdW5jdGlvbihvdGhlclN0YXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uSGFzaCA9PT0gb3RoZXJTdGF0ZS5fcG9zaXRpb25IYXNoICYmIHRoaXMuaW50ZXJzZWN0aW9ucy5ldmVyeShwb2ludCA9PiB7XG4gICAgICByZXR1cm4gcG9pbnQuc2FtZUNvbG9yQXMob3RoZXJTdGF0ZS5pbnRlcnNlY3Rpb25BdChwb2ludC55LCBwb2ludC54KSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gSXRlcmF0aXZlIGRlcHRoLWZpcnN0IHNlYXJjaCB0cmF2ZXJzYWwuIFN0YXJ0IGZyb21cbiAgLy8gc3RhcnRpbmdQb2ludCwgaXRlcmF0aXZlbHkgZm9sbG93IGFsbCBuZWlnaGJvcnMuXG4gIC8vIElmIGluY2x1c2lvbkNvbmRpdGlvbmlzIG1ldCBmb3IgYSBuZWlnaGJvciwgaW5jbHVkZSBpdFxuICAvLyBvdGhlcndpc2UsIGV4Y2x1ZGUgaXQuIEF0IHRoZSBlbmQsIHJldHVybiB0d28gYXJyYXlzOlxuICAvLyBPbmUgZm9yIHRoZSBpbmNsdWRlZCBuZWlnaGJvcnMsIGFub3RoZXIgZm9yIHRoZSByZW1haW5pbmcgbmVpZ2hib3JzLlxuICBwYXJ0aXRpb25UcmF2ZXJzZTogZnVuY3Rpb24oc3RhcnRpbmdQb2ludCwgaW5jbHVzaW9uQ29uZGl0aW9uKSB7XG4gICAgbGV0IGNoZWNrZWRQb2ludHMgPSBbXTtcbiAgICBsZXQgYm91bmRhcnlQb2ludHMgPSBbXTtcbiAgICBsZXQgcG9pbnRzVG9DaGVjayA9IFtdO1xuXG4gICAgcG9pbnRzVG9DaGVjay5wdXNoKHN0YXJ0aW5nUG9pbnQpO1xuXG4gICAgd2hpbGUgKHBvaW50c1RvQ2hlY2subGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNUb0NoZWNrLnBvcCgpO1xuXG4gICAgICBpZiAoY2hlY2tlZFBvaW50cy5pbmRleE9mKHBvaW50KSA+IC0xKSB7XG4gICAgICAgIC8vIHNraXAgaXQsIHdlIGFscmVhZHkgY2hlY2tlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tlZFBvaW50cy5wdXNoKHBvaW50KTtcblxuICAgICAgICB0aGlzLm5laWdoYm9yc0Zvcihwb2ludC55LCBwb2ludC54KS5mb3JFYWNoKG5laWdoYm9yID0+IHtcbiAgICAgICAgICBpZiAoY2hlY2tlZFBvaW50cy5pbmRleE9mKG5laWdoYm9yKSA+IC0xKSB7XG4gICAgICAgICAgICAvLyBza2lwIHRoaXMgbmVpZ2hib3IsIHdlIGFscmVhZHkgY2hlY2tlZCBpdFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5jbHVzaW9uQ29uZGl0aW9uKG5laWdoYm9yKSkge1xuICAgICAgICAgICAgICBwb2ludHNUb0NoZWNrLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYm91bmRhcnlQb2ludHMucHVzaChuZWlnaGJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2NoZWNrZWRQb2ludHMsIHV0aWxzLnVuaXF1ZShib3VuZGFyeVBvaW50cyldO1xuICB9XG59O1xuXG5Cb2FyZFN0YXRlLl9pbml0aWFsRm9yID0gZnVuY3Rpb24oYm9hcmRTaXplLCBoYW5kaWNhcFN0b25lcywgYmx1ZVBvc2l0aW9uKSB7XG4gIHRoaXMuX2NhY2hlID0gdGhpcy5fY2FjaGUgfHwge307XG4gIHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV0gPSB0aGlzLl9jYWNoZVtib2FyZFNpemVdIHx8IHt9O1xuXG4gIGlmICh0aGlzLl9jYWNoZVtib2FyZFNpemVdW2hhbmRpY2FwU3RvbmVzXSkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVtib2FyZFNpemVdW2hhbmRpY2FwU3RvbmVzXTtcbiAgfVxuXG4gIGxldCBlbXB0eVBvaW50cyA9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGJvYXJkU2l6ZSAqIGJvYXJkU2l6ZSkpO1xuICBlbXB0eVBvaW50cyA9IGVtcHR5UG9pbnRzLm1hcCgoeCwgaSkgPT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uKE1hdGguZmxvb3IoaSAvIGJvYXJkU2l6ZSksIGkgJSBib2FyZFNpemUpO1xuICB9KTtcblxuICAvLyBlbXB0eVBvaW50c1s2MF0gPSBuZXcgSW50ZXJzZWN0aW9uKDMsIDMsICdibHVlJyk7XG5cbiAgLy8gY29uc29sZS5sb2coYGJsdWVQb3NpdGlvbi55UG9zID0gJHtibHVlUG9zaXRpb24ueVBvc30sIGJsdWVQb3NpdGlvbi54UG9zID0gJHtibHVlUG9zaXRpb24ueFBvc31gKTtcbiAgY29uc3QgYmx1ZUFyckluZGV4ID0gTnVtYmVyKGJsdWVQb3NpdGlvbi55UG9zKSAqIDE5ICsgTnVtYmVyKGJsdWVQb3NpdGlvbi54UG9zKTtcbiAgLy8gY29uc29sZS5sb2coYGJsdWVBcnJJbmRleCA9ICR7Ymx1ZUFyckluZGV4fWApO1xuICBlbXB0eVBvaW50c1tibHVlQXJySW5kZXhdID0gbmV3IEludGVyc2VjdGlvbihOdW1iZXIoYmx1ZVBvc2l0aW9uLnlQb3MpLCBOdW1iZXIoYmx1ZVBvc2l0aW9uLnhQb3MpLCAnYmx1ZScpO1xuICAvLyBjb25zb2xlLmxvZygnZW1wdHlQb2ludHMgPScsIGVtcHR5UG9pbnRzKTtcblxuXG4gIGNvbnN0IGhvc2hpT2Zmc2V0ID0gYm9hcmRTaXplID4gMTEgPyAzIDogMjtcbiAgY29uc3QgaG9zaGlQb2ludHMgPSB7XG4gICAgdG9wUmlnaHQ6ICAgICB7IHk6IGhvc2hpT2Zmc2V0LCAgICAgICAgICAgICAgICAgeDogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxIH0sXG4gICAgYm90dG9tTGVmdDogICB7IHk6IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMSwgeDogaG9zaGlPZmZzZXQgfSxcbiAgICBib3R0b21SaWdodDogIHsgeTogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxLCB4OiBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDEgfSxcbiAgICB0b3BMZWZ0OiAgICAgIHsgeTogaG9zaGlPZmZzZXQsICAgICAgICAgICAgICAgICB4OiBob3NoaU9mZnNldCB9LFxuICAgIG1pZGRsZTogICAgICAgeyB5OiAoYm9hcmRTaXplICsgMSkvMiAtIDEsICAgICAgIHg6IChib2FyZFNpemUgKyAxKS8yIC0gMSB9LFxuICAgIG1pZGRsZUxlZnQ6ICAgeyB5OiAoYm9hcmRTaXplICsgMSkvMiAtIDEsICAgICAgIHg6IGhvc2hpT2Zmc2V0IH0sXG4gICAgbWlkZGxlUmlnaHQ6ICB7IHk6IChib2FyZFNpemUgKyAxKS8yIC0gMSwgICAgICAgeDogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxIH0sXG4gICAgbWlkZGxlVG9wOiAgICB7IHk6IGhvc2hpT2Zmc2V0LCAgICAgICAgICAgICAgICAgeDogKGJvYXJkU2l6ZSArIDEpLzIgLSAxIH0sXG4gICAgbWlkZGxlQm90dG9tOiB7IHk6IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMSwgeDogKGJvYXJkU2l6ZSArIDEpLzIgLSAxIH1cbiAgfTtcbiAgY29uc3QgaGFuZGljYXBQbGFjZW1lbnRzID0ge1xuICAgIDA6IFtdLFxuICAgIDE6IFtdLFxuICAgIDI6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdF0sXG4gICAgMzogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodF0sXG4gICAgNDogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdF0sXG4gICAgNTogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlXSxcbiAgICA2OiBbaG9zaGlQb2ludHMudG9wUmlnaHQsIGhvc2hpUG9pbnRzLmJvdHRvbUxlZnQsIGhvc2hpUG9pbnRzLmJvdHRvbVJpZ2h0LCBob3NoaVBvaW50cy50b3BMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVSaWdodF0sXG4gICAgNzogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHQsIGhvc2hpUG9pbnRzLm1pZGRsZV0sXG4gICAgODogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHQsIGhvc2hpUG9pbnRzLm1pZGRsZVRvcCwgaG9zaGlQb2ludHMubWlkZGxlQm90dG9tXSxcbiAgICA5OiBbaG9zaGlQb2ludHMudG9wUmlnaHQsIGhvc2hpUG9pbnRzLmJvdHRvbUxlZnQsIGhvc2hpUG9pbnRzLmJvdHRvbVJpZ2h0LCBob3NoaVBvaW50cy50b3BMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVSaWdodCwgaG9zaGlQb2ludHMubWlkZGxlVG9wLCBob3NoaVBvaW50cy5taWRkbGVCb3R0b20sIGhvc2hpUG9pbnRzLm1pZGRsZV1cbiAgfTtcblxuICBoYW5kaWNhcFBsYWNlbWVudHNbaGFuZGljYXBTdG9uZXNdLmZvckVhY2gocCA9PiB7XG4gICAgZW1wdHlQb2ludHNbcC55KmJvYXJkU2l6ZSArIHAueF0gPSBuZXcgSW50ZXJzZWN0aW9uKHAueSwgcC54LCBcImJsYWNrXCIpO1xuICB9KTtcblxuICBjb25zdCBpbml0aWFsU3RhdGUgPSBuZXcgQm9hcmRTdGF0ZSh7XG4gICAgY29sb3I6IGhhbmRpY2FwU3RvbmVzID4gMSA/IFwiYmxhY2tcIiA6IFwid2hpdGVcIixcbiAgICBtb3ZlTnVtYmVyOiAwLFxuICAgIGludGVyc2VjdGlvbnM6IE9iamVjdC5mcmVlemUoZW1wdHlQb2ludHMpLFxuICAgIGJsYWNrU3RvbmVzQ2FwdHVyZWQ6IDAsXG4gICAgd2hpdGVTdG9uZXNDYXB0dXJlZDogMCxcbiAgICB3aGl0ZVBhc3NTdG9uZXM6IDAsXG4gICAgYmxhY2tQYXNzU3RvbmVzOiAwLFxuICAgIGJvYXJkU2l6ZTogYm9hcmRTaXplXG4gIH0pO1xuXG4gIHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV1baGFuZGljYXBTdG9uZXNdID0gaW5pdGlhbFN0YXRlO1xuICAvLyBjb25zb2xlLmxvZygnaW5pdGlhbFN0YXRlID0nLCBpbml0aWFsU3RhdGUpO1xuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTdGF0ZTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQUEsTUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsUUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQWdDLFNB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
},{"./intersection":7,"./utils":14,"./zobrist":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _game = _interopRequireDefault(require("./game"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Client = function Client() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this._boardElement = options["element"];
  this._setup(options);
};
Client.prototype = {
  _setup: function _setup(_ref) {
    var _this = this;
    var player = _ref.player,
      gameOptions = _ref.gameOptions,
      hooks = _ref.hooks;
    this._player = player;
    this._hooks = hooks;
    if (this._player !== "black" && this._player !== "white") {
      throw new Error("Player must be either black or white, but was given: " + this._player);
    }
    gameOptions["_hooks"] = {
      handleClick: function handleClick(y, x) {
        if (_this._busy) {
          return;
        }
        _this._busy = true;
        if (_this.isOver()) {
          var stonesToBeMarkedDead = _this._game.currentState().groupAt(y, x).map(function (i) {
            return {
              y: i.y,
              x: i.x,
              color: i.color
            };
          });
          _this._hooks.submitMarkDeadAt(y, x, stonesToBeMarkedDead, function (result) {
            if (result) {
              _this._game.toggleDeadAt(y, x);
            }
            _this._busy = false;
          });
        } else {
          if (_this._player !== _this.currentPlayer() || _this._game.isIllegalAt(y, x)) {
            _this._busy = false;
            return;
          }
          _this._hooks.submitPlay(y, x, function (result) {
            if (result) {
              _this._game.playAt(y, x);
            }
            _this._busy = false;
          });
        }
      },
      hoverValue: function hoverValue(y, x) {
        if (!_this._busy && _this._player === _this.currentPlayer() && !_this.isOver() && !_this._game.isIllegalAt(y, x)) {
          return _this._player;
        }
      },
      gameIsOver: function gameIsOver() {
        return _this.isOver();
      }
    };
    if (this._boardElement) {
      this._game = new _game["default"](Object.assign({
        element: this._boardElement
      }, gameOptions));
    } else {
      this._game = new _game["default"](_objectSpread({}, gameOptions));
    }
  },
  isOver: function isOver() {
    return this._game.isOver();
  },
  currentPlayer: function currentPlayer() {
    return this._game.currentPlayer();
  },
  receivePlay: function receivePlay(y, x) {
    if (this._player === this.currentPlayer()) {
      return;
    }
    this._game.playAt(y, x);
  },
  moveNumber: function moveNumber() {
    return this._game.moveNumber();
  },
  receivePass: function receivePass() {
    if (this._player === this.currentPlayer()) {
      return;
    }
    this._game.pass();
  },
  receiveMarkDeadAt: function receiveMarkDeadAt(y, x) {
    this._game.toggleDeadAt(y, x);
  },
  deadStones: function deadStones() {
    return this._game.deadStones();
  },
  setDeadStones: function setDeadStones(points) {
    this._game._deadPoints = points.map(function (i) {
      return {
        y: i.y,
        x: i.x
      };
    });
    this._game.render();
  },
  pass: function pass() {
    var _this2 = this;
    if (this._busy || this._player !== this.currentPlayer() || this.isOver()) {
      return;
    }
    this._busy = true;
    this._hooks.submitPass(function (result) {
      if (result) {
        _this2._game.pass();
      }
      _this2._busy = false;
    });
  }
};
var _default = exports["default"] = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZ2FtZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwib2JqIiwiX19lc01vZHVsZSIsIl90eXBlb2YiLCJvIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIm93bktleXMiLCJlIiwiciIsInQiLCJPYmplY3QiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImkiLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJ0b1ByaW1pdGl2ZSIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJDbGllbnQiLCJvcHRpb25zIiwidW5kZWZpbmVkIiwiX2JvYXJkRWxlbWVudCIsIl9zZXR1cCIsIl9yZWYiLCJfdGhpcyIsInBsYXllciIsImdhbWVPcHRpb25zIiwiaG9va3MiLCJfcGxheWVyIiwiX2hvb2tzIiwiRXJyb3IiLCJoYW5kbGVDbGljayIsInkiLCJ4IiwiX2J1c3kiLCJpc092ZXIiLCJzdG9uZXNUb0JlTWFya2VkRGVhZCIsImN1cnJlbnRTdGF0ZSIsImdyb3VwQXQiLCJtYXAiLCJjb2xvciIsInN1Ym1pdE1hcmtEZWFkQXQiLCJyZXN1bHQiLCJ0b2dnbGVEZWFkQXQiLCJjdXJyZW50UGxheWVyIiwiaXNJbGxlZ2FsQXQiLCJzdWJtaXRQbGF5IiwicGxheUF0IiwiaG92ZXJWYWx1ZSIsImdhbWVJc092ZXIiLCJhc3NpZ24iLCJlbGVtZW50IiwicmVjZWl2ZVBsYXkiLCJtb3ZlTnVtYmVyIiwicmVjZWl2ZVBhc3MiLCJwYXNzIiwicmVjZWl2ZU1hcmtEZWFkQXQiLCJkZWFkU3RvbmVzIiwic2V0RGVhZFN0b25lcyIsInBvaW50cyIsIl9kZWFkUG9pbnRzIiwicmVuZGVyIiwiX3RoaXMyIiwic3VibWl0UGFzcyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBDbGllbnQgPSBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcbiAgdGhpcy5fYm9hcmRFbGVtZW50ID0gb3B0aW9uc1tcImVsZW1lbnRcIl07XG4gIHRoaXMuX3NldHVwKG9wdGlvbnMpO1xufTtcblxuQ2xpZW50LnByb3RvdHlwZSA9IHtcbiAgX3NldHVwOiBmdW5jdGlvbih7IHBsYXllciwgZ2FtZU9wdGlvbnMsIGhvb2tzIH0pIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgdGhpcy5faG9va3MgPSBob29rcztcblxuICAgIGlmICh0aGlzLl9wbGF5ZXIgIT09IFwiYmxhY2tcIiAmJiB0aGlzLl9wbGF5ZXIgIT09IFwid2hpdGVcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG11c3QgYmUgZWl0aGVyIGJsYWNrIG9yIHdoaXRlLCBidXQgd2FzIGdpdmVuOiBcIiArIHRoaXMuX3BsYXllcik7XG4gICAgfVxuXG4gICAgZ2FtZU9wdGlvbnNbXCJfaG9va3NcIl0gPSB7XG4gICAgICBoYW5kbGVDbGljazogKHksIHgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2J1c3kpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9idXN5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5pc092ZXIoKSkge1xuICAgICAgICAgIGNvbnN0IHN0b25lc1RvQmVNYXJrZWREZWFkID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGUoKS5ncm91cEF0KHksIHgpLm1hcChpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHk6IGkueSxcbiAgICAgICAgICAgICAgeDogaS54LFxuICAgICAgICAgICAgICBjb2xvcjogaS5jb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuX2hvb2tzLnN1Ym1pdE1hcmtEZWFkQXQoeSwgeCwgc3RvbmVzVG9CZU1hcmtlZERlYWQsIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2dhbWUudG9nZ2xlRGVhZEF0KHksIHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9idXN5ID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3BsYXllciAhPT0gdGhpcy5jdXJyZW50UGxheWVyKCkgfHwgdGhpcy5fZ2FtZS5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgICAgICAgdGhpcy5fYnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5faG9va3Muc3VibWl0UGxheSh5LCB4LCByZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICB0aGlzLl9nYW1lLnBsYXlBdCh5LCB4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fYnVzeSA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBob3ZlclZhbHVlOiAoeSwgeCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2J1c3kgJiYgdGhpcy5fcGxheWVyID09PSB0aGlzLmN1cnJlbnRQbGF5ZXIoKSAmJiAhdGhpcy5pc092ZXIoKSAmJiAhdGhpcy5fZ2FtZS5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdhbWVJc092ZXI6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPdmVyKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9ib2FyZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2dhbWUgPSBuZXcgR2FtZShPYmplY3QuYXNzaWduKHsgZWxlbWVudDogdGhpcy5fYm9hcmRFbGVtZW50IH0sIGdhbWVPcHRpb25zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dhbWUgPSBuZXcgR2FtZSh7Li4uZ2FtZU9wdGlvbnN9KTtcbiAgICB9XG4gIH0sXG5cbiAgaXNPdmVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2FtZS5pc092ZXIoKTtcbiAgfSxcblxuICBjdXJyZW50UGxheWVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2FtZS5jdXJyZW50UGxheWVyKCk7XG4gIH0sXG5cbiAgcmVjZWl2ZVBsYXk6IGZ1bmN0aW9uKHksIHgpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyID09PSB0aGlzLmN1cnJlbnRQbGF5ZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dhbWUucGxheUF0KHksIHgpO1xuICB9LFxuXG4gIG1vdmVOdW1iZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9nYW1lLm1vdmVOdW1iZXIoKTtcbiAgfSxcblxuICByZWNlaXZlUGFzczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllciA9PT0gdGhpcy5jdXJyZW50UGxheWVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9nYW1lLnBhc3MoKTtcbiAgfSxcblxuICByZWNlaXZlTWFya0RlYWRBdDogZnVuY3Rpb24oeSwgeCkge1xuICAgIHRoaXMuX2dhbWUudG9nZ2xlRGVhZEF0KHksIHgpO1xuICB9LFxuXG4gIGRlYWRTdG9uZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9nYW1lLmRlYWRTdG9uZXMoKTtcbiAgfSxcblxuICBzZXREZWFkU3RvbmVzOiBmdW5jdGlvbihwb2ludHMpIHtcbiAgICB0aGlzLl9nYW1lLl9kZWFkUG9pbnRzID0gcG9pbnRzLm1hcChpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHk6IGkueSxcbiAgICAgICAgeDogaS54XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZ2FtZS5yZW5kZXIoKTtcbiAgfSxcblxuICBwYXNzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fYnVzeSB8fCB0aGlzLl9wbGF5ZXIgIT09IHRoaXMuY3VycmVudFBsYXllcigpIHx8IHRoaXMuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9idXN5ID0gdHJ1ZTtcblxuICAgIHRoaXMuX2hvb2tzLnN1Ym1pdFBhc3MocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fZ2FtZS5wYXNzKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2J1c3kgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQUEsS0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQTBCLFNBQUFELHVCQUFBRSxHQUFBO0VBQUEsT0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQTtJQUFBLFdBQUFBO0VBQUE7QUFBQTtBQUFBLFNBQUFFLFFBQUFDLENBQUE7RUFBQTs7RUFBQSxPQUFBRCxPQUFBLHdCQUFBRSxNQUFBLHVCQUFBQSxNQUFBLENBQUFDLFFBQUEsYUFBQUYsQ0FBQTtJQUFBLGNBQUFBLENBQUE7RUFBQSxjQUFB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
},{"./game":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
var _renderer = _interopRequireDefault(require("./renderer"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var DOMRenderer = function DOMRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
    options = _ref.options;
  _renderer["default"].call(this, boardElement, {
    hooks: hooks,
    options: options
  });
  if (this.smallerStones) {
    _utils["default"].addClass(boardElement, "tenuki-smaller-stones");
  }
  _utils["default"].addClass(boardElement, "tenuki-dom-renderer");
};
DOMRenderer.prototype = Object.create(_renderer["default"].prototype);
DOMRenderer.prototype.constructor = DOMRenderer;
DOMRenderer.prototype._setup = function (boardState) {
  _renderer["default"].prototype._setup.call(this, boardState);
  this.BOARD_LENGTH += 1;
  this.computeSizing();
};
DOMRenderer.prototype.generateBoard = function (boardState) {
  var _this = this;
  var contentsContainer = _utils["default"].createElement("div");
  _utils["default"].appendElement(contentsContainer, _utils["default"].createElement("div", {
    "class": "lines horizontal"
  }));
  _utils["default"].appendElement(contentsContainer, _utils["default"].createElement("div", {
    "class": "lines vertical"
  }));
  _utils["default"].appendElement(contentsContainer, _utils["default"].createElement("div", {
    "class": "hoshi-points"
  }));
  _utils["default"].appendElement(contentsContainer, _utils["default"].createElement("div", {
    "class": "intersections"
  }));
  _renderer["default"].hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils["default"].createElement("div", {
      "class": "hoshi"
    });
    hoshi.style.left = h.left * (_this.INTERSECTION_GAP_SIZE + 1) + "px";
    hoshi.style.top = h.top * (_this.INTERSECTION_GAP_SIZE + 1) + "px";
    _utils["default"].appendElement(contentsContainer.querySelector(".hoshi-points"), hoshi);
  });
  for (var y = 0; y < boardState.boardSize; y++) {
    var horizontalLine = _utils["default"].createElement("div", {
      "class": "line horizontal"
    });
    horizontalLine.setAttribute("data-left-gutter", boardState.yCoordinateFor(y));
    _utils["default"].appendElement(contentsContainer.querySelector(".lines.horizontal"), horizontalLine);
    var verticalLine = _utils["default"].createElement("div", {
      "class": "line vertical"
    });
    verticalLine.setAttribute("data-top-gutter", boardState.xCoordinateFor(y));
    _utils["default"].appendElement(contentsContainer.querySelector(".lines.vertical"), verticalLine);
    for (var x = 0; x < boardState.boardSize; x++) {
      var intersectionElement = _utils["default"].createElement("div", {
        "class": "intersection empty"
      });
      var stoneElement = _utils["default"].createElement("div", {
        "class": "stone"
      });
      _utils["default"].appendElement(intersectionElement, stoneElement);
      intersectionElement.setAttribute("data-position-x", x);
      intersectionElement.setAttribute("data-position-y", y);
      intersectionElement.style.left = x * (this.INTERSECTION_GAP_SIZE + 1) + "px";
      intersectionElement.style.top = y * (this.INTERSECTION_GAP_SIZE + 1) + "px";
      _utils["default"].appendElement(contentsContainer.querySelector(".intersections"), intersectionElement);
      this.grid[y] = this.grid[y] || [];
      this.grid[y][x] = intersectionElement;
      this.addIntersectionEventListeners(intersectionElement, y, x);
    }
  }

  // prevent the text-selection cursor
  _utils["default"].addEventListener(contentsContainer.querySelector(".lines.horizontal"), "mousedown", function (e) {
    e.preventDefault();
  });
  _utils["default"].addEventListener(contentsContainer.querySelector(".lines.vertical"), "mousedown", function (e) {
    e.preventDefault();
  });
  contentsContainer.querySelector(".lines.horizontal").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.horizontal").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  return contentsContainer;
};
DOMRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.className !== classes.join(" ")) {
    intersectionEl.className = classes.join(" ");
  }
};
var _default = exports["default"] = DOMRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9yZW5kZXJlciIsIm9iaiIsIl9fZXNNb2R1bGUiLCJET01SZW5kZXJlciIsImJvYXJkRWxlbWVudCIsIl9yZWYiLCJob29rcyIsIm9wdGlvbnMiLCJjYWxsIiwic21hbGxlclN0b25lcyIsImFkZENsYXNzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJfc2V0dXAiLCJib2FyZFN0YXRlIiwiQk9BUkRfTEVOR1RIIiwiY29tcHV0ZVNpemluZyIsImdlbmVyYXRlQm9hcmQiLCJfdGhpcyIsImNvbnRlbnRzQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJob3NoaVBvc2l0aW9uc0ZvciIsImJvYXJkU2l6ZSIsImZvckVhY2giLCJoIiwiaG9zaGkiLCJzdHlsZSIsImxlZnQiLCJJTlRFUlNFQ1RJT05fR0FQX1NJWkUiLCJ0b3AiLCJxdWVyeVNlbGVjdG9yIiwieSIsImhvcml6b250YWxMaW5lIiwic2V0QXR0cmlidXRlIiwieUNvb3JkaW5hdGVGb3IiLCJ2ZXJ0aWNhbExpbmUiLCJ4Q29vcmRpbmF0ZUZvciIsIngiLCJpbnRlcnNlY3Rpb25FbGVtZW50Iiwic3RvbmVFbGVtZW50IiwiZ3JpZCIsImFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0SW50ZXJzZWN0aW9uQ2xhc3NlcyIsImludGVyc2VjdGlvbkVsIiwiaW50ZXJzZWN0aW9uIiwiY2xhc3NlcyIsImNsYXNzTmFtZSIsImpvaW4iLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvZG9tLXJlbmRlcmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlcmVyXCI7XG5cbmNvbnN0IERPTVJlbmRlcmVyID0gZnVuY3Rpb24oYm9hcmRFbGVtZW50LCB7IGhvb2tzLCBvcHRpb25zIH0pIHtcbiAgUmVuZGVyZXIuY2FsbCh0aGlzLCBib2FyZEVsZW1lbnQsIHsgaG9va3M6IGhvb2tzLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG4gIGlmICh0aGlzLnNtYWxsZXJTdG9uZXMpIHtcbiAgICB1dGlscy5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNtYWxsZXItc3RvbmVzXCIpO1xuICB9XG5cbiAgdXRpbHMuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1kb20tcmVuZGVyZXJcIik7XG59O1xuXG5ET01SZW5kZXJlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlbmRlcmVyLnByb3RvdHlwZSk7XG5ET01SZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01SZW5kZXJlcjtcblxuRE9NUmVuZGVyZXIucHJvdG90eXBlLl9zZXR1cCA9IGZ1bmN0aW9uKGJvYXJkU3RhdGUpIHtcbiAgUmVuZGVyZXIucHJvdG90eXBlLl9zZXR1cC5jYWxsKHRoaXMsIGJvYXJkU3RhdGUpO1xuXG4gIHRoaXMuQk9BUkRfTEVOR1RIICs9IDE7XG4gIHRoaXMuY29tcHV0ZVNpemluZygpO1xufTtcblxuRE9NUmVuZGVyZXIucHJvdG90eXBlLmdlbmVyYXRlQm9hcmQgPSBmdW5jdGlvbihib2FyZFN0YXRlKSB7XG4gIGNvbnN0IGNvbnRlbnRzQ29udGFpbmVyID0gdXRpbHMuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICB1dGlscy5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZXMgaG9yaXpvbnRhbFwiIH0pKTtcbiAgdXRpbHMuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lciwgdXRpbHMuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImxpbmVzIHZlcnRpY2FsXCIgfSkpO1xuICB1dGlscy5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaG9zaGktcG9pbnRzXCIgfSkpO1xuICB1dGlscy5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW50ZXJzZWN0aW9uc1wiIH0pKTtcblxuICBSZW5kZXJlci5ob3NoaVBvc2l0aW9uc0Zvcihib2FyZFN0YXRlLmJvYXJkU2l6ZSkuZm9yRWFjaChoID0+IHtcbiAgICBjb25zdCBob3NoaSA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJob3NoaVwiIH0pO1xuICAgIGhvc2hpLnN0eWxlLmxlZnQgPSAoaC5sZWZ0ICogKHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkpICsgXCJweFwiO1xuICAgIGhvc2hpLnN0eWxlLnRvcCA9IChoLnRvcCAqICh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpKSArIFwicHhcIjtcblxuICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5ob3NoaS1wb2ludHNcIiksIGhvc2hpKTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBib2FyZFN0YXRlLmJvYXJkU2l6ZTsgeSsrKSB7XG4gICAgY29uc3QgaG9yaXpvbnRhbExpbmUgPSB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZSBob3Jpem9udGFsXCIgfSk7XG4gICAgaG9yaXpvbnRhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS1sZWZ0LWd1dHRlclwiLCBib2FyZFN0YXRlLnlDb29yZGluYXRlRm9yKHkpKTtcbiAgICB1dGlscy5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMuaG9yaXpvbnRhbFwiKSwgaG9yaXpvbnRhbExpbmUpO1xuXG4gICAgY29uc3QgdmVydGljYWxMaW5lID0gdXRpbHMuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImxpbmUgdmVydGljYWxcIiB9KTtcbiAgICB2ZXJ0aWNhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS10b3AtZ3V0dGVyXCIsIGJvYXJkU3RhdGUueENvb3JkaW5hdGVGb3IoeSkpO1xuICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5saW5lcy52ZXJ0aWNhbFwiKSwgdmVydGljYWxMaW5lKTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IHgrKykge1xuICAgICAgY29uc3QgaW50ZXJzZWN0aW9uRWxlbWVudCA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbnRlcnNlY3Rpb24gZW1wdHlcIiB9KTtcbiAgICAgIGNvbnN0IHN0b25lRWxlbWVudCA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJzdG9uZVwiIH0pO1xuICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25FbGVtZW50LCBzdG9uZUVsZW1lbnQpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb24teFwiLCB4KTtcbiAgICAgIGludGVyc2VjdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvbi15XCIsIHkpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnN0eWxlLmxlZnQgPSAoeCAqICh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpKSArIFwicHhcIjtcbiAgICAgIGludGVyc2VjdGlvbkVsZW1lbnQuc3R5bGUudG9wID0gKHkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSkgKyBcInB4XCI7XG5cbiAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pbnRlcnNlY3Rpb25zXCIpLCBpbnRlcnNlY3Rpb25FbGVtZW50KTtcblxuICAgICAgdGhpcy5ncmlkW3ldID0gdGhpcy5ncmlkW3ldIHx8IFtdO1xuICAgICAgdGhpcy5ncmlkW3ldW3hdID0gaW50ZXJzZWN0aW9uRWxlbWVudDtcblxuICAgICAgdGhpcy5hZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyhpbnRlcnNlY3Rpb25FbGVtZW50LCB5LCB4KTtcbiAgICB9XG4gIH1cblxuICAvLyBwcmV2ZW50IHRoZSB0ZXh0LXNlbGVjdGlvbiBjdXJzb3JcbiAgdXRpbHMuYWRkRXZlbnRMaXN0ZW5lcihjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLmhvcml6b250YWxcIiksIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICB1dGlscy5hZGRFdmVudExpc3RlbmVyKGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIiksIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMuaG9yaXpvbnRhbFwiKS5zdHlsZS53aWR0aCA9ICgodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKiAoYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSkgKyBib2FyZFN0YXRlLmJvYXJkU2l6ZSkgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMuaG9yaXpvbnRhbFwiKS5zdHlsZS5oZWlnaHQgPSAoKHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFICogKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUpICsgXCJweFwiO1xuICBjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLnZlcnRpY2FsXCIpLnN0eWxlLndpZHRoID0gKCh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpKSArIGJvYXJkU3RhdGUuYm9hcmRTaXplKSArIFwicHhcIjtcbiAgY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5saW5lcy52ZXJ0aWNhbFwiKS5zdHlsZS5oZWlnaHQgPSAoKHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFICogKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUpICsgXCJweFwiO1xuXG4gIHJldHVybiBjb250ZW50c0NvbnRhaW5lcjtcbn07XG5cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24oaW50ZXJzZWN0aW9uRWwsIGludGVyc2VjdGlvbiwgY2xhc3Nlcykge1xuICBpZiAoaW50ZXJzZWN0aW9uRWwuY2xhc3NOYW1lICE9PSBjbGFzc2VzLmpvaW4oXCIgXCIpKSB7XG4gICAgaW50ZXJzZWN0aW9uRWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NUmVuZGVyZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLE1BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFNBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUFrQyxTQUFBRCx1QkFBQUcsR0FBQTtFQUFBLE9BQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUE7SUFBQSxXQUFBQTtFQUFBO0FBQUE7QUFFbEMsSUFBTUUs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
},{"./renderer":10,"./utils":14}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var EyePoint = function EyePoint(boardState, intersection) {
  this.boardState = boardState;
  this.intersection = intersection;
  Object.freeze(this);
};
EyePoint.prototype = {
  diagonals: function diagonals() {
    var _this = this;
    var diagonals = [];
    var possibleX = [];
    var possibleY = [];
    if (this.intersection.x > 0) {
      possibleX.push(this.intersection.x - 1);
    }
    if (this.intersection.x < this.boardState.boardSize - 1) {
      possibleX.push(this.intersection.x + 1);
    }
    if (this.intersection.y > 0) {
      possibleY.push(this.intersection.y - 1);
    }
    if (this.intersection.y < this.boardState.boardSize - 1) {
      possibleY.push(this.intersection.y + 1);
    }
    possibleX.forEach(function (x) {
      possibleY.forEach(function (y) {
        diagonals.push(_this.boardState.intersectionAt(y, x));
      });
    });
    return diagonals;
  },
  isFalse: function isFalse() {
    if (!this.intersection.isEmpty()) {
      return false;
    }
    var diagonals = this.diagonals();
    var onFirstLine = diagonals.length <= 2;
    var neighbors = this.neighbors();
    var occupiedNeighbors = neighbors.filter(function (i) {
      return !i.isEmpty();
    });
    if (onFirstLine && occupiedNeighbors.length < 1) {
      return false;
    }
    if (!onFirstLine && occupiedNeighbors.length < 2) {
      return false;
    }
    var opposingOccupiedDiagonals = diagonals.filter(function (d) {
      return !d.isEmpty() && !d.sameColorAs(occupiedNeighbors[0]);
    });
    if (onFirstLine) {
      return opposingOccupiedDiagonals.length >= 1;
    } else {
      return opposingOccupiedDiagonals.length >= 2;
    }
  },
  neighbors: function neighbors() {
    return this.boardState.neighborsFor(this.intersection.y, this.intersection.x);
  },
  filledColor: function filledColor() {
    if (!this.isFalse()) {
      throw new Error("Attempting to find filled color for a non-false eye");
    }
    return this.neighbors()[0].value;
  }
};
var _default = exports["default"] = EyePoint;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFeWVQb2ludCIsImJvYXJkU3RhdGUiLCJpbnRlcnNlY3Rpb24iLCJPYmplY3QiLCJmcmVlemUiLCJwcm90b3R5cGUiLCJkaWFnb25hbHMiLCJfdGhpcyIsInBvc3NpYmxlWCIsInBvc3NpYmxlWSIsIngiLCJwdXNoIiwiYm9hcmRTaXplIiwieSIsImZvckVhY2giLCJpbnRlcnNlY3Rpb25BdCIsImlzRmFsc2UiLCJpc0VtcHR5Iiwib25GaXJzdExpbmUiLCJsZW5ndGgiLCJuZWlnaGJvcnMiLCJvY2N1cGllZE5laWdoYm9ycyIsImZpbHRlciIsImkiLCJvcHBvc2luZ09jY3VwaWVkRGlhZ29uYWxzIiwiZCIsInNhbWVDb2xvckFzIiwibmVpZ2hib3JzRm9yIiwiZmlsbGVkQ29sb3IiLCJFcnJvciIsInZhbHVlIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2V5ZS1wb2ludC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFeWVQb2ludCA9IGZ1bmN0aW9uKGJvYXJkU3RhdGUsIGludGVyc2VjdGlvbikge1xuICB0aGlzLmJvYXJkU3RhdGUgPSBib2FyZFN0YXRlO1xuICB0aGlzLmludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbjtcblxuICBPYmplY3QuZnJlZXplKHRoaXMpO1xufTtcblxuRXllUG9pbnQucHJvdG90eXBlID0ge1xuICBkaWFnb25hbHM6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGRpYWdvbmFscyA9IFtdO1xuXG4gICAgbGV0IHBvc3NpYmxlWCA9IFtdO1xuICAgIGxldCBwb3NzaWJsZVkgPSBbXTtcblxuICAgIGlmICh0aGlzLmludGVyc2VjdGlvbi54ID4gMCkge1xuICAgICAgcG9zc2libGVYLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueCAtIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmludGVyc2VjdGlvbi54IDwgKHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSkge1xuICAgICAgcG9zc2libGVYLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueCArIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmludGVyc2VjdGlvbi55ID4gMCkge1xuICAgICAgcG9zc2libGVZLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueSAtIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmludGVyc2VjdGlvbi55IDwgKHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSkge1xuICAgICAgcG9zc2libGVZLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueSArIDEpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlWC5mb3JFYWNoKHggPT4ge1xuICAgICAgcG9zc2libGVZLmZvckVhY2goeSA9PiB7XG4gICAgICAgIGRpYWdvbmFscy5wdXNoKHRoaXMuYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaWFnb25hbHM7XG4gIH0sXG5cbiAgaXNGYWxzZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLmludGVyc2VjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBkaWFnb25hbHMgPSB0aGlzLmRpYWdvbmFscygpO1xuICAgIGNvbnN0IG9uRmlyc3RMaW5lID0gZGlhZ29uYWxzLmxlbmd0aCA8PSAyO1xuXG4gICAgY29uc3QgbmVpZ2hib3JzID0gdGhpcy5uZWlnaGJvcnMoKTtcbiAgICBjb25zdCBvY2N1cGllZE5laWdoYm9ycyA9IG5laWdoYm9ycy5maWx0ZXIoaSA9PiAhaS5pc0VtcHR5KCkpO1xuXG4gICAgaWYgKG9uRmlyc3RMaW5lICYmIG9jY3VwaWVkTmVpZ2hib3JzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIW9uRmlyc3RMaW5lICYmIG9jY3VwaWVkTmVpZ2hib3JzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHBvc2luZ09jY3VwaWVkRGlhZ29uYWxzID0gZGlhZ29uYWxzLmZpbHRlcihkID0+ICFkLmlzRW1wdHkoKSAmJiAhZC5zYW1lQ29sb3JBcyhvY2N1cGllZE5laWdoYm9yc1swXSkpO1xuXG4gICAgaWYgKG9uRmlyc3RMaW5lKSB7XG4gICAgICByZXR1cm4gb3Bwb3NpbmdPY2N1cGllZERpYWdvbmFscy5sZW5ndGggPj0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMubGVuZ3RoID49IDI7XG4gICAgfVxuICB9LFxuXG4gIG5laWdoYm9yczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IodGhpcy5pbnRlcnNlY3Rpb24ueSwgdGhpcy5pbnRlcnNlY3Rpb24ueCk7XG4gIH0sXG5cbiAgZmlsbGVkQ29sb3I6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5pc0ZhbHNlKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gZmluZCBmaWxsZWQgY29sb3IgZm9yIGEgbm9uLWZhbHNlIGV5ZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZWlnaGJvcnMoKVswXS52YWx1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXllUG9pbnQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFZQyxVQUFVLEVBQUVDLFlBQVksRUFBRTtFQUNsRCxJQUFJLENBQUNELFVBQVUsR0FBR0EsVUFBVTtFQUM1QixJQUFJLENBQUNDLFlBQVksR0FBR0EsWUFBWTtFQUVoQ0MsTUFBTSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFFREosUUFBUSxDQUFDSyxTQUFTLEdBQUc7RUFDbkJDLFNBQVMsRUFBRSxTQUFBQSxVQUFBLEVBQVc7SUFBQSxJQUFBQyxL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
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _domRenderer = _interopRequireDefault(require("./dom-renderer"));
var _svgRenderer = _interopRequireDefault(require("./svg-renderer"));
var _nullRenderer = _interopRequireDefault(require("./null-renderer"));
var _boardState = _interopRequireDefault(require("./board-state"));
var _ruleset = _interopRequireDefault(require("./ruleset"));
var _scorer = _interopRequireDefault(require("./scorer"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var VALID_GAME_OPTIONS = ["element", "boardSize", "scoring", "handicapStones", "koRule", "komi", "_hooks", "fuzzyStonePlacement", "renderer", "freeHandicapPlacement", "bluePosition"];
var Game = function Game() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this._validateOptions(options);
  this._defaultBoardSize = 19;
  this.boardSize = null;
  this._moves = [];
  this.callbacks = {
    postRender: function postRender() {}
  };
  this._boardElement = options["element"];
  this._defaultScoring = "territory";
  this._defaultKoRule = "simple";
  this._defaultRenderer = "svg";
  this._deadPoints = [];

  // this._bluePosition = { x: options['blueXpos'], y: options['blueYpos']};
  this._bluePosition = options["bluePosition"];
  console.log('this._bluePosition =', this._bluePosition);
  this._setup(options);
};
Game.prototype = {
  _validateOptions: function _validateOptions(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        if (VALID_GAME_OPTIONS.indexOf(key) < 0) {
          throw new Error("Unrecognized game option: " + key);
        }
        if (typeof options[key] === "undefined" || options[key] === null) {
          throw new Error("Game option ".concat(key, " must not be set as null or undefined"));
        }
      }
    }
  },
  _configureOptions: function _configureOptions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$bluePosition = _ref.bluePosition,
      bluePosition = _ref$bluePosition === void 0 ? this._bluePosition : _ref$bluePosition,
      _ref$boardSize = _ref.boardSize,
      boardSize = _ref$boardSize === void 0 ? this._defaultBoardSize : _ref$boardSize,
      _ref$komi = _ref.komi,
      komi = _ref$komi === void 0 ? 0 : _ref$komi,
      _ref$handicapStones = _ref.handicapStones,
      handicapStones = _ref$handicapStones === void 0 ? 0 : _ref$handicapStones,
      _ref$freeHandicapPlac = _ref.freeHandicapPlacement,
      freeHandicapPlacement = _ref$freeHandicapPlac === void 0 ? false : _ref$freeHandicapPlac,
      _ref$scoring = _ref.scoring,
      scoring = _ref$scoring === void 0 ? this._defaultScoring : _ref$scoring,
      _ref$koRule = _ref.koRule,
      koRule = _ref$koRule === void 0 ? this._defaultKoRule : _ref$koRule,
      _ref$renderer = _ref.renderer,
      renderer = _ref$renderer === void 0 ? this._defaultRenderer : _ref$renderer;
    if (typeof boardSize !== "number") {
      throw new Error("Board size must be a number, but was: " + _typeof(boardSize));
    }
    if (typeof handicapStones !== "number") {
      throw new Error("Handicap stones must be a number, but was: " + _typeof(boardSize));
    }
    if (handicapStones > 0 && boardSize !== 9 && boardSize !== 13 && boardSize !== 19) {
      throw new Error("Handicap stones not supported on sizes other than 9x9, 13x13 and 19x19");
    }
    if (handicapStones < 0 || handicapStones === 1 || handicapStones > 9) {
      throw new Error("Only 2 to 9 handicap stones are supported");
    }
    if (boardSize > 19) {
      throw new Error("cannot generate a board size greater than 19");
    }
    this.boardSize = boardSize;
    this.handicapStones = handicapStones;
    this._freeHandicapPlacement = freeHandicapPlacement;
    this._scorer = new _scorer["default"]({
      scoreBy: scoring,
      komi: komi
    });
    this._rendererChoice = {
      "dom": _domRenderer["default"],
      "svg": _svgRenderer["default"]
    }[renderer];
    if (!this._rendererChoice) {
      throw new Error("Unknown renderer: " + renderer);
    }
    this._ruleset = new _ruleset["default"]({
      koRule: koRule
    });
    if (this._freeHandicapPlacement) {
      this._initialState = _boardState["default"]._initialFor(boardSize, 0, bluePosition);
    } else {
      this._initialState = _boardState["default"]._initialFor(boardSize, handicapStones, bluePosition);
    }
  },
  _stillPlayingHandicapStones: function _stillPlayingHandicapStones() {
    return this._freeHandicapPlacement && this.handicapStones > 0 && this._moves.length < this.handicapStones;
  },
  _setup: function _setup() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._validateOptions(options);
    this._configureOptions(options);
    if (this._boardElement) {
      var defaultRendererHooks = {
        handleClick: function handleClick(y, x) {
          if (_this.isOver()) {
            _this.toggleDeadAt(y, x);
          } else {
            _this.playAt(y, x);
          }
        },
        hoverValue: function hoverValue(y, x) {
          if (!_this.isOver() && !_this.isIllegalAt(y, x)) {
            return _this.currentPlayer();
          }
        },
        gameIsOver: function gameIsOver() {
          return _this.isOver();
        }
      };
      this.renderer = new this._rendererChoice(this._boardElement, {
        hooks: options["_hooks"] || defaultRendererHooks,
        options: {
          fuzzyStonePlacement: options["fuzzyStonePlacement"]
        }
      });
    } else {
      this.renderer = new _nullRenderer["default"]();
    }
    this.render();
  },
  intersectionAt: function intersectionAt(y, x) {
    return this.currentState().intersectionAt(y, x);
  },
  intersections: function intersections() {
    return this.currentState().intersections;
  },
  deadStones: function deadStones() {
    return this._deadPoints;
  },
  coordinatesFor: function coordinatesFor(y, x) {
    return this.currentState().xCoordinateFor(x) + this.currentState().yCoordinateFor(y);
  },
  currentPlayer: function currentPlayer() {
    if (this._stillPlayingHandicapStones()) {
      return "black";
    }
    return this.currentState().nextColor();
  },
  isWhitePlaying: function isWhitePlaying() {
    return this.currentPlayer() === "white";
  },
  isBlackPlaying: function isBlackPlaying() {
    return this.currentPlayer() === "black";
  },
  score: function score() {
    return this._scorer.score(this);
  },
  currentState: function currentState() {
    return this._moves[this._moves.length - 1] || this._initialState;
  },
  moveNumber: function moveNumber() {
    return this.currentState().moveNumber;
  },
  playAt: function playAt(y, x) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$render = _ref2.render,
      render = _ref2$render === void 0 ? true : _ref2$render;
    if (this.isIllegalAt(y, x)) {
      return false;
    }
    var newState = this.currentState().playAt(y, x, this.currentPlayer());
    var _newState = newState,
      koPoint = _newState.koPoint;
    if (koPoint && !this._ruleset._isKoViolation(koPoint.y, koPoint.x, newState, this._moves.concat(newState))) {
      newState = newState.copyWithAttributes({
        koPoint: null
      });
    }
    this._moves.push(newState);
    if (render) {
      this.render();
    }
    return true;
  },
  pass: function pass() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$render = _ref3.render,
      render = _ref3$render === void 0 ? true : _ref3$render;
    if (this.isOver()) {
      return false;
    }
    var newState = this.currentState().playPass(this.currentPlayer());
    this._moves.push(newState);
    if (render) {
      this.render();
    }
    return true;
  },
  isOver: function isOver() {
    if (this._moves.length < 2) {
      return false;
    }
    var finalMove = this._moves[this._moves.length - 1];
    var previousMove = this._moves[this._moves.length - 2];
    return finalMove.pass && previousMove.pass;
  },
  markDeadAt: function markDeadAt(y, x) {
    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref4$render = _ref4.render,
      render = _ref4$render === void 0 ? true : _ref4$render;
    if (this._isDeadAt(y, x)) {
      return true;
    }
    return this._setDeadStatus(y, x, true, {
      render: render
    });
  },
  unmarkDeadAt: function unmarkDeadAt(y, x) {
    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref5$render = _ref5.render,
      render = _ref5$render === void 0 ? true : _ref5$render;
    if (!this._isDeadAt(y, x)) {
      return true;
    }
    return this._setDeadStatus(y, x, false, {
      render: render
    });
  },
  toggleDeadAt: function toggleDeadAt(y, x) {
    var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref6$render = _ref6.render,
      render = _ref6$render === void 0 ? true : _ref6$render;
    return this._setDeadStatus(y, x, !this._isDeadAt(y, x), {
      render: render
    });
  },
  _setDeadStatus: function _setDeadStatus(y, x, markingDead) {
    var _this2 = this;
    var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref7$render = _ref7.render,
      render = _ref7$render === void 0 ? true : _ref7$render;
    var selectedIntersection = this.intersectionAt(y, x);
    if (selectedIntersection.isEmpty()) {
      return;
    }
    var chosenDead = [];
    var _this$currentState$pa = this.currentState().partitionTraverse(selectedIntersection, function (intersection) {
        return intersection.isEmpty() || intersection.sameColorAs(selectedIntersection);
      }),
      _this$currentState$pa2 = _slicedToArray(_this$currentState$pa, 1),
      candidates = _this$currentState$pa2[0];
    candidates.forEach(function (sameColorOrEmpty) {
      if (!sameColorOrEmpty.isEmpty()) {
        chosenDead.push(sameColorOrEmpty);
      }
    });
    chosenDead.forEach(function (intersection) {
      if (markingDead) {
        _this2._deadPoints.push({
          y: intersection.y,
          x: intersection.x
        });
      } else {
        _this2._deadPoints = _this2._deadPoints.filter(function (dead) {
          return !(dead.y === intersection.y && dead.x === intersection.x);
        });
      }
    });
    if (render) {
      this.render();
    }
    return true;
  },
  _isDeadAt: function _isDeadAt(y, x) {
    return this._deadPoints.some(function (dead) {
      return dead.y === y && dead.x === x;
    });
  },
  isIllegalAt: function isIllegalAt(y, x) {
    return this._ruleset.isIllegal(y, x, this);
  },
  territory: function territory() {
    if (!this.isOver()) {
      return {
        black: [],
        white: []
      };
    }
    return this._scorer.territory(this);
  },
  undo: function undo() {
    this._moves.pop();
    this.render();
  },
  render: function render() {
    if (!this.isOver()) {
      this._deadPoints = [];
    }
    this.renderer.render(this.currentState(), {
      territory: this.territory(),
      deadStones: this.deadStones()
    });
    this.callbacks.postRender(this);
  }
};
var _default = exports["default"] = Game;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZG9tUmVuZGVyZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9zdmdSZW5kZXJlciIsIl9udWxsUmVuZGVyZXIiLCJfYm9hcmRTdGF0ZSIsIl9ydWxlc2V0IiwiX3Njb3JlciIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfc2xpY2VkVG9BcnJheSIsImFyciIsImkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsImxlbiIsImxlbmd0aCIsImFycjIiLCJyIiwibCIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsImUiLCJ1IiwiYSIsImYiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJfdHlwZW9mIiwiVkFMSURfR0FNRV9PUFRJT05TIiwiR2FtZSIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfdmFsaWRhdGVPcHRpb25zIiwiX2RlZmF1bHRCb2FyZFNpemUiLCJib2FyZFNpemUiLCJfbW92ZXMiLCJjYWxsYmFja3MiLCJwb3N0UmVuZGVyIiwiX2JvYXJkRWxlbWVudCIsIl9kZWZhdWx0U2NvcmluZyIsIl9kZWZhdWx0S29SdWxlIiwiX2RlZmF1bHRSZW5kZXJlciIsIl9kZWFkUG9pbnRzIiwiX2JsdWVQb3NpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJfc2V0dXAiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4T2YiLCJFcnJvciIsImNvbmNhdCIsIl9jb25maWd1cmVPcHRpb25zIiwiX3JlZiIsIl9yZWYkYmx1ZVBvc2l0aW9uIiwiYmx1ZVBvc2l0aW9uIiwiX3JlZiRib2FyZFNpemUiLCJfcmVmJGtvbWkiLCJrb21pIiwiX3JlZiRoYW5kaWNhcFN0b25lcyIsImhhbmRpY2FwU3RvbmVzIiwiX3JlZiRmcmVlSGFuZGljYXBQbGFjIiwiZnJlZUhhbmRpY2FwUGxhY2VtZW50IiwiX3JlZiRzY29yaW5nIiwic2NvcmluZyIsIl9yZWYka29SdWxlIiwia29SdWxlIiwiX3JlZiRyZW5kZXJlciIsInJlbmRlcmVyIiwiX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCIsInNjb3JlQnkiLCJfcmVuZGVyZXJDaG9pY2UiLCJfaW5pdGlhbFN0YXRlIiwiX2luaXRpYWxGb3IiLCJfc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXMiLCJfdGhpcyIsImRlZmF1bHRSZW5kZXJlckhvb2tzIiwiaGFuZGxlQ2xpY2siLCJ5IiwieCIsImlzT3ZlciIsInRvZ2dsZURlYWRBdCIsInBsYXlBdCIsImhvdmVyVmFsdWUiLCJpc0lsbGVnYWxBdCIsImN1cnJlbnRQbGF5ZXIiLCJnYW1lSXNPdmVyIiwiaG9va3MiLCJmdXp6eVN0b25lUGxhY2VtZW50IiwicmVuZGVyIiwiaW50ZXJzZWN0aW9uQXQiLCJjdXJyZW50U3RhdGUiLCJpbnRlcnNlY3Rpb25zIiwiZGVhZFN0b25lcyIsImNvb3JkaW5hdGVzRm9yIiwieENvb3JkaW5hdGVGb3IiLCJ5Q29vcmRpbmF0ZUZvciIsIm5leHRDb2xvciIsImlzV2hpdGVQbGF5aW5nIiwiaXNCbGFja1BsYXlpbmciLCJzY29yZSIsIm1vdmVOdW1iZXIiLCJfcmVmMiIsIl9yZWYyJHJlbmRlciIsIm5ld1N0YXRlIiwiX25ld1N0YXRlIiwia29Qb2ludCIsIl9pc0tvVmlvbGF0aW9uIiwiY29weVdpdGhBdHRyaWJ1dGVzIiwicGFzcyIsIl9yZWYzIiwiX3JlZjMkcmVuZGVyIiwicGxheVBhc3MiLCJmaW5hbE1vdmUiLCJwcmV2aW91c01vdmUiLCJtYXJrRGVhZEF0IiwiX3JlZjQiLCJfcmVmNCRyZW5kZXIiLCJfaXNEZWFkQXQiLCJfc2V0RGVhZFN0YXR1cyIsInVubWFya0RlYWRBdCIsIl9yZWY1IiwiX3JlZjUkcmVuZGVyIiwiX3JlZjYiLCJfcmVmNiRyZW5kZXIiLCJtYXJraW5nRGVhZCIsIl90aGlzMiIsIl9yZWY3IiwiX3JlZjckcmVuZGVyIiwic2VsZWN0ZWRJbnRlcnNlY3Rpb24iLCJpc0VtcHR5IiwiY2hvc2VuRGVhZCIsIl90aGlzJGN1cnJlbnRTdGF0ZSRwYSIsInBhcnRpdGlvblRyYXZlcnNlIiwiaW50ZXJzZWN0aW9uIiwic2FtZUNvbG9yQXMiLCJfdGhpcyRjdXJyZW50U3RhdGUkcGEyIiwiY2FuZGlkYXRlcyIsImZvckVhY2giLCJzYW1lQ29sb3JPckVtcHR5IiwiZmlsdGVyIiwiZGVhZCIsInNvbWUiLCJpc0lsbGVnYWwiLCJ0ZXJyaXRvcnkiLCJibGFjayIsIndoaXRlIiwidW5kbyIsInBvcCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBET01SZW5kZXJlciBmcm9tIFwiLi9kb20tcmVuZGVyZXJcIjtcbmltcG9ydCBTVkdSZW5kZXJlciBmcm9tIFwiLi9zdmctcmVuZGVyZXJcIjtcbmltcG9ydCBOdWxsUmVuZGVyZXIgZnJvbSBcIi4vbnVsbC1yZW5kZXJlclwiO1xuaW1wb3J0IEJvYXJkU3RhdGUgZnJvbSBcIi4vYm9hcmQtc3RhdGVcIjtcbmltcG9ydCBSdWxlc2V0IGZyb20gXCIuL3J1bGVzZXRcIjtcbmltcG9ydCBTY29yZXIgZnJvbSBcIi4vc2NvcmVyXCI7XG5cbmNvbnN0IFZBTElEX0dBTUVfT1BUSU9OUyA9IFtcbiAgXCJlbGVtZW50XCIsXG4gIFwiYm9hcmRTaXplXCIsXG4gIFwic2NvcmluZ1wiLFxuICBcImhhbmRpY2FwU3RvbmVzXCIsXG4gIFwia29SdWxlXCIsXG4gIFwia29taVwiLFxuICBcIl9ob29rc1wiLFxuICBcImZ1enp5U3RvbmVQbGFjZW1lbnRcIixcbiAgXCJyZW5kZXJlclwiLFxuICBcImZyZWVIYW5kaWNhcFBsYWNlbWVudFwiLFxuICBcImJsdWVQb3NpdGlvblwiLFxuXTtcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uKG9wdGlvbnMgPSB7fSkge1xuICB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgdGhpcy5fZGVmYXVsdEJvYXJkU2l6ZSA9IDE5O1xuICB0aGlzLmJvYXJkU2l6ZSA9IG51bGw7XG4gIHRoaXMuX21vdmVzID0gW107XG4gIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgIHBvc3RSZW5kZXI6IGZ1bmN0aW9uKCkge31cbiAgfTtcbiAgdGhpcy5fYm9hcmRFbGVtZW50ID0gb3B0aW9uc1tcImVsZW1lbnRcIl07XG4gIHRoaXMuX2RlZmF1bHRTY29yaW5nID0gXCJ0ZXJyaXRvcnlcIjtcbiAgdGhpcy5fZGVmYXVsdEtvUnVsZSA9IFwic2ltcGxlXCI7XG4gIHRoaXMuX2RlZmF1bHRSZW5kZXJlciA9IFwic3ZnXCI7XG4gIHRoaXMuX2RlYWRQb2ludHMgPSBbXTtcblxuICAvLyB0aGlzLl9ibHVlUG9zaXRpb24gPSB7IHg6IG9wdGlvbnNbJ2JsdWVYcG9zJ10sIHk6IG9wdGlvbnNbJ2JsdWVZcG9zJ119O1xuICB0aGlzLl9ibHVlUG9zaXRpb24gPSBvcHRpb25zW1wiYmx1ZVBvc2l0aW9uXCJdO1xuICBjb25zb2xlLmxvZygndGhpcy5fYmx1ZVBvc2l0aW9uID0nLCB0aGlzLl9ibHVlUG9zaXRpb24pO1xuXG4gIHRoaXMuX3NldHVwKG9wdGlvbnMpO1xufTtcblxuR2FtZS5wcm90b3R5cGUgPSB7XG4gIF92YWxpZGF0ZU9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBpZiAoVkFMSURfR0FNRV9PUFRJT05TLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZ2FtZSBvcHRpb246IFwiICsga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uc1trZXldID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdGlvbnNba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR2FtZSBvcHRpb24gJHtrZXl9IG11c3Qgbm90IGJlIHNldCBhcyBudWxsIG9yIHVuZGVmaW5lZGApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jb25maWd1cmVPcHRpb25zOiBmdW5jdGlvbih7IGJsdWVQb3NpdGlvbiA9IHRoaXMuX2JsdWVQb3NpdGlvbiwgYm9hcmRTaXplID0gdGhpcy5fZGVmYXVsdEJvYXJkU2l6ZSwga29taSA9IDAsIGhhbmRpY2FwU3RvbmVzID0gMCwgZnJlZUhhbmRpY2FwUGxhY2VtZW50ID0gZmFsc2UsIHNjb3JpbmcgPSB0aGlzLl9kZWZhdWx0U2NvcmluZywga29SdWxlID0gdGhpcy5fZGVmYXVsdEtvUnVsZSwgcmVuZGVyZXIgPSB0aGlzLl9kZWZhdWx0UmVuZGVyZXIgfSA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFNpemUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvYXJkIHNpemUgbXVzdCBiZSBhIG51bWJlciwgYnV0IHdhczogXCIgKyB0eXBlb2YgYm9hcmRTaXplKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGhhbmRpY2FwU3RvbmVzICE9PSBcIm51bWJlclwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIYW5kaWNhcCBzdG9uZXMgbXVzdCBiZSBhIG51bWJlciwgYnV0IHdhczogXCIgKyB0eXBlb2YgYm9hcmRTaXplKTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGljYXBTdG9uZXMgPiAwICYmIGJvYXJkU2l6ZSAhPT0gOSAmJiBib2FyZFNpemUgIT09IDEzICYmIGJvYXJkU2l6ZSAhPT0gMTkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhhbmRpY2FwIHN0b25lcyBub3Qgc3VwcG9ydGVkIG9uIHNpemVzIG90aGVyIHRoYW4gOXg5LCAxM3gxMyBhbmQgMTl4MTlcIik7XG4gICAgfVxuXG4gICAgaWYgKGhhbmRpY2FwU3RvbmVzIDwgMCB8fCBoYW5kaWNhcFN0b25lcyA9PT0gMSB8fCBoYW5kaWNhcFN0b25lcyA+IDkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgMiB0byA5IGhhbmRpY2FwIHN0b25lcyBhcmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGlmIChib2FyZFNpemUgPiAxOSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGdlbmVyYXRlIGEgYm9hcmQgc2l6ZSBncmVhdGVyIHRoYW4gMTlcIik7XG4gICAgfVxuXG4gICAgdGhpcy5ib2FyZFNpemUgPSBib2FyZFNpemU7XG4gICAgdGhpcy5oYW5kaWNhcFN0b25lcyA9IGhhbmRpY2FwU3RvbmVzO1xuICAgIHRoaXMuX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCA9IGZyZWVIYW5kaWNhcFBsYWNlbWVudDtcblxuICAgIHRoaXMuX3Njb3JlciA9IG5ldyBTY29yZXIoe1xuICAgICAgc2NvcmVCeTogc2NvcmluZyxcbiAgICAgIGtvbWk6IGtvbWlcbiAgICB9KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyQ2hvaWNlID0ge1xuICAgICAgXCJkb21cIjogRE9NUmVuZGVyZXIsXG4gICAgICBcInN2Z1wiOiBTVkdSZW5kZXJlclxuICAgIH1bcmVuZGVyZXJdO1xuXG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlckNob2ljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biByZW5kZXJlcjogXCIgKyByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fcnVsZXNldCA9IG5ldyBSdWxlc2V0KHtcbiAgICAgIGtvUnVsZToga29SdWxlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fZnJlZUhhbmRpY2FwUGxhY2VtZW50KSB7XG4gICAgICB0aGlzLl9pbml0aWFsU3RhdGUgPSBCb2FyZFN0YXRlLl9pbml0aWFsRm9yKGJvYXJkU2l6ZSwgMCwgYmx1ZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5pdGlhbFN0YXRlID0gQm9hcmRTdGF0ZS5faW5pdGlhbEZvcihib2FyZFNpemUsIGhhbmRpY2FwU3RvbmVzLCBibHVlUG9zaXRpb24pO1xuICAgIH1cbiAgfSxcblxuICBfc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmVlSGFuZGljYXBQbGFjZW1lbnQgJiYgdGhpcy5oYW5kaWNhcFN0b25lcyA+IDAgJiYgdGhpcy5fbW92ZXMubGVuZ3RoIDwgdGhpcy5oYW5kaWNhcFN0b25lcztcbiAgfSxcblxuICBfc2V0dXA6IGZ1bmN0aW9uKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9jb25maWd1cmVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMuX2JvYXJkRWxlbWVudCkge1xuICAgICAgY29uc3QgZGVmYXVsdFJlbmRlcmVySG9va3MgPSB7XG4gICAgICAgIGhhbmRsZUNsaWNrOiAoeSwgeCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZURlYWRBdCh5LCB4KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGF5QXQoeSwgeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhvdmVyVmFsdWU6ICh5LCB4KSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmlzT3ZlcigpICYmICF0aGlzLmlzSWxsZWdhbEF0KHksIHgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdhbWVJc092ZXI6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc092ZXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyB0aGlzLl9yZW5kZXJlckNob2ljZSh0aGlzLl9ib2FyZEVsZW1lbnQsIHtcbiAgICAgICAgaG9va3M6IG9wdGlvbnNbXCJfaG9va3NcIl0gfHwgZGVmYXVsdFJlbmRlcmVySG9va3MsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBmdXp6eVN0b25lUGxhY2VtZW50OiBvcHRpb25zW1wiZnV6enlTdG9uZVBsYWNlbWVudFwiXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBOdWxsUmVuZGVyZXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9LFxuXG4gIGludGVyc2VjdGlvbkF0OiBmdW5jdGlvbih5LCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlKCkuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG4gIH0sXG5cbiAgaW50ZXJzZWN0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlKCkuaW50ZXJzZWN0aW9ucztcbiAgfSxcblxuICBkZWFkU3RvbmVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVhZFBvaW50cztcbiAgfSxcblxuICBjb29yZGluYXRlc0ZvcjogZnVuY3Rpb24oeSwgeCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZSgpLnhDb29yZGluYXRlRm9yKHgpICsgdGhpcy5jdXJyZW50U3RhdGUoKS55Q29vcmRpbmF0ZUZvcih5KTtcbiAgfSxcblxuICBjdXJyZW50UGxheWVyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXMoKSkge1xuICAgICAgcmV0dXJuIFwiYmxhY2tcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5uZXh0Q29sb3IoKTtcbiAgfSxcblxuICBpc1doaXRlUGxheWluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBsYXllcigpID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNCbGFja1BsYXlpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQbGF5ZXIoKSA9PT0gXCJibGFja1wiO1xuICB9LFxuXG4gIHNjb3JlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NvcmVyLnNjb3JlKHRoaXMpO1xuICB9LFxuXG4gIGN1cnJlbnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vdmVzW3RoaXMuX21vdmVzLmxlbmd0aCAtIDFdIHx8IHRoaXMuX2luaXRpYWxTdGF0ZTtcbiAgfSxcblxuICBtb3ZlTnVtYmVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5tb3ZlTnVtYmVyO1xuICB9LFxuXG4gIHBsYXlBdDogZnVuY3Rpb24oeSwgeCwgeyByZW5kZXIgPSB0cnVlIH0gPSB7fSkge1xuICAgIGlmICh0aGlzLmlzSWxsZWdhbEF0KHksIHgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IG5ld1N0YXRlID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wbGF5QXQoeSwgeCwgdGhpcy5jdXJyZW50UGxheWVyKCkpO1xuICAgIGNvbnN0IHsga29Qb2ludCB9ID0gbmV3U3RhdGU7XG5cbiAgICBpZiAoa29Qb2ludCAmJiAhdGhpcy5fcnVsZXNldC5faXNLb1Zpb2xhdGlvbihrb1BvaW50LnksIGtvUG9pbnQueCwgbmV3U3RhdGUsIHRoaXMuX21vdmVzLmNvbmNhdChuZXdTdGF0ZSkpKSB7XG4gICAgICBuZXdTdGF0ZSA9IG5ld1N0YXRlLmNvcHlXaXRoQXR0cmlidXRlcyh7IGtvUG9pbnQ6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHBhc3M6IGZ1bmN0aW9uKHsgcmVuZGVyID0gdHJ1ZSB9ID0ge30pIHtcbiAgICBpZiAodGhpcy5pc092ZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wbGF5UGFzcyh0aGlzLmN1cnJlbnRQbGF5ZXIoKSk7XG4gICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGlzT3ZlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX21vdmVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmaW5hbE1vdmUgPSB0aGlzLl9tb3Zlc1t0aGlzLl9tb3Zlcy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBwcmV2aW91c01vdmUgPSB0aGlzLl9tb3Zlc1t0aGlzLl9tb3Zlcy5sZW5ndGggLSAyXTtcblxuICAgIHJldHVybiBmaW5hbE1vdmUucGFzcyAmJiBwcmV2aW91c01vdmUucGFzcztcbiAgfSxcblxuICBtYXJrRGVhZEF0OiBmdW5jdGlvbih5LCB4LCB7IHJlbmRlciA9IHRydWUgfSA9IHt9KSB7XG4gICAgaWYgKHRoaXMuX2lzRGVhZEF0KHksIHgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc2V0RGVhZFN0YXR1cyh5LCB4LCB0cnVlLCB7IHJlbmRlciB9KTtcbiAgfSxcblxuICB1bm1hcmtEZWFkQXQ6IGZ1bmN0aW9uKHksIHgsIHsgcmVuZGVyID0gdHJ1ZSB9ID0ge30pIHtcbiAgICBpZiAoIXRoaXMuX2lzRGVhZEF0KHksIHgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc2V0RGVhZFN0YXR1cyh5LCB4LCBmYWxzZSwgeyByZW5kZXIgfSk7XG4gIH0sXG5cbiAgdG9nZ2xlRGVhZEF0OiBmdW5jdGlvbih5LCB4LCB7IHJlbmRlciA9IHRydWUgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldERlYWRTdGF0dXMoeSwgeCwgIXRoaXMuX2lzRGVhZEF0KHksIHgpLCB7IHJlbmRlciB9KTtcbiAgfSxcblxuICBfc2V0RGVhZFN0YXR1czogZnVuY3Rpb24oeSwgeCwgbWFya2luZ0RlYWQsIHsgcmVuZGVyID0gdHJ1ZSB9ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZEludGVyc2VjdGlvbiA9IHRoaXMuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgICBpZiAoc2VsZWN0ZWRJbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hvc2VuRGVhZCA9IFtdO1xuXG4gICAgY29uc3QgW2NhbmRpZGF0ZXNdID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wYXJ0aXRpb25UcmF2ZXJzZShzZWxlY3RlZEludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9uID0+IHtcbiAgICAgIHJldHVybiBpbnRlcnNlY3Rpb24uaXNFbXB0eSgpIHx8IGludGVyc2VjdGlvbi5zYW1lQ29sb3JBcyhzZWxlY3RlZEludGVyc2VjdGlvbik7XG4gICAgfSk7XG5cbiAgICBjYW5kaWRhdGVzLmZvckVhY2goc2FtZUNvbG9yT3JFbXB0eSA9PiB7XG4gICAgICBpZiAoIXNhbWVDb2xvck9yRW1wdHkuaXNFbXB0eSgpKSB7XG4gICAgICAgIGNob3NlbkRlYWQucHVzaChzYW1lQ29sb3JPckVtcHR5KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNob3NlbkRlYWQuZm9yRWFjaChpbnRlcnNlY3Rpb24gPT4ge1xuICAgICAgaWYgKG1hcmtpbmdEZWFkKSB7XG4gICAgICAgIHRoaXMuX2RlYWRQb2ludHMucHVzaCh7IHk6IGludGVyc2VjdGlvbi55LCB4OiBpbnRlcnNlY3Rpb24ueCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RlYWRQb2ludHMgPSB0aGlzLl9kZWFkUG9pbnRzLmZpbHRlcihkZWFkID0+ICEoZGVhZC55ID09PSBpbnRlcnNlY3Rpb24ueSAmJiBkZWFkLnggPT09IGludGVyc2VjdGlvbi54KSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIF9pc0RlYWRBdDogZnVuY3Rpb24oeSwgeCkge1xuICAgIHJldHVybiB0aGlzLl9kZWFkUG9pbnRzLnNvbWUoZGVhZCA9PiBkZWFkLnkgPT09IHkgJiYgZGVhZC54ID09PSB4KTtcbiAgfSxcblxuICBpc0lsbGVnYWxBdDogZnVuY3Rpb24oeSwgeCkge1xuICAgIHJldHVybiB0aGlzLl9ydWxlc2V0LmlzSWxsZWdhbCh5LCB4LCB0aGlzKTtcbiAgfSxcblxuICB0ZXJyaXRvcnk6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5pc092ZXIoKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmxhY2s6IFtdLFxuICAgICAgICB3aGl0ZTogW11cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Njb3Jlci50ZXJyaXRvcnkodGhpcyk7XG4gIH0sXG5cbiAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbW92ZXMucG9wKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5pc092ZXIoKSkge1xuICAgICAgdGhpcy5fZGVhZFBvaW50cyA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuY3VycmVudFN0YXRlKCksIHtcbiAgICAgIHRlcnJpdG9yeTogdGhpcy50ZXJyaXRvcnkoKSxcbiAgICAgIGRlYWRTdG9uZXM6IHRoaXMuZGVhZFN0b25lcygpXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbGxiYWNrcy5wb3N0UmVuZGVyKHRoaXMpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxZQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxZQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxhQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRyxXQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxRQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSyxPQUFBLEdBQUFOLHNCQUFBLENBQUFDLE9BQUE7QUFBOEIsU0FBQUQsdUJBQUFPLEdBQUE7RUFBQSxPQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBO0lBQUEsV0FBQUE7RUFBQTtBQUFBO0FBQUEsU0FBQUUsZUFBQUMsR0FBQSxFQUFBQyxDQUFBO0VBQUEsT0FBQUMsZUFBQSxDQUFBRixHQUFBLEtBQUFHLHFCQUFBLENBQUFILEdBQUEsRUFBQUMsQ0FBQSxLQUFBRywyQkFBQSxDQUFBSixHQUFBLEVBQUFDLENBQUEsS0FBQUksZ0JBQUE7QUFBQTtBQUFBLFNBQUFBLGlCQUFBO0VBQUEsVUFBQUMsU0FBQTtBQUFBO0FBQUEsU0FBQUYsNEJBQUFHLENBQUEsRUFBQUMsTUFBQTtFQUFBLEtBQUFELENBQUE7RUFBQSxXQUFBQSxDQUFBLHNCQUFBRSxpQkFBQSxDQUFBRixDQUFBLEVBQUFDLE1BQUE7RUFBQSxJQUFBRSxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsU0FBQSxDQUFBQyxRQUFBLENBQUFD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
},{"./board-state":2,"./dom-renderer":4,"./null-renderer":8,"./ruleset":11,"./scorer":12,"./svg-renderer":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Intersection = function Intersection(y, x, value) {
  this.y = y;
  this.x = x;
  this.value = value || "empty";
  Object.freeze(this);
};
Intersection.prototype = {
  isOccupiedWith: function isOccupiedWith(color) {
    if (this.isEmpty()) {
      return false;
    }
    return this.value === color;
  },
  isBlack: function isBlack() {
    return this.value === "black";
  },
  isWhite: function isWhite() {
    return this.value === "white";
  },
  isBlue: function isBlue() {
    return this.value === "blue";
  },
  isEmpty: function isEmpty() {
    return this.value === "empty";
  },
  sameColorAs: function sameColorAs(otherIntersection) {
    return this.value === otherIntersection.value;
  }
};
var _default = exports["default"] = Intersection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbnRlcnNlY3Rpb24iLCJ5IiwieCIsInZhbHVlIiwiT2JqZWN0IiwiZnJlZXplIiwicHJvdG90eXBlIiwiaXNPY2N1cGllZFdpdGgiLCJjb2xvciIsImlzRW1wdHkiLCJpc0JsYWNrIiwiaXNXaGl0ZSIsImlzQmx1ZSIsInNhbWVDb2xvckFzIiwib3RoZXJJbnRlcnNlY3Rpb24iLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvaW50ZXJzZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKHksIHgsIHZhbHVlKSB7XG4gIHRoaXMueSA9IHk7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBcImVtcHR5XCI7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cbkludGVyc2VjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGlzT2NjdXBpZWRXaXRoOiBmdW5jdGlvbihjb2xvcikge1xuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBjb2xvcjtcbiAgfSxcblxuICBpc0JsYWNrOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gXCJibGFja1wiO1xuICB9LFxuXG4gIGlzV2hpdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNCbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gXCJibHVlXCI7XG4gIH0sXG5cbiAgaXNFbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IFwiZW1wdHlcIjtcbiAgfSxcblxuICBzYW1lQ29sb3JBczogZnVuY3Rpb24ob3RoZXJJbnRlcnNlY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gb3RoZXJJbnRlcnNlY3Rpb24udmFsdWU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyc2VjdGlvbjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQVlDLENBQUMsRUFBRUMsQ0FBQyxFQUFFQyxLQUFLLEVBQUU7RUFDekMsSUFBSSxDQUFDRixDQUFDLEdBQUdBLENBQUM7RUFDVixJQUFJLENBQUNDLENBQUMsR0FBR0EsQ0FBQztFQUNWLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLLElBQUksT0FBTztFQUU3QkMsTUFBTSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFFREwsWUFBWSxDQUFDTSxTQUFTLEdBQUc7RUFDdkJDLGNBQWMsRUFBRSxTQUFBQSxlQUFTQyxLQUFLLEVBQUU7SUFDOUIsSUFBSSxJQUFJLENBQUNDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7TUFDbEIsT0FBTyxLQUFLO0lBQ2Q7SUFFQSxPQUFPLElBQUksQ0FBQ04sS0FBSyxLQUFLSyxLQUFLO0VBQzdCLENBQUM7RUFFREUsT0FBTyxFQUFFLFNBQUFBLFFBQUEsRUFBVztJQUNsQixPQUFPLElBQUksQ0FBQ1AsS0FBSyxLQUFLLE9BQU87RUFDL0IsQ0FBQztFQUVEUSxPQUFPLEVBQUUsU0FBQUEsUUFBQSxFQUFXO0lBQ2xCLE9BQU8sSUFBSSxDQUFDUixLQUFLLEtBQUssT0FBTztFQUMvQixDQUFDO0VBRURTLE1BQU0sRUFBRSxTQUFBQSxPQUFBLEVBQVc7SUFDakIsT0FBTyxJQUFJLENBQUNULEtBQUssS0FBSyxNQUFNO0VBQzlCLENBQUM7RUFFRE0sT0FBTyxFQUFFLFNBQUFBLFFBQUEsRUFBVztJQUNsQixPQUFPLElBQUksQ0FBQ04sS0FBSyxLQUFLLE9BQU87RUFDL0IsQ0FBQztFQUVEVSxXQUFXLEVBQUUsU0FBQUEsWUFBU0MsaUJBQWlCLEVBQUU7SUFDdkMsT0FBTyxJQUFJLENBQUNYLEtBQUssS0FBS1csaUJBQWlCLENBQUNYLEtBQUs7RUFDL0M7QUFDRixDQUFDO0FBQUMsSUFBQVksUUFBQSxHQUFBQyxPQUFBLGNBRWFoQixZQUFZIn0=
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NullRenderer;
function NullRenderer() {
  this.setup = function () {};
  this.render = function () {};
  this.renderTerritory = function () {};
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdWxsUmVuZGVyZXIiLCJzZXR1cCIsInJlbmRlciIsInJlbmRlclRlcnJpdG9yeSJdLCJzb3VyY2VzIjpbIi4uL3NyYy9udWxsLXJlbmRlcmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE51bGxSZW5kZXJlcigpIHtcbiAgdGhpcy5zZXR1cCA9IGZ1bmN0aW9uKCkge307XG4gIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7fTtcbiAgdGhpcy5yZW5kZXJUZXJyaXRvcnkgPSBmdW5jdGlvbigpIHt9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZSxTQUFTQSxZQUFZQSxDQUFBLEVBQUc7RUFDckMsSUFBSSxDQUFDQyxLQUFLLEdBQUcsWUFBVyxDQUFDLENBQUM7RUFDMUIsSUFBSSxDQUFDQyxNQUFNLEdBQUcsWUFBVyxDQUFDLENBQUM7RUFDM0IsSUFBSSxDQUFDQyxlQUFlLEdBQUcsWUFBVyxDQUFDLENBQUM7QUFDdEMifQ==
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var Region = function Region(boardState, intersections) {
  this.boardState = boardState;
  this.intersections = intersections;
  this._computed = {};
  Object.freeze(this);
};
Region._startingAt = function (boardState, y, x) {
  var startingPoint = boardState.intersectionAt(y, x);
  var _boardState$partition = boardState.partitionTraverse(startingPoint, function (neighbor) {
      return neighbor.sameColorAs(startingPoint);
    }),
    _boardState$partition2 = _slicedToArray(_boardState$partition, 2),
    includedPoints = _boardState$partition2[0],
    boundaryPoints = _boardState$partition2[1];
  return [includedPoints, boundaryPoints];
};
Region.allFor = function (boardState) {
  var checkedPoints = [];
  var regions = [];
  boardState.intersections.forEach(function (point) {
    if (checkedPoints.indexOf(point) > -1) {
      // do nothing
    } else {
      var _boardState$partition3 = boardState.partitionTraverse(point, function (neighbor) {
          return neighbor.sameColorAs(point);
        }),
        _boardState$partition4 = _slicedToArray(_boardState$partition3, 2),
        regionPoints = _boardState$partition4[0],
        _ = _boardState$partition4[1];
      regions.push(new Region(boardState, regionPoints));
      checkedPoints = checkedPoints.concat(regionPoints);
    }
  });
  return regions;
};
Region.merge = function (regions, region) {
  var mergedRegions = [region];
  var length = -1;
  while (mergedRegions.length !== length) {
    length = mergedRegions.length;
    mergedRegions = regions.filter(function (r) {
      return r.isEmpty() && r.isTerritory() && r.territoryColor() === region.territoryColor() && r.expandedBoundaryStones().some(function (stone) {
        return mergedRegions.some(function (latestRegion) {
          return latestRegion.expandedBoundaryStones().indexOf(stone) > -1;
        });
      });
    });
  }
  return mergedRegions;
};
Region.prototype = {
  isEmpty: function isEmpty() {
    return this.intersections[0].isEmpty();
  },
  isTerritory: function isTerritory() {
    var point = this.intersections[0];
    if (!point.isEmpty()) {
      return false;
    }
    var _Region$_startingAt = Region._startingAt(this.boardState, point.y, point.x),
      _Region$_startingAt2 = _slicedToArray(_Region$_startingAt, 2),
      _ = _Region$_startingAt2[0],
      boundaryPoints = _Region$_startingAt2[1];
    var surroundingColors = _utils["default"].unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";
    return isTerritory;
  },
  territoryColor: function territoryColor() {
    var point = this.intersections[0];
    var _Region$_startingAt3 = Region._startingAt(this.boardState, point.y, point.x),
      _Region$_startingAt4 = _slicedToArray(_Region$_startingAt3, 2),
      _ = _Region$_startingAt4[0],
      boundaryPoints = _Region$_startingAt4[1];
    var surroundingColors = _utils["default"].unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";
    if (!point.isEmpty() || !isTerritory) {
      throw new Error("Attempted to obtain territory color for something that isn't territory, region containing " + point.y + "," + point.x);
    } else {
      return surroundingColors[0];
    }
  },
  isBlack: function isBlack() {
    return this.territoryColor() === "black";
  },
  isWhite: function isWhite() {
    return this.territoryColor() === "white";
  },
  isNeutral: function isNeutral() {
    return !this.intersections[0].isBlack() && !this.intersections[0].isWhite() && !this.isTerritory();
  },
  exterior: function exterior() {
    var _this = this;
    return this.boardState.intersections.filter(function (i) {
      return _this.intersections.indexOf(i) < 0 && _this.boardState.neighborsFor(i.y, i.x).some(function (neighbor) {
        return _this.intersections.indexOf(neighbor) > -1;
      });
    });
  },
  boundaryStones: function boundaryStones() {
    var _this2 = this;
    if (this._computed.boundaryStones) {
      return this._computed.boundaryStones;
    }
    if (!this.isEmpty()) {
      throw new Error("Attempted to obtain boundary stones for non-empty region");
    }
    this._computed.boundaryStones = this.exterior().filter(function (i) {
      return !i.sameColorAs(_this2.intersections[0]);
    });
    return this._computed.boundaryStones;
  },
  expandedBoundaryStones: function expandedBoundaryStones() {
    if (this._computed.expandedBoundaryStones) {
      return this._computed.expandedBoundaryStones;
    }
    var boundaryStones = this.boundaryStones();
    var regions = Region.allFor(this.boardState).filter(function (r) {
      return r.intersections.some(function (i) {
        return boundaryStones.indexOf(i) > -1;
      });
    });
    this._computed.expandedBoundaryStones = _utils["default"].flatMap(regions, function (r) {
      return r.intersections;
    });
    return this._computed.expandedBoundaryStones;
  },
  lengthOfTerritoryBoundary: function lengthOfTerritoryBoundary() {
    var _this3 = this;
    // count the empty border points to treat the edge of the board itself as points
    var borderPoints = this.intersections.filter(function (i) {
      return i.y === 0 || i.y === _this3.boardState.boardSize - 1 || i.x === 0 || i.x === _this3.boardState.boardSize - 1;
    });
    var cornerPoints = this.intersections.filter(function (i) {
      return i.y % _this3.boardState.boardSize - 1 === 0 && i.x % _this3.boardState.boardSize - 1 === 0;
    });
    return this.boundaryStones().length + borderPoints.length + cornerPoints.length;
  },
  containsSquareFour: function containsSquareFour() {
    var _this4 = this;
    return this.intersections.some(function (i) {
      return [[0, 0], [0, 1], [1, 0], [1, 1]].every(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          yOffset = _ref2[0],
          xOffset = _ref2[1];
        var y = i.y + yOffset;
        var x = i.x + xOffset;
        var onTheBoard = y >= 0 && y < _this4.boardState.boardSize && x >= 0 && x < _this4.boardState.boardSize;
        return onTheBoard && _this4.boardState.intersectionAt(y, x).sameColorAs(i);
      });
    });
  },
  containsCurvedFour: function containsCurvedFour() {
    var _this5 = this;
    return this.intersections.some(function (i) {
      return [[[0, 0], [1, 0], [2, 0], [2, 1]], [[-1, 2], [0, 0], [0, 1], [0, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[-1, 0], [-1, 1], [-1, 2], [0, 0]], [[-2, 1], [-1, 1], [0, 0], [0, 1]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, -1], [0, 0], [1, -1], [2, -1]], [[-1, -2], [-1, -1], [-1, 0], [0, 0]]].some(function (expectedPoints) {
        return expectedPoints.every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            yOffset = _ref4[0],
            xOffset = _ref4[1];
          var y = i.y + yOffset;
          var x = i.x + xOffset;
          var onTheBoard = y >= 0 && y < _this5.boardState.boardSize && x >= 0 && x < _this5.boardState.boardSize;
          return onTheBoard && _this5.boardState.intersectionAt(y, x).sameColorAs(i);
        });
      });
    });
  },
  numberOfEyes: function numberOfEyes() {
    if (!this.intersections[0].isEmpty()) {
      throw new Error("Unexpected calculation of number of eyes for a non-empty region containing " + this.intersections[0].y + "," + this.intersections[0].x);
    }
    var boundaryLength = this.lengthOfTerritoryBoundary();
    if (boundaryLength < 2) {
      throw new Error("Unexpected boundary length of " + boundaryLength + " for region including " + this.intersections[0].y + "," + this.intersections[0].x);
    }
    if (boundaryLength >= 10) {
      return 2;
    }
    var eyes;
    switch (boundaryLength) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        eyes = 1;
        break;
      case 7:
        eyes = 1.5;
        break;
      case 8:
        if (this.containsSquareFour()) {
          eyes = 1;
        } else if (this.containsCurvedFour()) {
          eyes = 2;
        } else {
          eyes = 1.5;
        }
        break;
      case 9:
        if (this.containsSquareFour()) {
          eyes = 1.5;
        } else {
          eyes = 2;
        }
        break;
      default:
        throw new Error("unhandled boundary length " + boundaryLength);
    }
    return eyes;
  }
};
var _default = exports["default"] = Region;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfc2xpY2VkVG9BcnJheSIsImFyciIsImkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsImxlbiIsImxlbmd0aCIsImFycjIiLCJyIiwibCIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsImUiLCJ1IiwiYSIsImYiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJSZWdpb24iLCJib2FyZFN0YXRlIiwiaW50ZXJzZWN0aW9ucyIsIl9jb21wdXRlZCIsImZyZWV6ZSIsIl9zdGFydGluZ0F0IiwieSIsIngiLCJzdGFydGluZ1BvaW50IiwiaW50ZXJzZWN0aW9uQXQiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24iLCJwYXJ0aXRpb25UcmF2ZXJzZSIsIm5laWdoYm9yIiwic2FtZUNvbG9yQXMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yIiwiaW5jbHVkZWRQb2ludHMiLCJib3VuZGFyeVBvaW50cyIsImFsbEZvciIsImNoZWNrZWRQb2ludHMiLCJyZWdpb25zIiwiZm9yRWFjaCIsInBvaW50IiwiaW5kZXhPZiIsIl9ib2FyZFN0YXRlJHBhcnRpdGlvbjMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb240IiwicmVnaW9uUG9pbnRzIiwiXyIsImNvbmNhdCIsIm1lcmdlIiwicmVnaW9uIiwibWVyZ2VkUmVnaW9ucyIsImZpbHRlciIsImlzRW1wdHkiLCJpc1RlcnJpdG9yeSIsInRlcnJpdG9yeUNvbG9yIiwiZXhwYW5kZWRCb3VuZGFyeVN0b25lcyIsInNvbWUiLCJzdG9uZSIsImxhdGVzdFJlZ2lvbiIsIl9SZWdpb24kX3N0YXJ0aW5nQXQiLCJfUmVnaW9uJF9zdGFydGluZ0F0MiIsInN1cnJvdW5kaW5nQ29sb3JzIiwidW5pcXVlIiwibWFwIiwiX1JlZ2lvbiRfc3RhcnRpbmdBdDMiLCJfUmVnaW9uJF9zdGFydGluZ0F0NCIsIkVycm9yIiwiaXNCbGFjayIsImlzV2hpdGUiLCJpc05ldXRyYWwiLCJleHRlcmlvciIsIl90aGlzIiwibmVpZ2hib3JzRm9yIiwiYm91bmRhcnlTdG9uZXMiLCJfdGhpczIiLCJmbGF0TWFwIiwibGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeSIsIl90aGlzMyIsImJvcmRlclBvaW50cyIsImJvYXJkU2l6ZSIsImNvcm5lclBvaW50cyIsImNvbnRhaW5zU3F1YXJlRm91ciIsIl90aGlzNCIsImV2ZXJ5IiwiX3JlZiIsIl9yZWYyIiwieU9mZnNldCIsInhPZmZzZXQiLCJvblRoZUJvYXJkIiwiY29udGFpbnNDdXJ2ZWRGb3VyIiwiX3RoaXM1IiwiZXhwZWN0ZWRQb2ludHMiLCJfcmVmMyIsIl9yZWY0IiwibnVtYmVyT2ZFeWVzIiwiYm91bmRhcnlMZW5ndGgiLCJleWVzIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL3JlZ2lvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgUmVnaW9uID0gZnVuY3Rpb24oYm9hcmRTdGF0ZSwgaW50ZXJzZWN0aW9ucykge1xuICB0aGlzLmJvYXJkU3RhdGUgPSBib2FyZFN0YXRlO1xuICB0aGlzLmludGVyc2VjdGlvbnMgPSBpbnRlcnNlY3Rpb25zO1xuXG4gIHRoaXMuX2NvbXB1dGVkID0ge307XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cblJlZ2lvbi5fc3RhcnRpbmdBdCA9IGZ1bmN0aW9uKGJvYXJkU3RhdGUsIHksIHgpIHtcbiAgY29uc3Qgc3RhcnRpbmdQb2ludCA9IGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgY29uc3QgW2luY2x1ZGVkUG9pbnRzLCBib3VuZGFyeVBvaW50c10gPSBib2FyZFN0YXRlLnBhcnRpdGlvblRyYXZlcnNlKHN0YXJ0aW5nUG9pbnQsIG5laWdoYm9yID0+IHtcbiAgICByZXR1cm4gbmVpZ2hib3Iuc2FtZUNvbG9yQXMoc3RhcnRpbmdQb2ludCk7XG4gIH0pO1xuXG4gIHJldHVybiBbaW5jbHVkZWRQb2ludHMsIGJvdW5kYXJ5UG9pbnRzXTtcbn07XG5cblJlZ2lvbi5hbGxGb3IgPSBmdW5jdGlvbihib2FyZFN0YXRlKSB7XG4gIGxldCBjaGVja2VkUG9pbnRzID0gW107XG4gIGNvbnN0IHJlZ2lvbnMgPSBbXTtcblxuICBib2FyZFN0YXRlLmludGVyc2VjdGlvbnMuZm9yRWFjaChwb2ludCA9PiB7XG4gICAgaWYgKGNoZWNrZWRQb2ludHMuaW5kZXhPZihwb2ludCkgPiAtMSkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbcmVnaW9uUG9pbnRzLCBfXSA9IGJvYXJkU3RhdGUucGFydGl0aW9uVHJhdmVyc2UocG9pbnQsIG5laWdoYm9yID0+IHtcbiAgICAgICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHBvaW50KTtcbiAgICAgIH0pO1xuXG4gICAgICByZWdpb25zLnB1c2gobmV3IFJlZ2lvbihib2FyZFN0YXRlLCByZWdpb25Qb2ludHMpKTtcbiAgICAgIGNoZWNrZWRQb2ludHMgPSBjaGVja2VkUG9pbnRzLmNvbmNhdChyZWdpb25Qb2ludHMpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlZ2lvbnM7XG59O1xuXG5SZWdpb24ubWVyZ2UgPSBmdW5jdGlvbihyZWdpb25zLCByZWdpb24pIHtcbiAgbGV0IG1lcmdlZFJlZ2lvbnMgPSBbcmVnaW9uXTtcbiAgbGV0IGxlbmd0aCA9IC0xO1xuXG4gIHdoaWxlIChtZXJnZWRSZWdpb25zLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gbWVyZ2VkUmVnaW9ucy5sZW5ndGg7XG5cbiAgICBtZXJnZWRSZWdpb25zID0gcmVnaW9ucy5maWx0ZXIociA9PiB7XG4gICAgICByZXR1cm4gci5pc0VtcHR5KCkgJiYgci5pc1RlcnJpdG9yeSgpICYmIHIudGVycml0b3J5Q29sb3IoKSA9PT0gcmVnaW9uLnRlcnJpdG9yeUNvbG9yKCkgJiYgci5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkuc29tZShzdG9uZSA9PiB7XG4gICAgICAgIHJldHVybiBtZXJnZWRSZWdpb25zLnNvbWUobGF0ZXN0UmVnaW9uID0+IHtcbiAgICAgICAgICByZXR1cm4gbGF0ZXN0UmVnaW9uLmV4cGFuZGVkQm91bmRhcnlTdG9uZXMoKS5pbmRleE9mKHN0b25lKSA+IC0xO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZFJlZ2lvbnM7XG59O1xuXG5SZWdpb24ucHJvdG90eXBlID0ge1xuICBpc0VtcHR5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3Rpb25zWzBdLmlzRW1wdHkoKTtcbiAgfSxcblxuICBpc1RlcnJpdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbnNbMF07XG5cbiAgICBpZiAoIXBvaW50LmlzRW1wdHkoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IFtfLCBib3VuZGFyeVBvaW50c10gPSBSZWdpb24uX3N0YXJ0aW5nQXQodGhpcy5ib2FyZFN0YXRlLCBwb2ludC55LCBwb2ludC54KTtcbiAgICBjb25zdCBzdXJyb3VuZGluZ0NvbG9ycyA9IHV0aWxzLnVuaXF1ZShib3VuZGFyeVBvaW50cy5tYXAoaSA9PiBpLnZhbHVlKSk7XG4gICAgY29uc3QgaXNUZXJyaXRvcnkgPSBzdXJyb3VuZGluZ0NvbG9ycy5sZW5ndGggPT09IDEgJiYgc3Vycm91bmRpbmdDb2xvcnNbMF0gIT09IFwiZW1wdHlcIjtcblxuICAgIHJldHVybiBpc1RlcnJpdG9yeTtcbiAgfSxcblxuICB0ZXJyaXRvcnlDb2xvcjogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbnNbMF07XG4gICAgY29uc3QgW18sIGJvdW5kYXJ5UG9pbnRzXSA9IFJlZ2lvbi5fc3RhcnRpbmdBdCh0aGlzLmJvYXJkU3RhdGUsIHBvaW50LnksIHBvaW50LngpO1xuICAgIGNvbnN0IHN1cnJvdW5kaW5nQ29sb3JzID0gdXRpbHMudW5pcXVlKGJvdW5kYXJ5UG9pbnRzLm1hcChpID0+IGkudmFsdWUpKTtcbiAgICBjb25zdCBpc1RlcnJpdG9yeSA9IHN1cnJvdW5kaW5nQ29sb3JzLmxlbmd0aCA9PT0gMSAmJiBzdXJyb3VuZGluZ0NvbG9yc1swXSAhPT0gXCJlbXB0eVwiO1xuXG4gICAgaWYgKCFwb2ludC5pc0VtcHR5KCkgfHwgIWlzVGVycml0b3J5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gb2J0YWluIHRlcnJpdG9yeSBjb2xvciBmb3Igc29tZXRoaW5nIHRoYXQgaXNuJ3QgdGVycml0b3J5LCByZWdpb24gY29udGFpbmluZyBcIiArIHBvaW50LnkgKyBcIixcIiArIHBvaW50LngpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vycm91bmRpbmdDb2xvcnNbMF07XG4gICAgfVxuICB9LFxuXG4gIGlzQmxhY2s6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRlcnJpdG9yeUNvbG9yKCkgPT09IFwiYmxhY2tcIjtcbiAgfSxcblxuICBpc1doaXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyaXRvcnlDb2xvcigpID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNOZXV0cmFsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gIXRoaXMuaW50ZXJzZWN0aW9uc1swXS5pc0JsYWNrKCkgJiYgIXRoaXMuaW50ZXJzZWN0aW9uc1swXS5pc1doaXRlKCkgJiYgIXRoaXMuaXNUZXJyaXRvcnkoKTtcbiAgfSxcblxuICBleHRlcmlvcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zLmZpbHRlcihpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvbnMuaW5kZXhPZihpKSA8IDAgJiYgdGhpcy5ib2FyZFN0YXRlLm5laWdoYm9yc0ZvcihpLnksIGkueCkuc29tZShuZWlnaGJvciA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvbnMuaW5kZXhPZihuZWlnaGJvcikgPiAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY29tcHV0ZWQuYm91bmRhcnlTdG9uZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gb2J0YWluIGJvdW5kYXJ5IHN0b25lcyBmb3Igbm9uLWVtcHR5IHJlZ2lvblwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcyA9IHRoaXMuZXh0ZXJpb3IoKS5maWx0ZXIoaSA9PiAhaS5zYW1lQ29sb3JBcyh0aGlzLmludGVyc2VjdGlvbnNbMF0pKTtcblxuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcztcbiAgfSxcblxuICBleHBhbmRlZEJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmV4cGFuZGVkQm91bmRhcnlTdG9uZXM7XG4gICAgfVxuXG4gICAgY29uc3QgYm91bmRhcnlTdG9uZXMgPSB0aGlzLmJvdW5kYXJ5U3RvbmVzKCk7XG4gICAgY29uc3QgcmVnaW9ucyA9IFJlZ2lvbi5hbGxGb3IodGhpcy5ib2FyZFN0YXRlKS5maWx0ZXIociA9PiByLmludGVyc2VjdGlvbnMuc29tZShpID0+IGJvdW5kYXJ5U3RvbmVzLmluZGV4T2YoaSkgPiAtMSkpO1xuXG4gICAgdGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcyA9IHV0aWxzLmZsYXRNYXAocmVnaW9ucywgciA9PiByLmludGVyc2VjdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmV4cGFuZGVkQm91bmRhcnlTdG9uZXM7XG4gIH0sXG5cbiAgbGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeTogZnVuY3Rpb24oKSB7XG4gICAgLy8gY291bnQgdGhlIGVtcHR5IGJvcmRlciBwb2ludHMgdG8gdHJlYXQgdGhlIGVkZ2Ugb2YgdGhlIGJvYXJkIGl0c2VsZiBhcyBwb2ludHNcbiAgICBjb25zdCBib3JkZXJQb2ludHMgPSB0aGlzLmludGVyc2VjdGlvbnMuZmlsdGVyKGkgPT4ge1xuICAgICAgcmV0dXJuIGkueSA9PT0gMCB8fCBpLnkgPT09IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxIHx8IGkueCA9PT0gMCB8fCBpLnggPT09IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxO1xuICAgIH0pO1xuICAgIGNvbnN0IGNvcm5lclBvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5maWx0ZXIoaSA9PiB7XG4gICAgICByZXR1cm4gaS55ICUgdGhpcy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEgPT09IDAgJiYgaS54ICUgdGhpcy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEgPT09IDA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5ib3VuZGFyeVN0b25lcygpLmxlbmd0aCArIGJvcmRlclBvaW50cy5sZW5ndGggKyBjb3JuZXJQb2ludHMubGVuZ3RoO1xuICB9LFxuXG4gIGNvbnRhaW5zU3F1YXJlRm91cjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGkgPT4ge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgWzAsIDBdLCBbMCwgMV0sXG4gICAgICAgIFsxLCAwXSwgWzEsIDFdXG4gICAgICBdLmV2ZXJ5KChbeU9mZnNldCwgeE9mZnNldF0pID0+IHtcbiAgICAgICAgY29uc3QgeSA9IGkueSArIHlPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHggPSBpLnggKyB4T2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG9uVGhlQm9hcmQgPSB5ID49IDAgJiYgeSA8IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgJiYgeCA+PSAwICYmIHggPCB0aGlzLmJvYXJkU3RhdGUuYm9hcmRTaXplO1xuXG4gICAgICAgIHJldHVybiBvblRoZUJvYXJkICYmIHRoaXMuYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KS5zYW1lQ29sb3JBcyhpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGNvbnRhaW5zQ3VydmVkRm91cjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGkgPT4ge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgW1xuICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICBbMSwgMF0sXG4gICAgICAgICAgWzIsIDBdLCBbMiwgMV1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgIFstMSwgMl0sXG4gICAgICAgICAgWzAsIDBdLCBbMCwgMV0sIFswLCAyXVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgWzAsIDBdLCBbMCwgMV0sXG4gICAgICAgICAgICAgICAgICBbMSwgMV0sXG4gICAgICAgICAgICAgICAgICBbMiwgMV1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIFstMSwgMF0sIFstMSwgMV0sIFstMSwgMl0sXG4gICAgICAgICAgWzAsIDBdXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICAgICAgWy0yLCAxXSxcbiAgICAgICAgICAgICAgICAgWy0xLCAxXSxcbiAgICAgICAgICBbMCwgMF0sIFswLCAxXVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgIFsxLCAwXSwgWzEsIDFdLCBbMSwgMl1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIFswLCAtMV0sIFswLCAwXSxcbiAgICAgICAgICBbMSwgLTFdLFxuICAgICAgICAgIFsyLCAtMV1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIFstMSwgLTJdLCBbLTEsIC0xXSwgWy0xLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLCAwXVxuICAgICAgICBdXG4gICAgICBdLnNvbWUoZXhwZWN0ZWRQb2ludHMgPT4ge1xuICAgICAgICByZXR1cm4gZXhwZWN0ZWRQb2ludHMuZXZlcnkoKFt5T2Zmc2V0LCB4T2Zmc2V0XSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHkgPSBpLnkgKyB5T2Zmc2V0O1xuICAgICAgICAgIGNvbnN0IHggPSBpLnggKyB4T2Zmc2V0O1xuXG4gICAgICAgICAgY29uc3Qgb25UaGVCb2FyZCA9IHkgPj0gMCAmJiB5IDwgdGhpcy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAmJiB4ID49IDAgJiYgeCA8IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemU7XG5cbiAgICAgICAgICByZXR1cm4gb25UaGVCb2FyZCAmJiB0aGlzLmJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCkuc2FtZUNvbG9yQXMoaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgbnVtYmVyT2ZFeWVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaW50ZXJzZWN0aW9uc1swXS5pc0VtcHR5KCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY2FsY3VsYXRpb24gb2YgbnVtYmVyIG9mIGV5ZXMgZm9yIGEgbm9uLWVtcHR5IHJlZ2lvbiBjb250YWluaW5nIFwiICsgdGhpcy5pbnRlcnNlY3Rpb25zWzBdLnkgKyBcIixcIiArIHRoaXMuaW50ZXJzZWN0aW9uc1swXS54KTtcbiAgICB9XG5cbiAgICBjb25zdCBib3VuZGFyeUxlbmd0aCA9IHRoaXMubGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeSgpO1xuXG4gICAgaWYgKGJvdW5kYXJ5TGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBib3VuZGFyeSBsZW5ndGggb2YgXCIgKyBib3VuZGFyeUxlbmd0aCArIFwiIGZvciByZWdpb24gaW5jbHVkaW5nIFwiICsgdGhpcy5pbnRlcnNlY3Rpb25zWzBdLnkgKyBcIixcIiArIHRoaXMuaW50ZXJzZWN0aW9uc1swXS54KTtcbiAgICB9XG5cbiAgICBpZiAoYm91bmRhcnlMZW5ndGggPj0gMTApIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cblxuICAgIGxldCBleWVzO1xuXG4gICAgc3dpdGNoIChib3VuZGFyeUxlbmd0aCkge1xuICAgICAgY2FzZSAyOlxuICAgICAgY2FzZSAzOlxuICAgICAgY2FzZSA0OlxuICAgICAgY2FzZSA1OlxuICAgICAgY2FzZSA2OlxuICAgICAgICBleWVzID0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIGV5ZXMgPSAxLjU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICBpZiAodGhpcy5jb250YWluc1NxdWFyZUZvdXIoKSkge1xuICAgICAgICAgIGV5ZXMgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbnNDdXJ2ZWRGb3VyKCkpIHtcbiAgICAgICAgICBleWVzID0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleWVzID0gMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5zU3F1YXJlRm91cigpKSB7XG4gICAgICAgICAgZXllcyA9IDEuNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleWVzID0gMjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5oYW5kbGVkIGJvdW5kYXJ5IGxlbmd0aCBcIiArIGJvdW5kYXJ5TGVuZ3RoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXllcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVnaW9uO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxNQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBNEIsU0FBQUQsdUJBQUFFLEdBQUE7RUFBQSxPQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBO0lBQUEsV0FBQUE7RUFBQTtBQUFBO0FBQUEsU0FBQUUsZUFBQUMsR0FBQSxFQUFBQyxDQUFBO0VBQUEsT0FBQUMsZUFBQSxDQUFBRixHQUFBLEtBQUFHLHFCQUFBLENBQUFILEdBQUEsRUFBQUMsQ0FBQSxLQUFBRywyQkFBQSxDQUFBSixHQUFBLEVBQUFDLENBQUEsS0FBQUksZ0JBQUE7QUFBQTtBQUFBLFNBQUFBLGlCQUFBO0VBQUEsVUFBQUMsU0FBQTtBQUFBO0FBQUEsU0FBQUYsNEJBQUFHLENBQUEsRUFBQUMsTUFBQTtFQUFBLEtBQUFELENBQUE7RUFBQSxXQUFBQSxDQUFBLHNCQUFBRSxpQkFBQSxDQUFBRixDQUFBLEVBQUFDLE1BQUE7RUFBQSxJQUFBRSxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsU0FBQSxDQUFBQyxRQUFBLENBQUFDLElBQUEsQ0FBQVAsQ0FBQSxFQUFBUSxLQUFBO0VB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
},{"./utils":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var Renderer = function Renderer(boardElement, _ref) {
  var hooks = _ref.hooks,
    options = _ref.options;
  this.INTERSECTION_GAP_SIZE = 28;
  this.GUTTER_MARGIN = this.INTERSECTION_GAP_SIZE - 3;
  this.BASE_MARGIN = this.INTERSECTION_GAP_SIZE - 10;
  this.hasCoordinates = boardElement.hasAttribute("data-include-coordinates");
  this.MARGIN = this.hasCoordinates ? this.BASE_MARGIN + this.GUTTER_MARGIN : this.BASE_MARGIN;
  this.boardElement = boardElement;
  this.grid = [];
  this.hooks = hooks || {};
  this._options = options || {};
  this._initialized = false;
  if (this._options["fuzzyStonePlacement"]) {
    _utils["default"].addClass(boardElement, "tenuki-fuzzy-placement");
    _utils["default"].removeClass(boardElement, "tenuki-board-flat");
    _utils["default"].addClass(boardElement, "tenuki-board-nonflat");
    this.smallerStones = true;
  }
  this.flatStones = _utils["default"].hasClass(boardElement, "tenuki-board-flat");
  if (!this.flatStones) {
    _utils["default"].addClass(boardElement, "tenuki-board-nonflat");
  }
};
Renderer.hoshiPositionsFor = function (boardSize) {
  var hoshiElements = [];
  if (boardSize < 7) {
    if (boardSize > 1 && boardSize % 2 === 1) {
      var hoshi = {};
      hoshi.top = (boardSize - 1) / 2;
      hoshi.left = hoshi.top;
      hoshiElements.push(hoshi);
    } else {
      // no hoshi
    }
  } else {
    var hoshiOffset = boardSize > 11 ? 3 : 2;
    for (var hoshiY = 0; hoshiY < 3; hoshiY++) {
      for (var hoshiX = 0; hoshiX < 3; hoshiX++) {
        if ((boardSize === 7 || boardSize % 2 === 0) && (hoshiY === 1 || hoshiX === 1)) {
          continue;
        }
        var _hoshi = {};
        if (hoshiY === 0) {
          _hoshi.top = hoshiOffset;
        }
        if (hoshiY === 1) {
          _hoshi.top = (boardSize + 1) / 2 - 1;
        }
        if (hoshiY === 2) {
          _hoshi.top = boardSize - hoshiOffset - 1;
        }
        if (hoshiX === 0) {
          _hoshi.left = hoshiOffset;
        }
        if (hoshiX === 1) {
          _hoshi.left = (boardSize + 1) / 2 - 1;
        }
        if (hoshiX === 2) {
          _hoshi.left = boardSize - hoshiOffset - 1;
        }
        hoshiElements.push(_hoshi);
      }
    }
  }
  return hoshiElements;
};
Renderer.prototype = {
  _setup: function _setup(boardState) {
    var renderer = this;
    var boardElement = this.boardElement;
    renderer.BOARD_LENGTH = 2 * this.MARGIN + (boardState.boardSize - 1) * (this.INTERSECTION_GAP_SIZE + 1);
    var innerContainer = _utils["default"].createElement("div", {
      "class": "tenuki-inner-container"
    });
    renderer.innerContainer = innerContainer;
    _utils["default"].appendElement(boardElement, innerContainer);
    var zoomContainer = _utils["default"].createElement("div", {
      "class": "tenuki-zoom-container"
    });
    renderer.zoomContainer = zoomContainer;
    _utils["default"].appendElement(innerContainer, zoomContainer);
    renderer.cancelZoomElement = _utils["default"].createElement("div", {
      "class": "cancel-zoom"
    });
    var cancelZoomBackdrop = _utils["default"].createElement("div", {
      "class": "cancel-zoom-backdrop"
    });
    _utils["default"].addEventListener(renderer.cancelZoomElement, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();
      return false;
    });
    _utils["default"].addEventListener(cancelZoomBackdrop, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();
      return false;
    });
    _utils["default"].appendElement(innerContainer, renderer.cancelZoomElement);
    _utils["default"].appendElement(innerContainer, cancelZoomBackdrop);

    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    var throttle = function throttle(type, name) {
      var running = false;
      var func = function func() {
        if (running) {
          return;
        }
        running = true;
        window.requestAnimationFrame(function () {
          window.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      window.addEventListener(type, func);
    };
    throttle("resize", "optimizedResize");
    var specificRendererBoard = this.generateBoard(boardState, {
      hasCoordinates: this.hasCoordinates,
      smallerStones: this.smallerStones,
      flatStones: this.flatStones
    });
    _utils["default"].appendElement(zoomContainer, specificRendererBoard);
    window.requestAnimationFrame(function () {
      // we'll potentially be zooming on touch devices
      zoomContainer.style.willChange = "transform";
      renderer.computeSizing();
    });
    window.addEventListener("optimizedResize", function () {
      renderer.computeSizing();
    });
    renderer.touchmoveChangedTouch = null;
    renderer.touchstartEventHandler = renderer.handleTouchStart.bind(renderer);
    renderer.touchmoveEventHandler = renderer.handleTouchMove.bind(renderer);
    renderer.touchendEventHandler = renderer.handleTouchEnd.bind(renderer);
    _utils["default"].addEventListener(renderer.innerContainer, "touchstart", renderer.touchstartEventHandler);
    _utils["default"].addEventListener(renderer.innerContainer, "touchend", renderer.touchendEventHandler);
    _utils["default"].addEventListener(renderer.innerContainer, "touchmove", renderer.touchmoveEventHandler);
  },
  computeSizing: function computeSizing() {
    var renderer = this;
    var innerContainer = this.innerContainer;
    var zoomContainer = this.zoomContainer;
    var boardElement = this.boardElement;

    // reset everything so we can calculate against new values
    innerContainer.style.height = "";
    innerContainer.style.width = "";
    zoomContainer.style.height = "";
    zoomContainer.style.width = "";
    innerContainer.style.transform = "";
    // zoomContainer.style.willChange = "";
    boardElement.style.width = "";
    boardElement.style.height = "";

    // dev-friendly reset of whether this is a touch device
    renderer._touchEventFired = null;
    innerContainer.style.width = renderer.BOARD_LENGTH + "px";
    innerContainer.style.height = renderer.BOARD_LENGTH + "px";
    zoomContainer.style.width = renderer.BOARD_LENGTH + "px";
    zoomContainer.style.height = renderer.BOARD_LENGTH + "px";
    var scaleX = innerContainer.parentNode.clientWidth / innerContainer.clientWidth;
    var scaleY = innerContainer.parentNode.clientHeight / innerContainer.clientHeight;
    var scale = Math.min(scaleX, scaleY);
    if (scale > 0) {
      if (scale < 1) {
        _utils["default"].addClass(boardElement, "tenuki-scaled");
      } else {
        _utils["default"].removeClass(boardElement, "tenuki-scaled");
      }
      if (scale < 1 || scale > 1) {
        innerContainer.style["transform-origin"] = "top left";
        innerContainer.style.transform = "scale3d(" + scale + ", " + scale + ", 1)";
      }
    }

    // reset the outer element's height to match, ensuring that we free up any lingering whitespace
    boardElement.style.width = innerContainer.getBoundingClientRect().width + "px";
    boardElement.style.height = innerContainer.getBoundingClientRect().height + "px";

    // Work around lack of re-raster in Chrome. See https://github.com/w3c/csswg-drafts/issues/236
    // and https://bugs.chromium.org/p/chromium/issues/detail?id=600482 for more
    // information. This is preventing, e.g., horizontal/vertical line width
    // mismatches after scaling. By adding this, lines are re-rastered and are
    // all the same width, as if the user had hit refresh at the new viewport
    // size.
    zoomContainer.style.willChange = "";
    window.requestAnimationFrame(function () {
      zoomContainer.style.willChange = "transform";
    });
  },
  addIntersectionEventListeners: function addIntersectionEventListeners(element, y, x) {
    var renderer = this;
    _utils["default"].addEventListener(element, "mouseenter", function () {
      var hoveredYPosition = y;
      var hoveredXPosition = x;
      var hoverValue = renderer.hooks.hoverValue(hoveredYPosition, hoveredXPosition);
      if (hoverValue) {
        _utils["default"].addClass(element, "hovered");
        _utils["default"].addClass(element, hoverValue);
      }
    });
    _utils["default"].addEventListener(element, "mouseleave", function () {
      if (_utils["default"].hasClass(this, "hovered")) {
        _utils["default"].removeClass(element, "hovered");
        _utils["default"].removeClass(element, "black");
        _utils["default"].removeClass(element, "white");
      }
      renderer.resetTouchedPoint();
    });
    _utils["default"].addEventListener(element, "click", function () {
      var playedYPosition = y;
      var playedXPosition = x;

      // if this isn't part of a touch,
      // or it is and the user is zoomed in,
      // or it's game over and we're marking stones dead,
      // then don't use the zoom/double-select system.
      if (!renderer._touchEventFired || document.body.clientWidth / window.innerWidth > 1 || renderer.hooks.gameIsOver()) {
        renderer.hooks.handleClick(playedYPosition, playedXPosition);
        return;
      }
      if (renderer.touchedPoint) {
        if (element === renderer.touchedPoint) {
          renderer.hooks.handleClick(playedYPosition, playedXPosition);
        } else {
          renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
        }
      } else {
        renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
      }
    });
  },
  handleTouchStart: function handleTouchStart(event) {
    var renderer = this;
    renderer._touchEventFired = true;
    if (event.touches.length > 1) {
      if (renderer.zoomedIn) {
        event.preventDefault();
      }
      return;
    }
    if (!renderer.zoomedIn) {
      return;
    }
    var xCursor = event.changedTouches[0].clientX;
    var yCursor = event.changedTouches[0].clientY;
    renderer.dragStartX = xCursor;
    renderer.dragStartY = yCursor;
    renderer.zoomContainer.style.transition = "none";
    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },
  handleTouchMove: function handleTouchMove(event) {
    var renderer = this;
    if (event.touches.length > 1) {
      return;
    }
    if (!renderer.zoomedIn) {
      return true;
    }

    // prevent pull-to-refresh
    event.preventDefault();
    renderer.touchmoveChangedTouch = event.changedTouches[0];
    renderer.moveInProgress = true;
  },
  handleTouchEnd: function handleTouchEnd(event) {
    var renderer = this;
    if (event.touches.length > 1) {
      return;
    }
    if (!renderer.zoomedIn) {
      return;
    }
    renderer.zoomContainer.style.transition = "";
    if (!renderer.moveInProgress) {
      return;
    }
    renderer.translateY = renderer.lastTranslateY;
    renderer.translateX = renderer.lastTranslateX;
    renderer.moveInProgress = false;
    renderer.touchmoveChangedTouch = null;
    window.cancelAnimationFrame(renderer.animationFrameRequestID);
  },
  processDragDelta: function processDragDelta() {
    var renderer = this;
    if (!renderer.touchmoveChangedTouch) {
      renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
      return;
    }
    var innerContainer = renderer.innerContainer;
    var xCursor = renderer.touchmoveChangedTouch.clientX;
    var yCursor = renderer.touchmoveChangedTouch.clientY;
    var deltaX = xCursor - renderer.dragStartX;
    var deltaY = yCursor - renderer.dragStartY;
    var translateY = renderer.translateY + deltaY / 2.5;
    var translateX = renderer.translateX + deltaX / 2.5;
    if (translateY > 0.5 * innerContainer.clientHeight - renderer.MARGIN) {
      translateY = 0.5 * innerContainer.clientHeight - renderer.MARGIN;
    }
    if (translateX > 0.5 * innerContainer.clientWidth - renderer.MARGIN) {
      translateX = 0.5 * innerContainer.clientWidth - renderer.MARGIN;
    }
    if (translateY < -0.5 * innerContainer.clientHeight + renderer.MARGIN) {
      translateY = -0.5 * innerContainer.clientHeight + renderer.MARGIN;
    }
    if (translateX < -0.5 * innerContainer.clientWidth + renderer.MARGIN) {
      translateX = -0.5 * innerContainer.clientWidth + renderer.MARGIN;
    }
    renderer.zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";
    renderer.lastTranslateX = translateX;
    renderer.lastTranslateY = translateY;
    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },
  showPossibleMoveAt: function showPossibleMoveAt(intersectionElement, y, x) {
    var renderer = this;
    var boardElement = this.boardElement;
    var zoomContainer = this.zoomContainer;
    renderer.zoomContainerHeight = renderer.zoomContainerHeight || zoomContainer.clientHeight;
    renderer.zoomContainerWidth = renderer.zoomContainerWidth || zoomContainer.clientWidth;
    renderer.touchedPoint = intersectionElement;
    if (_utils["default"].hasClass(boardElement, "tenuki-scaled")) {
      var top = y * (this.INTERSECTION_GAP_SIZE + 1);
      var left = x * (this.INTERSECTION_GAP_SIZE + 1);
      var translateY = 0.5 * renderer.zoomContainerHeight - top - renderer.MARGIN;
      var translateX = 0.5 * renderer.zoomContainerWidth - left - renderer.MARGIN;
      zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";
      renderer.translateY = translateY;
      renderer.translateX = translateX;
      _utils["default"].addClass(renderer.cancelZoomElement, "visible");
      renderer.zoomedIn = true;
    }
  },
  resetTouchedPoint: function resetTouchedPoint() {
    var renderer = this;
    renderer.touchedPoint = null;
  },
  zoomOut: function zoomOut() {
    var renderer = this;
    this.resetTouchedPoint();
    renderer.zoomContainer.style.transform = "";
    renderer.zoomContainer.style.transition = "";
    renderer.dragStartX = null;
    renderer.dragStartY = null;
    renderer.translateY = null;
    renderer.translateX = null;
    renderer.lastTranslateX = null;
    renderer.lastTranslateY = null;
    _utils["default"].removeClass(renderer.cancelZoomElement, "visible");
    renderer.zoomedIn = false;
  },
  render: function render(boardState) {
    var _this = this;
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      territory = _ref2.territory,
      deadStones = _ref2.deadStones;
    if (!this._initialized) {
      this._setup(boardState);
      this._initialized = true;
    }
    this.resetTouchedPoint();
    this.renderStonesPlayed(boardState.intersections);
    var playedPoint = boardState.playedPoint;
    this.updateMarkerPoints({
      playedPoint: playedPoint,
      koPoint: boardState.koPoint
    });
    if (this._options["fuzzyStonePlacement"] && playedPoint) {
      var verticalShiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none"];
      var horizontalShiftClasses = ["h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];
      var shiftClasses = verticalShiftClasses.concat(horizontalShiftClasses);
      var alreadyShifted = shiftClasses.some(function (c) {
        return _utils["default"].hasClass(_this.grid[playedPoint.y][playedPoint.x], c);
      });
      if (!alreadyShifted) {
        var possibleShifts = _utils["default"].cartesianProduct(verticalShiftClasses, horizontalShiftClasses);
        var _possibleShifts$Math$ = _slicedToArray(possibleShifts[Math.floor(Math.random() * possibleShifts.length)], 2),
          playedVerticalShift = _possibleShifts$Math$[0],
          playedHorizontalShift = _possibleShifts$Math$[1];
        [[-1, 0], [0, -1], [0, 1], [1, 0]].forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            y = _ref4[0],
            x = _ref4[1];
          if (_this.grid[playedPoint.y + y] && _this.grid[playedPoint.y + y][playedPoint.x + x]) {
            var neighboringElement = _this.grid[playedPoint.y + y][playedPoint.x + x];
            if (!_utils["default"].hasClass(neighboringElement, "empty")) {
              [[-1, 0, "v-shift-downdown", "v-shift-up", "v-shift-down"], [-1, 0, "v-shift-downdown", "v-shift-upup", "v-shift-none"], [-1, 0, "v-shift-down", "v-shift-upup", "v-shift-none"], [1, 0, "v-shift-upup", "v-shift-down", "v-shift-up"], [1, 0, "v-shift-upup", "v-shift-downdown", "v-shift-none"], [1, 0, "v-shift-up", "v-shift-downdown", "v-shift-none"], [0, -1, "h-shift-rightright", "h-shift-left", "h-shift-right"], [0, -1, "h-shift-rightright", "h-shift-leftleft", "h-shift-none"], [0, -1, "h-shift-right", "h-shift-leftleft", "h-shift-none"], [0, 1, "h-shift-leftleft", "h-shift-right", "h-shift-left"], [0, 1, "h-shift-leftleft", "h-shift-rightright", "h-shift-none"], [0, 1, "h-shift-left", "h-shift-rightright", "h-shift-none"]].forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 5),
                  requiredYOffset = _ref6[0],
                  requiredXOffset = _ref6[1],
                  requiredNeighborShift = _ref6[2],
                  conflictingPlayedShift = _ref6[3],
                  newNeighborShift = _ref6[4];
                if (y === requiredYOffset && x === requiredXOffset && _utils["default"].hasClass(neighboringElement, requiredNeighborShift) && (playedVerticalShift === conflictingPlayedShift || playedHorizontalShift === conflictingPlayedShift)) {
                  _utils["default"].removeClass(neighboringElement, requiredNeighborShift);
                  _utils["default"].addClass(neighboringElement, newNeighborShift);
                }
              });
            }
          }
        });
        _utils["default"].addClass(this.grid[playedPoint.y][playedPoint.x], playedVerticalShift);
        _utils["default"].addClass(this.grid[playedPoint.y][playedPoint.x], playedHorizontalShift);
      }
    }
    if (deadStones.length > 0 || territory.black.length > 0 || territory.white.length > 0) {
      this.renderTerritory(territory, deadStones);
    }
  },
  renderStonesPlayed: function renderStonesPlayed(intersections) {
    var _this2 = this;
    intersections.forEach(function (intersection) {
      _this2.renderIntersection(intersection);
    });
  },
  updateMarkerPoints: function updateMarkerPoints(_ref7) {
    var playedPoint = _ref7.playedPoint,
      koPoint = _ref7.koPoint;
    var renderer = this;
    if (koPoint) {
      _utils["default"].addClass(renderer.grid[koPoint.y][koPoint.x], "ko");
    }
    if (playedPoint) {
      _utils["default"].addClass(renderer.grid[playedPoint.y][playedPoint.x], "played");
    }
  },
  renderIntersection: function renderIntersection(intersection) {
    var renderer = this;
    var intersectionEl = renderer.grid[intersection.y][intersection.x];
    var classes = ["intersection"];
    if (intersection.isEmpty()) {
      classes.push("empty");
    } else {
      classes.push("occupied");
      if (intersection.isBlack()) {
        classes.push("black");
      } else if (intersection.isBlue()) {
        classes.push("blue");
      } else {
        classes.push("white");
      }
      var shiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none", "h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];
      shiftClasses.forEach(function (shiftClass) {
        if (_utils["default"].hasClass(intersectionEl, shiftClass)) {
          classes.push(shiftClass);
        }
      });
    }
    this.setIntersectionClasses(intersectionEl, intersection, classes);
  },
  renderTerritory: function renderTerritory(territory, deadStones) {
    var _this3 = this;
    _utils["default"].flatten(this.grid).forEach(function (element) {
      _utils["default"].removeClass(element, "territory-black");
      _utils["default"].removeClass(element, "territory-white");
      _utils["default"].removeClass(element, "dead");
    });
    deadStones.forEach(function (point) {
      _utils["default"].addClass(_this3.grid[point.y][point.x], "dead");
    });
    territory.black.forEach(function (territoryPoint) {
      _utils["default"].addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-black");
    });
    territory.white.forEach(function (territoryPoint) {
      _utils["default"].addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-white");
    });
  }
};
var _default = exports["default"] = Renderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfc2xpY2VkVG9BcnJheSIsImFyciIsImkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsImxlbiIsImxlbmd0aCIsImFycjIiLCJyIiwibCIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsImUiLCJ1IiwiYSIsImYiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJSZW5kZXJlciIsImJvYXJkRWxlbWVudCIsIl9yZWYiLCJob29rcyIsIm9wdGlvbnMiLCJJTlRFUlNFQ1RJT05fR0FQX1NJWkUiLCJHVVRURVJfTUFSR0lOIiwiQkFTRV9NQVJHSU4iLCJoYXNDb29yZGluYXRlcyIsImhhc0F0dHJpYnV0ZSIsIk1BUkdJTiIsImdyaWQiLCJfb3B0aW9ucyIsIl9pbml0aWFsaXplZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzbWFsbGVyU3RvbmVzIiwiZmxhdFN0b25lcyIsImhhc0NsYXNzIiwiaG9zaGlQb3NpdGlvbnNGb3IiLCJib2FyZFNpemUiLCJob3NoaUVsZW1lbnRzIiwiaG9zaGkiLCJ0b3AiLCJsZWZ0IiwiaG9zaGlPZmZzZXQiLCJob3NoaVkiLCJob3NoaVgiLCJfaG9zaGkiLCJfc2V0dXAiLCJib2FyZFN0YXRlIiwicmVuZGVyZXIiLCJCT0FSRF9MRU5HVEgiLCJpbm5lckNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRFbGVtZW50Iiwiem9vbUNvbnRhaW5lciIsImNhbmNlbFpvb21FbGVtZW50IiwiY2FuY2VsWm9vbUJhY2tkcm9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ6b29tT3V0IiwidGhyb3R0bGUiLCJ0eXBlIiwicnVubmluZyIsImZ1bmMiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJzcGVjaWZpY1JlbmRlcmVyQm9hcmQiLCJnZW5lcmF0ZUJvYXJkIiwic3R5bGUiLCJ3aWxsQ2hhbmdlIiwiY29tcHV0ZVNpemluZyIsInRvdWNobW92ZUNoYW5nZWRUb3VjaCIsInRvdWNoc3RhcnRFdmVudEhhbmRsZXIiLCJoYW5kbGVUb3VjaFN0YXJ0IiwiYmluZCIsInRvdWNobW92ZUV2ZW50SGFuZGxlciIsImhhbmRsZVRvdWNoTW92ZSIsInRvdWNoZW5kRXZlbnRIYW5kbGVyIiwiaGFuZGxlVG91Y2hFbmQiLCJoZWlnaHQiLCJ3aWR0aCIsInRyYW5zZm9ybSIsIl90b3VjaEV2ZW50RmlyZWQiLCJzY2FsZVgiLCJwYXJlbnROb2RlIiwiY2xpZW50V2lkdGgiLCJzY2FsZVkiLCJjbGllbnRIZWlnaHQiLCJzY2FsZSIsIk1hdGgiLCJtaW4iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJhZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyIsImVsZW1lbnQiLCJ5IiwieCIsImhvdmVyZWRZUG9zaXRpb24iLCJob3ZlcmVkWFBvc2l0aW9uIiwiaG92ZXJWYWx1ZSIsInJlc2V0VG91Y2hlZFBvaW50IiwicGxheWVkWVBvc2l0aW9uIiwicGxheWVkWFBvc2l0aW9uIiwiZG9jdW1lbnQiLCJib2R5IiwiaW5uZXJXaWR0aCIsImdhbWVJc092ZXIiLCJoYW5kbGVDbGljayIsInRvdWNoZWRQb2ludCIsInNob3dQb3NzaWJsZU1vdmVBdCIsInRvdWNoZXMiLCJ6b29tZWRJbiIsInhDdXJzb3IiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFgiLCJ5Q3Vyc29yIiwiY2xpZW50WSIsImRyYWdTdGFydFgiLCJkcmFnU3RhcnRZIiwidHJhbnNpdGlvbiIsImFuaW1hdGlvbkZyYW1lUmVxdWVzdElEIiwicHJvY2Vzc0RyYWdEZWx0YSIsIm1vdmVJblByb2dyZXNzIiwidHJhbnNsYXRlWSIsImxhc3RUcmFuc2xhdGVZIiwidHJhbnNsYXRlWCIsImxhc3RUcmFuc2xhdGVYIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJkZWx0YVgiLCJkZWx0YVkiLCJpbnRlcnNlY3Rpb25FbGVtZW50Iiwiem9vbUNvbnRhaW5lckhlaWdodCIsInpvb21Db250YWluZXJXaWR0aCIsInJlbmRlciIsIl90aGlzIiwiX3JlZjIiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ0ZXJyaXRvcnkiLCJkZWFkU3RvbmVzIiwicmVuZGVyU3RvbmVzUGxheWVkIiwiaW50ZXJzZWN0aW9ucyIsInBsYXllZFBvaW50IiwidXBkYXRlTWFya2VyUG9pbnRzIiwia29Qb2ludCIsInZlcnRpY2FsU2hpZnRDbGFzc2VzIiwiaG9yaXpvbnRhbFNoaWZ0Q2xhc3NlcyIsInNoaWZ0Q2xhc3NlcyIsImNvbmNhdCIsImFscmVhZHlTaGlmdGVkIiwic29tZSIsImMiLCJwb3NzaWJsZVNoaWZ0cyIsImNhcnRlc2lhblByb2R1Y3QiLCJfcG9zc2libGVTaGlmdHMkTWF0aCQiLCJmbG9vciIsInJhbmRvbSIsInBsYXllZFZlcnRpY2FsU2hpZnQiLCJwbGF5ZWRIb3Jpem9udGFsU2hpZnQiLCJmb3JFYWNoIiwiX3JlZjMiLCJfcmVmNCIsIm5laWdoYm9yaW5nRWxlbWVudCIsIl9yZWY1IiwiX3JlZjYiLCJyZXF1aXJlZFlPZmZzZXQiLCJyZXF1aXJlZFhPZmZzZXQiLCJyZXF1aXJlZE5laWdoYm9yU2hpZnQiLCJjb25mbGljdGluZ1BsYXllZFNoaWZ0IiwibmV3TmVpZ2hib3JTaGlmdCIsImJsYWNrIiwid2hpdGUiLCJyZW5kZXJUZXJyaXRvcnkiLCJfdGhpczIiLCJpbnRlcnNlY3Rpb24iLCJyZW5kZXJJbnRlcnNlY3Rpb24iLCJfcmVmNyIsImludGVyc2VjdGlvbkVsIiwiY2xhc3NlcyIsImlzRW1wdHkiLCJpc0JsYWNrIiwiaXNCbHVlIiwic2hpZnRDbGFzcyIsInNldEludGVyc2VjdGlvbkNsYXNzZXMiLCJfdGhpczMiLCJmbGF0dGVuIiwicG9pbnQiLCJ0ZXJyaXRvcnlQb2ludCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgUmVuZGVyZXIgPSBmdW5jdGlvbihib2FyZEVsZW1lbnQsIHsgaG9va3MsIG9wdGlvbnMgfSkge1xuICB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSA9IDI4O1xuICB0aGlzLkdVVFRFUl9NQVJHSU4gPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAtIDM7XG4gIHRoaXMuQkFTRV9NQVJHSU4gPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAtIDEwO1xuICB0aGlzLmhhc0Nvb3JkaW5hdGVzID0gYm9hcmRFbGVtZW50Lmhhc0F0dHJpYnV0ZShcImRhdGEtaW5jbHVkZS1jb29yZGluYXRlc1wiKTtcbiAgdGhpcy5NQVJHSU4gPSB0aGlzLmhhc0Nvb3JkaW5hdGVzID8gdGhpcy5CQVNFX01BUkdJTiArIHRoaXMuR1VUVEVSX01BUkdJTiA6IHRoaXMuQkFTRV9NQVJHSU47XG4gIHRoaXMuYm9hcmRFbGVtZW50ID0gYm9hcmRFbGVtZW50O1xuICB0aGlzLmdyaWQgPSBbXTtcbiAgdGhpcy5ob29rcyA9IGhvb2tzIHx8IHt9O1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBpZiAodGhpcy5fb3B0aW9uc1tcImZ1enp5U3RvbmVQbGFjZW1lbnRcIl0pIHtcbiAgICB1dGlscy5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWZ1enp5LXBsYWNlbWVudFwiKTtcbiAgICB1dGlscy5yZW1vdmVDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLWZsYXRcIik7XG4gICAgdXRpbHMuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1ib2FyZC1ub25mbGF0XCIpO1xuICAgIHRoaXMuc21hbGxlclN0b25lcyA9IHRydWU7XG4gIH1cblxuICB0aGlzLmZsYXRTdG9uZXMgPSB1dGlscy5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLWZsYXRcIik7XG5cbiAgaWYgKCF0aGlzLmZsYXRTdG9uZXMpIHtcbiAgICB1dGlscy5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLW5vbmZsYXRcIik7XG4gIH1cbn07XG5cblJlbmRlcmVyLmhvc2hpUG9zaXRpb25zRm9yID0gZnVuY3Rpb24oYm9hcmRTaXplKSB7XG4gIGNvbnN0IGhvc2hpRWxlbWVudHMgPSBbXTtcblxuICBpZiAoYm9hcmRTaXplIDwgNykge1xuICAgIGlmIChib2FyZFNpemUgPiAxICYmIGJvYXJkU2l6ZSAlIDIgPT09IDEpIHtcbiAgICAgIGNvbnN0IGhvc2hpID0ge307XG4gICAgICBob3NoaS50b3AgPSAoYm9hcmRTaXplIC0gMSkvMjtcbiAgICAgIGhvc2hpLmxlZnQgPSBob3NoaS50b3A7XG5cbiAgICAgIGhvc2hpRWxlbWVudHMucHVzaChob3NoaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIGhvc2hpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGhvc2hpT2Zmc2V0ID0gYm9hcmRTaXplID4gMTEgPyAzIDogMjtcblxuICAgIGZvciAobGV0IGhvc2hpWSA9IDA7IGhvc2hpWSA8IDM7IGhvc2hpWSsrKSB7XG4gICAgICBmb3IgKGxldCBob3NoaVggPSAwOyBob3NoaVggPCAzOyBob3NoaVgrKykge1xuICAgICAgICBpZiAoKGJvYXJkU2l6ZSA9PT0gNyB8fCBib2FyZFNpemUgJSAyID09PSAwKSAmJiAoaG9zaGlZID09PSAxIHx8IGhvc2hpWCA9PT0gMSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhvc2hpID0ge307XG5cbiAgICAgICAgaWYgKGhvc2hpWSA9PT0gMCkge1xuICAgICAgICAgIGhvc2hpLnRvcCA9IGhvc2hpT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvc2hpWSA9PT0gMSkge1xuICAgICAgICAgIGhvc2hpLnRvcCA9IChib2FyZFNpemUgKyAxKS8yIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3NoaVkgPT09IDIpIHtcbiAgICAgICAgICBob3NoaS50b3AgPSBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlYID09PSAwKSB7XG4gICAgICAgICAgaG9zaGkubGVmdCA9IGhvc2hpT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvc2hpWCA9PT0gMSkge1xuICAgICAgICAgIGhvc2hpLmxlZnQgPSAoYm9hcmRTaXplICsgMSkvMiAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlYID09PSAyKSB7XG4gICAgICAgICAgaG9zaGkubGVmdCA9IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvc2hpRWxlbWVudHMucHVzaChob3NoaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvc2hpRWxlbWVudHM7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUgPSB7XG4gIF9zZXR1cDogZnVuY3Rpb24oYm9hcmRTdGF0ZSkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcztcbiAgICBjb25zdCBib2FyZEVsZW1lbnQgPSB0aGlzLmJvYXJkRWxlbWVudDtcblxuICAgIHJlbmRlcmVyLkJPQVJEX0xFTkdUSCA9IDIqdGhpcy5NQVJHSU4gKyAoYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSoodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcblxuICAgIGNvbnN0IGlubmVyQ29udGFpbmVyID0gdXRpbHMuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRlbnVraS1pbm5lci1jb250YWluZXJcIiB9KTtcbiAgICByZW5kZXJlci5pbm5lckNvbnRhaW5lciA9IGlubmVyQ29udGFpbmVyO1xuICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoYm9hcmRFbGVtZW50LCBpbm5lckNvbnRhaW5lcik7XG5cbiAgICBjb25zdCB6b29tQ29udGFpbmVyID0gdXRpbHMuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRlbnVraS16b29tLWNvbnRhaW5lclwiIH0pO1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIgPSB6b29tQ29udGFpbmVyO1xuICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoaW5uZXJDb250YWluZXIsIHpvb21Db250YWluZXIpO1xuXG4gICAgcmVuZGVyZXIuY2FuY2VsWm9vbUVsZW1lbnQgPSB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY2FuY2VsLXpvb21cIiB9KTtcbiAgICBjb25zdCBjYW5jZWxab29tQmFja2Ryb3AgPSB1dGlscy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY2FuY2VsLXpvb20tYmFja2Ryb3BcIiB9KTtcbiAgICB1dGlscy5hZGRFdmVudExpc3RlbmVyKHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50LCBcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmVuZGVyZXIuem9vbU91dCgpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgdXRpbHMuYWRkRXZlbnRMaXN0ZW5lcihjYW5jZWxab29tQmFja2Ryb3AsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZW5kZXJlci56b29tT3V0KCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICB1dGlscy5hcHBlbmRFbGVtZW50KGlubmVyQ29udGFpbmVyLCByZW5kZXJlci5jYW5jZWxab29tRWxlbWVudCk7XG4gICAgdXRpbHMuYXBwZW5kRWxlbWVudChpbm5lckNvbnRhaW5lciwgY2FuY2VsWm9vbUJhY2tkcm9wKTtcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy9yZXNpemVcbiAgICBjb25zdCB0aHJvdHRsZSA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUpIHtcbiAgICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBmdW5jID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChydW5uaW5nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUpKTtcbiAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xuICAgIH07XG5cbiAgICB0aHJvdHRsZShcInJlc2l6ZVwiLCBcIm9wdGltaXplZFJlc2l6ZVwiKTtcblxuICAgIGNvbnN0IHNwZWNpZmljUmVuZGVyZXJCb2FyZCA9IHRoaXMuZ2VuZXJhdGVCb2FyZChib2FyZFN0YXRlLCB7XG4gICAgICBoYXNDb29yZGluYXRlczogdGhpcy5oYXNDb29yZGluYXRlcyxcbiAgICAgIHNtYWxsZXJTdG9uZXM6IHRoaXMuc21hbGxlclN0b25lcyxcbiAgICAgIGZsYXRTdG9uZXM6IHRoaXMuZmxhdFN0b25lc1xuICAgIH0pO1xuICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoem9vbUNvbnRhaW5lciwgc3BlY2lmaWNSZW5kZXJlckJvYXJkKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gd2UnbGwgcG90ZW50aWFsbHkgYmUgem9vbWluZyBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuXG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9wdGltaXplZFJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2ggPSBudWxsO1xuICAgIHJlbmRlcmVyLnRvdWNoc3RhcnRFdmVudEhhbmRsZXIgPSByZW5kZXJlci5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQocmVuZGVyZXIpO1xuICAgIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHJlbmRlcmVyKTtcbiAgICByZW5kZXJlci50b3VjaGVuZEV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoRW5kLmJpbmQocmVuZGVyZXIpO1xuXG4gICAgdXRpbHMuYWRkRXZlbnRMaXN0ZW5lcihyZW5kZXJlci5pbm5lckNvbnRhaW5lciwgXCJ0b3VjaHN0YXJ0XCIsIHJlbmRlcmVyLnRvdWNoc3RhcnRFdmVudEhhbmRsZXIpO1xuICAgIHV0aWxzLmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2hlbmRcIiwgcmVuZGVyZXIudG91Y2hlbmRFdmVudEhhbmRsZXIpO1xuICAgIHV0aWxzLmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2htb3ZlXCIsIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlcik7XG4gIH0sXG5cbiAgY29tcHV0ZVNpemluZzogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuICAgIGNvbnN0IGlubmVyQ29udGFpbmVyID0gdGhpcy5pbm5lckNvbnRhaW5lcjtcbiAgICBjb25zdCB6b29tQ29udGFpbmVyID0gdGhpcy56b29tQ29udGFpbmVyO1xuICAgIGNvbnN0IGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuXG4gICAgLy8gcmVzZXQgZXZlcnl0aGluZyBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFnYWluc3QgbmV3IHZhbHVlc1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgaW5uZXJDb250YWluZXIuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgIHpvb21Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBpbm5lckNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIC8vIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwiXCI7XG4gICAgYm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcblxuICAgIC8vIGRldi1mcmllbmRseSByZXNldCBvZiB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaCBkZXZpY2VcbiAgICByZW5kZXJlci5fdG91Y2hFdmVudEZpcmVkID0gbnVsbDtcblxuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVuZGVyZXIuQk9BUkRfTEVOR1RIICsgXCJweFwiO1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHJlbmRlcmVyLkJPQVJEX0xFTkdUSCArIFwicHhcIjtcblxuICAgIHpvb21Db250YWluZXIuc3R5bGUud2lkdGggPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG4gICAgem9vbUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG5cbiAgICBjb25zdCBzY2FsZVggPSBpbm5lckNvbnRhaW5lci5wYXJlbnROb2RlLmNsaWVudFdpZHRoIC8gaW5uZXJDb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgY29uc3Qgc2NhbGVZID0gaW5uZXJDb250YWluZXIucGFyZW50Tm9kZS5jbGllbnRIZWlnaHQgLyBpbm5lckNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG5cbiAgICBpZiAoc2NhbGUgPiAwKSB7XG4gICAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICAgIHV0aWxzLmFkZENsYXNzKGJvYXJkRWxlbWVudCwgXCJ0ZW51a2ktc2NhbGVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1zY2FsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FsZSA8IDEgfHwgc2NhbGUgPiAxKSB7XG4gICAgICAgIGlubmVyQ29udGFpbmVyLnN0eWxlW1widHJhbnNmb3JtLW9yaWdpblwiXSA9IFwidG9wIGxlZnRcIjtcbiAgICAgICAgaW5uZXJDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZTNkKFwiICsgc2NhbGUgKyBcIiwgXCIgKyBzY2FsZSArIFwiLCAxKVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2V0IHRoZSBvdXRlciBlbGVtZW50J3MgaGVpZ2h0IHRvIG1hdGNoLCBlbnN1cmluZyB0aGF0IHdlIGZyZWUgdXAgYW55IGxpbmdlcmluZyB3aGl0ZXNwYWNlXG4gICAgYm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gaW5uZXJDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKyBcInB4XCI7XG4gICAgYm9hcmRFbGVtZW50LnN0eWxlLmhlaWdodCA9IGlubmVyQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIFwicHhcIjtcblxuICAgIC8vIFdvcmsgYXJvdW5kIGxhY2sgb2YgcmUtcmFzdGVyIGluIENocm9tZS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93M2MvY3Nzd2ctZHJhZnRzL2lzc3Vlcy8yMzZcbiAgICAvLyBhbmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjAwNDgyIGZvciBtb3JlXG4gICAgLy8gaW5mb3JtYXRpb24uIFRoaXMgaXMgcHJldmVudGluZywgZS5nLiwgaG9yaXpvbnRhbC92ZXJ0aWNhbCBsaW5lIHdpZHRoXG4gICAgLy8gbWlzbWF0Y2hlcyBhZnRlciBzY2FsaW5nLiBCeSBhZGRpbmcgdGhpcywgbGluZXMgYXJlIHJlLXJhc3RlcmVkIGFuZCBhcmVcbiAgICAvLyBhbGwgdGhlIHNhbWUgd2lkdGgsIGFzIGlmIHRoZSB1c2VyIGhhZCBoaXQgcmVmcmVzaCBhdCB0aGUgbmV3IHZpZXdwb3J0XG4gICAgLy8gc2l6ZS5cbiAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpbGxDaGFuZ2UgPSBcIlwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIH0pO1xuICB9LFxuXG4gIGFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbihlbGVtZW50LCB5LCB4KSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgdXRpbHMuYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBob3ZlcmVkWVBvc2l0aW9uID0geTtcbiAgICAgIGNvbnN0IGhvdmVyZWRYUG9zaXRpb24gPSB4O1xuICAgICAgY29uc3QgaG92ZXJWYWx1ZSA9IHJlbmRlcmVyLmhvb2tzLmhvdmVyVmFsdWUoaG92ZXJlZFlQb3NpdGlvbiwgaG92ZXJlZFhQb3NpdGlvbik7XG5cbiAgICAgIGlmIChob3ZlclZhbHVlKSB7XG4gICAgICAgIHV0aWxzLmFkZENsYXNzKGVsZW1lbnQsIFwiaG92ZXJlZFwiKTtcbiAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZWxlbWVudCwgaG92ZXJWYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB1dGlscy5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh1dGlscy5oYXNDbGFzcyh0aGlzLCBcImhvdmVyZWRcIikpIHtcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJob3ZlcmVkXCIpO1xuICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlbGVtZW50LCBcImJsYWNrXCIpO1xuICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlbGVtZW50LCBcIndoaXRlXCIpO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZXNldFRvdWNoZWRQb2ludCgpO1xuICAgIH0pO1xuXG4gICAgdXRpbHMuYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgcGxheWVkWVBvc2l0aW9uID0geTtcbiAgICAgIGNvbnN0IHBsYXllZFhQb3NpdGlvbiA9IHg7XG5cbiAgICAgIC8vIGlmIHRoaXMgaXNuJ3QgcGFydCBvZiBhIHRvdWNoLFxuICAgICAgLy8gb3IgaXQgaXMgYW5kIHRoZSB1c2VyIGlzIHpvb21lZCBpbixcbiAgICAgIC8vIG9yIGl0J3MgZ2FtZSBvdmVyIGFuZCB3ZSdyZSBtYXJraW5nIHN0b25lcyBkZWFkLFxuICAgICAgLy8gdGhlbiBkb24ndCB1c2UgdGhlIHpvb20vZG91YmxlLXNlbGVjdCBzeXN0ZW0uXG4gICAgICBpZiAoIXJlbmRlcmVyLl90b3VjaEV2ZW50RmlyZWQgfHwgKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLyB3aW5kb3cuaW5uZXJXaWR0aCA+IDEpIHx8IHJlbmRlcmVyLmhvb2tzLmdhbWVJc092ZXIoKSkge1xuICAgICAgICByZW5kZXJlci5ob29rcy5oYW5kbGVDbGljayhwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlbmRlcmVyLnRvdWNoZWRQb2ludCkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gcmVuZGVyZXIudG91Y2hlZFBvaW50KSB7XG4gICAgICAgICAgcmVuZGVyZXIuaG9va3MuaGFuZGxlQ2xpY2socGxheWVkWVBvc2l0aW9uLCBwbGF5ZWRYUG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hTdGFydDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXM7XG4gICAgcmVuZGVyZXIuX3RvdWNoRXZlbnRGaXJlZCA9IHRydWU7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAocmVuZGVyZXIuem9vbWVkSW4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeEN1cnNvciA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gICAgY29uc3QgeUN1cnNvciA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG5cbiAgICByZW5kZXJlci5kcmFnU3RhcnRYID0geEN1cnNvcjtcbiAgICByZW5kZXJlci5kcmFnU3RhcnRZID0geUN1cnNvcjtcbiAgICByZW5kZXJlci56b29tQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICByZW5kZXJlci5hbmltYXRpb25GcmFtZVJlcXVlc3RJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyZXIucHJvY2Vzc0RyYWdEZWx0YS5iaW5kKHJlbmRlcmVyKSk7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hNb3ZlOiBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcztcblxuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IHB1bGwtdG8tcmVmcmVzaFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgIHJlbmRlcmVyLm1vdmVJblByb2dyZXNzID0gdHJ1ZTtcbiAgfSxcblxuICBoYW5kbGVUb3VjaEVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFyZW5kZXJlci56b29tZWRJbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG5cbiAgICBpZiAoIXJlbmRlcmVyLm1vdmVJblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbmRlcmVyLnRyYW5zbGF0ZVkgPSByZW5kZXJlci5sYXN0VHJhbnNsYXRlWTtcbiAgICByZW5kZXJlci50cmFuc2xhdGVYID0gcmVuZGVyZXIubGFzdFRyYW5zbGF0ZVg7XG4gICAgcmVuZGVyZXIubW92ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2ggPSBudWxsO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZW5kZXJlci5hbmltYXRpb25GcmFtZVJlcXVlc3RJRCk7XG4gIH0sXG5cbiAgcHJvY2Vzc0RyYWdEZWx0YTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgaWYgKCFyZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2gpIHtcbiAgICAgIHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJlci5wcm9jZXNzRHJhZ0RlbHRhLmJpbmQocmVuZGVyZXIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckNvbnRhaW5lciA9IHJlbmRlcmVyLmlubmVyQ29udGFpbmVyO1xuXG4gICAgY29uc3QgeEN1cnNvciA9IHJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaC5jbGllbnRYO1xuICAgIGNvbnN0IHlDdXJzb3IgPSByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2guY2xpZW50WTtcblxuICAgIGNvbnN0IGRlbHRhWCA9IHhDdXJzb3IgLSByZW5kZXJlci5kcmFnU3RhcnRYO1xuICAgIGNvbnN0IGRlbHRhWSA9IHlDdXJzb3IgLSByZW5kZXJlci5kcmFnU3RhcnRZO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVkgPSByZW5kZXJlci50cmFuc2xhdGVZICsgZGVsdGFZLzIuNTtcbiAgICBsZXQgdHJhbnNsYXRlWCA9IHJlbmRlcmVyLnRyYW5zbGF0ZVggKyBkZWx0YVgvMi41O1xuXG4gICAgaWYgKHRyYW5zbGF0ZVkgPiAwLjUqaW5uZXJDb250YWluZXIuY2xpZW50SGVpZ2h0IC0gcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVZID0gMC41KmlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCAtIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWCA+IDAuNSppbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCAtIHJlbmRlcmVyLk1BUkdJTikge1xuICAgICAgdHJhbnNsYXRlWCA9IDAuNSppbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCAtIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWSA8IC0wLjUqaW5uZXJDb250YWluZXIuY2xpZW50SGVpZ2h0ICsgcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVZID0gLTAuNSppbm5lckNvbnRhaW5lci5jbGllbnRIZWlnaHQgKyByZW5kZXJlci5NQVJHSU47XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zbGF0ZVggPCAtMC41KmlubmVyQ29udGFpbmVyLmNsaWVudFdpZHRoICsgcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVYID0gLTAuNSppbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCArIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICByZW5kZXJlci56b29tQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyAyLjUqdHJhbnNsYXRlWCArIFwicHgsIFwiICsgMi41KnRyYW5zbGF0ZVkgKyBcInB4LCAwKSBzY2FsZTNkKDIuNSwgMi41LCAxKVwiO1xuXG4gICAgcmVuZGVyZXIubGFzdFRyYW5zbGF0ZVggPSB0cmFuc2xhdGVYO1xuICAgIHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVZID0gdHJhbnNsYXRlWTtcblxuICAgIHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJlci5wcm9jZXNzRHJhZ0RlbHRhLmJpbmQocmVuZGVyZXIpKTtcbiAgfSxcblxuICBzaG93UG9zc2libGVNb3ZlQXQ6IGZ1bmN0aW9uKGludGVyc2VjdGlvbkVsZW1lbnQsIHksIHgpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXM7XG4gICAgY29uc3QgYm9hcmRFbGVtZW50ID0gdGhpcy5ib2FyZEVsZW1lbnQ7XG4gICAgY29uc3Qgem9vbUNvbnRhaW5lciA9IHRoaXMuem9vbUNvbnRhaW5lcjtcblxuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgPSByZW5kZXJlci56b29tQ29udGFpbmVySGVpZ2h0IHx8IHpvb21Db250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXJXaWR0aCA9IHJlbmRlcmVyLnpvb21Db250YWluZXJXaWR0aCB8fCB6b29tQ29udGFpbmVyLmNsaWVudFdpZHRoO1xuXG4gICAgcmVuZGVyZXIudG91Y2hlZFBvaW50ID0gaW50ZXJzZWN0aW9uRWxlbWVudDtcblxuICAgIGlmICh1dGlscy5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKSkge1xuICAgICAgY29uc3QgdG9wID0geSAqICh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpO1xuICAgICAgY29uc3QgbGVmdCA9IHggKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcblxuICAgICAgY29uc3QgdHJhbnNsYXRlWSA9IDAuNSAqIHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgLSB0b3AgLSByZW5kZXJlci5NQVJHSU47XG4gICAgICBjb25zdCB0cmFuc2xhdGVYID0gMC41ICogcmVuZGVyZXIuem9vbUNvbnRhaW5lcldpZHRoIC0gbGVmdCAtIHJlbmRlcmVyLk1BUkdJTjtcblxuICAgICAgem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKFwiICsgMi41KnRyYW5zbGF0ZVggKyBcInB4LCBcIiArIDIuNSp0cmFuc2xhdGVZICsgXCJweCwgMCkgc2NhbGUzZCgyLjUsIDIuNSwgMSlcIjtcbiAgICAgIHJlbmRlcmVyLnRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVZO1xuICAgICAgcmVuZGVyZXIudHJhbnNsYXRlWCA9IHRyYW5zbGF0ZVg7XG5cbiAgICAgIHV0aWxzLmFkZENsYXNzKHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50LCBcInZpc2libGVcIik7XG4gICAgICByZW5kZXJlci56b29tZWRJbiA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlc2V0VG91Y2hlZFBvaW50OiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXM7XG5cbiAgICByZW5kZXJlci50b3VjaGVkUG9pbnQgPSBudWxsO1xuICB9LFxuXG4gIHpvb21PdXQ6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcztcblxuICAgIHRoaXMucmVzZXRUb3VjaGVkUG9pbnQoKTtcbiAgICByZW5kZXJlci56b29tQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICByZW5kZXJlci5kcmFnU3RhcnRYID0gbnVsbDtcbiAgICByZW5kZXJlci5kcmFnU3RhcnRZID0gbnVsbDtcbiAgICByZW5kZXJlci50cmFuc2xhdGVZID0gbnVsbDtcbiAgICByZW5kZXJlci50cmFuc2xhdGVYID0gbnVsbDtcbiAgICByZW5kZXJlci5sYXN0VHJhbnNsYXRlWCA9IG51bGw7XG4gICAgcmVuZGVyZXIubGFzdFRyYW5zbGF0ZVkgPSBudWxsO1xuXG4gICAgdXRpbHMucmVtb3ZlQ2xhc3MocmVuZGVyZXIuY2FuY2VsWm9vbUVsZW1lbnQsIFwidmlzaWJsZVwiKTtcbiAgICByZW5kZXJlci56b29tZWRJbiA9IGZhbHNlO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oYm9hcmRTdGF0ZSwgeyB0ZXJyaXRvcnksIGRlYWRTdG9uZXMgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fc2V0dXAoYm9hcmRTdGF0ZSk7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFRvdWNoZWRQb2ludCgpO1xuXG4gICAgdGhpcy5yZW5kZXJTdG9uZXNQbGF5ZWQoYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zKTtcblxuICAgIGNvbnN0IHBsYXllZFBvaW50ID0gYm9hcmRTdGF0ZS5wbGF5ZWRQb2ludDtcblxuICAgIHRoaXMudXBkYXRlTWFya2VyUG9pbnRzKHsgcGxheWVkUG9pbnQ6IHBsYXllZFBvaW50LCBrb1BvaW50OiBib2FyZFN0YXRlLmtvUG9pbnQgfSk7XG5cbiAgICBpZiAodGhpcy5fb3B0aW9uc1tcImZ1enp5U3RvbmVQbGFjZW1lbnRcIl0gJiYgcGxheWVkUG9pbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRpY2FsU2hpZnRDbGFzc2VzID0gW1xuICAgICAgICBcInYtc2hpZnQtdXBcIixcbiAgICAgICAgXCJ2LXNoaWZ0LXVwdXBcIixcbiAgICAgICAgXCJ2LXNoaWZ0LWRvd25cIixcbiAgICAgICAgXCJ2LXNoaWZ0LWRvd25kb3duXCIsXG4gICAgICAgIFwidi1zaGlmdC1ub25lXCJcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGhvcml6b250YWxTaGlmdENsYXNzZXMgPSBbXG4gICAgICAgIFwiaC1zaGlmdC1sZWZ0XCIsXG4gICAgICAgIFwiaC1zaGlmdC1sZWZ0bGVmdFwiLFxuICAgICAgICBcImgtc2hpZnQtcmlnaHRcIixcbiAgICAgICAgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIixcbiAgICAgICAgXCJoLXNoaWZ0LW5vbmVcIlxuICAgICAgXTtcblxuICAgICAgY29uc3Qgc2hpZnRDbGFzc2VzID0gdmVydGljYWxTaGlmdENsYXNzZXMuY29uY2F0KGhvcml6b250YWxTaGlmdENsYXNzZXMpO1xuXG4gICAgICBjb25zdCBhbHJlYWR5U2hpZnRlZCA9IHNoaWZ0Q2xhc3Nlcy5zb21lKGMgPT4gdXRpbHMuaGFzQ2xhc3ModGhpcy5ncmlkW3BsYXllZFBvaW50LnldW3BsYXllZFBvaW50LnhdLCBjKSk7XG5cbiAgICAgIGlmICghYWxyZWFkeVNoaWZ0ZWQpIHtcbiAgICAgICAgY29uc3QgcG9zc2libGVTaGlmdHMgPSB1dGlscy5jYXJ0ZXNpYW5Qcm9kdWN0KHZlcnRpY2FsU2hpZnRDbGFzc2VzLCBob3Jpem9udGFsU2hpZnRDbGFzc2VzKTtcbiAgICAgICAgY29uc3QgW3BsYXllZFZlcnRpY2FsU2hpZnQsIHBsYXllZEhvcml6b250YWxTaGlmdF0gPSBwb3NzaWJsZVNoaWZ0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZVNoaWZ0cy5sZW5ndGgpXTtcblxuICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgWy0xLCAwXSxcbiAgICAgICAgICBbMCwgLTFdLCAgICAgICAgICBbMCwgMV0sXG4gICAgICAgICAgICAgICAgICAgIFsxLCAwXVxuICAgICAgICBdLmZvckVhY2goKFt5LCB4XSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRbcGxheWVkUG9pbnQueSArIHldICYmIHRoaXMuZ3JpZFtwbGF5ZWRQb2ludC55ICsgeV1bcGxheWVkUG9pbnQueCArIHhdKSB7XG4gICAgICAgICAgICBjb25zdCBuZWlnaGJvcmluZ0VsZW1lbnQgPSB0aGlzLmdyaWRbcGxheWVkUG9pbnQueSArIHldW3BsYXllZFBvaW50LnggKyB4XTtcblxuICAgICAgICAgICAgaWYgKCF1dGlscy5oYXNDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIFwiZW1wdHlcIikpIHtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFstMSwgMCwgXCJ2LXNoaWZ0LWRvd25kb3duXCIsIFwidi1zaGlmdC11cFwiLCBcInYtc2hpZnQtZG93blwiXSxcbiAgICAgICAgICAgICAgICBbLTEsIDAsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtdXB1cFwiLCBcInYtc2hpZnQtbm9uZVwiXSxcbiAgICAgICAgICAgICAgICBbLTEsIDAsIFwidi1zaGlmdC1kb3duXCIsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1ub25lXCJdLFxuICAgICAgICAgICAgICAgIFsxLCAwLCBcInYtc2hpZnQtdXB1cFwiLCBcInYtc2hpZnQtZG93blwiLCBcInYtc2hpZnQtdXBcIl0sXG4gICAgICAgICAgICAgICAgWzEsIDAsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiXSxcbiAgICAgICAgICAgICAgICBbMSwgMCwgXCJ2LXNoaWZ0LXVwXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiXSxcblxuICAgICAgICAgICAgICAgIFswLCAtMSwgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIiwgXCJoLXNoaWZ0LWxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0XCJdLFxuICAgICAgICAgICAgICAgIFswLCAtMSwgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIiwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1ub25lXCJdLFxuICAgICAgICAgICAgICAgIFswLCAtMSwgXCJoLXNoaWZ0LXJpZ2h0XCIsIFwiaC1zaGlmdC1sZWZ0bGVmdFwiLCBcImgtc2hpZnQtbm9uZVwiXSxcbiAgICAgICAgICAgICAgICBbMCwgMSwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodFwiLCBcImgtc2hpZnQtbGVmdFwiXSxcbiAgICAgICAgICAgICAgICBbMCwgMSwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1ub25lXCJdLFxuICAgICAgICAgICAgICAgIFswLCAxLCBcImgtc2hpZnQtbGVmdFwiLCBcImgtc2hpZnQtcmlnaHRyaWdodFwiLCBcImgtc2hpZnQtbm9uZVwiXVxuICAgICAgICAgICAgICBdLmZvckVhY2goKFtyZXF1aXJlZFlPZmZzZXQsIHJlcXVpcmVkWE9mZnNldCwgcmVxdWlyZWROZWlnaGJvclNoaWZ0LCBjb25mbGljdGluZ1BsYXllZFNoaWZ0LCBuZXdOZWlnaGJvclNoaWZ0XSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh5ID09PSByZXF1aXJlZFlPZmZzZXQgJiYgeCA9PT0gcmVxdWlyZWRYT2Zmc2V0ICYmIHV0aWxzLmhhc0NsYXNzKG5laWdoYm9yaW5nRWxlbWVudCwgcmVxdWlyZWROZWlnaGJvclNoaWZ0KSAmJiAocGxheWVkVmVydGljYWxTaGlmdCA9PT0gY29uZmxpY3RpbmdQbGF5ZWRTaGlmdCB8fCBwbGF5ZWRIb3Jpem9udGFsU2hpZnQgPT09IGNvbmZsaWN0aW5nUGxheWVkU2hpZnQpKSB7XG4gICAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIHJlcXVpcmVkTmVpZ2hib3JTaGlmdCk7XG4gICAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIG5ld05laWdoYm9yU2hpZnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5hZGRDbGFzcyh0aGlzLmdyaWRbcGxheWVkUG9pbnQueV1bcGxheWVkUG9pbnQueF0sIHBsYXllZFZlcnRpY2FsU2hpZnQpO1xuICAgICAgICB1dGlscy5hZGRDbGFzcyh0aGlzLmdyaWRbcGxheWVkUG9pbnQueV1bcGxheWVkUG9pbnQueF0sIHBsYXllZEhvcml6b250YWxTaGlmdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlYWRTdG9uZXMubGVuZ3RoID4gMCB8fCB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoID4gMCB8fCB0ZXJyaXRvcnkud2hpdGUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZW5kZXJUZXJyaXRvcnkodGVycml0b3J5LCBkZWFkU3RvbmVzKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyU3RvbmVzUGxheWVkOiBmdW5jdGlvbihpbnRlcnNlY3Rpb25zKSB7XG4gICAgaW50ZXJzZWN0aW9ucy5mb3JFYWNoKGludGVyc2VjdGlvbiA9PiB7XG4gICAgICB0aGlzLnJlbmRlckludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24pO1xuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZU1hcmtlclBvaW50czogZnVuY3Rpb24oeyBwbGF5ZWRQb2ludCwga29Qb2ludCB9KSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgaWYgKGtvUG9pbnQpIHtcbiAgICAgIHV0aWxzLmFkZENsYXNzKHJlbmRlcmVyLmdyaWRba29Qb2ludC55XVtrb1BvaW50LnhdLCBcImtvXCIpO1xuICAgIH1cblxuICAgIGlmIChwbGF5ZWRQb2ludCkge1xuICAgICAgdXRpbHMuYWRkQ2xhc3MocmVuZGVyZXIuZ3JpZFtwbGF5ZWRQb2ludC55XVtwbGF5ZWRQb2ludC54XSwgXCJwbGF5ZWRcIik7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlckludGVyc2VjdGlvbjogZnVuY3Rpb24oaW50ZXJzZWN0aW9uKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uRWwgPSByZW5kZXJlci5ncmlkW2ludGVyc2VjdGlvbi55XVtpbnRlcnNlY3Rpb24ueF07XG5cbiAgICBsZXQgY2xhc3NlcyA9IFtcImludGVyc2VjdGlvblwiXTtcblxuICAgIGlmIChpbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goXCJlbXB0eVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwib2NjdXBpZWRcIik7XG5cbiAgICAgIGlmIChpbnRlcnNlY3Rpb24uaXNCbGFjaygpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcImJsYWNrXCIpO1xuICAgICAgfSBlbHNlIGlmIChpbnRlcnNlY3Rpb24uaXNCbHVlKCkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiYmx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcIndoaXRlXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaGlmdENsYXNzZXMgPSBbXG4gICAgICAgIFwidi1zaGlmdC11cFwiLFxuICAgICAgICBcInYtc2hpZnQtdXB1cFwiLFxuICAgICAgICBcInYtc2hpZnQtZG93blwiLFxuICAgICAgICBcInYtc2hpZnQtZG93bmRvd25cIixcbiAgICAgICAgXCJ2LXNoaWZ0LW5vbmVcIixcbiAgICAgICAgXCJoLXNoaWZ0LWxlZnRcIixcbiAgICAgICAgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsXG4gICAgICAgIFwiaC1zaGlmdC1yaWdodFwiLFxuICAgICAgICBcImgtc2hpZnQtcmlnaHRyaWdodFwiLFxuICAgICAgICBcImgtc2hpZnQtbm9uZVwiXG4gICAgICBdO1xuXG4gICAgICBzaGlmdENsYXNzZXMuZm9yRWFjaChzaGlmdENsYXNzID0+IHtcbiAgICAgICAgaWYgKHV0aWxzLmhhc0NsYXNzKGludGVyc2VjdGlvbkVsLCBzaGlmdENsYXNzKSkge1xuICAgICAgICAgIGNsYXNzZXMucHVzaChzaGlmdENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpO1xuICB9LFxuXG4gIHJlbmRlclRlcnJpdG9yeTogZnVuY3Rpb24odGVycml0b3J5LCBkZWFkU3RvbmVzKSB7XG4gICAgdXRpbHMuZmxhdHRlbih0aGlzLmdyaWQpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICB1dGlscy5yZW1vdmVDbGFzcyhlbGVtZW50LCBcInRlcnJpdG9yeS1ibGFja1wiKTtcbiAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIFwidGVycml0b3J5LXdoaXRlXCIpO1xuICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJkZWFkXCIpO1xuICAgIH0pO1xuXG4gICAgZGVhZFN0b25lcy5mb3JFYWNoKHBvaW50ID0+IHtcbiAgICAgIHV0aWxzLmFkZENsYXNzKHRoaXMuZ3JpZFtwb2ludC55XVtwb2ludC54XSwgXCJkZWFkXCIpO1xuICAgIH0pO1xuXG4gICAgdGVycml0b3J5LmJsYWNrLmZvckVhY2godGVycml0b3J5UG9pbnQgPT4ge1xuICAgICAgdXRpbHMuYWRkQ2xhc3ModGhpcy5ncmlkW3RlcnJpdG9yeVBvaW50LnldW3RlcnJpdG9yeVBvaW50LnhdLCBcInRlcnJpdG9yeS1ibGFja1wiKTtcbiAgICB9KTtcblxuICAgIHRlcnJpdG9yeS53aGl0ZS5mb3JFYWNoKHRlcnJpdG9yeVBvaW50ID0+IHtcbiAgICAgIHV0aWxzLmFkZENsYXNzKHRoaXMuZ3JpZFt0ZXJyaXRvcnlQb2ludC55XVt0ZXJyaXRvcnlQb2ludC54XSwgXCJ0ZXJyaXRvcnktd2hpdGVcIik7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlcmVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxNQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBNEIsU0FBQUQsdUJBQUFFLEdBQUE7RUFBQSxPQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFB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
},{"./utils":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var VALID_KO_OPTIONS = ["simple", "positional-superko", "situational-superko", "natural-situational-superko"];
var Ruleset = function Ruleset(_ref) {
  var koRule = _ref.koRule;
  this.koRule = koRule;
  if (VALID_KO_OPTIONS.indexOf(this.koRule) < 0) {
    throw new Error("Unknown ko rule: " + koRule);
  }
  Object.freeze(this);
};
Ruleset.prototype = {
  isIllegal: function isIllegal(y, x, game) {
    var boardState = game.currentState();
    var intersection = boardState.intersectionAt(y, x);
    var result = !intersection.isEmpty() || this._wouldBeSuicide(y, x, boardState) || this._isKoViolation(y, x, boardState, game._moves);
    return result;
  },
  _isKoViolation: function _isKoViolation(y, x, boardState, existingStates) {
    var isKoViolation = false;
    if (this.koRule === "simple") {
      var simpleKoPoint = boardState._simpleKoPoint();
      isKoViolation = Boolean(simpleKoPoint) && y === simpleKoPoint.y && x === simpleKoPoint.x;
    } else {
      var newState = boardState.playAt(y, x, boardState.nextColor());
      var hasDuplicatePosition = function hasDuplicatePosition(condition) {
        return existingStates.length > 0 && existingStates.some(function (existingState) {
          return condition(existingState) && existingState.positionSameAs(newState);
        });
      };
      if (this.koRule === "positional-superko") {
        isKoViolation = hasDuplicatePosition(function () {
          return true;
        });
      } else if (this.koRule === "situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return state.color === newState.color;
        });
      } else if (this.koRule === "natural-situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return !state.pass && state.color === newState.color;
        });
      } else {
        throw new Error("Unimplemented ko rule ".concat(this.koRule));
      }
    }
    return isKoViolation;
  },
  _wouldBeSuicide: function _wouldBeSuicide(y, x, boardState) {
    var color = boardState.nextColor();
    var intersection = boardState.intersectionAt(y, x);
    var surroundedEmptyPoint = intersection.isEmpty() && boardState.neighborsFor(intersection.y, intersection.x).filter(function (neighbor) {
      return neighbor.isEmpty();
    }).length === 0;
    if (!surroundedEmptyPoint) {
      return false;
    }
    var someFriendlyNotInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var friendly = neighbor.isOccupiedWith(color);
      return friendly && !inAtari;
    });
    if (someFriendlyNotInAtari) {
      return false;
    }
    var someEnemyInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var enemy = !neighbor.isOccupiedWith(color);
      return enemy && inAtari;
    });
    if (someEnemyInAtari) {
      return false;
    }
    return true;
  }
};
var _default = exports["default"] = Ruleset;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWQUxJRF9LT19PUFRJT05TIiwiUnVsZXNldCIsIl9yZWYiLCJrb1J1bGUiLCJpbmRleE9mIiwiRXJyb3IiLCJPYmplY3QiLCJmcmVlemUiLCJwcm90b3R5cGUiLCJpc0lsbGVnYWwiLCJ5IiwieCIsImdhbWUiLCJib2FyZFN0YXRlIiwiY3VycmVudFN0YXRlIiwiaW50ZXJzZWN0aW9uIiwiaW50ZXJzZWN0aW9uQXQiLCJyZXN1bHQiLCJpc0VtcHR5IiwiX3dvdWxkQmVTdWljaWRlIiwiX2lzS29WaW9sYXRpb24iLCJfbW92ZXMiLCJleGlzdGluZ1N0YXRlcyIsImlzS29WaW9sYXRpb24iLCJzaW1wbGVLb1BvaW50IiwiX3NpbXBsZUtvUG9pbnQiLCJCb29sZWFuIiwibmV3U3RhdGUiLCJwbGF5QXQiLCJuZXh0Q29sb3IiLCJoYXNEdXBsaWNhdGVQb3NpdGlvbiIsImNvbmRpdGlvbiIsImxlbmd0aCIsInNvbWUiLCJleGlzdGluZ1N0YXRlIiwicG9zaXRpb25TYW1lQXMiLCJzdGF0ZSIsImNvbG9yIiwicGFzcyIsImNvbmNhdCIsInN1cnJvdW5kZWRFbXB0eVBvaW50IiwibmVpZ2hib3JzRm9yIiwiZmlsdGVyIiwibmVpZ2hib3IiLCJzb21lRnJpZW5kbHlOb3RJbkF0YXJpIiwiaW5BdGFyaSIsImZyaWVuZGx5IiwiaXNPY2N1cGllZFdpdGgiLCJzb21lRW5lbXlJbkF0YXJpIiwiZW5lbXkiLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvcnVsZXNldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBWQUxJRF9LT19PUFRJT05TID0gW1xuICBcInNpbXBsZVwiLFxuICBcInBvc2l0aW9uYWwtc3VwZXJrb1wiLFxuICBcInNpdHVhdGlvbmFsLXN1cGVya29cIixcbiAgXCJuYXR1cmFsLXNpdHVhdGlvbmFsLXN1cGVya29cIlxuXTtcblxuY29uc3QgUnVsZXNldCA9IGZ1bmN0aW9uKHsga29SdWxlIH0pIHtcbiAgdGhpcy5rb1J1bGUgPSBrb1J1bGU7XG5cbiAgaWYgKFZBTElEX0tPX09QVElPTlMuaW5kZXhPZih0aGlzLmtvUnVsZSkgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBrbyBydWxlOiBcIiArIGtvUnVsZSk7XG4gIH1cblxuICBPYmplY3QuZnJlZXplKHRoaXMpO1xufTtcblxuUnVsZXNldC5wcm90b3R5cGUgPSB7XG4gIGlzSWxsZWdhbDogZnVuY3Rpb24oeSwgeCwgZ2FtZSkge1xuICAgIGNvbnN0IGJvYXJkU3RhdGUgPSBnYW1lLmN1cnJlbnRTdGF0ZSgpO1xuICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSAhaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSB8fFxuICAgICAgdGhpcy5fd291bGRCZVN1aWNpZGUoeSwgeCwgYm9hcmRTdGF0ZSkgfHxcbiAgICAgIHRoaXMuX2lzS29WaW9sYXRpb24oeSwgeCwgYm9hcmRTdGF0ZSwgZ2FtZS5fbW92ZXMpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBfaXNLb1Zpb2xhdGlvbjogZnVuY3Rpb24oeSwgeCwgYm9hcmRTdGF0ZSwgZXhpc3RpbmdTdGF0ZXMpIHtcbiAgICBsZXQgaXNLb1Zpb2xhdGlvbiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMua29SdWxlID09PSBcInNpbXBsZVwiKSB7XG4gICAgICBjb25zdCBzaW1wbGVLb1BvaW50ID0gYm9hcmRTdGF0ZS5fc2ltcGxlS29Qb2ludCgpO1xuICAgICAgaXNLb1Zpb2xhdGlvbiA9IEJvb2xlYW4oc2ltcGxlS29Qb2ludCkgJiYgeSA9PT0gc2ltcGxlS29Qb2ludC55ICYmIHggPT09IHNpbXBsZUtvUG9pbnQueDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSBib2FyZFN0YXRlLnBsYXlBdCh5LCB4LCBib2FyZFN0YXRlLm5leHRDb2xvcigpKTtcblxuICAgICAgY29uc3QgaGFzRHVwbGljYXRlUG9zaXRpb24gPSAoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1N0YXRlcy5sZW5ndGggPiAwICYmIGV4aXN0aW5nU3RhdGVzLnNvbWUoZXhpc3RpbmdTdGF0ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbmRpdGlvbihleGlzdGluZ1N0YXRlKSAmJiBleGlzdGluZ1N0YXRlLnBvc2l0aW9uU2FtZUFzKG5ld1N0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5rb1J1bGUgPT09IFwicG9zaXRpb25hbC1zdXBlcmtvXCIpIHtcbiAgICAgICAgaXNLb1Zpb2xhdGlvbiA9IGhhc0R1cGxpY2F0ZVBvc2l0aW9uKCgpID0+IHRydWUpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJzaXR1YXRpb25hbC1zdXBlcmtvXCIpIHtcbiAgICAgICAgaXNLb1Zpb2xhdGlvbiA9IGhhc0R1cGxpY2F0ZVBvc2l0aW9uKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5jb2xvciA9PT0gbmV3U3RhdGUuY29sb3I7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJuYXR1cmFsLXNpdHVhdGlvbmFsLXN1cGVya29cIikge1xuICAgICAgICBpc0tvVmlvbGF0aW9uID0gaGFzRHVwbGljYXRlUG9zaXRpb24oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFzdGF0ZS5wYXNzICYmIHN0YXRlLmNvbG9yID09PSBuZXdTdGF0ZS5jb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaW1wbGVtZW50ZWQga28gcnVsZSAke3RoaXMua29SdWxlfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc0tvVmlvbGF0aW9uO1xuICB9LFxuXG4gIF93b3VsZEJlU3VpY2lkZTogZnVuY3Rpb24oeSwgeCwgYm9hcmRTdGF0ZSkge1xuICAgIGNvbnN0IGNvbG9yID0gYm9hcmRTdGF0ZS5uZXh0Q29sb3IoKTtcbiAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBib2FyZFN0YXRlLmludGVyc2VjdGlvbkF0KHksIHgpO1xuICAgIGNvbnN0IHN1cnJvdW5kZWRFbXB0eVBvaW50ID0gaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSAmJiBib2FyZFN0YXRlLm5laWdoYm9yc0ZvcihpbnRlcnNlY3Rpb24ueSwgaW50ZXJzZWN0aW9uLngpLmZpbHRlcihuZWlnaGJvciA9PiBuZWlnaGJvci5pc0VtcHR5KCkpLmxlbmd0aCA9PT0gMDtcblxuICAgIGlmICghc3Vycm91bmRlZEVtcHR5UG9pbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzb21lRnJpZW5kbHlOb3RJbkF0YXJpID0gYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5zb21lKG5laWdoYm9yID0+IHtcbiAgICAgIGNvbnN0IGluQXRhcmkgPSBib2FyZFN0YXRlLmluQXRhcmkobmVpZ2hib3IueSwgbmVpZ2hib3IueCk7XG4gICAgICBjb25zdCBmcmllbmRseSA9IG5laWdoYm9yLmlzT2NjdXBpZWRXaXRoKGNvbG9yKTtcblxuICAgICAgcmV0dXJuIGZyaWVuZGx5ICYmICFpbkF0YXJpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNvbWVGcmllbmRseU5vdEluQXRhcmkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzb21lRW5lbXlJbkF0YXJpID0gYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5zb21lKG5laWdoYm9yID0+IHtcbiAgICAgIGNvbnN0IGluQXRhcmkgPSBib2FyZFN0YXRlLmluQXRhcmkobmVpZ2hib3IueSwgbmVpZ2hib3IueCk7XG4gICAgICBjb25zdCBlbmVteSA9ICFuZWlnaGJvci5pc09jY3VwaWVkV2l0aChjb2xvcik7XG5cbiAgICAgIHJldHVybiBlbmVteSAmJiBpbkF0YXJpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNvbWVFbmVteUluQXRhcmkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUnVsZXNldDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsZ0JBQWdCLEdBQUcsQ0FDdkIsUUFBUSxFQUNSLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsNkJBQTZCLENBQzlCO0FBRUQsSUFBTUMsT0FBTyxHQUFHLFNBQVZBLE9BQU9BLENBQUFDLElBQUEsRUFBd0I7RUFBQSxJQUFWQyxNQUFNLEdBQUFELElBQUEsQ0FBTkMsTUFBTTtFQUMvQixJQUFJLENBQUNBLE1BQU0sR0FBR0EsTUFBTTtFQUVwQixJQUFJSCxnQkFBZ0IsQ0FBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQzdDLE1BQU0sSUFBSUUsS0FBSyxDQUFDLG1CQUFtQixHQUFHRixNQUFNLENBQUM7RUFDL0M7RUFFQUcsTUFBTSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFFRE4sT0FBTyxDQUFDTyxTQUFTLEdBQUc7RUFDbEJDLFNBQVMsRUFBRSxTQUFBQSxVQUFTQyxDQUFDLEVBQUVDLENBQUMsRUFBRUMsSUFBSSxFQUFFO0lBQzlCLElBQU1DLFVBQVUsR0FBR0QsSUFBSSxDQUFDRSxZQUFZLENBQUMsQ0FBQztJQUN0QyxJQUFNQyxZQUFZLEdBQUdGLFVBQVUsQ0FBQ0csY0FBYyxDQUFDTixDQUFDLEVBQUVDLENBQUMsQ0FBQztJQUVwRCxJQUFNTSxNQUFNLEdBQUcsQ0FBQ0YsWUFBWSxDQUFDRyxPQUFPLENBQUMsQ0FBQyxJQUNwQyxJQUFJLENBQUNDLGVBQWUsQ0FBQ1QsQ0FBQyxFQUFFQyxDQUFDLEVBQUVFLFVBQVUs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
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
var _intersection = _interopRequireDefault(require("./intersection"));
var _region = _interopRequireDefault(require("./region"));
var _eyePoint = _interopRequireDefault(require("./eye-point"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var boardStateWithoutDeadPoints = function boardStateWithoutDeadPoints(game) {
  return game.currentState()._withoutIntersectionsMatching(function (i) {
    return game._isDeadAt(i.y, i.x);
  });
};
var boardStateWithoutNeutralPoints = function boardStateWithoutNeutralPoints(boardState) {
  var regions = _region["default"].allFor(boardState);
  var neutralRegions = regions.filter(function (r) {
    return r.isNeutral();
  });
  if (regions.length === 0 || neutralRegions.length === 0) {
    return boardState;
  }
  var replacements = {};
  neutralRegions.forEach(function (r) {
    var startingX = null;
    var startingY = null;
    r.intersections.forEach(function (intersection) {
      startingX = startingX || intersection.x;
      startingX = startingX || intersection.y;
      var manhattanDistance = Math.abs(intersection.y - startingY) + Math.abs(intersection.x - startingX);
      var replacementColor = ["black", "white"][manhattanDistance % 2];
      var replacement = new _intersection["default"](intersection.y, intersection.x, replacementColor);
      replacements[intersection.y] = replacements[intersection.y] || [];
      replacements[intersection.y][intersection.x] = replacement;
    });
  });
  var newPoints = boardState.intersections.map(function (i) {
    if (replacements[i.y] && replacements[i.y][i.x]) {
      return replacements[i.y][i.x];
    } else {
      return i;
    }
  });
  return boardState._withNewPoints(newPoints);
};
var boardStateWithClearFalseEyesFilled = function boardStateWithClearFalseEyesFilled(boardState) {
  var territoryRegions = _region["default"].allFor(boardState).filter(function (r) {
    return r.isTerritory();
  });
  var falseEyePoints = _utils["default"].flatMap(territoryRegions, function (r) {
    return r.intersections;
  }).filter(function (i) {
    return new _eyePoint["default"](boardState, i).isFalse();
  });
  var pointsNeighboringAtari = falseEyePoints.filter(function (i) {
    return boardState.neighborsFor(i.y, i.x).some(function (n) {
      return boardState.inAtari(n.y, n.x);
    });
  });
  var neutralAtariUpdatedState = boardState;
  var _loop = function _loop() {
    var newPoints = neutralAtariUpdatedState.intersections.map(function (i) {
      if (pointsNeighboringAtari.indexOf(i) > -1) {
        return new _intersection["default"](i.y, i.x, new _eyePoint["default"](neutralAtariUpdatedState, i).filledColor());
      } else {
        return i;
      }
    });
    neutralAtariUpdatedState = neutralAtariUpdatedState._withNewPoints(newPoints);
    var boardState = boardStateWithoutNeutralPoints(neutralAtariUpdatedState);
    var territoryRegions = _region["default"].allFor(boardState).filter(function (r) {
      return r.isTerritory();
    });
    var falseEyePoints = _utils["default"].flatMap(territoryRegions, function (r) {
      return r.intersections;
    }).filter(function (i) {
      return new _eyePoint["default"](boardState, i).isFalse();
    });
    pointsNeighboringAtari = falseEyePoints.filter(function (i) {
      return neutralAtariUpdatedState.neighborsFor(i.y, i.x).some(function (n) {
        return neutralAtariUpdatedState.inAtari(n.y, n.x);
      });
    });
  };
  while (pointsNeighboringAtari.length > 0) {
    _loop();
  }
  return neutralAtariUpdatedState;
};
var TerritoryScoring = Object.freeze({
  score: function score(game) {
    var blackDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isBlack();
    });
    var whiteDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isWhite();
    });
    var territory = game.territory();
    var boardState = game.currentState();
    return {
      black: territory.black.length + boardState.whiteStonesCaptured + whiteDeadAsCaptures.length,
      white: territory.white.length + boardState.blackStonesCaptured + blackDeadAsCaptures.length
    };
  },
  territory: function territory(game) {
    var stateWithoutDeadPoints = boardStateWithoutDeadPoints(game);
    var stateWithoutNeutrals = boardStateWithoutNeutralPoints(stateWithoutDeadPoints);
    var stateWithClearFalseEyesFilled = boardStateWithClearFalseEyesFilled(stateWithoutNeutrals);
    var territoryRegions = _region["default"].allFor(stateWithClearFalseEyesFilled).filter(function (r) {
      return r.isTerritory();
    });
    var territoryRegionsWithoutSeki = territoryRegions.filter(function (r) {
      var merged = _region["default"].merge(territoryRegions, r);
      var eyeCounts = merged.map(function (m) {
        return Math.ceil(m.numberOfEyes());
      });
      return eyeCounts.length > 0 && eyeCounts.reduce(function (a, b) {
        return a + b;
      }) >= 2;
    });
    var blackRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isWhite();
    });
    return {
      black: _utils["default"].flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return {
          y: i.y,
          x: i.x
        };
      }),
      white: _utils["default"].flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return {
          y: i.y,
          x: i.x
        };
      })
    };
  }
});
var AreaScoring = Object.freeze({
  score: function score(game) {
    var blackStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isBlack() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var whiteStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isWhite() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var territory = game.territory();
    return {
      black: territory.black.length + blackStonesOnTheBoard.length,
      white: territory.white.length + whiteStonesOnTheBoard.length
    };
  },
  territory: function territory(game) {
    var regions = _region["default"].allFor(boardStateWithoutDeadPoints(game));
    var territoryRegions = regions.filter(function (r) {
      return r.isTerritory();
    });
    var blackRegions = territoryRegions.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegions.filter(function (r) {
      return r.isWhite();
    });
    return {
      black: _utils["default"].flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return {
          y: i.y,
          x: i.x
        };
      }),
      white: _utils["default"].flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return {
          y: i.y,
          x: i.x
        };
      })
    };
  }
});
var Scorer = function Scorer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    scoreBy = _ref.scoreBy,
    komi = _ref.komi;
  this._strategy = {
    "area": AreaScoring,
    "territory": TerritoryScoring,
    "equivalence": AreaScoring
  }[scoreBy];
  this._komi = komi;
  if (!this._strategy) {
    throw new Error("Unknown scoring type: " + scoreBy);
  }
  if (this._komi === null || typeof this._komi === "undefined") {
    throw new Error("Error initializing scorer without a komi value");
  }
  if (typeof this._komi !== "number") {
    throw new Error("Komi value given is not a number: " + komi);
  }
  this._usePassStones = scoreBy === "equivalence";
  Object.freeze(this);
};
Scorer.prototype = {
  score: function score(game) {
    var result = this._strategy.score(game);
    result.white += this._komi;
    if (this._usePassStones) {
      // Under equivalence scoring, 2 consecutive passes signals(!) the end of the
      // game, but just prior to the end of the game, white must make one final
      // pass move if the game didn't end on a white pass.
      //
      // However, instead of creating a 3rd consecutive pass in the board state,
      // white's additional pass stone is handled by the scoring mechanism alone.
      // The idea is that, under any game resumption, the additional white pass
      // stone must not exist, so we shouldn't add it.
      //
      // NOTE: the final result should rely on this scoring function. Any calculations
      // using raw board state pass stone numbers may be off by 1 in favor of black.
      var needsFinalWhitePassStone = game.currentState().color !== "white";
      return {
        black: result.black + game.currentState().whitePassStones + (needsFinalWhitePassStone ? 1 : 0),
        white: result.white + game.currentState().blackPassStones
      };
    } else {
      return result;
    }
  },
  territory: function territory(game) {
    return this._strategy.territory(game);
  },
  usingPassStones: function usingPassStones() {
    return this._usePassStones;
  }
};
var _default = exports["default"] = Scorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9pbnRlcnNlY3Rpb24iLCJfcmVnaW9uIiwiX2V5ZVBvaW50Iiwib2JqIiwiX19lc01vZHVsZSIsImJvYXJkU3RhdGVXaXRob3V0RGVhZFBvaW50cyIsImdhbWUiLCJjdXJyZW50U3RhdGUiLCJfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyIsImkiLCJfaXNEZWFkQXQiLCJ5IiwieCIsImJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyIsImJvYXJkU3RhdGUiLCJyZWdpb25zIiwiYWxsRm9yIiwibmV1dHJhbFJlZ2lvbnMiLCJmaWx0ZXIiLCJyIiwiaXNOZXV0cmFsIiwibGVuZ3RoIiwicmVwbGFjZW1lbnRzIiwiZm9yRWFjaCIsInN0YXJ0aW5nWCIsInN0YXJ0aW5nWSIsImludGVyc2VjdGlvbnMiLCJpbnRlcnNlY3Rpb24iLCJtYW5oYXR0YW5EaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJyZXBsYWNlbWVudENvbG9yIiwicmVwbGFjZW1lbnQiLCJuZXdQb2ludHMiLCJtYXAiLCJfd2l0aE5ld1BvaW50cyIsImJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQiLCJ0ZXJyaXRvcnlSZWdpb25zIiwiaXNUZXJyaXRvcnkiLCJmYWxzZUV5ZVBvaW50cyIsImZsYXRNYXAiLCJpc0ZhbHNlIiwicG9pbnRzTmVpZ2hib3JpbmdBdGFyaSIsIm5laWdoYm9yc0ZvciIsInNvbWUiLCJuIiwiaW5BdGFyaSIsIm5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZSIsIl9sb29wIiwiaW5kZXhPZiIsImZpbGxlZENvbG9yIiwiVGVycml0b3J5U2NvcmluZyIsIk9iamVjdCIsImZyZWV6ZSIsInNjb3JlIiwiYmxhY2tEZWFkQXNDYXB0dXJlcyIsImRlYWRTdG9uZXMiLCJkZWFkUG9pbnQiLCJpbnRlcnNlY3Rpb25BdCIsImlzQmxhY2siLCJ3aGl0ZURlYWRBc0NhcHR1cmVzIiwiaXNXaGl0ZSIsInRlcnJpdG9yeSIsImJsYWNrIiwid2hpdGVTdG9uZXNDYXB0dXJlZCIsIndoaXRlIiwiYmxhY2tTdG9uZXNDYXB0dXJlZCIsInN0YXRlV2l0aG91dERlYWRQb2ludHMiLCJzdGF0ZVdpdGhvdXROZXV0cmFscyIsInN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkIiwidGVycml0b3J5UmVnaW9uc1dpdGhvdXRTZWtpIiwibWVyZ2VkIiwibWVyZ2UiLCJleWVDb3VudHMiLCJtIiwiY2VpbCIsIm51bWJlck9mRXllcyIsInJlZHVjZSIsImEiLCJiIiwiYmxhY2tSZWdpb25zIiwid2hpdGVSZWdpb25zIiwiQXJlYVNjb3JpbmciLCJibGFja1N0b25lc09uVGhlQm9hcmQiLCJ3aGl0ZVN0b25lc09uVGhlQm9hcmQiLCJTY29yZXIiLCJfcmVmIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2NvcmVCeSIsImtvbWkiLCJfc3RyYXRlZ3kiLCJfa29taSIsIkVycm9yIiwiX3VzZVBhc3NTdG9uZXMiLCJwcm90b3R5cGUiLCJyZXN1bHQiLCJuZWVkc0ZpbmFsV2hpdGVQYXNzU3RvbmUiLCJjb2xvciIsIndoaXRlUGFzc1N0b25lcyIsImJsYWNrUGFzc1N0b25lcyIsInVzaW5nUGFzc1N0b25lcyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgSW50ZXJzZWN0aW9uIGZyb20gXCIuL2ludGVyc2VjdGlvblwiO1xuaW1wb3J0IFJlZ2lvbiBmcm9tIFwiLi9yZWdpb25cIjtcbmltcG9ydCBFeWVQb2ludCBmcm9tIFwiLi9leWUtcG9pbnRcIjtcblxuY29uc3QgYm9hcmRTdGF0ZVdpdGhvdXREZWFkUG9pbnRzID0gZnVuY3Rpb24oZ2FtZSkge1xuICByZXR1cm4gZ2FtZS5jdXJyZW50U3RhdGUoKS5fd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyhpID0+IHtcbiAgICByZXR1cm4gZ2FtZS5faXNEZWFkQXQoaS55LCBpLngpO1xuICB9KTtcbn07XG5cbmNvbnN0IGJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyA9IGZ1bmN0aW9uKGJvYXJkU3RhdGUpIHtcbiAgY29uc3QgcmVnaW9ucyA9IFJlZ2lvbi5hbGxGb3IoYm9hcmRTdGF0ZSk7XG4gIGNvbnN0IG5ldXRyYWxSZWdpb25zID0gcmVnaW9ucy5maWx0ZXIociA9PiByLmlzTmV1dHJhbCgpKTtcblxuICBpZiAocmVnaW9ucy5sZW5ndGggPT09IDAgfHwgbmV1dHJhbFJlZ2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGJvYXJkU3RhdGU7XG4gIH1cblxuICBjb25zdCByZXBsYWNlbWVudHMgPSB7fTtcblxuICBuZXV0cmFsUmVnaW9ucy5mb3JFYWNoKHIgPT4ge1xuICAgIGxldCBzdGFydGluZ1ggPSBudWxsO1xuICAgIGxldCBzdGFydGluZ1kgPSBudWxsO1xuXG4gICAgci5pbnRlcnNlY3Rpb25zLmZvckVhY2goaW50ZXJzZWN0aW9uID0+IHtcbiAgICAgIHN0YXJ0aW5nWCA9IHN0YXJ0aW5nWCB8fCBpbnRlcnNlY3Rpb24ueDtcbiAgICAgIHN0YXJ0aW5nWCA9IHN0YXJ0aW5nWCB8fCBpbnRlcnNlY3Rpb24ueTtcblxuICAgICAgY29uc3QgbWFuaGF0dGFuRGlzdGFuY2UgPSBNYXRoLmFicyhpbnRlcnNlY3Rpb24ueSAtIHN0YXJ0aW5nWSkgKyBNYXRoLmFicyhpbnRlcnNlY3Rpb24ueCAtIHN0YXJ0aW5nWCk7XG4gICAgICBjb25zdCByZXBsYWNlbWVudENvbG9yID0gW1wiYmxhY2tcIiwgXCJ3aGl0ZVwiXVttYW5oYXR0YW5EaXN0YW5jZSAlIDJdO1xuICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSBuZXcgSW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbi55LCBpbnRlcnNlY3Rpb24ueCwgcmVwbGFjZW1lbnRDb2xvcik7XG5cbiAgICAgIHJlcGxhY2VtZW50c1tpbnRlcnNlY3Rpb24ueV0gPSByZXBsYWNlbWVudHNbaW50ZXJzZWN0aW9uLnldIHx8IFtdO1xuICAgICAgcmVwbGFjZW1lbnRzW2ludGVyc2VjdGlvbi55XVtpbnRlcnNlY3Rpb24ueF0gPSByZXBsYWNlbWVudDtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3UG9pbnRzID0gYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zLm1hcChpID0+IHtcbiAgICBpZiAocmVwbGFjZW1lbnRzW2kueV0gJiYgcmVwbGFjZW1lbnRzW2kueV1baS54XSkge1xuICAgICAgcmV0dXJuIHJlcGxhY2VtZW50c1tpLnldW2kueF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGJvYXJkU3RhdGUuX3dpdGhOZXdQb2ludHMobmV3UG9pbnRzKTtcbn07XG5cbmNvbnN0IGJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQgPSBmdW5jdGlvbihib2FyZFN0YXRlKSB7XG4gIGNvbnN0IHRlcnJpdG9yeVJlZ2lvbnMgPSBSZWdpb24uYWxsRm9yKGJvYXJkU3RhdGUpLmZpbHRlcihyID0+IHIuaXNUZXJyaXRvcnkoKSk7XG4gIGNvbnN0IGZhbHNlRXllUG9pbnRzID0gdXRpbHMuZmxhdE1hcCh0ZXJyaXRvcnlSZWdpb25zLCByID0+IHIuaW50ZXJzZWN0aW9ucykuZmlsdGVyKGkgPT4gKG5ldyBFeWVQb2ludChib2FyZFN0YXRlLCBpKSkuaXNGYWxzZSgpKTtcblxuICBsZXQgcG9pbnRzTmVpZ2hib3JpbmdBdGFyaSA9IGZhbHNlRXllUG9pbnRzLmZpbHRlcihpID0+IHtcbiAgICByZXR1cm4gYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaS55LCBpLngpLnNvbWUobiA9PiBib2FyZFN0YXRlLmluQXRhcmkobi55LCBuLngpKTtcbiAgfSk7XG4gIGxldCBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUgPSBib2FyZFN0YXRlO1xuXG4gIHdoaWxlIChwb2ludHNOZWlnaGJvcmluZ0F0YXJpLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBuZXdQb2ludHMgPSBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuaW50ZXJzZWN0aW9ucy5tYXAoaSA9PiB7XG4gICAgICBpZiAocG9pbnRzTmVpZ2hib3JpbmdBdGFyaS5pbmRleE9mKGkpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnNlY3Rpb24oaS55LCBpLngsIChuZXcgRXllUG9pbnQobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlLCBpKSkuZmlsbGVkQ29sb3IoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUgPSBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuX3dpdGhOZXdQb2ludHMobmV3UG9pbnRzKTtcblxuICAgIGNvbnN0IGJvYXJkU3RhdGUgPSBib2FyZFN0YXRlV2l0aG91dE5ldXRyYWxQb2ludHMobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlKTtcbiAgICBjb25zdCB0ZXJyaXRvcnlSZWdpb25zID0gUmVnaW9uLmFsbEZvcihib2FyZFN0YXRlKS5maWx0ZXIociA9PiByLmlzVGVycml0b3J5KCkpO1xuICAgIGNvbnN0IGZhbHNlRXllUG9pbnRzID0gdXRpbHMuZmxhdE1hcCh0ZXJyaXRvcnlSZWdpb25zLCByID0+IHIuaW50ZXJzZWN0aW9ucykuZmlsdGVyKGkgPT4gKG5ldyBFeWVQb2ludChib2FyZFN0YXRlLCBpKSkuaXNGYWxzZSgpKTtcblxuICAgIHBvaW50c05laWdoYm9yaW5nQXRhcmkgPSBmYWxzZUV5ZVBvaW50cy5maWx0ZXIoaSA9PiB7XG4gICAgICByZXR1cm4gbmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlLm5laWdoYm9yc0ZvcihpLnksIGkueCkuc29tZShuID0+IG5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZS5pbkF0YXJpKG4ueSwgbi54KSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlO1xufTtcblxuY29uc3QgVGVycml0b3J5U2NvcmluZyA9IE9iamVjdC5mcmVlemUoe1xuICBzY29yZTogZnVuY3Rpb24oZ2FtZSkge1xuICAgIGNvbnN0IGJsYWNrRGVhZEFzQ2FwdHVyZXMgPSBnYW1lLmRlYWRTdG9uZXMoKS5maWx0ZXIoZnVuY3Rpb24oZGVhZFBvaW50KSB7IHJldHVybiBnYW1lLmludGVyc2VjdGlvbkF0KGRlYWRQb2ludC55LCBkZWFkUG9pbnQueCkuaXNCbGFjaygpOyB9KTtcbiAgICBjb25zdCB3aGl0ZURlYWRBc0NhcHR1cmVzID0gZ2FtZS5kZWFkU3RvbmVzKCkuZmlsdGVyKGZ1bmN0aW9uKGRlYWRQb2ludCkgeyByZXR1cm4gZ2FtZS5pbnRlcnNlY3Rpb25BdChkZWFkUG9pbnQueSwgZGVhZFBvaW50LngpLmlzV2hpdGUoKTsgfSk7XG5cbiAgICBjb25zdCB0ZXJyaXRvcnkgPSBnYW1lLnRlcnJpdG9yeSgpO1xuICAgIGNvbnN0IGJvYXJkU3RhdGUgPSBnYW1lLmN1cnJlbnRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJsYWNrOiB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoICsgYm9hcmRTdGF0ZS53aGl0ZVN0b25lc0NhcHR1cmVkICsgd2hpdGVEZWFkQXNDYXB0dXJlcy5sZW5ndGgsXG4gICAgICB3aGl0ZTogdGVycml0b3J5LndoaXRlLmxlbmd0aCArIGJvYXJkU3RhdGUuYmxhY2tTdG9uZXNDYXB0dXJlZCArIGJsYWNrRGVhZEFzQ2FwdHVyZXMubGVuZ3RoXG4gICAgfTtcbiAgfSxcblxuICB0ZXJyaXRvcnk6IGZ1bmN0aW9uKGdhbWUpIHtcbiAgICBjb25zdCBzdGF0ZVdpdGhvdXREZWFkUG9pbnRzID0gYm9hcmRTdGF0ZVdpdGhvdXREZWFkUG9pbnRzKGdhbWUpO1xuICAgIGNvbnN0IHN0YXRlV2l0aG91dE5ldXRyYWxzID0gYm9hcmRTdGF0ZVdpdGhvdXROZXV0cmFsUG9pbnRzKHN0YXRlV2l0aG91dERlYWRQb2ludHMpO1xuICAgIGNvbnN0IHN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkID0gYm9hcmRTdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZChzdGF0ZVdpdGhvdXROZXV0cmFscyk7XG5cbiAgICBjb25zdCB0ZXJyaXRvcnlSZWdpb25zID0gUmVnaW9uLmFsbEZvcihzdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZCkuZmlsdGVyKHIgPT4gci5pc1RlcnJpdG9yeSgpKTtcblxuICAgIGNvbnN0IHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraSA9IHRlcnJpdG9yeVJlZ2lvbnMuZmlsdGVyKHIgPT4ge1xuICAgICAgY29uc3QgbWVyZ2VkID0gUmVnaW9uLm1lcmdlKHRlcnJpdG9yeVJlZ2lvbnMsIHIpO1xuICAgICAgY29uc3QgZXllQ291bnRzID0gbWVyZ2VkLm1hcChtID0+IE1hdGguY2VpbChtLm51bWJlck9mRXllcygpKSk7XG5cbiAgICAgIHJldHVybiBleWVDb3VudHMubGVuZ3RoID4gMCAmJiBleWVDb3VudHMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgPj0gMjtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJsYWNrUmVnaW9ucyA9IHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraS5maWx0ZXIociA9PiByLmlzQmxhY2soKSk7XG4gICAgY29uc3Qgd2hpdGVSZWdpb25zID0gdGVycml0b3J5UmVnaW9uc1dpdGhvdXRTZWtpLmZpbHRlcihyID0+IHIuaXNXaGl0ZSgpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogdXRpbHMuZmxhdE1hcChibGFja1JlZ2lvbnMsIHIgPT4gci5pbnRlcnNlY3Rpb25zKS5tYXAoaSA9PiAoeyB5OiBpLnksIHg6IGkueCB9KSksXG4gICAgICB3aGl0ZTogdXRpbHMuZmxhdE1hcCh3aGl0ZVJlZ2lvbnMsIHIgPT4gci5pbnRlcnNlY3Rpb25zKS5tYXAoaSA9PiAoeyB5OiBpLnksIHg6IGkueCB9KSlcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgQXJlYVNjb3JpbmcgPSBPYmplY3QuZnJlZXplKHtcbiAgc2NvcmU6IGZ1bmN0aW9uKGdhbWUpIHtcbiAgICBjb25zdCBibGFja1N0b25lc09uVGhlQm9hcmQgPSBnYW1lLmludGVyc2VjdGlvbnMoKS5maWx0ZXIoZnVuY3Rpb24oaW50ZXJzZWN0aW9uKSB7IHJldHVybiBpbnRlcnNlY3Rpb24uaXNCbGFjaygpICYmICFnYW1lLl9pc0RlYWRBdChpbnRlcnNlY3Rpb24ueSwgaW50ZXJzZWN0aW9uLngpOyB9KTtcbiAgICBjb25zdCB3aGl0ZVN0b25lc09uVGhlQm9hcmQgPSBnYW1lLmludGVyc2VjdGlvbnMoKS5maWx0ZXIoZnVuY3Rpb24oaW50ZXJzZWN0aW9uKSB7IHJldHVybiBpbnRlcnNlY3Rpb24uaXNXaGl0ZSgpICYmICFnYW1lLl9pc0RlYWRBdChpbnRlcnNlY3Rpb24ueSwgaW50ZXJzZWN0aW9uLngpOyB9KTtcbiAgICBjb25zdCB0ZXJyaXRvcnkgPSBnYW1lLnRlcnJpdG9yeSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJsYWNrOiB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoICsgYmxhY2tTdG9uZXNPblRoZUJvYXJkLmxlbmd0aCxcbiAgICAgIHdoaXRlOiB0ZXJyaXRvcnkud2hpdGUubGVuZ3RoICsgd2hpdGVTdG9uZXNPblRoZUJvYXJkLmxlbmd0aFxuICAgIH07XG4gIH0sXG5cbiAgdGVycml0b3J5OiBmdW5jdGlvbihnYW1lKSB7XG4gICAgY29uc3QgcmVnaW9ucyA9IFJlZ2lvbi5hbGxGb3IoYm9hcmRTdGF0ZVdpdGhvdXREZWFkUG9pbnRzKGdhbWUpKTtcbiAgICBjb25zdCB0ZXJyaXRvcnlSZWdpb25zID0gcmVnaW9ucy5maWx0ZXIociA9PiByLmlzVGVycml0b3J5KCkpO1xuICAgIGNvbnN0IGJsYWNrUmVnaW9ucyA9IHRlcnJpdG9yeVJlZ2lvbnMuZmlsdGVyKHIgPT4gci5pc0JsYWNrKCkpO1xuICAgIGNvbnN0IHdoaXRlUmVnaW9ucyA9IHRlcnJpdG9yeVJlZ2lvbnMuZmlsdGVyKHIgPT4gci5pc1doaXRlKCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJsYWNrOiB1dGlscy5mbGF0TWFwKGJsYWNrUmVnaW9ucywgciA9PiByLmludGVyc2VjdGlvbnMpLm1hcChpID0+ICh7IHk6IGkueSwgeDogaS54IH0pKSxcbiAgICAgIHdoaXRlOiB1dGlscy5mbGF0TWFwKHdoaXRlUmVnaW9ucywgciA9PiByLmludGVyc2VjdGlvbnMpLm1hcChpID0+ICh7IHk6IGkueSwgeDogaS54IH0pKVxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBTY29yZXIgPSBmdW5jdGlvbih7IHNjb3JlQnksIGtvbWkgfSA9IHt9KSB7XG4gIHRoaXMuX3N0cmF0ZWd5ID0ge1xuICAgIFwiYXJlYVwiOiBBcmVhU2NvcmluZyxcbiAgICBcInRlcnJpdG9yeVwiOiBUZXJyaXRvcnlTY29yaW5nLFxuICAgIFwiZXF1aXZhbGVuY2VcIjogQXJlYVNjb3JpbmdcbiAgfVtzY29yZUJ5XTtcblxuICB0aGlzLl9rb21pID0ga29taTtcblxuICBpZiAoIXRoaXMuX3N0cmF0ZWd5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzY29yaW5nIHR5cGU6IFwiICsgc2NvcmVCeSk7XG4gIH1cblxuICBpZiAodGhpcy5fa29taSA9PT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5fa29taSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBzY29yZXIgd2l0aG91dCBhIGtvbWkgdmFsdWVcIik7XG4gIH1cblxuICBpZiAodHlwZW9mIHRoaXMuX2tvbWkgIT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJLb21pIHZhbHVlIGdpdmVuIGlzIG5vdCBhIG51bWJlcjogXCIgKyBrb21pKTtcbiAgfVxuXG4gIHRoaXMuX3VzZVBhc3NTdG9uZXMgPSBzY29yZUJ5ID09PSBcImVxdWl2YWxlbmNlXCI7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cblxuU2NvcmVyLnByb3RvdHlwZSA9IHtcbiAgc2NvcmU6IGZ1bmN0aW9uKGdhbWUpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9zdHJhdGVneS5zY29yZShnYW1lKTtcbiAgICByZXN1bHQud2hpdGUgKz0gdGhpcy5fa29taTtcblxuICAgIGlmICh0aGlzLl91c2VQYXNzU3RvbmVzKSB7XG4gICAgICAvLyBVbmRlciBlcXVpdmFsZW5jZSBzY29yaW5nLCAyIGNvbnNlY3V0aXZlIHBhc3NlcyBzaWduYWxzKCEpIHRoZSBlbmQgb2YgdGhlXG4gICAgICAvLyBnYW1lLCBidXQganVzdCBwcmlvciB0byB0aGUgZW5kIG9mIHRoZSBnYW1lLCB3aGl0ZSBtdXN0IG1ha2Ugb25lIGZpbmFsXG4gICAgICAvLyBwYXNzIG1vdmUgaWYgdGhlIGdhbWUgZGlkbid0IGVuZCBvbiBhIHdoaXRlIHBhc3MuXG4gICAgICAvL1xuICAgICAgLy8gSG93ZXZlciwgaW5zdGVhZCBvZiBjcmVhdGluZyBhIDNyZCBjb25zZWN1dGl2ZSBwYXNzIGluIHRoZSBib2FyZCBzdGF0ZSxcbiAgICAgIC8vIHdoaXRlJ3MgYWRkaXRpb25hbCBwYXNzIHN0b25lIGlzIGhhbmRsZWQgYnkgdGhlIHNjb3JpbmcgbWVjaGFuaXNtIGFsb25lLlxuICAgICAgLy8gVGhlIGlkZWEgaXMgdGhhdCwgdW5kZXIgYW55IGdhbWUgcmVzdW1wdGlvbiwgdGhlIGFkZGl0aW9uYWwgd2hpdGUgcGFzc1xuICAgICAgLy8gc3RvbmUgbXVzdCBub3QgZXhpc3QsIHNvIHdlIHNob3VsZG4ndCBhZGQgaXQuXG4gICAgICAvL1xuICAgICAgLy8gTk9URTogdGhlIGZpbmFsIHJlc3VsdCBzaG91bGQgcmVseSBvbiB0aGlzIHNjb3JpbmcgZnVuY3Rpb24uIEFueSBjYWxjdWxhdGlvbnNcbiAgICAgIC8vIHVzaW5nIHJhdyBib2FyZCBzdGF0ZSBwYXNzIHN0b25lIG51bWJlcnMgbWF5IGJlIG9mZiBieSAxIGluIGZhdm9yIG9mIGJsYWNrLlxuICAgICAgY29uc3QgbmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID0gZ2FtZS5jdXJyZW50U3RhdGUoKS5jb2xvciAhPT0gXCJ3aGl0ZVwiO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBibGFjazogcmVzdWx0LmJsYWNrICsgZ2FtZS5jdXJyZW50U3RhdGUoKS53aGl0ZVBhc3NTdG9uZXMgKyAobmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID8gMSA6IDApLFxuICAgICAgICB3aGl0ZTogcmVzdWx0LndoaXRlICsgZ2FtZS5jdXJyZW50U3RhdGUoKS5ibGFja1Bhc3NTdG9uZXNcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24oZ2FtZSkge1xuICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS50ZXJyaXRvcnkoZ2FtZSk7XG4gIH0sXG5cbiAgdXNpbmdQYXNzU3RvbmVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlUGFzc1N0b25lcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2NvcmVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxNQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxPQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRyxTQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFBbUMsU0FBQUQsdUJBQUFLLEdBQUE7RUFBQSxPQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBO0lBQUEsV0FBQUE7RUFBQTtBQUFBO0FBRW5DLElBQU1FLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQVlDLElBQUksRUFBRTtFQUNqRCxPQUFPQSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDLENBQUNDLDZCQUE2QixDQUFD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
},{"./eye-point":5,"./intersection":7,"./region":9,"./utils":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = _interopRequireDefault(require("./utils"));
var _renderer = _interopRequireDefault(require("./renderer"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var SVGRenderer = function SVGRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
    options = _ref.options;
  _renderer["default"].call(this, boardElement, {
    hooks: hooks,
    options: options
  });
  _utils["default"].addClass(boardElement, "tenuki-svg-renderer");
};
SVGRenderer.prototype = Object.create(_renderer["default"].prototype);
SVGRenderer.prototype.constructor = SVGRenderer;
var CACHED_CONSTRUCTED_LINES = {};
var constructSVG = function constructSVG(renderer, boardState, _ref2) {
  var hasCoordinates = _ref2.hasCoordinates,
    smallerStones = _ref2.smallerStones,
    flatStones = _ref2.flatStones;
  var cacheKey = [boardState.boardSize, hasCoordinates, smallerStones, flatStones].toString();
  var svg = _utils["default"].createSVGElement("svg");
  var defs = _utils["default"].createSVGElement("defs");
  _utils["default"].appendElement(svg, defs);
  var blackGradient = _utils["default"].createSVGElement("radialGradient", {
    attributes: {
      id: renderer.blackGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils["default"].appendElement(blackGradient, _utils["default"].createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "hsl(0, 0%, 38%)"
    }
  }));
  _utils["default"].appendElement(blackGradient, _utils["default"].createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#39363D"
    }
  }));
  _utils["default"].appendElement(defs, blackGradient);
  var whiteGradient = _utils["default"].createSVGElement("radialGradient", {
    attributes: {
      id: renderer.whiteGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils["default"].appendElement(whiteGradient, _utils["default"].createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "#FFFFFF"
    }
  }));
  _utils["default"].appendElement(whiteGradient, _utils["default"].createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#fafdfc"
    }
  }));
  _utils["default"].appendElement(defs, whiteGradient);
  var blueGradient = _utils["default"].createSVGElement("radialGradient", {
    attributes: {
      id: renderer.blueGradientID
      // cy: "15%",
      // r: "50%"
    }
  });
  // utils.appendElement(blueGradient, utils.createSVGElement("stop", {
  //   attributes: {
  //     offset: "0%",
  //     "stop-color": "#FFFFFF"
  //   }
  // }));
  _utils["default"].appendElement(blueGradient, _utils["default"].createSVGElement("stop", {
    attributes: {
      offset: "100%",
      // "stop-color": "#0000ff"
      "stop-color": "#ebc98a"
    }
  }));
  _utils["default"].appendElement(defs, blueGradient);
  var contentsContainer = _utils["default"].createSVGElement("g", {
    attributes: {
      "class": "contents",
      transform: "translate(".concat(renderer.MARGIN, ", ").concat(renderer.MARGIN, ")")
    }
  });
  _utils["default"].appendElement(svg, contentsContainer);
  var lines;
  if (CACHED_CONSTRUCTED_LINES[cacheKey]) {
    lines = _utils["default"].clone(CACHED_CONSTRUCTED_LINES[cacheKey]);
  } else {
    lines = _utils["default"].createSVGElement("g", {
      attributes: {
        "class": "lines"
      }
    });
    for (var y = 0; y < boardState.boardSize - 1; y++) {
      for (var x = 0; x < boardState.boardSize - 1; x++) {
        var lineBox = _utils["default"].createSVGElement("rect", {
          attributes: {
            y: y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            x: x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            width: renderer.INTERSECTION_GAP_SIZE + 1,
            height: renderer.INTERSECTION_GAP_SIZE + 1,
            "class": "line-box"
          }
        });
        _utils["default"].appendElement(lines, lineBox);
      }
    }
    CACHED_CONSTRUCTED_LINES[cacheKey] = lines;
  }
  _utils["default"].appendElement(contentsContainer, lines);
  var hoshiPoints = _utils["default"].createSVGElement("g", {
    attributes: {
      "class": "hoshi"
    }
  });
  _utils["default"].appendElement(contentsContainer, hoshiPoints);
  _renderer["default"].hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils["default"].createSVGElement("circle", {
      attributes: {
        "class": "hoshi",
        cy: h.top * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: h.left * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: 2
      }
    });
    _utils["default"].appendElement(hoshiPoints, hoshi);
  });
  if (hasCoordinates) {
    var coordinateContainer = _utils["default"].createSVGElement("g", {
      attributes: {
        "class": "coordinates",
        transform: "translate(".concat(renderer.MARGIN, ", ").concat(renderer.MARGIN, ")")
      }
    });
    var _loop = function _loop(_y) {
      // TODO: 16 is for the rendered height _on my browser_. not reliable...

      [16 / 2 + 1 - (16 + 16 / 2 + 16 / (2 * 2) + 16 / (2 * 2 * 2)), 16 / 2 + 1 + (16 + 16 / 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (verticalOffset) {
        _utils["default"].appendElement(coordinateContainer, _utils["default"].createSVGElement("text", {
          text: boardState.xCoordinateFor(_y),
          attributes: {
            "text-anchor": "middle",
            y: verticalOffset - 0.5,
            x: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5
          }
        }));
      });
      [-1 * (16 + 16 / 2 + 16 / (2 * 2)), 16 + 16 / 2 + 16 / (2 * 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (horizontalOffset) {
        _utils["default"].appendElement(coordinateContainer, _utils["default"].createSVGElement("text", {
          text: boardState.yCoordinateFor(_y),
          attributes: {
            "text-anchor": "middle",
            y: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5 + 16 / (2 * 2),
            x: horizontalOffset - 0.5
          }
        }));
      });
      _utils["default"].appendElement(svg, coordinateContainer);
    };
    for (var _y = 0; _y < boardState.boardSize; _y++) {
      _loop(_y);
    }
  }
  var intersections = _utils["default"].createSVGElement("g", {
    attributes: {
      "class": "intersections"
    }
  });
  for (var _y2 = 0; _y2 < boardState.boardSize; _y2++) {
    for (var _x = 0; _x < boardState.boardSize; _x++) {
      // const isBlue = x===3 && y===3;

      var intersectionGroup = _utils["default"].createSVGElement("g", {
        attributes: {
          "class": "intersection"
        }
      });
      intersectionGroup.setAttribute("data-intersection-y", _y2);
      intersectionGroup.setAttribute("data-intersection-x", _x);
      _utils["default"].appendElement(intersections, intersectionGroup);
      var intersectionInnerContainer = _utils["default"].createSVGElement("g", {
        attributes: {
          "class": "intersection-inner-container"
        }
      });
      _utils["default"].appendElement(intersectionGroup, intersectionInnerContainer);
      var intersectionBox = _utils["default"].createSVGElement("rect", {
        attributes: {
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          width: renderer.INTERSECTION_GAP_SIZE,
          height: renderer.INTERSECTION_GAP_SIZE
        }
      });
      _utils["default"].appendElement(intersectionInnerContainer, intersectionBox);
      var stoneRadius = renderer.INTERSECTION_GAP_SIZE / 2; // (isBlue ? 1 : 2);

      if (smallerStones) {
        stoneRadius -= 1;
      }
      var stoneAttributes = {
        "class": "stone",
        cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: stoneRadius
      };
      if (!flatStones) {
        _utils["default"].appendElement(intersectionInnerContainer, _utils["default"].createSVGElement("circle", {
          attributes: {
            "class": "stone-shadow",
            cy: stoneAttributes["cy"] + 2,
            cx: stoneAttributes["cx"],
            r: stoneRadius
          }
        }));
      }
      var intersection = _utils["default"].createSVGElement("circle", {
        attributes: stoneAttributes
      });
      _utils["default"].appendElement(intersectionInnerContainer, intersection);
      _utils["default"].appendElement(intersectionInnerContainer, _utils["default"].createSVGElement("circle", {
        attributes: {
          "class": "marker",
          cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          r: 4.5
        }
      }));
      _utils["default"].appendElement(intersectionInnerContainer, _utils["default"].createSVGElement("rect", {
        attributes: {
          "class": "ko-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          width: 12,
          height: 12
        }
      }));
      _utils["default"].appendElement(intersectionInnerContainer, _utils["default"].createSVGElement("rect", {
        attributes: {
          "class": "territory-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          width: 11,
          height: 11
        }
      }));
      renderer.grid[_y2] = renderer.grid[_y2] || [];
      renderer.grid[_y2][_x] = intersectionGroup;
      renderer.addIntersectionEventListeners(intersectionGroup, _y2, _x);
    }
  }
  _utils["default"].appendElement(contentsContainer, intersections);
  return svg;
};
SVGRenderer.prototype.generateBoard = function (boardState, _ref3) {
  var hasCoordinates = _ref3.hasCoordinates,
    smallerStones = _ref3.smallerStones,
    flatStones = _ref3.flatStones;
  this.blackGradientID = _utils["default"].randomID("black-gradient");
  this.whiteGradientID = _utils["default"].randomID("white-gradient");
  this.blueGradientID = _utils["default"].randomID("blue-gradient");
  var svg = constructSVG(this, boardState, {
    hasCoordinates: hasCoordinates,
    smallerStones: smallerStones,
    flatStones: flatStones
  });
  this.svgElement = svg;
  this.svgElement.setAttribute("height", this.BOARD_LENGTH);
  this.svgElement.setAttribute("width", this.BOARD_LENGTH);
  return svg;
};
SVGRenderer.prototype.computeSizing = function () {
  var _this = this;
  _renderer["default"].prototype.computeSizing.call(this);

  // In addition to the will-change re-raster in Renderer,
  // the SVG element appears to sometimes need this to
  // prevent blurriness on resize.
  this.svgElement.style.transform = "none";
  window.requestAnimationFrame(function () {
    _this.svgElement.style.transform = "";
  });
};
SVGRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.getAttribute("class") !== classes.join(" ")) {
    intersectionEl.setAttribute("class", classes.join(" "));
  }
  if (!this.flatStones) {
    if (intersection.isEmpty()) {
      intersectionEl.querySelector(".stone").setAttribute("style", "");
    } else {
      var base = window.location.href.split('#')[0];
      intersectionEl.querySelector(".stone").setAttribute("style", "fill: url(" + base + "#" + this[intersection.value + "GradientID"] + ")");
    }
  }
};
var _default = exports["default"] = SVGRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9yZW5kZXJlciIsIm9iaiIsIl9fZXNNb2R1bGUiLCJTVkdSZW5kZXJlciIsImJvYXJkRWxlbWVudCIsIl9yZWYiLCJob29rcyIsIm9wdGlvbnMiLCJjYWxsIiwiYWRkQ2xhc3MiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIkNBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FUyIsImNvbnN0cnVjdFNWRyIsInJlbmRlcmVyIiwiYm9hcmRTdGF0ZSIsIl9yZWYyIiwiaGFzQ29vcmRpbmF0ZXMiLCJzbWFsbGVyU3RvbmVzIiwiZmxhdFN0b25lcyIsImNhY2hlS2V5IiwiYm9hcmRTaXplIiwidG9TdHJpbmciLCJzdmciLCJjcmVhdGVTVkdFbGVtZW50IiwiZGVmcyIsImFwcGVuZEVsZW1lbnQiLCJibGFja0dyYWRpZW50IiwiYXR0cmlidXRlcyIsImlkIiwiYmxhY2tHcmFkaWVudElEIiwiY3kiLCJyIiwib2Zmc2V0Iiwid2hpdGVHcmFkaWVudCIsIndoaXRlR3JhZGllbnRJRCIsImJsdWVHcmFkaWVudCIsImJsdWVHcmFkaWVudElEIiwiY29udGVudHNDb250YWluZXIiLCJ0cmFuc2Zvcm0iLCJjb25jYXQiLCJNQVJHSU4iLCJsaW5lcyIsImNsb25lIiwieSIsIngiLCJsaW5lQm94IiwiSU5URVJTRUNUSU9OX0dBUF9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJob3NoaVBvaW50cyIsImhvc2hpUG9zaXRpb25zRm9yIiwiZm9yRWFjaCIsImgiLCJob3NoaSIsInRvcCIsImN4IiwibGVmdCIsImNvb3JkaW5hdGVDb250YWluZXIiLCJfbG9vcCIsIl95IiwidmVydGljYWxPZmZzZXQiLCJ0ZXh0IiwieENvb3JkaW5hdGVGb3IiLCJob3Jpem9udGFsT2Zmc2V0IiwieUNvb3JkaW5hdGVGb3IiLCJpbnRlcnNlY3Rpb25zIiwiX3kyIiwiX3giLCJpbnRlcnNlY3Rpb25Hcm91cCIsInNldEF0dHJpYnV0ZSIsImludGVyc2VjdGlvbklubmVyQ29udGFpbmVyIiwiaW50ZXJzZWN0aW9uQm94Iiwic3RvbmVSYWRpdXMiLCJzdG9uZUF0dHJpYnV0ZXMiLCJpbnRlcnNlY3Rpb24iLCJncmlkIiwiYWRkSW50ZXJzZWN0aW9uRXZlbnRMaXN0ZW5lcnMiLCJnZW5lcmF0ZUJvYXJkIiwiX3JlZjMiLCJyYW5kb21JRCIsInN2Z0VsZW1lbnQiLCJCT0FSRF9MRU5HVEgiLCJjb21wdXRlU2l6aW5nIiwiX3RoaXMiLCJzdHlsZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldEludGVyc2VjdGlvbkNsYXNzZXMiLCJpbnRlcnNlY3Rpb25FbCIsImNsYXNzZXMiLCJnZXRBdHRyaWJ1dGUiLCJqb2luIiwiaXNFbXB0eSIsInF1ZXJ5U2VsZWN0b3IiLCJiYXNlIiwibG9jYXRpb24iLCJocmVmIiwic3BsaXQiLCJ2YWx1ZSIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zdmctcmVuZGVyZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyZXJcIjtcblxuY29uc3QgU1ZHUmVuZGVyZXIgPSBmdW5jdGlvbihib2FyZEVsZW1lbnQsIHsgaG9va3MsIG9wdGlvbnMgfSkge1xuICBSZW5kZXJlci5jYWxsKHRoaXMsIGJvYXJkRWxlbWVudCwgeyBob29rczogaG9va3MsIG9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gIHV0aWxzLmFkZENsYXNzKGJvYXJkRWxlbWVudCwgXCJ0ZW51a2ktc3ZnLXJlbmRlcmVyXCIpO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZW5kZXJlci5wcm90b3R5cGUpO1xuU1ZHUmVuZGVyZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU1ZHUmVuZGVyZXI7XG5cbmNvbnN0IENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FUyA9IHt9O1xuXG5jb25zdCBjb25zdHJ1Y3RTVkcgPSBmdW5jdGlvbihyZW5kZXJlciwgYm9hcmRTdGF0ZSwgeyBoYXNDb29yZGluYXRlcywgc21hbGxlclN0b25lcywgZmxhdFN0b25lcyB9KSB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gW2JvYXJkU3RhdGUuYm9hcmRTaXplLCBoYXNDb29yZGluYXRlcywgc21hbGxlclN0b25lcywgZmxhdFN0b25lc10udG9TdHJpbmcoKTtcblxuICBjb25zdCBzdmcgPSB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwic3ZnXCIpO1xuICBjb25zdCBkZWZzID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImRlZnNcIik7XG4gIHV0aWxzLmFwcGVuZEVsZW1lbnQoc3ZnLCBkZWZzKTtcblxuICBjb25zdCBibGFja0dyYWRpZW50ID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInJhZGlhbEdyYWRpZW50XCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBpZDogcmVuZGVyZXIuYmxhY2tHcmFkaWVudElELFxuICAgICAgY3k6IFwiMTUlXCIsXG4gICAgICByOiBcIjUwJVwiXG4gICAgfVxuICB9KTtcbiAgdXRpbHMuYXBwZW5kRWxlbWVudChibGFja0dyYWRpZW50LCB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwic3RvcFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgb2Zmc2V0OiBcIjAlXCIsXG4gICAgICBcInN0b3AtY29sb3JcIjogXCJoc2woMCwgMCUsIDM4JSlcIlxuICAgIH1cbiAgfSkpO1xuICB1dGlscy5hcHBlbmRFbGVtZW50KGJsYWNrR3JhZGllbnQsIHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJzdG9wXCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiLFxuICAgICAgXCJzdG9wLWNvbG9yXCI6IFwiIzM5MzYzRFwiXG4gICAgfVxuICB9KSk7XG4gIHV0aWxzLmFwcGVuZEVsZW1lbnQoZGVmcywgYmxhY2tHcmFkaWVudCk7XG5cbiAgY29uc3Qgd2hpdGVHcmFkaWVudCA9IHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJyYWRpYWxHcmFkaWVudFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6IHJlbmRlcmVyLndoaXRlR3JhZGllbnRJRCxcbiAgICAgIGN5OiBcIjE1JVwiLFxuICAgICAgcjogXCI1MCVcIlxuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmFwcGVuZEVsZW1lbnQod2hpdGVHcmFkaWVudCwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIwJVwiLFxuICAgICAgXCJzdG9wLWNvbG9yXCI6IFwiI0ZGRkZGRlwiXG4gICAgfVxuICB9KSk7XG4gIHV0aWxzLmFwcGVuZEVsZW1lbnQod2hpdGVHcmFkaWVudCwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIxMDAlXCIsXG4gICAgICBcInN0b3AtY29sb3JcIjogXCIjZmFmZGZjXCJcbiAgICB9XG4gIH0pKTtcbiAgdXRpbHMuYXBwZW5kRWxlbWVudChkZWZzLCB3aGl0ZUdyYWRpZW50KTtcbiAgXG4gIGNvbnN0IGJsdWVHcmFkaWVudCA9IHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJyYWRpYWxHcmFkaWVudFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6IHJlbmRlcmVyLmJsdWVHcmFkaWVudElELFxuICAgICAgLy8gY3k6IFwiMTUlXCIsXG4gICAgICAvLyByOiBcIjUwJVwiXG4gICAgfVxuICB9KTtcbiAgLy8gdXRpbHMuYXBwZW5kRWxlbWVudChibHVlR3JhZGllbnQsIHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJzdG9wXCIsIHtcbiAgLy8gICBhdHRyaWJ1dGVzOiB7XG4gIC8vICAgICBvZmZzZXQ6IFwiMCVcIixcbiAgLy8gICAgIFwic3RvcC1jb2xvclwiOiBcIiNGRkZGRkZcIlxuICAvLyAgIH1cbiAgLy8gfSkpO1xuICB1dGlscy5hcHBlbmRFbGVtZW50KGJsdWVHcmFkaWVudCwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIxMDAlXCIsXG4gICAgICAvLyBcInN0b3AtY29sb3JcIjogXCIjMDAwMGZmXCJcbiAgICAgIFwic3RvcC1jb2xvclwiOiBcIiNlYmM5OGFcIlxuICAgIH1cbiAgfSkpO1xuICB1dGlscy5hcHBlbmRFbGVtZW50KGRlZnMsIGJsdWVHcmFkaWVudCk7XG5cbiAgY29uc3QgY29udGVudHNDb250YWluZXIgPSB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgY2xhc3M6IFwiY29udGVudHNcIixcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3JlbmRlcmVyLk1BUkdJTn0sICR7cmVuZGVyZXIuTUFSR0lOfSlgXG4gICAgfVxuICB9KTtcbiAgdXRpbHMuYXBwZW5kRWxlbWVudChzdmcsIGNvbnRlbnRzQ29udGFpbmVyKTtcblxuICBsZXQgbGluZXM7XG5cbiAgaWYgKENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FU1tjYWNoZUtleV0pIHtcbiAgICBsaW5lcyA9IHV0aWxzLmNsb25lKENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FU1tjYWNoZUtleV0pO1xuICB9IGVsc2Uge1xuICAgIGxpbmVzID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBjbGFzczogXCJsaW5lc1wiXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMTsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGxpbmVCb3ggPSB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwicmVjdFwiLCB7XG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgeTogeSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgICAgIHg6IHggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgICAgICB3aWR0aDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSxcbiAgICAgICAgICAgIGhlaWdodDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSxcbiAgICAgICAgICAgIGNsYXNzOiBcImxpbmUtYm94XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQobGluZXMsIGxpbmVCb3gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FU1tjYWNoZUtleV0gPSBsaW5lcztcbiAgfVxuXG4gIHV0aWxzLmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIGxpbmVzKTtcblxuICBjb25zdCBob3NoaVBvaW50cyA9IHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHsgYXR0cmlidXRlczogeyBjbGFzczogXCJob3NoaVwiIH19KTtcbiAgdXRpbHMuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lciwgaG9zaGlQb2ludHMpO1xuXG4gIFJlbmRlcmVyLmhvc2hpUG9zaXRpb25zRm9yKGJvYXJkU3RhdGUuYm9hcmRTaXplKS5mb3JFYWNoKGggPT4ge1xuICAgIGNvbnN0IGhvc2hpID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGNsYXNzOiBcImhvc2hpXCIsXG4gICAgICAgIGN5OiBoLnRvcCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgY3g6IGgubGVmdCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgcjogMlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdXRpbHMuYXBwZW5kRWxlbWVudChob3NoaVBvaW50cywgaG9zaGkpO1xuICB9KTtcblxuICBpZiAoaGFzQ29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBjb29yZGluYXRlQ29udGFpbmVyID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBjbGFzczogXCJjb29yZGluYXRlc1wiLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtyZW5kZXJlci5NQVJHSU59LCAke3JlbmRlcmVyLk1BUkdJTn0pYFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBib2FyZFN0YXRlLmJvYXJkU2l6ZTsgeSsrKSB7XG4gICAgICAvLyBUT0RPOiAxNiBpcyBmb3IgdGhlIHJlbmRlcmVkIGhlaWdodCBfb24gbXkgYnJvd3Nlcl8uIG5vdCByZWxpYWJsZS4uLlxuXG4gICAgICBbMTYvMiArIDEgLSAoMTYgKyAxNi8yICsgMTYvKDIqMikgKyAxNi8oMioyKjIpKSwgMTYvMiArIDEgKyAoMTYgKyAxNi8yKSArIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpKihyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKV0uZm9yRWFjaCh2ZXJ0aWNhbE9mZnNldCA9PiB7XG4gICAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoY29vcmRpbmF0ZUNvbnRhaW5lciwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInRleHRcIiwge1xuICAgICAgICAgIHRleHQ6IGJvYXJkU3RhdGUueENvb3JkaW5hdGVGb3IoeSksXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgXCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgeTogdmVydGljYWxPZmZzZXQgLSAwLjUsXG4gICAgICAgICAgICB4OiB5ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcblxuXG4gICAgICBbLTEqKDE2ICsgMTYvMiArIDE2LygyKjIpKSwgKDE2ICsgMTYvMiArIDE2LygyKjIpKSArIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpKihyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKV0uZm9yRWFjaChob3Jpem9udGFsT2Zmc2V0ID0+IHtcbiAgICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChjb29yZGluYXRlQ29udGFpbmVyLCB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwidGV4dFwiLCB7XG4gICAgICAgICAgdGV4dDogYm9hcmRTdGF0ZS55Q29vcmRpbmF0ZUZvcih5KSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBcInRleHQtYW5jaG9yXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICB5OiB5ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41ICsgMTYvKDIqMiksXG4gICAgICAgICAgICB4OiBob3Jpem9udGFsT2Zmc2V0IC0gMC41XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcblxuICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChzdmcsIGNvb3JkaW5hdGVDb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGludGVyc2VjdGlvbnMgPSB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7IGF0dHJpYnV0ZXM6IHsgY2xhc3M6IFwiaW50ZXJzZWN0aW9uc1wiIH19KTtcblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGJvYXJkU3RhdGUuYm9hcmRTaXplOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplOyB4KyspIHtcblxuICAgICAgLy8gY29uc3QgaXNCbHVlID0geD09PTMgJiYgeT09PTM7XG5cbiAgICAgIGNvbnN0IGludGVyc2VjdGlvbkdyb3VwID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwiaW50ZXJzZWN0aW9uXCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpbnRlcnNlY3Rpb25Hcm91cC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWludGVyc2VjdGlvbi15XCIsIHkpO1xuICAgICAgaW50ZXJzZWN0aW9uR3JvdXAuc2V0QXR0cmlidXRlKFwiZGF0YS1pbnRlcnNlY3Rpb24teFwiLCB4KTtcbiAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9ucywgaW50ZXJzZWN0aW9uR3JvdXApO1xuXG4gICAgICBjb25zdCBpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciA9IHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcImludGVyc2VjdGlvbi1pbm5lci1jb250YWluZXJcIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uR3JvdXAsIGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyKTtcblxuICAgICAgY29uc3QgaW50ZXJzZWN0aW9uQm94ID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInJlY3RcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgeTogeSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRS8yIC0gMC41LFxuICAgICAgICAgIHg6IHggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUvMiAtIDAuNSxcbiAgICAgICAgICB3aWR0aDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFLFxuICAgICAgICAgIGhlaWdodDogcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgaW50ZXJzZWN0aW9uQm94KTtcblxuICAgICAgbGV0IHN0b25lUmFkaXVzID0gcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC8gMjsgLy8gKGlzQmx1ZSA/IDEgOiAyKTtcblxuICAgICAgaWYgKHNtYWxsZXJTdG9uZXMpIHtcbiAgICAgICAgc3RvbmVSYWRpdXMgLT0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvbmVBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjbGFzczogXCJzdG9uZVwiLFxuICAgICAgICBjeTogeSAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgY3g6IHggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgIHI6IHN0b25lUmFkaXVzXG4gICAgICB9O1xuXG4gICAgICBpZiAoIWZsYXRTdG9uZXMpIHtcbiAgICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgY2xhc3M6IFwic3RvbmUtc2hhZG93XCIsXG4gICAgICAgICAgICBjeTogc3RvbmVBdHRyaWJ1dGVzW1wiY3lcIl0gKyAyLFxuICAgICAgICAgICAgY3g6IHN0b25lQXR0cmlidXRlc1tcImN4XCJdLFxuICAgICAgICAgICAgcjogc3RvbmVSYWRpdXMsXG4gICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHN0b25lQXR0cmlidXRlc1xuICAgICAgfSk7XG4gICAgICB1dGlscy5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBpbnRlcnNlY3Rpb24pO1xuXG4gICAgICB1dGlscy5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCB1dGlscy5jcmVhdGVTVkdFbGVtZW50KFwiY2lyY2xlXCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcIm1hcmtlclwiLFxuICAgICAgICAgIGN5OiB5ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgIGN4OiB4ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgIHI6IDQuNVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHV0aWxzLmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIHV0aWxzLmNyZWF0ZVNWR0VsZW1lbnQoXCJyZWN0XCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcImtvLW1hcmtlclwiLFxuICAgICAgICAgIHk6IHkgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2IC0gMC41LFxuICAgICAgICAgIHg6IHggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2IC0gMC41LFxuICAgICAgICAgIHdpZHRoOiAxMixcbiAgICAgICAgICBoZWlnaHQ6IDEyXG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgdXRpbHMuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgdXRpbHMuY3JlYXRlU1ZHRWxlbWVudChcInJlY3RcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwidGVycml0b3J5LW1hcmtlclwiLFxuICAgICAgICAgIHk6IHkgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2LFxuICAgICAgICAgIHg6IHggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2LFxuICAgICAgICAgIHdpZHRoOiAxMSxcbiAgICAgICAgICBoZWlnaHQ6IDExXG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgcmVuZGVyZXIuZ3JpZFt5XSA9IHJlbmRlcmVyLmdyaWRbeV0gfHwgW107XG4gICAgICByZW5kZXJlci5ncmlkW3ldW3hdID0gaW50ZXJzZWN0aW9uR3JvdXA7XG5cbiAgICAgIHJlbmRlcmVyLmFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzKGludGVyc2VjdGlvbkdyb3VwLCB5LCB4KTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCBpbnRlcnNlY3Rpb25zKTtcblxuICByZXR1cm4gc3ZnO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlLmdlbmVyYXRlQm9hcmQgPSBmdW5jdGlvbihib2FyZFN0YXRlLCB7IGhhc0Nvb3JkaW5hdGVzLCBzbWFsbGVyU3RvbmVzLCBmbGF0U3RvbmVzIH0pIHtcbiAgdGhpcy5ibGFja0dyYWRpZW50SUQgPSB1dGlscy5yYW5kb21JRChcImJsYWNrLWdyYWRpZW50XCIpO1xuICB0aGlzLndoaXRlR3JhZGllbnRJRCA9IHV0aWxzLnJhbmRvbUlEKFwid2hpdGUtZ3JhZGllbnRcIik7XG4gIHRoaXMuYmx1ZUdyYWRpZW50SUQgPSB1dGlscy5yYW5kb21JRChcImJsdWUtZ3JhZGllbnRcIik7XG5cbiAgY29uc3Qgc3ZnID0gY29uc3RydWN0U1ZHKHRoaXMsIGJvYXJkU3RhdGUsIHsgaGFzQ29vcmRpbmF0ZXMsIHNtYWxsZXJTdG9uZXMsIGZsYXRTdG9uZXMgfSk7XG5cbiAgdGhpcy5zdmdFbGVtZW50ID0gc3ZnO1xuICB0aGlzLnN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcbiAgdGhpcy5zdmdFbGVtZW50LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcblxuICByZXR1cm4gc3ZnO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlLmNvbXB1dGVTaXppbmcgPSBmdW5jdGlvbigpIHtcbiAgUmVuZGVyZXIucHJvdG90eXBlLmNvbXB1dGVTaXppbmcuY2FsbCh0aGlzKTtcblxuICAvLyBJbiBhZGRpdGlvbiB0byB0aGUgd2lsbC1jaGFuZ2UgcmUtcmFzdGVyIGluIFJlbmRlcmVyLFxuICAvLyB0aGUgU1ZHIGVsZW1lbnQgYXBwZWFycyB0byBzb21ldGltZXMgbmVlZCB0aGlzIHRvXG4gIC8vIHByZXZlbnQgYmx1cnJpbmVzcyBvbiByZXNpemUuXG4gIHRoaXMuc3ZnRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIm5vbmVcIjtcblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICB0aGlzLnN2Z0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgfSk7XG59O1xuXG5TVkdSZW5kZXJlci5wcm90b3R5cGUuc2V0SW50ZXJzZWN0aW9uQ2xhc3NlcyA9IGZ1bmN0aW9uKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpIHtcbiAgaWYgKGludGVyc2VjdGlvbkVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICE9PSBjbGFzc2VzLmpvaW4oXCIgXCIpKSB7XG4gICAgaW50ZXJzZWN0aW9uRWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gIH1cblxuICBpZiAoIXRoaXMuZmxhdFN0b25lcykge1xuICAgIGlmIChpbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICBpbnRlcnNlY3Rpb25FbC5xdWVyeVNlbGVjdG9yKFwiLnN0b25lXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYXNlID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXTtcbiAgICAgIGludGVyc2VjdGlvbkVsLnF1ZXJ5U2VsZWN0b3IoXCIuc3RvbmVcIikuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmaWxsOiB1cmwoXCIgKyBiYXNlICsgXCIjXCIgKyB0aGlzW2ludGVyc2VjdGlvbi52YWx1ZSArIFwiR3JhZGllbnRJRFwiXSArIFwiKVwiKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNWR1JlbmRlcmVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxNQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxTQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFBa0MsU0FBQUQsdUJBQUFHLEdBQUE7RUFBQSxPQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBO0lBQUEsV0FBQUE7RUFBQTtBQUFBO0FBRWxDLElBQU1FLFdBQVcsR0FBRyxTQUFkQSxXQUFXQSxDQUFZQyxZQUFZLEVBQUFDLElBQUEsRUFBc0I7RUFBQSxJQUFsQkMsS0FBSyxHQUFBRCxJQUFBLENBQUxDLEtBQUs7SUFBRUMsT0FBTyxHQUFBRixJQUFBLENBQVBFLE9BQU87RUFDekRQLFNBQUEsV0FBUSxDQUFDUSxJQUFJLENBQUMsSUFBSSxFQUFFSixZQUFZLEVBQUU7SUFBRUUsS0FBSyxFQUFFQSxLQUFLO0lBQUVDLE9BQU8sRUFBRUE7RUFBUSxDQUFDLENBQUM7RUFDckVWLE1BQUEsV0FBSyxDQUFDWSxRQUFRLENBQUNMLFlBQVksRUFBRSxxQkFBcUIsQ0FBQztBQUNyRCxDQUFDO0FBRURELFdBQVcsQ0FBQ08sU0FBUyxHQUFHQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ1osU0FBQSxXQUFRLENBQUNVLFNBQVMsQ0FBQztBQUN6RFAsV0FBVyxDQUFDTyxTQUFTLENBQUNHLFdBQVcsR0FBR1YsV0FBVztBQUUvQyxJQUFNVyx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFFbkMsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQVlDLFFBQVEsRUFBRUMsVUFBVSxFQUFBQyxLQUFBLEVBQWlEO0VBQUEsSUFBN0NDLGNBQWMsR0FBQUQsS0FBQSxDQUFkQyxjQUFjO0lBQUVDLGFBQWEsR0FBQUYsS0FBQSxDQUFiRSxhQUFhO0lBQUVDLFVBQVUsR0FBQUgsS0FBQSxDQUFWRyxVQUFVO0VBQzdGLElBQU1DLFFBQVEsR0FBRyxDQUFDTCxVQUFVLENBQUNNLFNBQVMsRUFBRUosY0FBYyxFQUFFQyxhQUFhLEVBQUVDLFVBQVUsQ0FBQyxDQUFDRyxRQUFRLENBQUMsQ0FBQztFQUU3RixJQUFNQyxHQUFHLEdBQUc1QixNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLEtBQUssQ0FBQztFQUN6QyxJQUFNQyxJQUFJLEdBQUc5QixNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztFQUMzQzdCLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDSCxHQUFHLEVBQUVFLElBQUksQ0FBQztFQUU5QixJQUFNRSxhQUFhLEdBQUdoQyxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFO0lBQzdESSxVQUFVLEVBQUU7TUFDVkMsRUFBRSxFQUFFZixRQUFRLENBQUNnQixlQUFlO01BQzVCQyxFQUFFLEVBQUUsS0FBSztNQUNUQyxDQUFDLEVBQUU7SUFDTDtFQUNGLENBQUMsQ0FBQztFQUNGckMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNDLGFBQWEsRUFBRWhDLE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQ2hFSSxVQUFVLEVBQUU7TUFDVkssTUFBTSxFQUFFLElBQUk7TUFDWixZQUFZLEVBQUU7SUFDaEI7RUFDRixDQUFDLENBQUMsQ0FBQztFQUNIdEMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNDLGFBQWEsRUFBRWhDLE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQ2hFSSxVQUFVLEVBQUU7TUFDVkssTUFBTSxFQUFFLE1BQU07TUFDZCxZQUFZLEVBQUU7SUFDaEI7RUFDRixDQUFDLENBQUMsQ0FBQztFQUNIdEMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNELElBQUksRUFBRUUsYUFBYSxDQUFDO0VBRXhDLElBQU1PLGFBQWEsR0FBR3ZDLE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUU7SUFDN0RJLFVBQVUsRUFBRTtNQUNWQyxFQUFFLEVBQUVmLFFBQVEsQ0FBQ3FCLGVBQWU7TUFDNUJKLEVBQUUsRUFBRSxLQUFLO01BQ1RDLENBQUMsRUFBRTtJQUNMO0VBQ0YsQ0FBQyxDQUFDO0VBQ0ZyQyxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQ1EsYUFBYSxFQUFFdkMsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7SUFDaEVJLFVBQVUsRUFBRTtNQUNWSyxNQUFNLEVBQUUsSUFBSTtNQUNaLFlBQVksRUFBRTtJQUNoQjtFQUNGLENBQUMsQ0FBQyxDQUFDO0VBQ0h0QyxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQ1EsYUFBYSxFQUFFdkMsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7SUFDaEVJLFVBQVUsRUFBRTtNQUNWSyxNQUFNLEVBQUUsTUFBTTtNQUNkLFlBQVksRUFBRTtJQUNoQjtFQUNGLENBQUMsQ0FBQyxDQUFDO0VBQ0h0QyxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQ0QsSUFBSSxFQUFFUyxhQUFhLENBQUM7RUFFeEMsSUFBTUUsWUFBWSxHQUFHekMsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRTtJQUM1REksVUFBVSxFQUFFO01BQ1ZDLEVBQUUsRUFBRWYsUUFBUSxDQUFDdUI7TUFDYjtNQUNBO0lBQ0Y7RUFDRixDQUFDLENBQUM7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTFDLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDVSxZQUFZLEVBQUV6QyxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUMvREksVUFBVSxFQUFFO01BQ1ZLLE1BQU0sRUFBRSxNQUFNO01BQ2Q7TUFDQSxZQUFZLEVBQUU7SUFDaEI7RUFDRixDQUFDLENBQUMsQ0FBQztFQUNIdEMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNELElBQUksRUFBRVcsWUFBWSxDQUFDO0VBRXZDLElBQU1FLGlCQUFpQixHQUFHM0MsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7SUFDcERJLFVBQVUsRUFBRTtNQUNWLFNBQU8sVUFBVTtNQUNqQlcsU0FBUyxlQUFBQyxNQUFBLENBQWUxQixRQUFRLENBQUMyQixNQUFNLFFBQUFELE1BQUEsQ0FBSzFCLFFBQVEsQ0FBQzJCLE1BQU07SUFDN0Q7RUFDRixDQUFDLENBQUM7RUFDRjlDLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDSCxHQUFHLEVBQUVlLGlCQUFpQixDQUFDO0VBRTNDLElBQUlJLEtBQUs7RUFFVCxJQUFJOUIsd0JBQXdCLENBQUNRLFFBQVEsQ0FBQyxFQUFFO0lBQ3RDc0IsS0FBSyxHQUFHL0MsTUFBQSxXQUFLLENBQUNnRCxLQUFLLENBQUMvQix3QkFBd0IsQ0FBQ1EsUUFBUSxDQUFDLENBQUM7RUFDekQsQ0FBQyxNQUFNO0lBQ0xzQixLQUFLLEdBQUcvQyxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtNQUNsQ0ksVUFBVSxFQUFFO1FBQ1YsU0FBTztNQUNUO0lBQ0YsQ0FBQyxDQUFDO0lBRUYsS0FBSyxJQUFJZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHN0IsVUFBVSxDQUFDTSxTQUFTLEdBQUcsQ0FBQyxFQUFFdUIsQ0FBQyxFQUFFLEVBQUU7TUFDakQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc5QixVQUFVLENBQUNNLFNBQVMsR0FBRyxDQUFDLEVBQUV3QixDQUFDLEVBQUUsRUFBRTtRQUNqRCxJQUFNQyxPQUFPLEdBQUduRCxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtVQUM3Q0ksVUFBVSxFQUFFO1lBQ1ZnQixDQUFDLEVBQUVBLENBQUMsSUFBSTlCLFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUc7WUFDakRGLENBQUMsRUFBRUEsQ0FBQyxJQUFJL0IsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUNqREMsS0FBSyxFQUFFbEMsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQztZQUN6Q0UsTUFBTSxFQUFFbkMsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQztZQUMxQyxTQUFPO1VBQ1Q7UUFDRixDQUFDLENBQUM7UUFFRnBELE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDZ0IsS0FBSyxFQUFFSSxPQUFPLENBQUM7TUFDckM7SUFDRjtJQUVBbEMsd0JBQXdCLENBQUNRLFFBQVEsQ0FBQyxHQUFHc0IsS0FBSztFQUM1QztFQUVBL0MsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNZLGlCQUFpQixFQUFFSSxLQUFLLENBQUM7RUFFN0MsSUFBTVEsV0FBVyxHQUFHdkQsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7SUFBRUksVUFBVSxFQUFFO01BQUUsU0FBTztJQUFRO0VBQUMsQ0FBQyxDQUFDO0VBQ2xGakMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUNZLGlCQUFpQixFQUFFWSxXQUFXLENBQUM7RUFFbkRwRCxTQUFBLFdBQVEsQ0FBQ3FELGlCQUFpQixDQUFDcEMsVUFBVSxDQUFDTSxTQUFTLENBQUMsQ0FBQytCLE9BQU8sQ0FBQyxVQUFBQyxDQUFDLEVBQUk7SUFDNUQsSUFBTUMsS0FBSyxHQUFHM0QsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7TUFDN0NJLFVBQVUsRUFBRTtRQUNWLFNBQU8sT0FBTztRQUNkRyxFQUFFLEVBQUVzQixDQUFDLENBQUNFLEdBQUcsSUFBSXpDLFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDdERTLEVBQUUsRUFBRUgsQ0FBQyxDQUFDSSxJQUFJLElBQUkzQyxRQUFRLENBQUNpQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO1FBQ3ZEZixDQUFDLEVBQUU7TUFDTDtJQUNGLENBQUMsQ0FBQztJQUVGckMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUN3QixXQUFXLEVBQUVJLEtBQUssQ0FBQztFQUN6QyxDQUFDLENBQUM7RUFFRixJQUFJckMsY0FBYyxFQUFFO0lBQ2xCLElBQU15QyxtQkFBbUIsR0FBRy9ELE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO01BQ3RESSxVQUFVLEVBQUU7UUFDVixTQUFPLGFBQWE7UUFDcEJXLFNBQVMsZUFBQUMsTUFBQSxDQUFlMUIsUUFBUSxDQUFDMkIsTUFBTSxRQUFBRCxNQUFBLENBQUsxQixRQUFRLENBQUMyQixNQUFNO01BQzdEO0lBQ0YsQ0FBQyxDQUFDO0lBQUMsSUFBQWtCLEtBQUEsWUFBQUEsTUFBQUMsRUFBQSxFQUU0QztNQUM3Qzs7TUFFQSxDQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM3QyxVQUFVLENBQUNNLFNBQVMsR0FBRyxDQUFDLEtBQUdQLFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNLLE9BQU8sQ0FBQyxVQUFBUyxjQUFjLEVBQUk7UUFDbktsRSxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQ2dDLG1CQUFtQixFQUFFL0QsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7VUFDdEVzQyxJQUFJLEVBQUUvQyxVQUFVLENBQUNnRCxjQUFjLENBQUNILEVBQUMsQ0FBQztVQUNsQ2hDLFVBQVUsRUFBRTtZQUNWLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCZ0IsQ0FBQyxFQUFFaUIsY0FBYyxHQUFHLEdBQUc7WUFDdkJoQixDQUFDLEVBQUVlLEVBQUMsSUFBSTlDLFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHO1VBQ2hEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7TUFDTCxDQUFDLENBQUM7TUFHRixDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRyxFQUFFLEdBQUcsRUFBRSxHQUFDLENBQUMsR0FBRyxFQUFFLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFJLENBQUNoQyxVQUFVLENBQUNNLFNBQVMsR0FBRyxDQUFDLEtBQUdQLFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNLLE9BQU8sQ0FBQyxVQUFBWSxnQkFBZ0IsRUFBSTtRQUNoSnJFLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDZ0MsbUJBQW1CLEVBQUUvRCxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtVQUN0RXNDLElBQUksRUFBRS9DLFVBQVUsQ0FBQ2tELGNBQWMsQ0FBQ0wsRUFBQyxDQUFDO1VBQ2xDaEMsVUFBVSxFQUFFO1lBQ1YsYUFBYSxFQUFFLFFBQVE7WUFDdkJnQixDQUFDLEVBQUVnQixFQUFDLElBQUk5QyxRQUFRLENBQUNpQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDNURGLENBQUMsRUFBRW1CLGdCQUFnQixHQUFHO1VBQ3hCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7TUFDTCxDQUFDLENBQUM7TUFFRnJFLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDSCxHQUFHLEVBQUVtQyxtQkFBbUIsQ0FBQztJQUMvQyxDQUFDO0lBM0JELEtBQUssSUFBSUUsRUFBQyxHQUFHLENBQUMsRUFBRUEsRUFBQyxHQUFHN0MsVUFBVSxDQUFDTSxTQUFTLEVBQUV1QyxFQUFDLEVBQUU7TUFBQUQsS0FBQSxDQUFBQyxFQUFBO0lBQUE7RUE0Qi9DO0VBRUEsSUFBTU0sYUFBYSxHQUFHdkUsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7SUFBRUksVUFBVSxFQUFFO01BQUUsU0FBTztJQUFnQjtFQUFDLENBQUMsQ0FBQztFQUU1RixLQUFLLElBQUl1QyxHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLEdBQUdwRCxVQUFVLENBQUNNLFNBQVMsRUFBRThDLEdBQUMsRUFBRSxFQUFFO0lBQzdDLEtBQUssSUFBSUMsRUFBQyxHQUFHLENBQUMsRUFBRUEsRUFBQyxHQUFHckQsVUFBVSxDQUFDTSxTQUFTLEVBQUUrQyxFQUFDLEVBQUUsRUFBRTtNQUU3Qzs7TUFFQSxJQUFNQyxpQkFBaUIsR0FBRzFFLE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1FBQ3BESSxVQUFVLEVBQUU7VUFDVixTQUFPO1FBQ1Q7TUFDRixDQUFDLENBQUM7TUFDRnlDLGlCQUFpQixDQUFDQyxZQUFZLENBQUMscUJBQXFCLEVBQUVILEdBQUMsQ0FBQztNQUN4REUsaUJBQWlCLENBQUNDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRUYsRUFBQyxDQUFDO01BQ3hEekUsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUN3QyxhQUFhLEVBQUVHLGlCQUFpQixDQUFDO01BRXJELElBQU1FLDBCQUEwQixHQUFHNUUsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7UUFDN0RJLFVBQVUsRUFBRTtVQUNWLFNBQU87UUFDVDtNQUNGLENBQUMsQ0FBQztNQUNGakMsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUMyQyxpQkFBaUIsRUFBRUUsMEJBQTBCLENBQUM7TUFFbEUsSUFBTUMsZUFBZSxHQUFHN0UsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7UUFDckRJLFVBQVUsRUFBRTtVQUNWZ0IsQ0FBQyxFQUFFdUIsR0FBQyxJQUFJckQsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUdqQyxRQUFRLENBQUNpQyxxQkFBcUIsR0FBQyxDQUFDLEdBQUcsR0FBRztVQUNwRkYsQ0FBQyxFQUFFdUIsRUFBQyxJQUFJdEQsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUdqQyxRQUFRLENBQUNpQyxxQkFBcUIsR0FBQyxDQUFDLEdBQUcsR0FBRztVQUNwRkMsS0FBSyxFQUFFbEMsUUFBUSxDQUFDaUMscUJBQXFCO1VBQ3JDRSxNQUFNLEVBQUVuQyxRQUFRLENBQUNpQztRQUNuQjtNQUNGLENBQUMsQ0FBQztNQUNGcEQsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUM2QywwQkFBMEIsRUFBRUMsZUFBZSxDQUFDO01BRWhFLElBQUlDLFdBQVcsR0FBRzNELFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDOztNQUV0RCxJQUFJN0IsYUFBYSxFQUFFO1FBQ2pCdUQsV0FBVyxJQUFJLENBQUM7TUFDbEI7TUFFQSxJQUFNQyxlQUFlLEdBQUc7UUFDdEIsU0FBTyxPQUFPO1FBQ2QzQyxFQUFFLEVBQUVvQyxHQUFDLElBQUlyRCxRQUFRLENBQUNpQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO1FBQ2xEUyxFQUFFLEVBQUVZLEVBQUMsSUFBSXRELFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDbERmLENBQUMsRUFBRXlDO01BQ0wsQ0FBQztNQUVELElBQUksQ0FBQ3RELFVBQVUsRUFBRTtRQUNmeEIsTUFBQSxXQUFLLENBQUMrQixhQUFhLENBQUM2QywwQkFBMEIsRUFBRTVFLE1BQUEsV0FBSyxDQUFDNkIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1VBQy9FSSxVQUFVLEVBQUU7WUFDVixTQUFPLGNBQWM7WUFDckJHLEVBQUUsRUFBRTJDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQzdCbEIsRUFBRSxFQUFFa0IsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN6QjFDLENBQUMsRUFBRXlDO1VBRUw7UUFDRixDQUFDLENBQUMsQ0FBQztNQUNMO01BRUEsSUFBTUUsWUFBWSxHQUFHaEYsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7UUFDcERJLFVBQVUsRUFBRThDO01BQ2QsQ0FBQyxDQUFDO01BQ0YvRSxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQzZDLDBCQUEwQixFQUFFSSxZQUFZLENBQUM7TUFFN0RoRixNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQzZDLDBCQUEwQixFQUFFNUUsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7UUFDL0VJLFVBQVUsRUFBRTtVQUNWLFNBQU8sUUFBUTtVQUNmRyxFQUFFLEVBQUVvQyxHQUFDLElBQUlyRCxRQUFRLENBQUNpQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO1VBQ2xEUyxFQUFFLEVBQUVZLEVBQUMsSUFBSXRELFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUc7VUFDbERmLENBQUMsRUFBRTtRQUNMO01BQ0YsQ0FBQyxDQUFDLENBQUM7TUFFSHJDLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDNkMsMEJBQTBCLEVBQUU1RSxNQUFBLFdBQUssQ0FBQzZCLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUM3RUksVUFBVSxFQUFFO1VBQ1YsU0FBTyxXQUFXO1VBQ2xCZ0IsQ0FBQyxFQUFFdUIsR0FBQyxJQUFJckQsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUc7VUFDckRGLENBQUMsRUFBRXVCLEVBQUMsSUFBSXRELFFBQVEsQ0FBQ2lDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHO1VBQ3JEQyxLQUFLLEVBQUUsRUFBRTtVQUNUQyxNQUFNLEVBQUU7UUFDVjtNQUNGLENBQUMsQ0FBQyxDQUFDO01BRUh0RCxNQUFBLFdBQUssQ0FBQytCLGFBQWEsQ0FBQzZDLDBCQUEwQixFQUFFNUUsTUFBQSxXQUFLLENBQUM2QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7UUFDN0VJLFVBQVUsRUFBRTtVQUNWLFNBQU8sa0JBQWtCO1VBQ3pCZ0IsQ0FBQyxFQUFFdUIsR0FBQyxJQUFJckQsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztVQUMvQ0YsQ0FBQyxFQUFFdUIsRUFBQyxJQUFJdEQsUUFBUSxDQUFDaUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztVQUMvQ0MsS0FBSyxFQUFFLEVBQUU7VUFDVEMsTUFBTSxFQUFFO1FBQ1Y7TUFDRixDQUFDLENBQUMsQ0FBQztNQUVIbkMsUUFBUSxDQUFDOEQsSUFBSSxDQUFDVCxHQUFDLENBQUMsR0FBR3JELFFBQVEsQ0FBQzhELElBQUksQ0FBQ1QsR0FBQyxDQUFDLElBQUksRUFBRTtNQUN6Q3JELFFBQVEsQ0FBQzhELElBQUksQ0FBQ1QsR0FBQyxDQUFDLENBQUNDLEVBQUMsQ0FBQyxHQUFHQyxpQkFBaUI7TUFFdkN2RCxRQUFRLENBQUMrRCw2QkFBNkIsQ0FBQ1IsaUJBQWlCLEVBQUVGLEdBQUMsRUFBRUMsRUFBQyxDQUFDO0lBQ2pFO0VBQ0Y7RUFFQXpFLE1BQUEsV0FBSyxDQUFDK0IsYUFBYSxDQUFDWSxpQkFBaUIsRUFBRTRCLGFBQWEsQ0FBQztFQUVyRCxPQUFPM0MsR0FBRztBQUNaLENBQUM7QUFFRHRCLFdBQVcsQ0FBQ08sU0FBUyxDQUFDc0UsYUFBYSxHQUFHLFVBQVMvRCxVQUFVLEVBQUFnRSxLQUFBLEVBQWlEO0VBQUEsSUFBN0M5RCxjQUFjLEdBQUE4RCxLQUFBLENBQWQ5RCxjQUFjO0lBQUVDLGFBQWEsR0FBQTZELEtBQUEsQ0FBYjdELGFBQWE7SUFBRUMsVUFBVSxHQUFBNEQsS0FBQSxDQUFWNUQsVUFBVTtFQUNwRyxJQUFJLENBQUNXLGVBQWUsR0FBR25DLE1BQUEsV0FBSyxDQUFDcUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDO0VBQ3ZELElBQUksQ0FBQzdDLGVBQWUsR0FBR3hDLE1BQUEsV0FBSyxDQUFDcUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDO0VBQ3ZELElBQUksQ0FBQzNDLGNBQWMsR0FBRzFDLE1BQUEsV0FBSyxDQUFDcUYsUUFBUSxDQUFDLGVBQWUsQ0FBQztFQUVyRCxJQUFNekQsR0FBRyxHQUFHVixZQUFZLENBQUMsSUFBSSxFQUFFRSxVQUFVLEVBQUU7SUFBRUUsY0FBYyxFQUFkQSxjQUFjO0lBQUVDLGFBQWEsRUFBYkEsYUFBYTtJQUFFQyxVQUFVLEVBQVZBO0VBQVcsQ0FBQyxDQUFDO0VBRXpGLElBQUksQ0FBQzhELFVBQVUsR0FBRzFELEdBQUc7RUFDckIsSUFBSSxDQUFDMEQsVUFBVSxDQUFDWCxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ1ksWUFBWSxDQUFDO0VBQ3pELElBQUksQ0FBQ0QsVUFBVSxDQUFDWCxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ1ksWUFBWSxDQUFDO0VBRXhELE9BQU8zRCxHQUFHO0FBQ1osQ0FBQztBQUVEdEIsV0FBVyxDQUFDTyxTQUFTLENBQUMyRSxhQUFhLEdBQUcsWUFBVztFQUFBLElBQUFDLEtBQUE7RUFDL0N0RixTQUFBLFdBQVEsQ0FBQ1UsU0FBUyxDQUFDMkUsYUFBYSxDQUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQzs7RUFFM0M7RUFDQTtFQUNBO0VBQ0EsSUFBSSxDQUFDMkUsVUFBVSxDQUFDSSxLQUFLLENBQUM5QyxTQUFTLEdBQUcsTUFBTTtFQUV4QytDLE1BQU0sQ0FBQ0MscUJBQXFCLENBQUMsWUFBTTtJQUNqQ0gsS0FBSSxDQUFDSCxVQUFVLENBQUNJLEtBQUssQ0FBQzlDLFNBQVMsR0FBRyxFQUFFO0VBQ3RDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRHRDLFdBQVcsQ0FBQ08sU0FBUyxDQUFDZ0Ysc0JBQXNCLEdBQUcsVUFBU0MsY0FBYyxFQUFFZCxZQUFZLEVBQUVlLE9BQU8sRUFBRTtFQUM3RixJQUFJRCxjQUFjLENBQUNFLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBS0QsT0FBTyxDQUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDOURILGNBQWMsQ0FBQ25CLFlBQVksQ0FBQyxPQUFPLEVBQUVvQixPQUFPLENBQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6RDtFQUVBLElBQUksQ0FBQyxJQUFJLENBQUN6RSxVQUFVLEVBQUU7SUFDcEIsSUFBSXdELFlBQVksQ0FBQ2tCLE9BQU8sQ0FBQyxDQUFDLEVBQUU7TUFDMUJKLGNBQWMsQ0FBQ0ssYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDeEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDbEUsQ0FBQyxNQUFNO01BQ0wsSUFBTXlCLElBQUksR0FBR1QsTUFBTSxDQUFDVSxRQUFRLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUMvQ1QsY0FBYyxDQUFDSyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUN4QixZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksR0FBR3lCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDcEIsWUFBWSxDQUFDd0IsS0FBSyxHQUFHLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN6STtFQUNGO0FBQ0YsQ0FBQztBQUFDLElBQUFDLFFBQUEsR0FBQUMsT0FBQSxjQUVhcEcsV0FBVyJ9
},{"./renderer":10,"./utils":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  flatten: function flatten(ary) {
    return ary.reduce(function (a, b) {
      return a.concat(b);
    });
  },
  flatMap: function flatMap(ary, lambda) {
    return Array.prototype.concat.apply([], ary.map(lambda));
  },
  cartesianProduct: function cartesianProduct(ary1, ary2) {
    return this.flatten(ary1.map(function (x) {
      return ary2.map(function (y) {
        return [x, y];
      });
    }));
  },
  randomID: function randomID(prefix) {
    var str = [0, 1, 2, 3].map(function () {
      return Math.floor(Math.random() * 0x10000).toString(16).substring(1);
    }).join("");
    return "".concat(prefix, "-").concat(str);
  },
  clone: function clone(element) {
    return element.cloneNode(true);
  },
  createElement: function createElement(elementName, options) {
    var element = document.createElement(elementName);
    if (typeof options !== "undefined") {
      if (options["class"]) {
        element.className = options["class"];
      }
    }
    return element;
  },
  createSVGElement: function createSVGElement(elementName, options) {
    var _this = this;
    var svgNamespace = "http://www.w3.org/2000/svg";
    var element = document.createElementNS(svgNamespace, elementName);
    if (typeof options !== "undefined") {
      if (options["class"]) {
        options["class"].split(" ").forEach(function (name) {
          _this.addClass(element, name);
        });
      }
      if (options.attributes) {
        Object.keys(options.attributes).forEach(function (k) {
          element.setAttribute(k, options.attributes[k]);
        });
      }
      if (options.text) {
        element.textContent = options.text.toString();
      }
    }
    return element;
  },
  appendElement: function appendElement(parent, el) {
    parent.insertBefore(el, null);
  },
  addEventListener: function addEventListener(el, eventName, fn) {
    el.addEventListener(eventName, fn, false);
  },
  removeClass: function removeClass(el, className) {
    if (!this.hasClass(el, className)) {
      return;
    }
    if (el.classList && el.classList.remove) {
      el.classList.remove(className);
      return;
    }
    var classNameRegex = RegExp('\\b' + className + '\\b', "g");
    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class").replace(classNameRegex, ""));
    } else {
      el.className = el.getAttribute("class").replace(classNameRegex, "");
    }
  },
  addClass: function addClass(el, className) {
    if (el.classList && el.classList.add) {
      el.classList.add(className);
      return;
    }
    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class") + " " + className);
    } else {
      el.className = el.getAttribute("class") + " " + className;
    }
  },
  hasClass: function hasClass(el, className) {
    if (el.classList && el.classList.contains) {
      return el.classList.contains(className);
    }
    var classNameRegex = RegExp('\\b' + className + '\\b', "g");
    if (el instanceof SVGElement) {
      return classNameRegex.test(el.getAttribute("class"));
    } else {
      return classNameRegex.test(el.className);
    }
  },
  toggleClass: function toggleClass(el, className) {
    if (el.classList && el.classList.toggle) {
      el.classList.toggle(className);
      return;
    }
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  },
  unique: function unique(ary) {
    var unique = [];
    ary.forEach(function (el) {
      if (unique.indexOf(el) < 0) {
        unique.push(el);
      }
    });
    return unique;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmbGF0dGVuIiwiYXJ5IiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJmbGF0TWFwIiwibGFtYmRhIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhcHBseSIsIm1hcCIsImNhcnRlc2lhblByb2R1Y3QiLCJhcnkxIiwiYXJ5MiIsIngiLCJ5IiwicmFuZG9tSUQiLCJwcmVmaXgiLCJzdHIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImpvaW4iLCJjbG9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjcmVhdGVFbGVtZW50IiwiZWxlbWVudE5hbWUiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJjbGFzc05hbWUiLCJjcmVhdGVTVkdFbGVtZW50IiwiX3RoaXMiLCJzdmdOYW1lc3BhY2UiLCJjcmVhdGVFbGVtZW50TlMiLCJzcGxpdCIsImZvckVhY2giLCJuYW1lIiwiYWRkQ2xhc3MiLCJhdHRyaWJ1dGVzIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJhcHBlbmRFbGVtZW50IiwicGFyZW50IiwiZWwiLCJpbnNlcnRCZWZvcmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiZm4iLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY2xhc3NOYW1lUmVnZXgiLCJSZWdFeHAiLCJTVkdFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwicmVwbGFjZSIsImFkZCIsImNvbnRhaW5zIiwidGVzdCIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlIiwidW5pcXVlIiwiaW5kZXhPZiIsInB1c2giXSwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBmbGF0dGVuOiBmdW5jdGlvbihhcnkpIHtcbiAgICByZXR1cm4gYXJ5LnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpO1xuICB9LFxuXG4gIGZsYXRNYXA6IGZ1bmN0aW9uKGFyeSwgbGFtYmRhKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFyeS5tYXAobGFtYmRhKSk7XG4gIH0sXG5cbiAgY2FydGVzaWFuUHJvZHVjdDogZnVuY3Rpb24oYXJ5MSwgYXJ5Mikge1xuICAgIHJldHVybiB0aGlzLmZsYXR0ZW4oYXJ5MS5tYXAoeCA9PiBhcnkyLm1hcCh5ID0+IFt4LCB5XSkpKTtcbiAgfSxcblxuICByYW5kb21JRDogZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgY29uc3Qgc3RyID0gWzAsIDEsIDIsIDNdLm1hcCgoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICB9KS5qb2luKFwiXCIpO1xuXG4gICAgcmV0dXJuIGAke3ByZWZpeH0tJHtzdHJ9YDtcbiAgfSxcblxuICBjbG9uZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfSxcblxuICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50TmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3MpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZVNWR0VsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnROYW1lLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc3ZnTmFtZXNwYWNlID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTmFtZXNwYWNlLCBlbGVtZW50TmFtZSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChvcHRpb25zLmNsYXNzKSB7XG4gICAgICAgIG9wdGlvbnMuY2xhc3Muc3BsaXQoXCIgXCIpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRDbGFzcyhlbGVtZW50LCBuYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5hdHRyaWJ1dGVzKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGssIG9wdGlvbnMuYXR0cmlidXRlc1trXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy50ZXh0KSB7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb25zLnRleHQudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBhcHBlbmRFbGVtZW50OiBmdW5jdGlvbihwYXJlbnQsIGVsKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShlbCwgbnVsbCk7XG4gIH0sXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oZWwsIGV2ZW50TmFtZSwgZm4pIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4sIGZhbHNlKTtcbiAgfSxcblxuICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmICghdGhpcy5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LnJlbW92ZSkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZVJlZ2V4ID0gUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInLCBcImdcIik7XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5yZXBsYWNlKGNsYXNzTmFtZVJlZ2V4LCBcIlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnJlcGxhY2UoY2xhc3NOYW1lUmVnZXgsIFwiXCIpO1xuICAgIH1cbiAgfSxcblxuICBhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmFkZCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICsgXCIgXCIgKyBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgIH1cbiAgfSxcblxuICBoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKSB7XG4gICAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lUmVnZXggPSBSZWdFeHAoJ1xcXFxiJyArIGNsYXNzTmFtZSArICdcXFxcYicsIFwiZ1wiKTtcblxuICAgIGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWVSZWdleC50ZXN0KGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZVJlZ2V4LnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0ICYmIGVsLmNsYXNzTGlzdC50b2dnbGUpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgdW5pcXVlOiBmdW5jdGlvbihhcnkpIHtcbiAgICBsZXQgdW5pcXVlID0gW107XG4gICAgYXJ5LmZvckVhY2goZWwgPT4ge1xuICAgICAgaWYgKHVuaXF1ZS5pbmRleE9mKGVsKSA8IDApIHtcbiAgICAgICAgdW5pcXVlLnB1c2goZWwpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB1bmlxdWU7XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztvQ0FBZTtFQUNiQSxPQUFPLEVBQUUsU0FBQUEsUUFBU0MsR0FBRyxFQUFFO0lBQ3JCLE9BQU9BLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDLFVBQUNDLENBQUMsRUFBRUMsQ0FBQztNQUFBLE9BQUtELENBQUMsQ0FBQ0UsTUFBTSxD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
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var cache = {};
function initialBitstringFor(size, y, x, value) {
  cache[size] = cache[size] || {};
  cache[size][y] = cache[size][y] || {};
  cache[size][y][x] = cache[size][y][x] || {};
  if (cache[size][y][x][value]) {
    return cache[size][y][x][value];
  }

  // The number of legal 19x19 go moves is on the order of 10^170 ≈ 2^565, so
  // a hash output on the order of 2^31 is woefully insufficient for arbitrary
  // positions, but it should be good enough for human play, since we're not
  // searching the entire space. This should be good enough for ~300-move games.
  var randomValue = Math.floor(Math.random() * (Math.pow(2, 31) - 1));
  cache[size][y][x][value] = randomValue;
  return randomValue;
}
var _default = exports["default"] = {
  hash: function hash(boardSize, intersections) {
    var h = 0;
    intersections.forEach(function (i) {
      if (!i.isEmpty()) {
        var initial = initialBitstringFor(boardSize, i.y, i.x, i.value);
        h = h ^ initial;
      }
    });
    return h;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjYWNoZSIsImluaXRpYWxCaXRzdHJpbmdGb3IiLCJzaXplIiwieSIsIngiLCJ2YWx1ZSIsInJhbmRvbVZhbHVlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicG93IiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiaGFzaCIsImJvYXJkU2l6ZSIsImludGVyc2VjdGlvbnMiLCJoIiwiZm9yRWFjaCIsImkiLCJpc0VtcHR5IiwiaW5pdGlhbCJdLCJzb3VyY2VzIjpbIi4uL3NyYy96b2JyaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhY2hlID0ge307XG5cbmZ1bmN0aW9uIGluaXRpYWxCaXRzdHJpbmdGb3Ioc2l6ZSwgeSwgeCwgdmFsdWUpIHtcbiAgY2FjaGVbc2l6ZV0gICAgICAgPSBjYWNoZVtzaXplXSB8fCB7fTtcbiAgY2FjaGVbc2l6ZV1beV0gICAgPSBjYWNoZVtzaXplXVt5XSB8fCB7fTtcbiAgY2FjaGVbc2l6ZV1beV1beF0gPSBjYWNoZVtzaXplXVt5XVt4XSB8fCB7fTtcblxuICBpZiAoY2FjaGVbc2l6ZV1beV1beF1bdmFsdWVdKSB7XG4gICAgcmV0dXJuIGNhY2hlW3NpemVdW3ldW3hdW3ZhbHVlXTtcbiAgfVxuXG4gIC8vIFRoZSBudW1iZXIgb2YgbGVnYWwgMTl4MTkgZ28gbW92ZXMgaXMgb24gdGhlIG9yZGVyIG9mIDEwXjE3MCDiiYggMl41NjUsIHNvXG4gIC8vIGEgaGFzaCBvdXRwdXQgb24gdGhlIG9yZGVyIG9mIDJeMzEgaXMgd29lZnVsbHkgaW5zdWZmaWNpZW50IGZvciBhcmJpdHJhcnlcbiAgLy8gcG9zaXRpb25zLCBidXQgaXQgc2hvdWxkIGJlIGdvb2QgZW5vdWdoIGZvciBodW1hbiBwbGF5LCBzaW5jZSB3ZSdyZSBub3RcbiAgLy8gc2VhcmNoaW5nIHRoZSBlbnRpcmUgc3BhY2UuIFRoaXMgc2hvdWxkIGJlIGdvb2QgZW5vdWdoIGZvciB+MzAwLW1vdmUgZ2FtZXMuXG4gIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1hdGgucG93KDIsIDMxKSAtIDEpKTtcbiAgY2FjaGVbc2l6ZV1beV1beF1bdmFsdWVdID0gcmFuZG9tVmFsdWU7XG5cbiAgcmV0dXJuIHJhbmRvbVZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGhhc2g6IGZ1bmN0aW9uKGJvYXJkU2l6ZSwgaW50ZXJzZWN0aW9ucykge1xuICAgIGxldCBoID0gMDtcblxuICAgIGludGVyc2VjdGlvbnMuZm9yRWFjaChpID0+IHtcbiAgICAgIGlmICghaS5pc0VtcHR5KCkpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IGluaXRpYWxCaXRzdHJpbmdGb3IoYm9hcmRTaXplLCBpLnksIGkueCwgaS52YWx1ZSk7XG4gICAgICAgIGggPSBoIF4gaW5pdGlhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBoO1xuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBRWhCLFNBQVNDLG1CQUFtQkEsQ0FBQ0MsSUFBSSxFQUFFQyxDQUFDLEVBQUVDLENBQUMsRUFBRUMsS0FBSyxFQUFFO0VBQzlDTCxLQUFLLENBQUNFLElBQUksQ0FBQyxHQUFTRixLQUFLLENBQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNyQ0YsS0FBSyxDQUFDRSxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQU1ILEtBQUssQ0FBQ0UsSUFBSSxDQUFDLENBQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN4Q0gsS0FBSyxDQUFDRSxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHSixLQUFLLENBQUNFLElBQUksQ0FBQyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBRTNDLElBQUlKLEtBQUssQ0FBQ0UsSUFBSSxDQUFDLENBQUNDLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEVBQUU7SUFDNUIsT0FBT0wsS0FBSyxDQUFDRSxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUM7RUFDakM7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQSxJQUFNQyxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUlGLElBQUksQ0FBQ0csR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNyRVYsS0FBSyxDQUFDRSxJQUFJLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsR0FBR0MsV0FBVztFQUV0QyxPQUFPQSxXQUFXO0FBQ3BCO0FBQUMsSUFBQUssUUFBQSxHQUFBQyxPQUFBLGNBRWM7RUFDYkMsSUFBSSxFQUFFLFNBQUFBLEtBQVNDLFNBQVMsRUFBRUMsYUFBYSxFQUFFO0lBQ3ZDLElBQUlDLENBQUMsR0FBRyxDQUFDO0lBRVRELGFBQWEsQ0FBQ0UsT0FBTyxDQUFDLFVBQUFDLENBQUMsRUFBSTtNQUN6QixJQUFJLENBQUNBLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsRUFBRTtRQUNoQixJQUFNQyxPQUFPLEdBQUduQixtQkFBbUIsQ0FBQ2EsU0FBUyxFQUFFSSxDQUFDLENBQUNmLENBQUMsRUFBRWUsQ0FBQyxDQUFDZCxDQUFDLEVBQUVjLENBQUMsQ0FBQ2IsS0FBSyxDQUFDO1FBQ2pFVyxDQUFDLEdBQUdBLENBQUMsR0FBR0ksT0FBTztNQUNqQjtJQUNGLENBQUMsQ0FBQztJQUVGLE9BQU9KLENBQUM7RUFDVjtBQUNGLENBQUMifQ==
},{}]},{},[1])(1)
});