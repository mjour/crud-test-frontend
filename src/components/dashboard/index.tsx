import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import { ME } from '../../graphql/onboarding'
import Page404 from '../../pages/page404'
import NavBar from './navBar'
import RouteList, { RouteProps } from './routeList'

function Dashboard() {
  const { loading, error, data } = useQuery(ME);

  return (
    <div className='dashboard-nav'>
      <NavBar name='John' />
      <div className='container py-5'>
        <Switch>
          {
            RouteList.map((route: RouteProps, idx: number) => {
              return route.component ?
                (<Route key={idx} path={route.path} element={<route.component {...data} />} />) : null
            })
          }
          <Route path="/*" element={<Page404 />} />
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard