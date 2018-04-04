//删除树结构中 无用结点
let cut = function (nodes, cb) {
    if (!Array.isArray(nodes)) return;
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (cb(node)) {
            nodes.splice(i, 1);
            i--;
        } else {
            if (node.children) {
                cut(node.children)
            } else {
                return;
            }
        }
    }
    return nodes;
}

cut(tree, node => { return node.mtype === '0' })