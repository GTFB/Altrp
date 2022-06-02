/**
 * Кнопки для пагинации
 * @param pageIndex
 * @param pageCount
 * @param first_last_buttons_count
 * @param middle_buttons_count
 * @return {*[]}
 */
export default function generateButtonsArray(
  pageIndex,
  pageCount,
  first_last_buttons_count,
  middle_buttons_count
) {
  const buttonsSum = first_last_buttons_count + middle_buttons_count;
  const lastButtons = Array.from(
    { length: first_last_buttons_count },
    (_, i) => pageCount - i - 1
  ).reverse();
  const middleButtons = Array.from(
    { length: middle_buttons_count },
    (_, i) => pageIndex - Math.floor(middle_buttons_count / 2) + i
  );

  if (pageIndex + 1 < buttonsSum) {
    return [...Array(buttonsSum).keys(), "ellipsis", ...lastButtons];
  }
  if (
    pageIndex >=
    pageCount -
    first_last_buttons_count -
    1 -
    Math.floor(middle_buttons_count / 2)
  ) {
    return [
      ...Array(first_last_buttons_count).keys(),
      "ellipsis",
      ...Array.from(
        { length: first_last_buttons_count + middle_buttons_count },
        (_, i) => pageCount - i - 1
      ).reverse()
    ];
  }

  return [
    ...Array(first_last_buttons_count).keys(),
    "ellipsis",
    ...middleButtons,
    "ellipsis",
    ...lastButtons
  ];
}
