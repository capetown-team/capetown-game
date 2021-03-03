const getType = (item: string) => {
  switch (item) {
    case 'w':
      return 'wall';
    case 'e':
      return 'empty';
    case 'p':
      return 'pill';
    case 'b':
      return 'block';
    default:
      return '';
  }
};

const prepareData = () => {
  const map = [
    'bbbbbbbbbbbbbebbbbbbbbbbbbb',
    'bpppppppppppppppppppppppppb',
    'bpbbbbpbbbbpbbpbbbbpbbbbbpb',
    'bpppppppppppbbppppppppppbpb',
    'bpbbpbbbbbbpbbpbbbbbbpbbbpb',
    'bpppppppppppbbppppppppppppb',
    'bpbbbbbbpbbpbbpbbpbbbbbbbpb',
    'bpppppppppppppppppppppppppb',
    'bpbpbbbbbbpbbbbbpbpbbbbbbpb',
    'bpbpppppppppppppppppppppbpb',
    'bpbpbbbbpbpbbbbbpbpbbbbpbpb',
    'bpbppppbpbpppppppbppppppbpb',
    'bpbbbbpbpbpbbebbpbpbbbbbbpb',
    'eppppppppbpbeeebpbppppppppe',
    'bpbbbbpbpbpbeeebpbpbbbbbbpb',
    'bpbppppbpbpbbbbbpbppppppppb',
    'bpbpbbbbpbpppppppbpbbbbbbpb',
    'bpbppppppbpbbbbbpbpbbbbbbpb',
    'bpppbbbbppppppppppppppppppb',
    'bpbbbbbbpbbpbbpbbpbbbbbbbpb',
    'bpppppppppppppppppppppppppb',
    'bpbbpbbbbbbpbbpbbbbbbpbbbpb',
    'bpppppppppppbbppppppppppppb',
    'bpbbbbpbbbbpbbpbbbbpbbbbbpb',
    'bpppppppppppppppppppppppppb',
    'bbbbbbbbbbbbbebbbbbbbbbbbbb'
  ];
  const result = [];
  for (let i = 0; i < map.length; ) {
    const mapItemX = [];
    for (let j = 0; j < map[i].length; ) {
      const item = getType(map[i][j]);
      mapItemX.push({ col: j, type: item });
      j += 1;
    }

    const mapItem = {
      row: i,
      posX: mapItemX
    };

    result.push(mapItem);
    i += 1;
  }

  return { posY: result };
};

export const dataMap = prepareData();
console.log('map', dataMap);
console.log(dataMap.posY[14].posX[2].type);
console.log(dataMap.posY[14].posX[1].type);
console.log(dataMap.posY[13]);
