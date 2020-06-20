import React, {Component} from "react";
import PluginSvg from "../svgs/plugins.svg";

export default class UsersTools extends Component{
  render(){ return <div id="content">

          <div className="admin-heading-users">
            <div className="admin-breadcrumbs">
              <a className="admin-breadcrumbs__link" href="#">Users</a>
              <span className="admin-breadcrumbs__separator">/</span>
              <span className="admin-breadcrumbs__current">Tools</span>
            </div>
          </div>

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#">Tools</a>
            </li>
          </ul>
          <div className="border border-top-0">
            <div className="row d-flex">
              <div className="col-sm-8 d-flex change-role">

                <span>Change role</span>
                <select className="form-control form-control-sm">
                  <option value="1">Editor</option>
                  <option value="2">Moderator</option>
                </select>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" value="" id="checkbox__1"/>
                    <label className="form-check-label" htmlFor="checkbox__1">Readable features</label>
                </div>

              </div>
            </div>
            <div
              className="row group-table border border-bottom-0 border-left-0 border-right-0 no-gutters">
              <div className="col-3">
                <span className="text-group">Groups</span>
                <span className="text-total">(Total/Allowed)</span>
              </div>
              <div className="col-6 form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="checkbox__2"/>
                  <label className="form-check-label" htmlFor="checkbox__2">Fast filter:</label>

                  <input type="search" className="search-tools form-control-sm" placeholder=""
                         aria-controls="example1"/>
                    <input className="form-check-input" type="checkbox" id="checkbox__3"/>
                      <label className="form-check-label" htmlFor="checkbox__3">Only Allowed</label>

              </div>
              <div className="col-3">
                <form action="#" className="form-tools">
                  <button type="submit" className="btn-tools">Save Changes</button>
                </form>

              </div>
            </div>
            <div className="row group-table-trees border border-bottom-0 border-left-0 border-right-0 no-gutters">
              <div className="col-3">
                <div className="treeview">
                  <ul>
                    <li>
                      <div>
                        <p>
                          <a href="#" className="core">Core (112/2)</a>
                        </p>
                      </div>
                      <ul>
                        <li>
                          <div>
                            <p>
                              <a href="#">Dashboard (10/1)</a>
                            </p>
                            <p className="form-group-p"><a href="#">Rename</a><span> | </span><a
                              href="#">Copy</a><span> | </span><a href="#">Delete</a></p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Assets (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Tables (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Templates (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Reports (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Users (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <a href="#">Plugins (10/1)</a>
                            </p>
                          </div>
                        </li>
                        <li className="cl">
                          <div>
                            <p>
                              <a href="#">Setings (42/5)</a>
                            </p>
                          </div>
                          <ul className="l">
                            <li>
                              <div>
                                <p>
                                  <a href="#">Builder (10/2)</a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                <p>
                                  <a href="#">Import/Export (10/2)</a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                <p>
                                  <a href="#">Integration (10/2)</a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                <p>
                                  <a href="#">Sender (10/2)</a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                <p>
                                  <a href="#">Acquiring (10/2)</a>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                <p>
                                  <a href="#">Tuner (10/2)</a>
                                </p>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

              </div>
              <div className="col-6 form-check form-check-group">
                <fieldset className="form-group">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios1" value="option1" checked/>
                          <label className="form-check-label" htmlFor="gridRadios1">
                            Create Template
                          </label>
                          <p className="form-group-p"><a href="#">Rename</a><span> | </span><a
                            href="#">Copy</a><span> | </span><a href="#">Delete</a></p>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios2" value="option2" checked/>
                          <label className="form-check-label" htmlFor="gridRadios2">
                            Duplicate Template
                          </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios3" value="option3"/>
                          <label className="form-check-label" htmlFor="gridRadios3">
                            Activate / Deactivate Widgets
                          </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios4" value="option4"/>
                          <label className="form-check-label" htmlFor="gridRadios4">
                            Setup Integration
                          </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios5" value="option5"/>
                          <label className="form-check-label" htmlFor="gridRadios5">
                            Import / Export Templates
                          </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios6" value="option6"/>
                          <label className="form-check-label" htmlFor="gridRadios6">
                            Delete Template
                          </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridRadios7" value="option7" checked/>
                          <label className="form-check-label" htmlFor="gridRadios7">
                            Edit Template
                          </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="col-3 ">
                <form action="#" className="group-vertical">
                  <button type="submit" className="btn btn-outline-dark btn-sm">Add New Role</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Rename Role</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Delete Role</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Add New Group</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Add New Permission</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Tools Export</button>
                  <button type="submit" className="btn btn-outline-dark btn-sm">Tools Import</button>
                </form>
                <form action="#" className="dangerous">
                  <span>Warning! that “Reset” action could be dangerous</span>
                  <button type="submit" className="btn-danger">RESET</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  }
}
