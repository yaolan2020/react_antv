import React from 'react';
import loadable from '@loadable/component';
import Content from 'components/Content';
import './index.less';

const pageComponents = {
  sub1: loadable(() => import('pages/l7/sub1')),
  sub2: loadable(() => import('pages/l7/sub2')),
  sub3: loadable(() => import('pages/l7/sub3')),
  sub4: loadable(() => import('pages/l7/sub4'))
};
const L7 = () => <Content name="l7" pageComponents={pageComponents} />;
export default L7;
