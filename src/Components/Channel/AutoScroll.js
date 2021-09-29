import React, { useRef, useEffect } from 'react'

const AutoScroll = () => {

    //special component to display latest message
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());

    return (
        <div ref={elementRef}>
            
        </div>
    )
}

export default AutoScroll
