import React from 'react';

import loadable from '@loadable/component';
import Content from 'components/Content';

const pageComponents = {
  sub1: loadable(() => import('pages/x6/sub1')),
  sub2: loadable(() => import('pages/x6/sub2')),
  sub3: loadable(() => import('pages/x6/sub3')),
  sub4: loadable(() => import('pages/x6/sub4'))
};
const G6 = () => {
  return <Content name="x6" pageComponents={pageComponents} />;
};
export default G6;
