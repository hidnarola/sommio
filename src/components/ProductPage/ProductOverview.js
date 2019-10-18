import React, { useState } from 'react'
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
const ProductOverview = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  return (
    <div className="product-tabs">
      <div className="container-fluid">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
              }}
            >
              Materials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3')
              }}
            >
              Learn
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                toggle('4')
              }}
            >
              Usage
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => {
                toggle('5')
              }}
            >
              FAQ
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col xs="12" md="8">
                <h3>What is it?</h3>
                <p>
                  Our Sommio Comfort is a pocketless blanket in a plush cover.
                  The double sided cover has a luxurious plush furry fabric and
                  a smooth fuzzy velvet; providing fantastic tactile stimulation
                  (We never user cheap microfibre/minky). The weighted inner is
                  hand sewn. The cover and blanket are paired with a zip,
                  ensuring the blanket stays in perfect position inside the
                  cover.
                </p>
              </Col>
              <Col
                xs="12"
                md="4"
                className="d-flex flex-wrap align-content-center justify-content-center"
              >
                <ul>
                  <li>Weightex™ fabric</li>
                  <li>Handmade</li>
                  <li>Made in Europe</li>
                  <li>Hypoallergenic</li>
                </ul>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4>Tab 2 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Tab 3 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <h4>Tab 4 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12">
                <h4>Tab 5 Contents</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}
export default ProductOverview
