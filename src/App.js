import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'ramda';


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

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick  = this.handleClick.bind(this);
    this.handleClose  = this.handleClose.bind(this);
  }

  state = {
    isModalOpen: false,
    cb: () => '',
    tree: {
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
    },
  };


  handleClose() {
    this.setState({
      isModalOpen: false,
    })
  }


  handleClick() {
    this.setState({
      isModalOpen: true
    })
  }

  updateNode(node) {
    let newNode = this.modifyNode(this.state.tree.root, node )
    this.setState({ tree: { root : newNode }})
  }

  modifyNode(currentNode, nodeToModify) {
    if(currentNode === nodeToModify) {
      return {...currentNode, isOpen: !currentNode.isOpen}
    }
    return {...currentNode, nodeChildren: currentNode.nodeChildren.map(c => this.modifyNode(c, nodeToModify))} ;
  }

  renderNode(node) {
    if(node.nodeType === "__DIRECTORY" && node.nodeChildren.length > 0){
      return (
        <div>
          <li className="font-weight-bold" onClick={() => this.updateNode(node)}>{node.name}</li>
          { node.isOpen && node.nodeChildren.map(c => this.renderTree(c))}
        </div>
      )
    }
    return (
      <li>
        {node.name}
      </li>
    )
  }

  renderTree(root) {
    return (
      <ul>
        {this.renderNode(root)}
      </ul>
    )
  }

  render() {
    const shouldCreateProject = _.isEmpty(this.state.tree)
    let addItemType = shouldCreateProject? 'Project': 'Directory'

    return (
      <div className={'hey'}>
        <h1>
          React Tree
        </h1>
        <button type="button" className="btn btn-primary add-button">{addItemType}</button>
        <ul>
        {
          this.renderTree(this.state.tree.root)
        }
        </ul>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MenuAppBar
