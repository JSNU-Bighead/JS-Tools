var createTree = function (list, rootFilter, childFilter, childrenName = "children") {
    var tree = [];
    var remainList = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (rootFilter(list[i])) {
            tree.push(list[i]);
        } else {
            remainList.push(list[i]);
        }
    }
    var levelNodeList = tree;
    list = remainList;
    while (levelNodeList.length && list.length) {
        var childList = [];
        for (var i = 0, len = levelNodeList.length; i < len; i++) {
            var node = levelNodeList[i];
            var nodeChildList = [];
            remainList = [];
            for (var j = 0, len2 = list.length; j < len2; j++) {
                if (childFilter(list[j], node)) {
                    childList.push(list[j]);
                    nodeChildList.push(list[j]);
                } else {
                    remainList.push(list[j])
                }
            }
            if (nodeChildList.length) {
                node[childrenName] = nodeChildList;
            }
            list = remainList;
        }
        levelNodeList = childList;
    }
    return tree;
}

createTree(
    nodes,
    (node) => { return node[parentName] === '' },
    (child, parent) => { return child[parentName] === parent[name] },
)