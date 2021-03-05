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
    case 's':
      return 'strength';
    default:
      return '';
  }
};

const prepareData = () => {
  const map = [
    'bbbbbbbbbbbbbebbbbbbbbbbbbb',
    'bspppppppppppppppppppppppsb',
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
    'bspppppppppppppppppppppppsb',
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
