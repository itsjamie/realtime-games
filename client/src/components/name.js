import React from 'react'

const Name = (props) => {    
    const setName = (e) => {
        e.preventDefault()
        window.localStorage.setItem('name', e.target.name.value)
        props.onNameSet(e.target.name.value)
    }

    if (!props.name) {
        return (
            <form onSubmit={setName}>
                <input name="name" type="text" placeholder="First name..."></input>
            </form>
        )
    }
}

export {
    Name
}