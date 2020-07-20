import React, {Component} from "react";
import Left from "../svgs/left.svg";
import Right from "../svgs/right.svg";
import { NavLink } from "react-router-dom";
import "../sass/components/admin-pagination.scss"

class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
    };
  }
  setCurrentPage(num) {
    if(num < 1) {
      this.setState({currentPage: 1});
    }
    else if(num > this.props.pageCount) {
      this.setState({currentPage: this.props.pageCount});
    }
    this.setState({currentPage: num});
  }
  changePage(value) {
    this.setCurrentPage(value);
    this.props.changePage(this.state.currentPage);
  }
  inputHandler(e) {
    this.changePage(this.state.currentPage);
    this.setState({currentPage: e.target.value.replace(/[^0-9]/g, '') || 1})
  }
  render(){
//todo: сделать теги button для кнопок и input для ввода
    return<div className="pagination">
      <div className="version">
        <p className="pagination__version">App creating with <NavLink className="pagination__link" to="#">Altrp</NavLink> / Version 1.0.1 </p>
      </div>
      <div className="pagination__buttons">
        <p className="pagination__text">8 Items</p>
        <button className={this.state.currentPage === 1 ? "pagination__move pagination__disabled pagination__toStart" : "pagination__move pagination__toStart"}
        onClick={()=> this.changePage(1) }>
          <Right className="right__arrow" />
          <Right className="right__arrow" />
        </button>
        <button className={this.state.currentPage <= 1 ? "pagination__disabled pagination__move pagination__prev" : "pagination__move pagination__prev" } 
        onClick={()=> this.changePage(--this.state.currentPage) } ><Right className="right__arrow" /> </button>
        <input type="text" className="pagination__indicator" value={this.state.currentPage || 1} onChange={e=> this.inputHandler(e) } />
        <div className="pagination__map">of {this.props.pageCount}</div>
        <button className={this.state.currentPage === this.props.pageCount ? "pagination__disabled pagination__move pagination__next" : "pagination__move pagination__next"} onClick={()=>{
this.changePage(++this.state.currentPage);
        }}> <Right/> </button>
        <button className={this.state.currentPage >= this.props.pageCount ? "pagination__disabled pagination__move" : "pagination__move"}
        onClick={()=> this.changePage(this.props.pageCount) }>
          <Right/> <Right/>
        </button>
      </div>
    </div>
  }
}

export default Pagination