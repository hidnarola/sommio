import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import classnames from "classnames";

const navItem = ({
  children,
  tabId,
  toggle,
  activeTabId,
  ...props }) => {
  const wrappedChildren = typeof children === "string" ? (
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


class MultiTabs extends React.Component {
  static defaultProps = { defaultActiveTab: 1 };
  state = {
    currentTabCount: 0,
    tabs: [],
    activeTab: this.props.defaultActiveTab
  };

  static NavItem = navItem;

  addTab = (tabTitle, tabContent) => {
    this.setState(state => {
      const { tabs, currentTabCount, activeTab } = state;
      const wrappedTitle = <MultiTabs.NavItem>{tabTitle}</MultiTabs.NavItem>;
      const tabId = currentTabCount + 1;

      return {
        tabs: [...tabs, { tabTitle: wrappedTitle, tabContent, tabId }],
        currentTabCount: tabId,
        activeTab: newActiveTab
      };
    });
  };

  static Tab = ({ title, children, ...props }) => {
    return (
      <MultiTabContext.Consumer>
        {({ addTab }) => {
          if (!children.props.added) {
            children = React.cloneElement(children, {
              added: true
            });
            addTab(title, children, false);
          }
          return null;
        }}
      </MultiTabContext.Consumer>
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

  render() {
    const { tabs } = this.state;
    // return this.props.children;
    return (
      <div>
        <MultiTabContext.Provider
          value={{
            activeTabId: this.state.activeTab,
            currentTabCount: this.state.currentTabCount,
            addTab: this.addTab,
            toggle: this.toggle,

          }}
        >
          {this.props.children}

          {tabs.length > 0 && (
            <React.Fragment>
              <Nav tabs>
                {tabs.map(({ tabTitle, tabId }) =>
                  React.cloneElement(tabTitle, {
                    key: tabId,
                    tabId,
                    close: this.close,
                    toggle: this.toggle,
                    activeTabId: this.state.activeTab
                  })
                )}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {tabs.map(({ tabContent, tabId }) => {
                  return (
                    <TabPane key={tabId} tabId={tabId}>
                      {tabContent}
                    </TabPane>
                  );
                })}
              </TabContent>
            </React.Fragment>
          )}
        </MultiTabContext.Provider>
      </div>
    );
  }
}
export default MultiTabs;
