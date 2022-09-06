import '../../sass/new-section-structure.scss'
import Section from "../classes/elements/Section";
import Column from "../classes/elements/Column";
import {getTemplateDataStorage} from "../helpers";

export default class NewSectionStructure extends Component {
  state = {
    variants: STRUCTURES[0].variants,
    variant: STRUCTURES[0].variants[0]
  }
  append = e => {
    e.preventDefault();
    e.stopPropagation();
    const section = new Section()
    let columns = [...this.state.variant]
    columns = columns.map(width => {
      const column = new Column()
      column.setSettingValue('layout_column_width', width)
      return column
    })

    section.children = columns
    getTemplateDataStorage().getRootElement().appendChild(section)

    this.props.toggleSection()
  }
  prepend = e => {
    e.preventDefault();
    e.stopPropagation();
    const section = new Section()
    let columns = [...this.state.variant]
    columns = columns.map(width => {
      const column = new Column()
      column.setSettingValue('layout_column_width', width)
      return column
    })

    section.children = columns
    getTemplateDataStorage().getRootElement().prependChild(section)

    this.props.toggleSection()
  }

  render() {
    const {variants, variant} = this.state
    return <div className="new-section-structure p-4 d-flex flex-column">
      <div className="d-flex pb-4 flex-wrap">
        {STRUCTURES.map(s =>
          <button className={`new-section-structure__tab ${
            variants === s.variants ?
              'new-section-structure__tab_selected' : ''
          }`}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState(state => ({...state, variants: s.variants, variant: s.variants[0]}))
                  }}
                  key={`columns${s.columnCount}`}>
            {s.columnCount} Columns
          </button>
        )}
      </div>
      <div className="d-flex flex-grow-1 new-section-structure__content flex-wrap">
        {variants.map((v, idx) =>
          <div className={`new-section-structure__item ${
            variant === v ? 'new-section-structure__item_active' : ''
          }`}
               onClick={e => {
                 e.preventDefault();
                 e.stopPropagation();
                 this.setState(state => ({...state, variant: v}))
               }}
               key={`variant${idx}`}>
            {v.map((c, _idx) =>
              <div className="new-section-structure__item-column"
                   style={{width: `${c}%`}}
                   key={`variant_column${idx}${_idx}`}/>
            )}
          </div>
        )}
      </div>
      <div className="d-flex pt-4">
        <button className="btn new-section-structure__apply mr-1"
                onClick={this.append}>Append
        </button>
        <button className="btn new-section-structure__apply"
                onClick={this.prepend}>Prepend
        </button>
      </div>
    </div>
  }
}

const STRUCTURES = [
  {
    columnCount: 1,
    variants: [
      [100]
    ]
  },
  {
    columnCount: 2,
    variants: [
      [50, 50],
      [25, 75],
      [75, 25],
      [33.333333, 66.67],
      [66.666667, 33.333333],
    ]
  },
  {
    columnCount: 3,
    variants: [
      [33.333333, 33.333333, 33.333333],
      [50, 25, 25],
      [25, 50, 25],
      [25, 25, 50],
      [66.666666, 16.666667, 16.666667],
      [16.666667, 66.666666, 16.666667],
      [16.666667, 16.666667, 66.666666],
    ]
  },
  {
    columnCount: 4,
    variants: [
      [25, 25, 25, 25],
      [50, 16.666667, 16.666667, 16.666667],
      [16.666667, 50, 16.666667, 16.666667],
      [16.666667, 16.666667, 50, 16.666667],
      [16.666667, 16.666667, 16.666667, 50],
      [33.333333, 33.333333, 16.666667, 16.666667],
      [16.666667, 33.333333, 33.333333, 16.666667],
      [16.666667, 16.666667, 33.333333, 33.333333],
      [33.333333, 16.666667, 33.333333, 16.666667],
      [33.333333, 16.666667, 16.666667, 33.333333],
      [16.666667, 33.333333, 16.666667, 33.333333],
    ]
  },
  {
    columnCount: 5,
    variants: [
      [20, 20, 20, 20, 20],
      [50, 12.5, 12.5, 12.5, 12.5,],
      [12.5, 50, 12.5, 12.5, 12.5,],
      [12.5, 12.5, 50, 12.5, 12.5,],
      [12.5, 12.5, 12.5, 50, 12.5,],
      [12.5, 12.5, 12.5, 12.5, 50,],
      [25, 25, 16.666667, 16.666667, 16.666667,],
      [25, 16.666667, 25, 16.666667, 16.666667,],
      [25, 16.666667, 16.666667, 25, 16.666667,],
      [25, 16.666667, 16.666667, 16.666667, 25,],
      [16.666667, 25, 25, 16.666667, 16.666667,],
      [16.666667, 25, 16.666667, 25, 16.666667,],
      [16.666667, 25, 16.666667, 16.666667, 25,],
      [16.666667, 16.666667, 25, 25, 16.666667,],
      [16.666667, 16.666667, 25, 16.666667, 25,],
    ]
  },
  {
    columnCount: 6,
    variants: [
      [16.666667, 16.666667, 16.666667, 16.666667, 16.666667, 16.666667,],
      [25, 25, 12.5, 12.5, 12.5, 12.5,],
      [25, 12.5, 25, 12.5, 12.5, 12.5,],
      [25, 12.5, 12.5, 25, 12.5, 12.5,],
      [25, 12.5, 12.5, 12.5, 25, 12.5,],
      [25, 12.5, 12.5, 12.5, 12.5, 25,],
      [12.5, 25, 25, 12.5, 12.5, 12.5,],
      [12.5, 25, 12.5, 25, 12.5, 12.5,],
      [12.5, 25, 12.5, 12.5, 25, 12.5,],
      [12.5, 25, 12.5, 12.5, 12.5, 25,],
      [12.5, 12.5, 25, 25, 12.5, 12.5,],
      [12.5, 12.5, 25, 12.5, 25, 12.5,],
      [12.5, 12.5, 25, 12.5, 12.5, 25,],
      [12.5, 12.5, 12.5, 25, 25, 12.5,],
      [12.5, 12.5, 12.5, 12.5, 25, 25,],

    ]
  },
]
