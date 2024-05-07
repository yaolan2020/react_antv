import React, { useState, useEffect } from 'react';
import G6 from '@antv/g6';
import { dataOne } from '../data';
import './index.less';

let graph = null;

const Sub1 = (props) => {
  useEffect(() => {
    initG6();
  }, []);

  const initG6 = () => {
    const container = document.getElementById('container');
    const width = container.scrollWidth || '100%';
    const height = container.scrollHeight || '100%';
    graph = new G6.Graph({
      container: 'container', // String | HTMLElement，必须，在 创建的容器 id 或容器本身
      width, // Number，必须，图的宽度
      height // Number，必须，图的高度
    });
    graph.data(dataOne);
    graph.render(); // 渲染图
  };

  return (
    <div className="pageContent">
      <div id="container"></div>
    </div>
  );
};
export default Sub1;
