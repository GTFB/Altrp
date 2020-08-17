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
    }
  }

  /**
   * Задает текущую страницу
   * @param num
   */
  setCurrentPage(num) {
    num = parseInt(num) || 1;
    if(num <= 1) {
      this.setState({currentPage: 1});
      this.props.changePage(1);
      return;
    }
    if(num >= this.props.pageCount) {
      this.setState({currentPage: this.props.pageCount});
      this.props.changePage(this.props.pageCount);
      return;
    }
    this.setState({currentPage: num});
    this.props.changePage(num)

  }

  /**
   * надо проверить, чтобы при обновлении props.pageCount state.currentPage было меньше
   */
  componentDidUpdate(){

    if(this.state.currentPage > this.props.pageCount){
      this.setCurrentPage(this.props.currentPage || this.props.pageCount);
    }
  }
  render(){
    return<div className="pagination">
      <div className="version">
        <p className="pagination__version">App creating with <NavLink className="pagination__link" to="#">Altrp</NavLink> / Version 1.0.1 </p>
      </div>
      <div className="pagination__buttons">
        <p className="pagination__text">{ this.props.itemsCount} Items</p>
        <div className={this.state.currentPage <= 1 ? " pagination__disabled pagination__toStart pagination__move" : "pagination__move pagination__toStart"}
        onClick={()=> this.setCurrentPage(1) }>
          <Right className="right__arrow" />
          <Right className="right__arrow" />
        </div>
        <div className={this.state.currentPage <= 1 ? "pagination__disabled pagination__prev pagination__move" : "pagination__move pagination__prev" } 
        onClick={()=> this.setCurrentPage(--this.state.currentPage) } ><Right className="right__arrow" /> </div>
        <input type="text"
               className="pagination__indicator"
               value={this.state.currentPage || 1}
               onChange={e=> this.setCurrentPage(e.target.value.replace(/[^0-9]/g, '') || 1) } />
        <div className="pagination__map">of {this.props.pageCount}</div>
        <div className={this.state.currentPage >= this.props.pageCount ? "pagination__disabled pagination__next pagination__move" : "pagination__move pagination__next"} onClick={()=>{
this.setCurrentPage(++this.state.currentPage);
        }}> <Right/> </div>
        <div className={this.state.currentPage >= this.props.pageCount ? "pagination__disabled pagination__move" : "pagination__move"}
        onClick={()=> this.setCurrentPage(this.props.pageCount) }>
          <Right/> <Right/>
        </div>
      </div>
    </div>
  }
}

export default Pagination