import getContent from '../getContent';

export default function renderStars(settings, device, context) {
  const countNumber: number = parseInt(getContent(settings, context, 'count', device)?.size) || 1;
  const count = new Array(countNumber).fill('', 0, countNumber);

  return `<ul class="altrp-stars-list" style="list-style-type: none; margin: 0; padding: 0; display: flex;">
${count
  .map(
    (star) => `<li class="${
      'altrp-stars-star altrp-stars-visual' + star
    }" style="cursor: pointer;"><svg style="transition: none;" data-icon="star-empty" width="20" height="20" viewBox="0 0 20 20">
<path d="M20 7.6l-6.9-1.1L10 0 6.9 6.6 0 7.6l5 5.1L3.8 20l6.2-3.4 6.2 3.4-1.2-7.2 5-5.2zM10 15l-4.5 2.4.9-5.2-3.6-3.6 5-.8L10 3.1l2.2 4.7 5 .8-3.6 3.7.9 5.2L10 15z" fill-rule="evenodd"/>
</svg></li>`
  )
  .join(' ')}
</ul>`;
}
