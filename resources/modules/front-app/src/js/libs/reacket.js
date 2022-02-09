'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".reacket .reacket-rounds {\n  display: flex; }\n\n.reacket .reacket-round-headers {\n  margin-bottom: 1rem;\n  display: flex; }\n";
styleInject(css);

var css$1 = ".reacket-round {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n";
styleInject(css$1);

var css$2 = ".reacket-match {\n  margin: 0.5rem 0;\n  display: flex;\n  flex-direction: row; }\n  .reacket-match .reacket-match-id {\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    width: 2rem;\n    font-weight: bold;\n    color: #999; }\n  .reacket-match .reacket-players {\n    width: 20rem; }\n";
styleInject(css$2);

var css$3 = ".reacket-player {\n  padding: 0.5rem 0;\n  background: #f6f6f6;\n  border-left: solid 0.2rem #999;\n  cursor: pointer;\n  transition: all 0.4s ease-out;\n  display: flex;\n  justify-content: space-between; }\n  .reacket-player .reacket-player-name {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    text-align: left;\n    flex: 1 1 auto;\n    color: #999; }\n  .reacket-player .reacket-player-seed, .reacket-player .reacket-player-score {\n    flex: 0 0 auto;\n    padding: 0 1rem;\n    color: #999; }\n  .reacket-player.reacket-highlighted {\n    background-color: #255d85;\n    color: white;\n    border-left: solid 0.2rem #1d8cd6; }\n    .reacket-player.reacket-highlighted .reacket-player-seed, .reacket-player.reacket-highlighted .reacket-player-score, .reacket-player.reacket-highlighted .reacket-player-name {\n      color: white; }\n  .reacket-player:first-child {\n    border-bottom: solid 1px #ccc; }\n\n.reacket-winner {\n  background-color: #ebfaeb;\n  border-left: solid 0.2rem #0fac0f; }\n  .reacket-winner .reacket-player-score {\n    font-weight: bold;\n    color: #0fac0f; }\n  .reacket-winner .reacket-player-name {\n    color: #333; }\n  .reacket-winner.reacket-highlighted .reacket-player-score {\n    color: #8ee98e; }\n  .reacket-winner.reacket-highlighted .reacket-player-name {\n    color: white; }\n";
styleInject(css$3);

var HighlightContext = React__default.createContext({
  highlightedPlayer: null,
  setHighlightedPlayer: function setHighlightedPlayer() {}
});

var Player = function Player(_ref) {
  var id = _ref.id,
      name = _ref.name,
      seed = _ref.seed,
      score = _ref.score,
      winner = _ref.winner;

  var _useContext = React.useContext(HighlightContext),
      highlightedPlayer = _useContext.highlightedPlayer,
      setHighlightedPlayer = _useContext.setHighlightedPlayer;

  return React__default.createElement(
    'div',
    {
      onMouseEnter: function onMouseEnter() {
        return setHighlightedPlayer(id);
      },
      onMouseLeave: function onMouseLeave() {
        return setHighlightedPlayer(null);
      },
      title: name + ' ' + (winner ? '(W)' : '(L)'),
      className: 'reacket-player \n        ' + (winner ? 'reacket-winner' : '') + ' \n        ' + (highlightedPlayer === id ? 'reacket-highlighted' : '')
    },
    React__default.createElement(
      'div',
      { title: 'Seed', className: 'reacket-player-seed' },
      seed
    ),
    React__default.createElement(
      'div',
      { className: 'reacket-player-name' },
      name
    ),
    React__default.createElement(
      'div',
      { title: 'Score', className: 'reacket-player-score' },
      score
    )
  );
};

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  seed: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  winner: PropTypes.bool.isRequired
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var Match = function Match(_ref) {
  var players = _ref.players,
      id = _ref.id,
      score = _ref.score,
      playerComponent = _ref.playerComponent;

  var _useContext = React.useContext(HighlightContext),
    highlightedPlayer = _useContext.highlightedPlayer,
    setHighlightedPlayer = _useContext.setHighlightedPlayer;

  var winnerIdx = score[0] > score[1] ? 0 : 1;
  return React__default.createElement(
    'div',
    { className: 'reacket-match' },
    React__default.createElement(
      'div',
      { className: 'reacket-match-id' },
      id
    ),
    React__default.createElement(
      'div',
      { className: 'reacket-players' },
      players.map(function (_ref2, index) {
        var name = _ref2.name,
            seed = _ref2.seed,
            player = objectWithoutProperties(_ref2, ['name', 'seed']);
        return React__default.createElement(playerComponent || Player, {
          key: player.id,
          id: player.id,
          name: name,
          seed: seed,
          score: score[index],
          winner: index === winnerIdx,
          player,
          highlightedPlayer,
          setHighlightedPlayer
        });
      })
    )
  );
};

Match.propTypes = {
  id: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    seed: PropTypes.number
  })).isRequired,
  score: PropTypes.arrayOf(PropTypes.number).isRequired
};

var css$4 = ".reacket-spacer {\n  flex-grow: 0.5; }\n\n.reacket-vertical-line {\n  border-right: solid 1px #ccc; }\n";
styleInject(css$4);

var Spacer = function Spacer(_ref) {
  var line = _ref.line,
      height = _ref.height;

  var spacers = [];
  for (var i = 0; i < height; i += 1) {
    spacers.push(React__default.createElement(
      'div',
      { key: i, className: 'reacket-spacer ' + (line ? 'reacket-vertical-line' : '') },
      '\xA0'
    ));
  }
  return (
    // eslint-disable-next-line react/jsx-fragments
    React__default.createElement(
      React__default.Fragment,
      null,
      spacers
    )
  );
};

Spacer.propTypes = {
  line: PropTypes.bool,
  height: PropTypes.number
};

Spacer.defaultProps = {
  line: false,
  height: 1
};

var Round = function Round(_ref) {
  var lastRound = _ref.lastRound,
      firstRound = _ref.firstRound,
      matches = _ref.matches,
      round = _ref.round,
      playerComponent = _ref.playerComponent;

  var matchElements = [];
  if (!firstRound && !lastRound) {
    matchElements.push(React__default.createElement(Spacer, { key: round + '-fs' }));
  }
  matches.map(function (match, index) {
    if (!firstRound && !lastRound && index > 0) {
      matchElements.push(React__default.createElement(Spacer, { key: match.id + '-s', height: 2 }));
    }
    matchElements.push(React__default.createElement(Match, { key: match.id, score: match.score, id: match.id, players: match.players, playerComponent }));
    return matchElements;
  });
  if (!firstRound && !lastRound) {
    matchElements.push(React__default.createElement(Spacer, { key: round + '-ls' }));
  }
  return React__default.createElement(
    'div',
    { className: 'reacket-round' },
    matchElements
  );
};

Round.propTypes = {
  lastRound: PropTypes.bool,
  firstRound: PropTypes.bool,
  matches: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    round: PropTypes.number.isRequired,
    match: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      seed: PropTypes.number.isRequired
    })),
    score: PropTypes.arrayOf(PropTypes.number.isRequired)
  })).isRequired,
  round: PropTypes.number.isRequired
};

Round.defaultProps = {
  lastRound: false,
  firstRound: false
};

var css$5 = ".reacket-connectors {\n  display: flex; }\n\n.reacket-connector {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 4rem; }\n\n.reacket-horizontal-line {\n  border: solid 1px #ccc; }\n";
styleInject(css$5);

var Connector = function Connector(_ref) {
  var round = _ref.round;

  var rightLines = Math.pow(2, round - 1);
  var leftLines = Math.pow(2, round);

  var rightElements = [];
  var leftElements = [];

  for (var i = 0; i < rightLines; i += 1) {
    if (i > 0) {
      rightElements.push(React__default.createElement(Spacer, { key: round + '-' + i + '-s', height: 2 }));
    }
    rightElements.push(React__default.createElement('div', { key: round + '-' + i + '-l', className: 'reacket-horizontal-line' }));
  }

  for (var _i = 0; _i < leftLines; _i += 1) {
    if (_i % 2) {
      leftElements.push(React__default.createElement(Spacer, { key: round + '-' + _i + '-s', line: true, height: 2 }));
    } else if (_i > 0) {
      leftElements.push(React__default.createElement(Spacer, { key: round + '-' + _i + '-s', height: 2 }));
    }
    leftElements.push(React__default.createElement('div', { key: _i + '-l', className: 'reacket-horizontal-line' }));
  }

  return React__default.createElement(
    'div',
    { className: 'reacket-connectors' },
    React__default.createElement(
      'div',
      { 'data-test': 'connector-left', className: 'reacket-connector' },
      React__default.createElement(Spacer, { key: round + '-l-t' }),
      leftElements,
      React__default.createElement(Spacer, { key: round + '-l-b' })
    ),
    React__default.createElement(
      'div',
      { 'data-test': 'connector-right', className: 'reacket-connector' },
      React__default.createElement(Spacer, { key: round + '-r-t' }),
      rightElements,
      React__default.createElement(Spacer, { key: round + '-r-b' })
    )
  );
};

Connector.propTypes = {
  round: PropTypes.number.isRequired
};

var css$6 = ".reacket-round-header {\n  width: 20rem;\n  margin-right: 8rem;\n  padding: 0.2rem 0;\n  font-size: 120%;\n  font-weight: bold;\n  margin-left: 2rem; }\n  .reacket-round-header.reacket-last-round {\n    margin-right: 0; }\n";
styleInject(css$6);

var getRoundHeaderText = function getRoundHeaderText(round, totalRounds) {
  if (round === totalRounds) {
    return 'Finals';
  }if (round === totalRounds - 1) {
    return 'Semi-finals';
  }
  return 'Round ' + round;
};
var RoundHeader = function RoundHeader(_ref) {
  var round = _ref.round,
    totalRounds = _ref.totalRounds,
    headers = _ref.headers;
    
  const headerText = headers?.length ? headers[round - 1] || ' ' : getRoundHeaderText(round, totalRounds)
  return React__default.createElement(
    'div',
    { className: 'reacket-round-header \n    ' + (round === totalRounds ? 'reacket-last-round' : '')
    },
    headerText
  );
};

RoundHeader.propTypes = {
  round: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired
};

function convertMatchesToRounds(matches) {
  var roundsObject = {};
  matches.forEach(function (match) {
    var round = match.round;

    if (!roundsObject[round]) {
      roundsObject[round] = { round: round, matches: [] };
    }
    roundsObject[round].matches.push(match);
  });
  var rounds = Object.values(roundsObject).sort(function (a, b) {
    return a.round - b.round;
  });
  return rounds;
}

var Reacket = function Reacket(_ref) {
  var matches = _ref.matches;
  var playerComponent = _ref.playerComponent;
  const headers = _ref.headers;

  var _useState = React.useState(null),
      _useState2 = slicedToArray(_useState, 2),
      highlightedPlayer = _useState2[0],
      setHighlightedPlayer = _useState2[1];

  var highlightContextValue = { highlightedPlayer: highlightedPlayer, setHighlightedPlayer: setHighlightedPlayer };
  var rounds = convertMatchesToRounds(matches);
  return React__default.createElement(
    'div',
    { className: 'reacket' },
    React__default.createElement(
      'div',
      { className: 'reacket-round-headers' },
      rounds.map(function (round) {
        var jsx$$1 = [];
        jsx$$1.push(React__default.createElement(RoundHeader, { key: round + '-header', round: round.round, totalRounds: rounds.length, headers }));
        return jsx$$1;
      })
    ),
    React__default.createElement(
      HighlightContext.Provider,
      { value: highlightContextValue },
      React__default.createElement(
        'div',
        { className: 'reacket-rounds' },
        rounds.map(function (round, index) {
          var jsx$$1 = [];
          var roundNumber = rounds.length - index;
          if (index > 0) {
            jsx$$1.push(React__default.createElement(Connector, { key: roundNumber + '-c', round: roundNumber }));
          }
          jsx$$1.push(React__default.createElement(Round, {
            key: roundNumber + '-r',
            firstRound: index === rounds.length - 1,
            lastRound: index === 0,
            matches: round.matches,
            round: round.round,
            playerComponent
          }));
          return jsx$$1;
        })
      )
    )
  );
};

Reacket.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    round: PropTypes.number.isRequired,
    match: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      seed: PropTypes.number.isRequired
    })),
    score: PropTypes.arrayOf(PropTypes.number.isRequired)
  })).isRequired
};

window.altrpLibs = window.altrpLibs || {}
window.altrpLibs.Reacket = Reacket