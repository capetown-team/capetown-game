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
    'wwwwwwwwwwwwwewwwwwwwwwwwww',
    'wwwwwwwwwwwwwewwwwwwwwwwwww',
    'wppppwpppppppppwppppppppppw',
    'wpwwpwpwwwwpwwpwpwwpwwwwwpw',
    'wppppppwppppwwppppwppppwppw',
    'wpwwpwwwpwwpwwpwwpwwwwpwpww',
    'wpppppppppppwwpppppppwppppw',
    'wpwwpwwwpwwpwwpwwwpwpwpwwpw',
    'wppppwpppppppppwpppwppppppw',
    'wwwwpwpwwwpwwwwwpwpwpwwwwpw',
    'wppppppwpppppppppppwppppwpw',
    'wpwpwwpwpwpwwwwwpwpppwwpwpw',
    'wpwppppwpwppppppppwpppppwpw',
    'wpwwwwpwpwpwwwwwwpppwwwwwpw',
    'eppppppppwpweeeewpwwppppppe',
    'wpwwwwpwpwpwweewwppwpwwwwpw',
    'wpwppppwpwpppppppppwppppppw',
    'wpwpwwwwpwpwwpwwpwpwpwwwwpw',
    'wpwppppppwpwwpwppwpwpwwwwpw',
    'wpppwwwwppppppppwppppwppppw',
    'wpwwwwwwpwwpwwwwwpwpwwpwwww',
    'wppppppppwwpwpppppwpppppppw',
    'wwwwpwwwwwwpwpwwpwwpwpwwwpw',
    'wppppwppppppwpwwppppwpppppw',
    'wpwwwwpwwpwpwpwwwwwpwpwwwpw',
    'wpppppppppwpppppppppwpppppw',
    'wwwwwwwwwwwwwewwwwwwwwwwwww'
  ];
  const result = [];
  for (let i = 0; i < map.length; i += 1) {
    const mapItemX = [];
    for (let j = 0; j < map[i].length; j += 1) {
      const item = getType(map[i][j]);
      mapItemX.push({ col: j + 1, type: item });
    }

    const mapItem = {
      row: i + 1,
      posX: mapItemX
    };

    result.push(mapItem);
  }

  return { posY: result };
};

export const dataMap = prepareData();
