const { Reacket } = window.altrpLibs
const { isEditor, getDataByPath } = window.altrpHelpers;

(window.globalDefaults = window.globalDefaults || []).push(`
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
`);

class TournamentWidget extends Component {
  constructor(props) {
    super(props)


    if (isEditor()) {
      this.state = {
        data: [{ "id": 1, "round": 1, "match": 1, "players": [{ "id": 1, "name": "Mr. Orange", "seed": 1 }, { "id": 2, "name": "Mr. White", "seed": 8 }], "score": [0, 1] }, { "id": 2, "round": 1, "match": 2, "players": [{ "id": 3, "name": "Mr. Pink", "seed": 5 }, { "id": 4, "name": "Mr. Blue", "seed": 4 }], "score": [0, 1] }, { "id": 3, "round": 1, "match": 3, "players": [{ "id": 5, "name": "Mr. Brown", "seed": 3 }, { "id": 6, "name": "Mr. Black", "seed": 6 }], "score": [0, 1] }, { "id": 4, "round": 1, "match": 4, "players": [{ "id": 7, "name": "Mr. Red", "seed": 7 }, { "id": 8, "name": "Mr. Yellow", "seed": 2 }], "score": [1, 0] }, { "id": 5, "round": 2, "match": 1, "players": [{ "id": 2, "name": "Mr. White", "seed": 7 }, { "id": 4, "name": "Mr. Blue", "seed": 4 }], "score": [0, 1] }, { "id": 6, "round": 2, "match": 2, "players": [{ "id": 6, "name": "Mr. Black", "seed": 6 }, { "id": 7, "name": "Mr. Red", "seed": 7 }], "score": [0, 1] }, { "id": 7, "round": 3, "match": 1, "players": [{ "id": 4, "name": "Mr. Blue", "seed": 4 }, { "id": 7, "name": "Mr. Red", "seed": 7 }], "score": [0, 1] }]
      }
    } else {
      this.state = {
        data: getDataByPath(this.props.settings.path)
      }
    }

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  componentDidMount() {
    console.log('tournament did mount');
  }

  _componentDidMount() {
    console.log('tournament did mount');
  }

  render() {
    return (
      <Reacket matches={this.state.data} />
    )
  }
}

export default TournamentWidget;
