import React, { useState, useEffect } from 'react';
import G6 from '@antv/g6';
import { Avatar, List } from 'antd';
import './index.less';

const Sub3 = (props) => {
  const data = [
    {
      title: 'graph.changeData(data, stack)',
      des: '更新数据源，根据新的数据重新渲染视图。'
    },
    {
      title: 'graph.fitCenter(animate, animateCfg)',
      des: '平移图到中心将对齐到画布中心，但不缩放。优先级低于 fitView'
    },
    {
      title: 'graph.addItem(type, model, stack)',
      des: '新增元素（节点和边）。'
    },
    {
      title: 'graph.removeItem(item, stack)',
      des: '删除元素，当 item 为 group ID 时候，则删除分组。'
    },
    {
      title: 'graph.updateItem(item, model, stack)',
      des: '更新元素，包括更新数据、样式等。若图上有 combo，使用该函数更新一个节点位置后，需要调用 updateCombo(combo) 以更新相关 combo 的位置。'
    },
    {
      title: 'graph.getNodes()，graph.getEdges()，graph.getCombos()，graph.getComboChildren(combo)',
      des: '获取图中所有节点，边，combo组，combo 中所有的子节点及子 combo 的实例。'
    },
    {
      title: 'graph.setMode(mode)',
      des: '切换图行为模式。主要用于不同模式下的行为切换，如从编辑模式下切换到只读模式。'
    },
    {
      title: 'graph.clear()，graph.destroy()',
      des: '清除画布元素。该方法一般用于清空数据源，重新设置数据源，重新 render 的场景，此时所有的图形都会被清除。销毁画布。'
    },
    {
      title: 'graph.updateLayout(cfg)',
      des: '更新布局配置项。'
    },
    {
      title: '插件（Menu，Tooltip）',
      des: 'Menu 用于配置节点上的右键菜单。Tooltip 插件主要用于在节点和边上展示一些辅助信息。'
    }
  ];

  return (
    <div className="pageContent">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta title={<a>{item.title}</a>} description={item.des} />
          </List.Item>
        )}
      />
    </div>
  );
};
export default Sub3;
