import React from "react";
import Account from "../../pages/account";
import Address from "../../pages/address";
import Index from "../../pages/index";

export interface RouteProps {
  path: string,
  name: string,
  component: React.FC
}
const RouteList: RouteProps[] = [
  { path: '/', name: 'Customer', component: Index },
  { path: '/account', name: 'Customer', component: Account },
  { path: '/address', name: 'Customer', component: Address },
]

export default RouteList;