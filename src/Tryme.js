import react from 'react'

const Tryme = (props) => {
    const blogObj = {
        title: props.title
    }
    return (
        <p>{blogObj.title}</p>
    )
}

export default Tryme