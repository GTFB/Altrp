import React from 'react';
import { Link } from 'react-router-dom';

export class CustomFonts extends React.Component {
    state = {}

    render() {
        let fonts = null;
        let fontsCount = null;
        if (this.props.metaValue !== null) {
            fontsCount = this.props.metaValue.length
            fonts = this.props.metaValue.map(f => (
                <tr key={f.id}>
                    <td className="custom-fonts__table-check"><input type="checkbox" /></td>
                    <td className="custom-fonts__table-font-family"><Link to={`/admin/assets/edit-font/${f.id}`}>{f.fontFamily}<span className="custom-fonts__table-font-family__count">{f.variations.length}</span></Link></td>
                    <td className="custom-fonts__table-preview">Elementor Is Making the Web Beautiful!!!</td>
                </tr>
            ))
        }

        return (
            <div className="custom-fonts">
                <div className="custom-fonts__title">Custom Fonts<Link to="/admin/assets/add-new-font"><button className="custom-fonts__btn custom-fonts__btn_add-new">Add new</button></Link></div>
                <div className="custom-fonts__table-header">
                    <div className="custom-fonts__sorting-options">
                        <Link className="custom-fonts__sorting-options-name">All <span className="custom-fonts__sorting-options-count custom-fonts__sorting-options-count_line">({fontsCount})</span></Link>
                        <Link className="custom-fonts__sorting-options-name">Published <span className="custom-fonts__sorting-options-count">({fontsCount})</span></Link>
                    </div>
                    <div className="custom-fonts__search">
                        <input className="custom-fonts__search-input" />
                        <button onClick={this.props.getMetaName} className="custom-fonts__btn custom-fonts__btn_search">Search Font</button>
                    </div>
                </div>
                <div className="custom-fonts__const-part-of-table">
                    <div className="custom-fonts__possible-actions">
                        <select className="custom-fonts__possible-actions-drop-list">
                            <option>Bulk actions</option>
                            <option>Edit</option>
                            <option>Move To Trash</option>
                        </select>
                        <button onClick={this.props.test} className="custom-fonts__btn custom-fonts__btn_apply">Apply</button>
                    </div>
                    <span className="custom-fonts__number-of-items">{fontsCount} items</span>
                </div>
                <table className="custom-fonts__table">
                    <thead>
                        <tr>
                            <th className="custom-fonts__table-check"><input type="checkbox" /></th>
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
                        <button className="custom-fonts__btn custom-fonts__btn_apply">Apply</button>
                    </div>
                    <span className="custom-fonts__number-of-items">{fontsCount} items</span>
                </div>
            </div>
        )
    }
}

