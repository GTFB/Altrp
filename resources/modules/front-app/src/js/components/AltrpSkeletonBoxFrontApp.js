import React from "react";

export default function AltrpSkeletonBoxFrontApp({itemsCount}){
  return <div className={`altrp-skeleton-box ${itemsCount ? 'altrp-skeleton-box_grid' : ''}`}>
    {Array.from(Array(itemsCount)).map((i, idx)=>{
      return <div className="altrp-skeleton-box__item" key={idx}/>
    })}
  </div>
}
