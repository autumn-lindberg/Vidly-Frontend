import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // calculate what index to start displaying items
  const startIndex = (pageNumber - 1) * pageSize;
  // _(items) is a lodash wrapper that gets the correct array (items)
  // slice copies an array starting at startIndex to end of array
  // take grabs only pageSize items from the created array
  // value returns a regular array instead of lodash wrapper
  return _(items).slice(startIndex).take(pageSize).value();
}
