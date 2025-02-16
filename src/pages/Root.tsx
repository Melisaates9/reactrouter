import React from 'react'
import Navbars from '../companent/Navbar'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  return (
<>
<Navbars/>
<Outlet/>
</>
  )
}
