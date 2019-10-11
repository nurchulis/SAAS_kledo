export default function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }

  return false
}
