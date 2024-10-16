import React from 'react'

const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-primary" style={{textAlign:'justify'}} role="alert">
                {props.msg}
            </div>
        </div>
    )
}

export default Alert
