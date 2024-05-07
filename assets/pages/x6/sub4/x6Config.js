import { Graph, Shape } from '@antv/x6';
import authUtils from 'utils/authUtils';

const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
};

let strokeColor = '#999';

export const comboRect = {
  inherit: 'rect',
  width: 56,
  height: 56,
  zIndex: -1,
  label: '组名称',
  attrs: {
    label: {
      refY: 0,
      refX: 0,
      xAlign: 'left',
      yAlign: 'top',
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      fill: '#fffbe6',
      stroke: '#ffe7ba'
    }
  },
  tools: [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF'
        }
      }
    }
  ],
  ports: { ...ports }
};
export const customImage = {
  inherit: 'rect',
  width: 36,
  height: 36,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  attrs: {
    body: {
      width: 36,
      height: 56,
      stroke: '#ddd',
      strokeWidth: 1
    },
    image: {
      refWidth: '100%',
      refHeight: '50%',
      width: 24,
      height: 20,
      refY: 0.05
    },
    label: {
      textAnchor: 'middle',
      fontSize: 9,
      zIndex: 10,
      fill: '#000000',
      refY: 0.85
    }
  },
  ports: { ...ports }
};

const customrect = {
  inherit: 'rect',
  width: 40,
  height: 30,
  tools: [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF'
        }
      }
    }
  ],
  ports: { ...ports }
};
const customPolygon = {
  inherit: 'polygon',
  width: 40,
  height: 30,
  tools: [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF'
        }
      }
    }
  ],
  ports: {
    ...ports,
    items: [
      {
        group: 'top'
      },
      {
        group: 'bottom'
      }
    ]
  }
};
const customCircle = {
  inherit: 'circle',
  width: 36,
  height: 36,
  tools: [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF'
        }
      }
    }
  ],
  ports: { ...ports }
};
const customPath = {
  inherit: 'path',
  width: 40,
  height: 40,
  tools: [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF'
        }
      }
    }
  ],
  ports: { ...ports }
};

const Terminal = {
  ...customrect,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const Process = {
  ...customrect,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor,
      rx: 15,
      ry: 15
    }
  }
};

const Decision = {
  ...customPolygon,
  width: 45,
  height: 40,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '0,10 10,0 20,10 10,20',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const DatalO = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '10,0 40,0 30,20 0,20',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};

const Connector = {
  ...customCircle,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};

const Text = {
  ...customrect,
  attrs: {
    label: {
      fontSize: 12,
      label: 'text'
    },
    body: {
      strokeWidth: 0
    }
  }
};

const Delay = {
  ...customrect,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      rx: 5,
      ry: 5,
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const Extract = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '10 0,40 0,25 30',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const Merge = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '30 0,20 30,40 30',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};

const ManualInput = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '0 10,40 0,40 40,0 40',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const OffPageLink = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '0 0,40 0,40 30,20 40,0 30',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const ManualOperation = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '0 0,40 0,25 40,15 40',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};
const Preparation = {
  ...customPolygon,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      refPoints: '0 15,10 0,30 0,40 15,30 30,10 30',
      strokeWidth: 1,
      stroke: strokeColor
    }
  }
};

const Heart = {
  ...customPath,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z'
};

const Database = {
  ...customPath,
  width: 40,
  height: 30,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M818.9 319.5c-82.3 25.2-191.3 39.1-306.9 39.1-115.7 0-224.7-13.9-306.9-39.1-48.4-14.8-84.6-32.7-107.9-53v532.7c0 70.3 185.7 127.2 414.9 127.2s414.7-56.9 414.7-127.2V266.5c-23.3 20.4-59.5 38.3-107.9 53z m-602.2-38.1c78.6 24.1 183.4 37.4 295.2 37.4s216.6-13.3 295.2-37.4c81.5-25 110.6-54.2 110.6-73.2s-29-48.2-110.6-73.2c-78.6-24.1-183.4-37.4-295.2-37.4S295.3 110.9 216.7 135c-81.5 25-110.6 54.2-110.6 73.2s29.1 48.2 110.6 73.2z'
};

const Start = {
  ...customPath,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M781.186088 616.031873q17.338645 80.573705 30.59761 145.848606 6.119522 27.537849 11.219124 55.075697t9.689243 49.976096 7.649402 38.247012 4.079681 19.888446q3.059761 20.398406-9.179283 27.027888t-27.537849 6.629482q-5.099602 0-14.788845-3.569721t-14.788845-5.609562l-266.199203-155.027888q-72.414343 42.836653-131.569721 76.494024-25.498008 14.278884-50.486056 28.557769t-45.386454 26.517928-35.187251 20.398406-19.888446 10.199203q-10.199203 5.099602-20.908367 3.569721t-19.378486-7.649402-12.749004-14.788845-2.039841-17.848606q1.01992-4.079681 5.099602-19.888446t9.179283-37.737052 11.729084-48.446215 13.768924-54.055777q15.298805-63.23506 34.677291-142.788845-60.175299-52.015936-108.111554-92.812749-20.398406-17.338645-40.286853-34.167331t-35.697211-30.59761-26.007968-22.438247-11.219124-9.689243q-12.239044-11.219124-20.908367-24.988048t-6.629482-28.047809 11.219124-22.438247 20.398406-10.199203l315.155378-28.557769 117.290837-273.338645q6.119522-16.318725 17.338645-28.047809t30.59761-11.729084q10.199203 0 17.848606 4.589641t12.749004 10.709163 8.669323 12.239044 5.609562 10.199203l114.231076 273.338645 315.155378 29.577689q20.398406 5.099602 28.557769 12.239044t8.159363 22.438247q0 14.278884-8.669323 24.988048t-21.928287 26.007968z'
};

const StroedData = {
  ...customPath,
  height: 30,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M873.8304 134.656v447.8464s-193.1776 81.2032-338.0224 0-386.2528 0-386.2528 0V134.656s193.1264-81.2032 361.8304 0c113.408 54.272 362.4448 0 362.4448 0z'
};

const VerificationCode = {
  ...customPath,
  height: 40,
  width: 35,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M514.114065 19.224774L908.387097 138.504258V471.04a564.190968 564.190968 0 0 1-394.273032 537.996387A526.534194 526.534194 0 0 1 117.297548 498.688V138.504258L514.114065 19.257806z'
};

const Contact = {
  ...customPath,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M212.594627 0h614.094328C944.097433 0 1039.283582 94.620657 1039.283582 211.341373v436.330985c0 116.720716-95.186149 211.341373-212.594627 211.341373h-46.186985l22.864239 84.533493s8.558806 28.794269 1.375522 51.811343C799.789851 1011.177075 786.202746 1024 762.192239 1024c-41.922866 0-113.832119-49.090866-113.83212-49.090866l-176.036298-115.895403H212.594627C95.186149 859.013731 0 764.393075 0 647.672358V211.341373C0 94.620657 95.186149 0 212.594627 0z'
};

const Plane = {
  ...customPath,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M694.569594 844.36883c-6.478552 0-12.361539-3.89675-14.862499-9.92914L563.289642 553.881876l-405.591505 5.786797c-7.494695 0.150426-14.107299-5.002944-15.875572-12.310374-1.769296-7.30743 1.755993-14.863523 8.491395-18.205641l731.377406-362.850052c5.745864-2.850931 12.634762-2.018983 17.534352 2.117221 4.901637 4.13518 6.882757 10.785647 5.03876 16.928554l-194.271612 647.548162c-1.955538 6.520507-7.79964 11.105942-14.59951 11.450796C695.118086 844.361667 694.841793 844.36883 694.569594 844.36883z'
};

const Search = {
  ...customPath,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M823.776 842.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28'
};

const File = {
  ...customPath,
  height: 35,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M1171.561 157.538H601.797L570.814 61.44A88.222 88.222 0 0 0 486.794 0H88.747A88.747 88.747 0 0 0 0 88.747v846.506A88.747 88.747 0 0 0 88.747 1024H1171.56a88.747 88.747 0 0 0 88.747-88.747V246.285a88.747 88.747 0 0 0-88.747-88.747z m-1082.814 0V88.747h398.047l22.055 68.791z'
};

const Qumian = {
  ...customPath,
  height: 35,
  attrs: {
    label: {
      fontSize: 12
    },
    body: {
      strokeWidth: 1,
      stroke: strokeColor
    }
  },
  path: 'M64 920.37V362.09c0-4.55 20.4-16.37 23.14-18.23 21.73-14.84 45.31-26.07 69.48-34.27 83.14-28.23 174.23-20.32 254.69 15.28 29.93 13.24 59.38 28.64 90.85 36.35 77.68 19.03 170.65-11.17 241.93-48.48 80.03-41.89 148.88-108.15 202.67-188.56 2.66-3.97 13.25-15.72 13.25-20.55v816.75H64z'
};

export const ownOtherConfig = {
  Process,
  File,
  Decision,
  VerificationCode,
  DatalO,
  Database,
  StroedData,
  Delay,
  Extract,
  Merge,
  Heart,
  Plane,
  OffPageLink,
  Start,
  ManualOperation,
  Preparation,
  Contact,
  Connector,
  ManualInput,
  Search,
  Terminal,
  Qumian,
  Text
};
