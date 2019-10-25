import React, { useState ,useContext} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'gatsby'
import { CartContext } from '../context/CartContext'
import CartItemList from '../components/CartItemList'

const CartDrawer = props => {
  const { buttonLabel, className } = props
  const { isEmpty } = useContext(CartContext)

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Button color="secondary" onClick={toggle}>
          back
        </Button>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <React.Fragment>
            <CartItemList />
            {/* <CartDrawer buttonLabel="cart" /> */}
            {!isEmpty && (
              <div className="flex justify-end">
                <Link
                  to="/checkout"
                  className="inline-block appearance1 -none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none my-2 no-underline"
                >
                  Continue to checkout
                </Link>
              </div>
            )}
          </React.Fragment>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default CartDrawer
