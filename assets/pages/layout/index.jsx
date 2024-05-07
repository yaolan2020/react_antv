import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import Header from 'components/Header';
import NotFound from 'components/NotFound';

import authUtils from 'utils/authUtils';

const pageComponents = {
  g6: loadable(() => import('pages/g6')),
  x6: loadable(() => import('pages/x6')),
  l7: loadable(() => import('pages/l7'))
};

const Layout = () => {
  const [renderKey, setRenderKey] = useState(0);
  const newModules = authUtils.getModuleRoles();
  const getRootRedirect = (modules) => {
    if (
      modules[0].path === window.location.pathname &&
      modules[0].children &&
      modules[0].children.length > 0
    ) {
      return modules[0].children[0].path;
    }
    return modules[0].path;
  };

  useEffect(() => {
    authUtils.testSetModuleRoles();
    setRenderKey(renderKey + 1);
  }, []);

  return newModules.length > 0 ? (
    <div className="container">
      <Header modules={newModules} />
      <Switch>
        {authUtils.getHomePath() === getRootRedirect(newModules) ? null : (
          <Route
            exact
            path={authUtils.getHomePath()}
            render={() => <Redirect to={getRootRedirect(newModules)}></Redirect>}
          />
        )}
        {newModules.map((item, index) => (
          <Route key={index} path={item.path} component={pageComponents[item.name]} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </div>
  ) : null;
};
export default Layout;
