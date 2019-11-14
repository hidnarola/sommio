import React, {useState, useRef, useEffect} from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

import { FaPlus } from 'react-icons/fa';



 const VideoPopover = ({
    show,
    title,
    ...props
}) => {
    const [target, setTarget] = useState(null);
    const [display, setDisplay] = useState(false)

    const handleClick = event => {
        setDisplay(!display);
        setTarget(event.target);
      };
    const ref = useRef(null)
    return(
        <div className={"plusCircle " + (show ? "show " : "") + (display ? "toggled " : "")}  open={show} ref={ref} onClick={handleClick}>
        <FaPlus />
        <Overlay
            show={display}
            target={target}
            placement="bottom"
            container={ref.current}
            containerPadding={20}
        >
        <Popover >
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
                {props.children}
            </Popover.Content>
            </Popover>
            </Overlay>
        </div>

    )

}

export default VideoPopover