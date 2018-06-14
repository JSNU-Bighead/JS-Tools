import isArray from 'lodash/isArray'
let paths = [];
export const getPaths = function (nodes, cb) {
  paths=[];
  if (!isArray(nodes)) return paths;
  nodes.forEach((node, index) => {
    getPath(node, cb)
  })
  return paths;
}
function getPath(node, cb) {
  let path = [];//定义变量保存当前结果路径
  function getNodePath(node) {
    path.push(node);
    if (cb(node)) paths.push(path.concat());
    if (isArray(node.children) && node.children.length > 0) {
      node.children.forEach(sub => {
        getNodePath(sub);
      })
    }
    path.pop();//当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
  }
  getNodePath(node);
};
