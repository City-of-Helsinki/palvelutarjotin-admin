/**
 * Sort favored items in the beginning of the list in given order.
 * Then sort the rest of the items alphabetically.
 */
export default function sortFavorably(sortable: string[], favored: string[]) {
  favored = [...favored].reverse();
  return [...sortable].sort((a: string, b: string) => {
    if (favored.indexOf(a) < favored.indexOf(b)) return 1;
    if (favored.indexOf(a) > favored.indexOf(b)) return -1;
    return a < b ? -1 : 1;
  });
}
