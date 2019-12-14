import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // first calculate the starting index for the items on this page
  const startIndex = (pageNumber - 1) * pageSize;

  // convert items array to a lodash object (to use in folling methods)
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  // this will effectively paginate data on client + return a vanilla array
}
