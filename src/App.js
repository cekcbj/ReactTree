import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'ramda';


function node(name, children, isOpen, nodeType) {
  console.log('the name is', name);
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

/*
 *
 * Next steps
 * 1. Swap out material ui for bootstrap
 * 2. Traverse tree to render files and directory
 * 3. Add open functionality to folders
 * 4. Add close functionality
 *
*/

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
                "channels",
                [
                  node( "main.js", [], false, '__FILE')
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
    console.log("clicked em");
    console.log(_.isEmpty(this.state.tree))
    this.setState({
      isModalOpen: true
    })
  }

  renderNode(node) {
    return (
      <div>
      </div>
    )
  }

  renderTree(root) {
    console.log(root);
    return (
      <ul>
      </ul>
    )
  }

  render() {
    const shouldCreateProject = _.isEmpty(this.state.tree)
    console.log(this.state)

    return (
      <div className={'hey'}>
        React Tree
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
