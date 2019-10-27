import React, { useState } from 'react'
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

const TabBlock = ({
  titles,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  console.log(titles)



  return(
    <div className="product-tabs">
      <div className="container-fluid">
        <Nav tabs>
          {titles.map((title, key) => (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === key + 1 })}
                onClick={() => {
                  toggle(key + 1)
                }}
              >
                {title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
            {props.children}


        </TabContent>
      </div>
    </div>

  )
}

export default TabBlock
