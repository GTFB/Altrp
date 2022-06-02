export default function sortOptions(options, sortDirection) {
  options.sort((a, b) =>
    a.label.toLowerCase() > b.label.toLowerCase()
      ? 1
      : b.label.toLowerCase() > a.label.toLowerCase()
        ? -1
        : 0
  );
  return sortDirection === "asc" ? options : options.reverse();
}
