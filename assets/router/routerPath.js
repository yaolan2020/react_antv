const paths = {
  modTypes: 'pms',
  app: {
    root: '/',
    login: '/login',
    sso: '/sso'
  },
  modules: [
    {
      title: 'G6',
      path: '/g6',
      name: 'g6',
      children: [
        {
          title: '使用步骤',
          path: '/g6/sub1',
          name: 'sub1',
          icon: 'home'
        },
        {
          title: '数据格式',
          path: '/g6/sub2',
          name: 'sub2',
          icon: 'area-chart'
        },
        {
          title: '常用方法',
          path: '/g6/sub3',
          name: 'sub3',
          icon: 'area-chart'
        },
        {
          title: '使用案例',
          path: '/g6/sub4',
          name: 'sub4',
          icon: 'area-chart'
        }
      ]
    },
    {
      title: 'X6',
      path: '/x6',
      name: 'x6',
      children: [
        {
          title: '使用步骤',
          path: '/x6/sub1',
          name: 'sub1',
          icon: 'home'
        },
        {
          title: '数据格式',
          path: '/x6/sub2',
          name: 'sub2',
          icon: 'area-chart'
        },
        {
          title: '常用方法',
          path: '/x6/sub3',
          name: 'sub3',
          icon: 'area-chart'
        },
        {
          title: '使用案例',
          path: '/x6/sub4',
          name: 'sub4',
          icon: 'area-chart'
        }
      ]
    },
    {
      title: 'L7',
      path: '/l7',
      name: 'l7',
      icon: 'home',
      children: [
        {
          title: '使用步骤',
          path: '/l7/sub1',
          name: 'sub1',
          icon: 'home'
        },
        {
          title: '数据格式',
          path: '/l7/sub2',
          name: 'sub2',
          icon: 'area-chart'
        },
        {
          title: '常用方法',
          path: '/l7/sub3',
          name: 'sub3',
          icon: 'area-chart'
        },
        {
          title: '使用案例',
          path: '/l7/sub4',
          name: 'sub4',
          icon: 'area-chart'
        }
      ]
    }
  ]
};

let routerPrefix = process.env.APP_PREFIX;
routerPrefix = routerPrefix.substring(0, routerPrefix.length - 1);

const initAppPaths = function (obj) {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initAppPaths(obj[key]);
    } else {
      obj[key] = routerPrefix + obj[key];
    }
  }
};

const initModulesPaths = (obj) => {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initModulesPaths(obj[key]);
    }
    if (obj[key].path) {
      obj[key].path = routerPrefix + obj[key].path;
    }
  }
};

const initPaths = (obj) => {
  initAppPaths(obj['app']);
  initModulesPaths(obj['modules']);
};

initPaths(paths);

export default paths;
