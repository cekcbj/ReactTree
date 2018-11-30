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
    "Sandbox",
    [
      node( "react.js", [], false, '__FILE'),
      node(
        "Hits",
        [
          node( "index32.js", [], false, '__FILE'),
          node( "yep.js", [], false, '__FILE'),
          node(
            "Plans",
            [
              node( "week.js", [], false, '__FILE'),
              node(
                "Time",
                [
                  node( "remove.js", [], false, '__FILE'),
                  node( "delete.js", [], false, '__FILE'),
                  node(
                    "NonRandom",
                    [
                      node( "far.js", [], false, '__FILE')
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
      node (
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
                      node( "Redux", [
                        node( "reducers.js", [], false, '__FILE'),
                        node( "action.js", [], false, '__FILE'),
                      ], false, '__DIRECTORY'),
                      node(
                        "Random",
                        [
                          node( "fizz.js", [], false, '__FILE'),
                          node( "buzz.js", [], false, '__FILE')
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
    ],
    false,
    '__DIRECTORY'
  )
}
export default tree;
