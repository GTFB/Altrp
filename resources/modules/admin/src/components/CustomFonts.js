import React from 'react';
import {Link} from 'react-router-dom';

export class CustomFonts extends React.Component {
    render() {
        return (
            <div className="custom-fonts">
                <div className="custom-fonts__title">Custom Fonts<button className="custom-fonts__btn custom-fonts__btn_add-new">Add new</button></div>
                <div className="custom-fonts__table-header">
                    <div className="custom-fonts__sorting-options">
                        <Link className="custom-fonts__sorting-options-name">All <span className="custom-fonts__sorting-options-count custom-fonts__sorting-options-count_line">(2)</span></Link>
                        <Link className="custom-fonts__sorting-options-name">Published <span className="custom-fonts__sorting-options-count">(2)</span></Link>
                    </div>
                    <div className="custom-fonts__search">
                        <input className="custom-fonts__search-input" />
                        <button className="custom-fonts__btn custom-fonts__btn_search">Search Font</button>
                    </div>
                </div>
                <div className="custom-fonts__const-part-of-table">
                    <div className="custom-fonts__possible-actions">
                        <select className="custom-fonts__possible-actions-drop-list">
                            <option>Bulk actions</option>
                            <option>Edit</option>
                            <option>Move To Trash</option>
                        </select>
                        <button className="custom-fonts__btn custom-fonts__btn_apply">Apply</button>
                    </div>
                    <span className="custom-fonts__number-of-items">2 items</span>
                </div>
                <table className="custom-fonts__table">
                    <thead>
                        <tr>
                            <th className="custom-fonts__table-check"><input type="checkbox" /></th>
                            <th className="custom-fonts__table-font-family">Font Family</th>
                            <th className="custom-fonts__table-preview">Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="custom-fonts__table-check"><input type="checkbox" /></td>
                            <td className="custom-fonts__table-font-family"><Link to="/admin/assets/edit-font">уапмииуки</Link><div className="custom-fonts__table-font-family__count">1</div></td>
                            <td className="custom-fonts__table-preview">Elementor Is Making the Web Beautiful!!!</td>
                        </tr>
                        <tr>
                            <td className="custom-fonts__table-check"><input type="checkbox" /></td>
                            <td className="custom-fonts__table-font-family"><Link to="/admin/assets/edit-font">уапмииуки</Link><div className="custom-fonts__table-font-family__count">1</div></td>
                            <td className="custom-fonts__table-preview">Elementor Is Making the Web Beautiful!!!</td>
                        </tr>
                    </tbody>
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
                    <span className="custom-fonts__number-of-items">2 items</span>
                </div>
            </div>
        )
    }
}

