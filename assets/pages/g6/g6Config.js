import G6 from '@antv/g6';

const fittingString = (str, maxWidth, fontSize) => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+');
  str?.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      currentWidth += fontSize;
    } else {
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};

//自定义节点--普通
export const nodeCreat = {
  options: {
    style: {},
    stateStyles: {
      hover: {
        fill: 'blue'
      },
      selected: {}
    }
  },
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const size = cfg.size || [60, 30]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];

    const keyShape = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        stroke: 'rgba(87, 160, 246,0.65)',
        fill: `rgba(246, 173, 87,1)`,
        lineWidth: 1,
        linkPoints: { top: true, right: true, bottom: true, left: true }
      },
      name: 'rect-shape',
      draggable: true
    });
    const label = group.addShape('text', {
      attrs: {
        x: -width / 2 + 10,
        y: 0 - 30,
        textAlign: 'left',
        textBaseline: 'middle',
        text: fittingString('名称：' + cfg.label, width - 20, 12),
        fill: 'rgba(87, 160, 246,1)'
      },
      name: 'text-name',
      draggable: true
    });
    group.addShape('text', {
      attrs: {
        x: -width / 2 + 10,
        y: 0,
        textAlign: 'left',
        textBaseline: 'middle',
        text: fittingString('日期：2023/6/15', width - 20, 12),
        fill: 'rgba(173, 87, 246,1)'
      },
      name: 'text-date',
      draggable: true
    });
    const des = group.addShape('text', {
      attrs: {
        x: -width / 2 + 10,
        y: 0 + 30,
        textAlign: 'left',
        textBaseline: 'middle',
        text: fittingString('描述：圣诞节阿萨德爱神的箭奥德赛阿杀菌灯傻大', width - 20, 12),
        fill: 'rgba(128, 246, 87,1)'
      },
      name: 'text-des',
      draggable: true
    });
    des.animate(
      (ratio) => {
        const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
        let radius = 12;
        if (isNaN(radius)) radius = radius[0];
        // 返回这一帧需要变化的参数集，这里只包含了半径
        return {
          r: radius / 2 + diff
        };
      },
      {
        // 动画重复
        repeat: true,
        duration: 3000,
        easing: 'easeCubic'
      }
    );

    return keyShape;
  },
  afterUpdate(cfg, node) {
    const group = node.get('group');
    const textShape = group.find((ele) => ele.get('name') === 'text-shape');
    textShape &&
      textShape.attr({
        text: fittingString(cfg.label, 100, 12)
      });
  },
  /**
   * 响应节点的状态变化。
   * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
   * @param  {String} name 状态名称
   * @param  {Object} value 状态值
   * @param  {Node} node 节点
   */
  setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
    if (name === 'hover') {
      if (value) {
        shape.attr({
          shadowColor: '#3e71f9',
          shadowBlur: 10,
          anchorPoints: [[1, 0.5]]
        });
      } else {
        shape.attr({
          shadowColor: '#ffffff',
          shadowBlur: 0,
          anchorPoints: []
        });
      }
    }
  },
  /**
   * 获取锚点（相关边的连入点）
   * @param  {Object} cfg 节点的配置项
   * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg) {
    return [
      [0, 0.5],
      [1, 0.5],
      [0.5, 0],
      [0.5, 1]
    ];
  }
};

//自定义Combo
export const comboCreat = {
  drawShape: function drawShape(cfg, group) {
    const self = this;
    // 获取配置中的 Combo 内边距
    let padding = cfg?.padding || [50, 20, 20, 20];
    // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
    const style = self.getShapeStyle(cfg);
    // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
    const rect = group.addShape('rect', {
      attrs: {
        ...style,
        x: -style.height / 2 - padding[0],
        y: -style.width / 2 - padding[3],
        width: style.width,
        height: style.height
      },
      draggable: true,
      name: 'combo-keyShape' // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
    });
    // 增加右侧圆
    group.addShape('circle', {
      attrs: {
        ...style,
        fill: '#fff',
        opacity: 1,
        // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
        x: cfg.style.width / 2 + padding[1],
        y: (padding[2] - padding[0]) / 2,
        r: 5
      },
      draggable: true,
      name: 'combo-circle-shape' // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
    });
    return rect;
  },
  // 定义新增的右侧圆的位置更新逻辑
  afterUpdate: function afterUpdate(cfg, combo) {
    let padding = cfg.padding || [50, 20, 20, 20];
    const group = combo.get('group');
    // 在该 Combo 的图形分组根据 name 找到右侧圆图形
    const circle = group.find((ele) => ele.get('name') === 'combo-circle-shape');
    // 更新右侧圆位置
    circle.attr({
      // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
      x: cfg.style.width / 2 + padding[1],
      y: (padding[2] - padding[0]) / 2
    });
  }
};
