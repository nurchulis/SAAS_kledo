import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import routes from 'routes'

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
