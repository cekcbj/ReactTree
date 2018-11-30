function node(name, children, isOpen, nodeType) {
  if (nodeType === "__FILE") {
    return { name, nodeChildren: children, isOpen, nodeType }
  }

  let nodeChildren = [];
  if (children && children.length > 0) {
    nodeChildren = children.reduce((acc, c) => {
      return acc.concat(node(c.name, c.nodeChildren, c.isOpen, c.nodeType))
    },[])
  }
  return { name, nodeChildren, isOpen, nodeType }
}

const tree = {
  root: node (
    "sandbox",
    [
      node( "react.js", [], false, '__FILE'),
      node(
        "Examples",
        [
          node( "index.js", [], false, '__FILE'),
          node( "main.js", [], false, '__FILE'),
          node(
            "Channels",
            [
              node( "work.js", [], false, '__FILE'),
              node(
                "Fun",
                [
                  node( "what.js", [], false, '__FILE'),
                  node( "testing.js", [], false, '__FILE'),
                  node(
                    "Random",
                    [
                      node( "fizz.js", [], false, '__FILE')
                    ],
                    false,
                    '__DIRECTORY'
                  ),
                ],
                true,
                '__DIRECTORY'
              )
            ],
            false,
            '__DIRECTORY'
          ),
        ],
        true,
        '__DIRECTORY'
      ),
    ],
    false,
    '__DIRECTORY'
  )
}
export default tree;
