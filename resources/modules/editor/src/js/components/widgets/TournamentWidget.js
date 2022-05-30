const { Reacket } = window.altrpLibs
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";

(window.globalDefaults = window.globalDefaults || []).push(`
.reacket-round-header {  width: 20rem;  margin-right: 8rem;  padding: 0.2rem 0;  font-size: 120%;  font-weight: bold;  margin-left: 2rem; }  .reacket-round-header.reacket-last-round {    margin-right: 0; }
.reacket-connectors {  display: flex; }.reacket-connector {  display: flex;  flex-direction: column;  justify-content: center;  width: 4rem; }.reacket-horizontal-line {  border: solid 1px #ccc; }
.reacket-spacer {  flex-grow: 0.5; }.reacket-vertical-line {  border-right: solid 1px #ccc; }
.reacket-player {  padding: 0.5rem 0;  background: #f6f6f6;  border-left: solid 0.2rem #999;  cursor: pointer;  transition: all 0.4s ease-out;  display: flex;  justify-content: space-between; }  .reacket-player .reacket-player-name {    white-space: nowrap;    text-overflow: ellipsis;    overflow: hidden;    text-align: left;    flex: 1 1 auto;    color: #999; }  .reacket-player .reacket-player-seed, .reacket-player .reacket-player-score {    flex: 0 0 auto;    padding: 0 1rem;    color: #999; }  .reacket-player.reacket-highlighted {    background-color: #255d85;    color: white;    border-left: solid 0.2rem #1d8cd6; }    .reacket-player.reacket-highlighted .reacket-player-seed, .reacket-player.reacket-highlighted .reacket-player-score, .reacket-player.reacket-highlighted .reacket-player-name {      color: white; }  .reacket-player:first-child {    border-bottom: solid 1px #ccc; }.reacket-winner {  background-color: #ebfaeb;  border-left: solid 0.2rem #0fac0f; }  .reacket-winner .reacket-player-score {    font-weight: bold;    color: #0fac0f; }  .reacket-winner .reacket-player-name {    color: #333; }  .reacket-winner.reacket-highlighted .reacket-player-score {    color: #8ee98e; }  .reacket-winner.reacket-highlighted .reacket-player-name {    color: white; }
.reacket-match {  margin: 0.5rem 0;  display: flex;  flex-direction: row; }  .reacket-match .reacket-match-id {    display: flex;    justify-content: center;    flex-direction: column;    width: 2rem;    font-weight: bold;    color: #999; }  .reacket-match .reacket-players {    width: 20rem; }
.reacket-round {  display: flex;  flex-direction: column;  justify-content: center; }
.reacket .reacket-rounds {  display: flex; }.reacket .reacket-round-headers {  margin-bottom: 1rem;  display: flex; }
  .reacket-match .reacket-players  {
    width: 100% !important;
  }

  .reacket-connectors {
    width: 100%;
  }

  .reacket-connector {
    width: 100% !important;
  }

  .reacket-round-headers {
    justify-content: space-between;
  }

  .reacket-round-header {
    margin: 0 !important;
    width: auto !important;
  }

  .reacket-player-image {
    height: 100%;
    width: auto;
    margin-right: 15px;
  }

  .reacket-player {
    height: 38px;
  }
`);

const PlayerComponent = ({id, name, seed, score, winner, highlightedPlayer, setHighlightedPlayer, player}) => {
  return (
    <div
      onMouseEnter={() => setHighlightedPlayer(id)}
      onMouseLeave={() => setHighlightedPlayer(null)}
      title={name + ' ' + (winner ? '(W)' : '(L)')}
      className={'reacket-player ' + (winner ? 'reacket-winner' : '') + ' ' + (highlightedPlayer === id ? 'reacket-highlighted' : '')}
    >
      <div title='Seed' className='reacket-player-seed'>{seed}</div>
      {player.image && (
        <img className='reacket-player-image' src={player.image} />
      )}
      <div className='reacket-player-name'>{name}</div>
      <div className='reacket-player-score'>{score}</div>
    </div>
  )
}

class TournamentWidget extends Component {
  constructor(props) {
    super(props)

      this.state = {
      }
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  _componentDidMount() {
    if(isEditor()){
      this.setState({
        data: [
          { "id": 1, "round": 1, "match": 1, "players": [{ "id": 1, "name": "Mr. Orange", "seed": 1 }, { "id": 2, "name": "Mr. White", "seed": 8 }], "score": [0, 1] },
          { "id": 2, "round": 1, "match": 2, "players": [{ "id": 3, "name": "Mr. Pink", "seed": 5 }, { "id": 4, "name": "Mr. Blue", "seed": 4 }], "score": [0, 1] },
          { "id": 3, "round": 1, "match": 3, "players": [{ "id": 5, "name": "Mr. Brown", "seed": 3 }, { "id": 6, "name": "Mr. Black", "seed": 6 }], "score": [0, 1] },
          { "id": 4, "round": 1, "match": 4, "players": [{ "id": 7, "name": "Mr. Red", "seed": 7 }, { "id": 8, "name": "Mr. Yellow", "seed": 2 }], "score": [1, 0] },
          { "id": 5, "round": 2, "match": 1, "players": [{ "id": 2, "name": "Mr. White", "seed": 7 }, { "id": 4, "name": "Mr. Blue", "seed": 4 }], "score": [0, 1] },
          { "id": 6, "round": 2, "match": 2, "players": [{ "id": 6, "name": "Mr. Black", "seed": 6 }, { "id": 7, "name": "Mr. Red", "seed": 7 }], "score": [0, 1] },
          { "id": 7, "round": 3, "match": 1, "players": [{ "id": 4, "name": "Mr. Blue", "seed": 4 }, { "id": 7, "name": "Mr. Red", "seed": 7 }], "score": [0, 1] }
        ]
      })
    } else {
      const {data, headers} = getDataByPath(this.props.element.getResponsiveLockedSetting('path')) || {}

      this.setState({data, headers})
    }
  }

  /**
   * Получить css классы для tournament widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    const {data, headers} = this.state

    if (!data){
      return 'No data'
    }
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return (
      <Reacket
        className={classes}
        matches={data}
        playerComponent={PlayerComponent}
        headers={headers}
      />
    )
  }
}

export default TournamentWidget;
