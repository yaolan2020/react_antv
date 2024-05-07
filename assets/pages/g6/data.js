import G6 from '@antv/g6';

export const dataOne = {
  // 点集
  nodes: [
    { id: 'node1', x: 200, y: 200, label: 'node1' },
    { id: 'node2', x: 400, y: 200, label: 'node2' }
  ],
  // 边集
  edges: [{ source: 'node1', target: 'node2' }]
};
export const dataTwo = {
  // 点集
  nodes: [
    {
      id: 'node1',
      x: 200,
      y: 100,
      size: [60, 30],
      label: 'node1'
      // comboId: 'comboA' // node1 属于 comboA
      //   style: {
      //     fill: 'rgba(255,255,255,1)',
      //     stroke: '#eaff8f',
      //     lineWidth: 5,
      //     cursor: 'pointer'
      //   }
    },
    {
      id: 'node2',
      x: 400,
      y: 100,
      type: 'circle',
      size: [60, 30],
      label: 'node2'
      // comboId: 'comboA' // node2 属于 comboA
      //   labelCfg: {
      //     position: 'bottom',
      //     offset: 10,
      //     style: {
      //       fill: '#666'
      //     }
      //   }
    },
    {
      id: 'node3',
      x: 600,
      y: 100,
      type: 'ellipse',
      size: [60, 30],
      label: 'node3'
      // comboId: 'comboB' // node3 属于 comboB
    },
    {
      id: 'node4',
      x: 800,
      y: 100,
      type: 'diamond',
      size: [60, 30],
      label: 'node4'
      // comboId: 'comboC' // node4 属于 comboC
    },
    { id: 'node5', x: 200, y: 300, type: 'triangle', size: [30, 30], label: 'node5' },
    { id: 'node6', x: 400, y: 300, type: 'star', size: [30, 30], label: 'node6' },
    { id: 'node7', x: 600, y: 300, type: 'image', size: [60, 30], label: 'node7' },
    {
      id: 'node8',
      x: 800,
      y: 300,
      type: 'modelRect',
      size: [120, 30],
      label: 'node8'
      //   anchorPoints: [
      //     [0.5, 0],
      //     [0, 0.5]
      //   ]
    },
    {
      id: 'node9',
      x: 200,
      y: 500,
      type: 'donut',
      size: 70,
      donutAttrs: {
        prop1: 10,
        prop2: 20,
        prop3: 25
      },
      label: 'node9'
    }
    // {
    //   id: 'node10',
    //   x: 400,
    //   y: 500,
    //   size: [160, 90],
    //   label: 'node10node10node10node10node10node10node10node10',
    //   type: 'rect-own'
    // },
    // {
    //   id: 'node11',
    //   x: 600,
    //   y: 500,
    //   size: [160, 90],
    //   label: 'node11',
    //   type: 'rect-jsx'
    // },
    // {
    //   id: 'node12',
    //   x: 800,
    //   y: 500,
    //   size: [160, 90],
    //   label: 'node12',
    //   type: 'rect-react'
    // }
  ],
  // 边集
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      label: 'line'
      //   type: 'line-growth'
      //   style: {
      //     stroke: 'red',
      //     lineWidth: 5,
      //     endArrow: true,
      //     // endArrow: {
      //     //   path: G6.Arrow.triangle(10, 20, 25),
      //     //   path: G6.Arrow.vee(10, 20, 25),
      //     //   path: G6.Arrow.circle(10, 25),
      //     //   path: G6.Arrow.diamond(10, 20, 25),
      //     //   path: G6.Arrow.rect(10, 20, 25),
      //     //   path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),
      //     //   d: 25
      //     // },
      //     startArrow: false
      //   }
      //   labelCfg: {
      //     refY: 10,
      //     refX: -10,
      //     position: 'middle',
      //     style: {
      //       fill: 'red',
      //       fontSize: 20
      //     }
      //   }
    },
    { id: 'edge2', source: 'node2', target: 'node3', label: 'line', type: 'line' },
    { id: 'edge3', source: 'node3', target: 'node4', label: 'arc', type: 'arc' },
    { id: 'edge4', source: 'node4', target: 'node8', label: 'polyline', type: 'polyline' },
    { id: 'edge5', source: 'node8', target: 'node7', label: 'quadratic', type: 'quadratic' },
    { id: 'edge6', source: 'node7', target: 'node6', label: 'cubic', type: 'cubic' },
    {
      id: 'edge7',
      source: 'node6',
      target: 'node5',
      label: 'cubic-vertical',
      type: 'cubic-vertical'
    },
    {
      id: 'edge8',
      source: 'node5',
      target: 'node5',
      label: 'loop',
      type: 'loop'
    },
    {
      id: 'edge9',
      source: 'node5',
      target: 'node9',
      label: 'cubic-horizontal',
      type: 'cubic-horizontal'
    }
  ]
  // combos: [
  //   {
  //     id: 'comboA',
  //     label: 'A',
  //     parentId: 'comboD',
  //     type: 'rect'
  //   },
  //   {
  //     id: 'comboB',
  //     label: 'B',
  //     parentId: 'comboD'
  //   },
  //   {
  //     id: 'comboC',
  //     label: 'C',
  //     parentId: 'comboD',
  //     type: 'cRect'
  //   },
  //   {
  //     id: 'comboD',
  //     label: 'D',
  //     type: 'rect',
  //     style: {
  //       fill: 'rgba(246, 173, 87,0.4)'
  //     }
  //   }
  // ]
};
