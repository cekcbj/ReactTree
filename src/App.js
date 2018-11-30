import React from 'react';
import * as _ from 'ramda';
import treeObj from './tree';

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    cb: () => '',
    tree: treeObj,
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
    if(node.nodeType === "__DIRECTORY" && node.nodeChildren.length > 0) {
      return (
        <div>
          <li className="font-weight-bold" onClick={() => this.updateNode(node)}>
            {node.name}
          </li>
          { node.isOpen && <ul>{node.nodeChildren.map(c => this.renderNode(c))}</ul>}
        </div>
      )
    }
    return <li className="file"> {node.name} </li>
  };

  renderTree(root) { return <div className="directory-root"> {this.renderNode(root)} </div> }

  render() {
    const shouldCreateProject = _.isEmpty(this.state.tree)
    let addItemType = shouldCreateProject? 'Project': 'Directory'

    return (
      <div className={'hey'}>
        <h1>
          React Tree
        </h1>
        <div className="directory-wrapper">
          <button type="button" className="btn btn-primary add-button">{addItemType}</button>
          <div className="directory">
            {
              this.renderTree(this.state.tree.root)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MenuAppBar
