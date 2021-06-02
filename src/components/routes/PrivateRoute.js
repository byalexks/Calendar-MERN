import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={ (props)=>(
                (isAuthenticated)
                // si esta log pasa
                ? (<Component {...props} />)
                // si no pa login
                : (<Redirect to='/login'/>)
            )}
            
        />
    )
}


PrivateRoute.prototypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}