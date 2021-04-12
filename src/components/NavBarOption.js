import React from 'react'

import './NavBarOption.css'

function NavBarOption({ text, Icon}) {
    return (
        <div className='navbarOption'>
            <Icon />
            <h2>{text}</h2>
        </div>
    )
}

export default NavBarOption
