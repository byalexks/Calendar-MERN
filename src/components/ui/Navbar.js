import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

  const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch( startLogout() )
  }


  const {name} = useSelector(state => state.auth)
    return (
      <div className="navbar navbar-dark bg-dark mb-5">
        <span className="navbar-brand">{name}</span>

        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          <span onClick={handleLogout}> Salir</span>
        </button>
      </div>
    );
}
