import getResponsiveSetting from "../../getResponsiveSetting";

export default function AltrpSkeletonBox(settings: {}, screenName: string) {

  const columns = Number(getResponsiveSetting(settings, 'skeleton:columns', screenName))
  let rows = Number(getResponsiveSetting(settings, 'skeleton:rows', screenName))
  if (columns && !rows) {
    rows = 1
  }

  const itemsCount = columns * rows
  return `<div class="altrp-skeleton-box ${columns ? 'altrp-skeleton-box_grid' : ''}">
  ${Array.from(Array(itemsCount)).map(() => {
    return `<div class="altrp-skeleton-box__item" ></div>`
  }).join('')}
  </div>`
}
