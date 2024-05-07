import React, { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, ColorPicker, Image, Menu, Dropdown, Space } from 'antd';
import authUtils from 'utils/authUtils';
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Export } from '@antv/x6-plugin-export';
import { GridLayout, CircularLayout, DagreLayout, ForceLayout } from '@antv/layout';
import {
  LeftCircleTwoTone,
  RightSquareTwoTone,
  DownOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { comboRect, customImage, ownOtherConfig } from './x6Config';
import addComboImg from 'public/imgs/case/addCombo.png';
import centerImg from 'public/imgs/case/center.png';
import phoneImg from 'public/imgs/case/phone.png';
import cleanImg from 'public/imgs/case/clean.png';
import saveImg from 'public/imgs/case/save.png';
import importImg from 'public/imgs/case/import.png';
import layoutImg from 'public/imgs/case/layout.png';
import './index.less';

let detailDataArr = null;
let detailDataObj = null;

let ownNodeForm = [
  { localName: 'text/fill', displayName: '文本颜色', value: '#000' },
  { localName: 'body/fill', displayName: '填充颜色', value: '#fff' },
  { localName: 'body/stroke', displayName: '边框颜色', value: '#999' },
  { localName: 'body/strokeWidth', displayName: '边框宽度', value: 1 }
];
let menuItem = [
  {
    label: '添加组',
    key: 'addCombo',
    icon: <Image width={20} preview={false} src={addComboImg} />
  },
  {
    label: '居中显示',
    key: 'center',
    icon: <Image width={20} preview={false} src={centerImg} />
  },
  {
    label: '存为图片',
    key: 'toImage',
    icon: <Image width={20} preview={false} src={phoneImg} />
  },
  {
    label: '清空数据',
    key: 'clean',
    icon: <Image width={20} preview={false} src={cleanImg} />
  },
  {
    label: '保存数据',
    key: 'save',
    icon: <Image width={20} preview={false} src={saveImg} />
  },
  {
    label: '导入数据',
    key: 'import',
    icon: <Image width={20} preview={false} src={importImg} />
  },
  {
    label: '布局',
    key: 'layout',
    icon: <Image width={20} preview={false} src={layoutImg} />,
    children: [
      {
        label: '网格布局',
        key: 'gridLayout'
      },
      {
        label: '环形布局',
        key: 'circularLayout'
      },
      {
        label: 'Dagre布局',
        key: 'dagreLayout'
      },
      // {
      //   label: '椭圆布局',
      //   key: 'setting:2'
      // },
      {
        label: '力导向布局',
        key: 'forceLayout'
      }
    ]
  }
];

const Sub4 = (props) => {
  const [form] = Form.useForm();
  const [graph, setGraph] = useState(null);
  const [stencilPeople, setStencilPeople] = useState(null);
  const [stencilOther, setStencilOther] = useState(null);
  const [ownOther, setOwnOther] = useState(null);
  const [visibleFrom, setVisibleFrom] = useState(false); //显示form表单
  const [visibleType, setVisibleType] = useState(null); //form表单中显示node内容还是edge内容
  const [visiblePanel, setVisiblePanel] = useState(true); //显示面板
  const [detailData, setDetailData] = useState(null); //form表单详情
  const [selNode, setSelNode] = useState(null); //选中的node
  const [snapshotId, setSnapshotId] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    initX6();
  }, []);

  useEffect(() => {
    if (graph) {
      initOwnOther(); //其他布局
    }
  }, [graph]);

  const initX6 = () => {
    const container = document.getElementById('graph-container');
    const width = container.scrollWidth || '100%';
    const height = container.scrollHeight || '100%';
    const graph1 = new Graph({
      container,
      height,
      width,
      grid: true, //是否显示网格
      translating: {
        //限制节点移动。
        restrict(view) {
          if (view) {
            const cell = view.cell;
            if (cell.isNode()) {
              const parent = cell.getParent();
              if (parent) {
                return parent.getBBox();
              }
            }
          }
          return null;
        }
      },
      embedding: {
        //嵌套节点，默认禁用。
        enabled: true
      },
      mousewheel: {
        //画布缩放
        enabled: true,
        zoomAtMousePosition: true, //是否将鼠标位置作为中心缩放
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3
      },
      connecting: {
        //连线选项。
        router: {
          name: 'manhattan',
          args: {
            padding: 1
          }
        },
        connector: {
          name: 'rounded',
          args: {
            radius: 8
          }
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            },
            tools: [
              {
                name: 'edge-editor',
                args: {
                  attrs: {
                    backgroundColor: '#fffbe6'
                  }
                }
              }
            ],
            zIndex: 0
          });
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet;
        }
      },
      highlighting: {
        magnetAdsorbed: {
          //连线过程中，自动吸附到连接桩时被使用。
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF'
            }
          }
        },
        embedding: {
          //拖动节点进行嵌入操作过程中，节点可以被嵌入时被使用。
          name: 'stroke',
          args: {
            padding: -1,
            attrs: {
              stroke: '#73d13d'
            }
          }
        }
      },
      panning: {
        //画布平移
        enabled: true,
        modifiers: ['ctrl'], //拖拽可能和其他操作冲突，此时可以设置 modifiers 参数，设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。
        eventTypes: ['leftMouseDown']
      }
    });
    // #region 使用插件
    graph1
      .use(
        new Transform({
          //图形变换
          resizing: true,
          rotating: true
        })
      )
      .use(
        new Selection({
          //框选
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true
          // pointerEvents: 'none'
        })
      )
      .use(new Snapline()) //对齐线
      .use(new Keyboard()) //快捷键
      .use(new Clipboard()) //复制张贴
      .use(new History()) //撤销重做
      .use(new Export()); //导出
    // #endregion
    // Graph.registerNodeTool('contextmenu', ContextMenuTool, true);
    Graph.registerNode('custom-rect', comboRect, true);
    Graph.registerNode('custom-people', customImage, true);
    Graph.registerNode('custom-other', customImage, true);

    Graph.registerNode('Terminal', ownOtherConfig.Terminal, true);
    Graph.registerNode('Process', ownOtherConfig.Process, true);
    Graph.registerNode('Decision', ownOtherConfig.Decision, true);
    Graph.registerNode('DatalO', ownOtherConfig.DatalO, true);
    Graph.registerNode('Connector', ownOtherConfig.Connector, true);
    Graph.registerNode('Text', ownOtherConfig.Text, true);
    Graph.registerNode('Delay', ownOtherConfig.Delay, true);
    Graph.registerNode('Extract', ownOtherConfig.Extract, true);
    Graph.registerNode('Merge', ownOtherConfig.Merge, true);
    Graph.registerNode('ManualInput', ownOtherConfig.ManualInput, true);
    Graph.registerNode('OffPageLink', ownOtherConfig.OffPageLink, true);
    Graph.registerNode('ManualOperation', ownOtherConfig.ManualOperation, true);
    Graph.registerNode('Preparation', ownOtherConfig.Preparation, true);
    Graph.registerNode('Database', ownOtherConfig.Database, true);
    Graph.registerNode('Heart', ownOtherConfig.Heart, true);
    Graph.registerNode('Start', ownOtherConfig.Start, true);
    Graph.registerNode('StroedData', ownOtherConfig.StroedData, true);
    Graph.registerNode('VerificationCode', ownOtherConfig.VerificationCode, true);
    Graph.registerNode('Contact', ownOtherConfig.Contact, true);
    Graph.registerNode('Plane', ownOtherConfig.Plane, true);
    Graph.registerNode('Search', ownOtherConfig.Search, true);
    Graph.registerNode('File', ownOtherConfig.File, true);
    Graph.registerNode('Qumian', ownOtherConfig.Qumian, true);

    nodeMouse(graph1); //鼠标悬浮节点事件
    edgeMouse(graph1); //鼠标悬浮连线事件
    bindKeyGraph(graph1); //快捷键事件添加
    comboChangeSize(graph1); //组自适应尺寸

    graph1.on('node:click', ({ e, x, y, node, view }) => {
      if (node.shape == 'custom-other') {
        if (detailDataArr && detailDataArr[node.id]) {
          form.setFieldsValue({ ...detailDataObj[node.id] });
        } else {
          let objNew = {
            ...detailDataArr,
            [node.id]: JSON.parse(sessionStorage.getItem('nodeTypes'))[node?.markup[0].textContent]
              .properties
          };
          detailDataArr = objNew;
          detailDataObj = { ...detailDataObj, [node.id]: null };
          form.resetFields();
        }
        setDetailData(
          JSON.parse(sessionStorage.getItem('nodeTypes'))[node?.markup[0].textContent].properties
        );
        setSelNode(node);
        setVisibleType('nodeOther');
        setVisibleFrom(true);
      } else if (node.shape == 'custom-rect') {
        form.resetFields();
        setDetailData(null);
        setVisibleType('nodeCombo');
        setVisibleFrom(false);
      } else {
        if (detailDataObj && detailDataObj[node.id]) {
          form.setFieldsValue({ ...detailDataObj[node.id] });
        } else {
          detailDataObj = { ...detailDataObj, [node.id]: null };
          form.resetFields();
        }
        setSelNode(node);
        setDetailData(null);
        setVisibleType('nodeOwnOther');
        setVisibleFrom(true);
      }
    });

    graph1.on('blank:click', ({ e, x, y, blank, view }) => {
      setVisibleType(null);
      setVisibleFrom(false);
    });
    graph1.on('edge:contextmenu', ({ e, x, y, edge, view }) => {
      graph1.removeEdge(edge);
    });
    graph1.on('node:contextmenu', ({ e, x, y, node, view }) => {
      if (node.shape == 'custom-rect') {
        let childData = [...node.children];
        let lineData = [
          ...graph1.getEdges().filter((value) => {
            return value.source.cell !== node.id && value.target.cell !== node.id;
          })
        ];
        graph1.removeNode(node);
        graph1.removeCells(graph1.getEdges());
        graph1.addNodes(childData);
        graph1.addEdges(lineData);
      } else if (node.shape == 'custom-other') {
        graph1.removeNode(node);
        delete detailDataArr[node.id];
      } else {
        graph1.removeNode(node);
      }
    });

    setGraph(graph1);
  };
  //移动节点-组大小自适应
  const comboChangeSize = (graph) => {
    let ctrlPressed = false;
    const embedPadding = 20;

    graph.on('node:embedding', ({ e }) => {
      ctrlPressed = e.metaKey || e.ctrlKey;
    });

    graph.on('node:embedded', () => {
      ctrlPressed = false;
    });

    graph.on('node:change:size', ({ node, options }) => {
      if (options.skipParentHandler) {
        return;
      }

      const children = node.getChildren();
      if (children && children.length) {
        node.prop('originSize', node.getSize());
      }
    });

    graph.on('node:change:position', ({ node, options }) => {
      if (options.skipParentHandler || ctrlPressed) {
        return;
      }

      const children = node.getChildren();
      if (children && children.length) {
        node.prop('originPosition', node.getPosition());
      }

      const parent = node.getParent();
      if (parent && parent.isNode()) {
        let originSize = parent.prop('originSize');
        if (originSize == null) {
          originSize = parent.getSize();
          parent.prop('originSize', originSize);
        }

        let originPosition = parent.prop('originPosition');
        if (originPosition == null) {
          originPosition = parent.getPosition();
          parent.prop('originPosition', originPosition);
        }

        let x = originPosition.x;
        let y = originPosition.y;
        let cornerX = originPosition.x + originSize.width;
        let cornerY = originPosition.y + originSize.height;
        let hasChange = false;

        const children = parent.getChildren();
        if (children) {
          children.forEach((child) => {
            const bbox = child.getBBox().inflate(embedPadding);
            const corner = bbox.getCorner();

            if (bbox.x < x) {
              x = bbox.x;
              hasChange = true;
            }

            if (bbox.y < y) {
              y = bbox.y;
              hasChange = true;
            }

            if (corner.x > cornerX) {
              cornerX = corner.x;
              hasChange = true;
            }

            if (corner.y > cornerY) {
              cornerY = corner.y;
              hasChange = true;
            }
          });
        }

        if (hasChange) {
          parent.prop(
            {
              position: { x, y },
              size: { width: cornerX - x, height: cornerY - y }
            },
            { skipParentHandler: true }
          );
        }
      }
    });
  };
  //快捷键事件
  const bindKeyGraph = (graph) => {
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo();
      }
      return false;
    });
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo();
      }
      return false;
    });

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // delete
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom();
      if (zoom < 1.5) {
        graph.zoom(0.1);
      }
    });
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom();
      if (zoom > 0.5) {
        graph.zoom(-0.1);
      }
    });
  };
  //控制节点连接桩显示/隐藏
  const nodeMouse = (graph) => {
    const showPorts = (ports, show) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden';
      }
    };
    graph.on('node:mouseenter', () => {
      const container = document.getElementById('graph-container');
      const ports = container.querySelectorAll('.x6-port-body');
      showPorts(ports, true);
    });
    graph.on('node:mouseleave', () => {
      const container = document.getElementById('graph-container');
      const ports = container.querySelectorAll('.x6-port-body');
      showPorts(ports, false);
    });
  };
  //控制线的变化
  const edgeMouse = (graph) => {
    graph.on('edge:mouseenter', ({ e, x, y, edge, view }) => {
      edge.attr('line/strokeWidth', 2);
    });
    graph.on('edge:mouseleave', ({ e, x, y, edge, view }) => {
      edge.attr('line/strokeWidth', 1);
    });
  };

  //人员布局
  const initStencilPeople = () => {
    let stencilPeople1 = new Stencil({
      title: '',
      target: graph,
      stencilGraphWidth: 228,
      stencilGraphHeight: 0,
      collapsable: false,
      search(cell, keyword) {
        return cell.label.indexOf(keyword) !== -1;
      },
      placeholder: '姓名',
      notFoundText: '无数据',
      groups: [
        {
          title: '人员',
          name: 'group1',
          collapsable: false,
          layoutOptions: {
            columns: 4,
            columnWidth: 55,
            rowHeight: 60
          }
        }
      ]
    });
    document.getElementById('stencilPeople').appendChild(stencilPeople1.container);
    setStencilPeople(stencilPeople1);
  };

  //其他布局
  const initOwnOther = () => {
    let ownOther1 = new Stencil({
      title: '通用节点',
      target: graph,
      stencilGraphWidth: 228,
      stencilGraphHeight: 0,
      collapsable: false,
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55
      },
      groups: [
        {
          title: '通用节点',
          name: 'groupOther',
          collapsable: false,
          layoutOptions: {
            columns: 4,
            columnWidth: 55,
            rowHeight: 60
          }
        }
      ]
    });
    document.getElementById('ownOther').appendChild(ownOther1.container);
    setOwnOther(ownOther1);
    ownOtherDataChange(ownOther1);
  };
  //其他数据更新
  const ownOtherDataChange = (ownOther) => {
    let dataNew = (Object.keys(ownOtherConfig) || []).map((itemIn) => {
      return graph.createNode({
        shape: itemIn,
        label: itemIn == 'Text' ? 'text' : ''
      });
    });
    ownOther.load(dataNew, 'groupOther');
  };

  //添加组
  const addGroup = () => {
    let childs = graph.getSelectedCells();
    let xArr = [],
      yArr = [];
    for (let i = 0; i < childs.length; i++) {
      xArr.push(childs[i].store.data.position.x);
      yArr.push(childs[i].store.data.position.y);
    }
    xArr.sort();
    yArr.sort();
    if (childs.length) {
      let width =
        xArr[xArr.length - 1] - xArr[0] + 50 < 120 ? 120 : xArr[xArr.length - 1] - xArr[0] + 50;
      let height =
        yArr[yArr.length - 1] - yArr[0] + 70 < 120 ? 120 : yArr[yArr.length - 1] - yArr[0] + 70;
      const parent = graph.addNode({
        x: xArr[0] - 10,
        y: yArr[0] - 30,
        width,
        height,
        shape: 'custom-rect'
      });

      for (let i = 0; i < childs.length; i++) {
        parent.addChild(childs[i]);
      }
    } else {
      console.log('请先框选节点');
    }
  };

  const changeShowPanel = () => {
    setVisiblePanel((visiblePanel) => !visiblePanel);
  };
  const submitForm = () => {
    form.validateFields().then((fieldsValue) => {
      let data = { ...fieldsValue };
      detailDataObj[selNode.id] = data;
      let properties = detailDataArr[selNode.id];
      let title = '';
      for (let i = 0; i < properties.length; i++) {
        if (properties[i].isTitle && data[properties[i].localName] != undefined) {
          title += data[properties[i].localName];
        }
      }
      if (title.trim().length !== 0) {
        graph.getCellById(selNode.id).attr('text/text', title);
      }
      cancleForm();
    });
  };

  const submitFormNodeOwn = () => {
    form.validateFields().then((fieldsValue) => {
      let data = {
        ...fieldsValue,
        'body/fill': fieldsValue['body/fill']
          ? typeof fieldsValue['body/fill'] === 'string'
            ? fieldsValue['body/fill']
            : fieldsValue['body/fill'].toHexString()
          : '#fff',
        'body/stroke': fieldsValue['body/stroke']
          ? typeof fieldsValue['body/stroke'] === 'string'
            ? fieldsValue['body/stroke']
            : fieldsValue['body/stroke'].toHexString()
          : '#999',
        'body/strokeWidth': fieldsValue['body/strokeWidth'] || 1,
        'text/fill': fieldsValue['text/fill']
          ? typeof fieldsValue['text/fill'] === 'string'
            ? fieldsValue['text/fill']
            : fieldsValue['text/fill'].toHexString()
          : '#000'
      };
      let arr = Object.keys(data);
      detailDataObj[selNode.id] = data;
      for (let i = 0; i < arr.length; i++) {
        graph.getCellById(selNode.id).attr(arr[i], data[arr[i]]);
      }
      cancleForm();
    });
  };

  const cancleForm = () => {
    setSelNode(null);
    form.resetFields();
    setDetailData(null);
    setVisibleFrom(false);
    setVisibleType(null);
  };
  //保存数据
  const saveX6 = () => {
    sessionStorage.setItem('graphX6', JSON.stringify(graph.toJSON()));
    sessionStorage.setItem('graphX6Cells', JSON.stringify(graph.getCells()));
    sessionStorage.setItem('graphX6Nodes', JSON.stringify(graph.getNodes()));
    sessionStorage.setItem('graphX6Edges', JSON.stringify(graph.getEdges()));
    sessionStorage.setItem('graphX6DetailDataArr', JSON.stringify(detailDataArr));
  };
  //网格布局
  const gridLayout = () => {
    const container = document.getElementById('graph-container');
    const width = container.scrollWidth || '100%';
    const height = container.scrollHeight || '100%';
    let nodes = JSON.parse(sessionStorage.getItem('graphX6Nodes'));
    let edges = JSON.parse(sessionStorage.getItem('graphX6Edges'));
    const gridLayout = new GridLayout({
      type: 'grid',
      width,
      height,
      sortBy: 'label',
      rows: 1,
      cols: 4
    });
    const model = gridLayout.layout({ nodes, edges });
    graph.fromJSON(model);
  };
  //环形布局
  const circularLayout = () => {
    const container = document.getElementById('graph-container');
    const width = container.scrollWidth || '100%';
    const height = container.scrollHeight || '100%';
    let nodes = JSON.parse(sessionStorage.getItem('graphX6Nodes'));
    const circularLayout = new CircularLayout({
      type: 'circular',
      center: [width / 2, height / 2]
    });
    const model = circularLayout.layout({ nodes });
    graph.fromJSON(model);
  };
  //dagre布局
  const dagreLayout = () => {
    let nodes = JSON.parse(sessionStorage.getItem('graphX6Nodes'));
    let edges = JSON.parse(sessionStorage.getItem('graphX6Edges'));
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 35,
      nodesep: 15
    });
    const model = dagreLayout.layout({ nodes, edges });
    graph.fromJSON(model);
  };
  //力导向布局
  const forceLayout = () => {
    const container = document.getElementById('graph-container');
    const width = container.scrollWidth || '100%';
    const height = container.scrollHeight || '100%';
    let nodes = JSON.parse(sessionStorage.getItem('graphX6Nodes'));
    let edges = JSON.parse(sessionStorage.getItem('graphX6Edges'));
    const forceLayout = new ForceLayout({
      type: 'force',
      center: [width / 2, height / 2],
      preventOverlap: true, //是否防止重叠
      tick: () => {
        graph.fromJSON({ nodes, edges });
      }
    });
    forceLayout.layout({ nodes, edges });
  };
  const menuOnClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    switch (e.key) {
      case 'addCombo':
        addGroup();
        break;
      case 'center':
        if (graph.getSelectedCells().length) {
          graph.centerCell(graph.getSelectedCells()[0]);
        } else {
          graph.centerContent();
        }
        break;
      case 'toImage':
        graph.exportPNG('graph', {
          backgroundColor: '#ffffff',
          width: 1200,
          height: 800,
          padding: 12
        });
        break;
      case 'clean':
        graph.clearCells();
        detailDataArr = null;
        break;
      case 'save':
        saveX6();
        break;
      case 'import':
        graph.fromJSON(JSON.parse(sessionStorage.getItem('graphX6')));
        detailDataArr = JSON.parse(sessionStorage.getItem('graphX6DetailDataArr'));
        break;

      case 'gridLayout':
        graph.clearCells();
        gridLayout();
        break;
      case 'circularLayout':
        graph.clearCells();
        circularLayout();
        break;
      case 'dagreLayout':
        graph.clearCells();
        dagreLayout();
        break;
      case 'forceLayout':
        graph.clearCells();
        forceLayout();
        break;
      default:
        null;
    }
  };

  return (
    <div className="page-content">
      <div id="container">
        <div id="graph-stencil" style={{ display: visiblePanel ? 'block' : 'none' }}>
          <div className="leftIcon" onClick={changeShowPanel}>
            <LeftCircleTwoTone style={{ fontSize: 30 }} twoToneColor="#ddd"></LeftCircleTwoTone>
          </div>
          <div id="ownOther"></div>
        </div>

        <div
          className="rightIcon"
          onClick={changeShowPanel}
          style={{ display: visiblePanel ? 'none' : 'block' }}
        >
          <RightSquareTwoTone style={{ fontSize: 30 }} twoToneColor="#ddd"></RightSquareTwoTone>
        </div>

        <div id="graph-container"></div>
        <div className="graph-btns">
          <Menu onClick={menuOnClick} selectedKeys={[current]} mode="horizontal" items={menuItem} />
        </div>
        <div id="graph-form" style={{ display: visibleFrom ? 'block' : 'none' }}>
          <div id="form-container">
            {visibleType == 'nodeOther' ? (
              <Form layout="inline" form={form}>
                {detailData.map((item) => {
                  return (
                    <Form.Item
                      key={item.localName}
                      label={item.displayName}
                      name={item.localName}
                      rules={[{ required: item.isPk }]}
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  );
                })}
                <Form.Item
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '30px'
                  }}
                >
                  <Button style={{ marginRight: '6px' }} type="primary" onClick={submitForm}>
                    保存
                  </Button>
                  <Button style={{ marginLeft: '6px' }} onClick={cancleForm}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            ) : visibleType == 'nodeOwnOther' ? (
              <Form layout="inline" form={form}>
                {ownNodeForm.map((item) => {
                  return (
                    <Form.Item key={item.localName} label={item.displayName} name={item.localName}>
                      {item.displayName.includes('颜色') ? (
                        <ColorPicker defaultValue={item.value} />
                      ) : (
                        <Input placeholder="请输入" />
                      )}
                    </Form.Item>
                  );
                })}
                <Form.Item
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '30px'
                  }}
                >
                  <Button style={{ marginRight: '6px' }} type="primary" onClick={submitFormNodeOwn}>
                    保存
                  </Button>
                  <Button style={{ marginLeft: '6px' }} onClick={cancleForm}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            ) : visibleType == 'edge' ? (
              <Form layout="inline" form={form}>
                <Form.Item
                  label="线名称"
                  name="edgeName"
                  rules={[{ required: true, message: '请输入名称!' }]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub4;
