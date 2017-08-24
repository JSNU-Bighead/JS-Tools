function traverse(tree,cb,collect=[]){
    if(!Array.isArray(tree)) return;
    for(let node of tree){
        collect.push(cb(node));
        if(!Array.isArray(node.children)) continue;
        traverse(node.children,cb,collect)
    }
    return [].concat(collect);
};

var data = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3,
        children: [
            {
                id: 31,
                children: [
                    {
                        id: 311
                    }
                ]
            },
            {
                id: 32
            },
            {
                id: 33
            }
        ]
    }
]

var x = []//[1, 2, 3, 31, 311, 32, 33]
var y = traverse(data,node=>{return node.id},x)//[1, 2, 3, 31, 311, 32, 33]