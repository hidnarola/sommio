import React, { Component, useState } from 'react'
import ProductDetails from '../ProductPage/ProductDetails'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'

const navItem = ({ children, tabId, toggle, activeTabId, ...props }) => {
  const wrappedChildren =
    typeof children === "string" ? (
      <NavLink className={classnames({ active: activeTabId === tabId })}>
        <div className="d-flex align-content-center flex-wrap">
          <div className="m-1"> {children}</div>
        </div>
      </NavLink>
    ) : typeof children === "function" ? (
      children({ tabId, activeTabId, toggle })
    ) : null;
  const NavItemChild = React.cloneElement(wrappedChildren, {
    ...props,

    onClick: function() {
      toggle(tabId);
      wrappedChildren.props &&
        wrappedChildren.props.onClick &&
        wrappedChildren.props.onClick(tabId);
    }
  });
  return <NavItem {...props}>{NavItemChild}</NavItem>;
};






class TabBlock extends Component {
  static defaultProps = { defaultActiveTab: 1 };
  state = {
    currentTabCount: 0,
    tabs: [],
    activeTab: this.props.defaultActiveTab
  }
  static NavItem = navItem;
  addTab = (tabTitle, tabContent) => {
    this.setState(
      state => {
        const { tabs, currentTabCount, activeTab } = state;
        const wrappedTitle = <TabBlock.NavItem>{tabTitle}</TabBlock.NavItem>;

        const tabId = currentTabCount + 1;

        const newActiveTab = this.props.openTabImmediately ? tabId : activeTab;

        return {
          tabs: [...tabs, { tabTitle: wrappedTitle, tabContent, tabId }],
          currentTabCount: tabId,
          activeTab: newActiveTab
        };
    });
  };
  static Tab = ({ title, children, ...props }) => {
    return (
      ({ addTab }) => {
        if (!children.props.added) {
          children = React.cloneElement(children, {
            added: true
          });
          addTab(title, children, false);
        }
        return null;
      }
    );
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        reRender: !this.state.reRender
      });
    }
  };
  componentDidMount() {
    this.setState({ activeTab: this.props.defaultActiveTab });
  }


  render(){
    const { tabs } = this.state;
    return(
      <h1>Hello There</h1>
    )
  }
}

export default TabBlock
