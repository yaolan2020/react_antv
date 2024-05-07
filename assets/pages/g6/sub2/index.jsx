import React, { useState, useEffect } from 'react';
import G6 from '@antv/g6';
import { Rect, Text, Circle, Image, Group, createNodeFromReact } from '@antv/g6-react-node';
import { dataTwo } from '../data';
import { nodeCreat, comboCreat } from '../g6Config';
import './index.less';

let graph = null;

const Sub2 = (props) => {
  useEffect(() => {
    G6.registerNode('rect-own', nodeCreat, 'rect'); //自定义节点--普通
    G6.registerNode(
      'rect-jsx',
      (cfg) => `
    <rect style={{
      width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
    }} keyshape="true" name="test">
      <text style={{ 
        marginTop: 2, 
        marginLeft: 50, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fill: '#fff' }} 
        name="title">${cfg.label || cfg.id}</text>
          <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 10 }} />
    </rect>
  `
    ); //自定义节点--类jsx语法

    const Card = ({ cfg }) => {
      return (
        <Rect
          style={{
            width: cfg.size[0] || 160,
            height: 'auto',
            fill: '#fff',
            stroke: '#ddd',
            shadowColor: '#eee',
            shadowBlur: 30,
            radius: [8],
            justifyContent: 'center'
          }}
          draggable
        >
          <Text
            style={{
              fill: '#000',
              margin: [12, 12, 6, 12],
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            {cfg.label}
          </Text>
          <Text style={{ fill: '#ccc', fontSize: 12, margin: [6, 12, 12, 12] }}>我特别特别</Text>
        </Rect>
      );
    };
    G6.registerNode('rect-react', createNodeFromReact(Card)); //自定义节点--使用React定义节点
    G6.registerEdge(
      'line-growth',
      {
        afterDraw(cfg, group) {
          const shape = group.get('children')[0];
          const length = shape.getTotalLength();
          shape.animate(
            (ratio) => {
              const startLen = ratio * length;
              const cfg = {
                lineDash: [startLen, length - startLen]
              };
              return cfg;
            },
            {
              repeat: true,
              duration: 2000
            }
          );
        }
      },
      'cubic'
    );
    G6.registerCombo('cRect', comboCreat, 'rect'); //自定义Combo
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
    graph.data(dataTwo);
    graph.render(); // 渲染图
  };

  return (
    <div className="pageContent">
      <div id="container"></div>
    </div>
  );
};
export default Sub2;
