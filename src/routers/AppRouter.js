
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginPage from '../components/LoginPage'
import ExpenseDashboard from '../components/ExpenseDashboard'
import AddExpense from '../components/AddExpensePage'
import EditExpense from '../components/EditExpensePage'
import Help from '../components/Help'
import NotFound from '../components/404'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => (
    <div>
        <Switch>
            <PublicRoute path="/" exact={true} component={LoginPage}/>
            <PrivateRoute path="/dashboard" component={ExpenseDashboard}/>
            <PrivateRoute path="/create" component={AddExpense}/>
            <PrivateRoute path="/edit/:id" component={EditExpense}/>
            <Route path="/help" component={Help}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
)

export default AppRouter