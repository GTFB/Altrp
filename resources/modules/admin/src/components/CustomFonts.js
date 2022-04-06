import React from 'react';
import { Link } from 'react-router-dom';
import AltrpMeta from '../../../../modules/editor/src/js/classes/AltrpMeta';
import { compose } from "redux";
import { connect } from "react-redux";
import { getCustomFonts } from '../js/store/custom-fonts/actions';

class CustomFonts extends React.Component {
    state = {}

    deleteFont = async (id) => {
        let metaValueArray = (this.props.metaValue !== '') ? this.props.metaValue : null
        let fonts = metaValueArray
        const currentFontId = id
        const indexCurrentFont = metaValueArray.findIndex(item => item.id == currentFontId)
        fonts.splice(indexCurrentFont, 1)
        let meta = await AltrpMeta.getMetaByName("custom_fonts")
        meta.setMetaValue(fonts)
        await meta.save()
        meta = await AltrpMeta.getMetaByName("custom_fonts")
        const metaValue = await meta.getMetaValue()
        this.props.getCustomFonts(metaValue)
    }

    render() {
        let metaValueArray = (this.props.metaValue !== '') ? this.props.metaValue : null
        let fonts = null;
        let fontsCount = null;
        if (metaValueArray) {
            fontsCount = metaValueArray.length
            fonts = metaValueArray.map(f => (
                <tr key={f.id} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <td className="custom-fonts__table-check">
                        <input type="checkbox" />
                    </td>
                    <td className="custom-fonts__table-font-family">
                        <Link to={`/admin/assets/edit-font/${f.id}`}>{f.fontFamily}<span className="custom-fonts__table-font-family__count">{f.variations.length}</span></Link>
                        <span className="custom-fonts__table-font-family_hover">
                            <Link to={`/admin/assets/edit-font/${f.id}`} className="custom-fonts__table-font-family_hover_edit">Edit</Link>
                            <span onClick={() => this.deleteFont(f.id)} className="custom-fonts__table-font-family_hover_trash">Trash</span>
                        </span>
                    </td>
                    <td className="custom-fonts__table-preview">Elementor Is Making the Web Beautiful!!!</td>
                </tr>
            ))
        }

        return (
            <div className="custom-fonts">

                <div className="custom-fonts__title">
                    Custom Fonts
                    <Link to="/admin/assets/add-new-font">
                        <button className="custom-fonts__btn custom-fonts__btn_add-new">
                            Add new
                        </button>
                    </Link>
                </div>

                <div className="custom-fonts__table-header">
                    <div className="custom-fonts__sorting-options">
                        <a className="custom-fonts__sorting-options-name">All
                            <span className="custom-fonts__sorting-options-count custom-fonts__sorting-options-count_line">
                                {fontsCount}
                            </span>
                        </a>
                        <a className="custom-fonts__sorting-options-name">Published
                            <span className="custom-fonts__sorting-options-count">
                                {fontsCount}
                            </span>
                        </a>
                    </div>
                    <div className="custom-fonts__search">
                        <input className="custom-fonts__search-input" />
                        <button onClick={this.props.getMetaName} className="custom-fonts__btn custom-fonts__btn_search">
                            Search Font
                        </button>
                    </div>
                </div>

                <div className="custom-fonts__const-part-of-table">
                    <div className="custom-fonts__possible-actions">
                        <select className="custom-fonts__possible-actions-drop-list">
                            <option>Bulk actions</option>
                            <option>Edit</option>
                            <option>Move To Trash</option>
                        </select>
                        <button onClick={this.props.test} className="custom-fonts__btn custom-fonts__btn_apply">
                            Apply
                        </button>
                    </div>
                    <span className="custom-fonts__number-of-items">
                        {fontsCount} items
                    </span>
                </div>
                <table className="custom-fonts__table">
                    <thead>
                        <tr>
                            <th className="custom-fonts__table-check">
                                <input type="checkbox" />
                            </th>
                            <th className="custom-fonts__table-font-family">Font Family</th>
                            <th className="custom-fonts__table-preview">Preview</th>
                        </tr>
                    </thead>
                    <tbody>{fonts}</tbody>
                    <tfoot>
                        <tr>
                            <th className="custom-fonts__table-check"><input type="checkbox" /></th>
                            <th className="custom-fonts__table-font-family">Font Family</th>
                            <th className="custom-fonts__table-preview">Preview</th>
                        </tr>
                    </tfoot>
                </table>
                <div className="custom-fonts__const-part-of-table">
                    <div className="custom-fonts__possible-actions">
                        <select className="custom-fonts__possible-actions-drop-list">
                            <option>Bulk actions</option>
                            <option>Edit</option>
                            <option>Move To Trash</option>
                        </select>
                        <button className="custom-fonts__btn custom-fonts__btn_apply">
                            Apply
                        </button>
                    </div>
                    <span className="custom-fonts__number-of-items">
                        {fontsCount} items
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    metaValue: state.customFonts.metaValue
  }
}

export default compose(
    connect(mapStateToProps, { getCustomFonts })
)(CustomFonts);
