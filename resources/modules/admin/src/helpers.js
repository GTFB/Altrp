import { result } from "lodash";

export function buildPagesTree(pages) {
  const level = 0;
  const tree = [];
  const root = pages.find(({ parent_page_id }) => parent_page_id === null);

  if (!root) return pages;
  
  tree.push(root);
  treeRecursion(root.id, level + 1);

  function treeRecursion(parentId, level) {
    const children = pages.filter(({ parent_page_id }) => parent_page_id === parentId);
    children.forEach(page => {
      page.title = "—".repeat(level) + page.title;
      tree.push(page);
      treeRecursion(page.id, level + 1);
    });
  }

  return tree;
}