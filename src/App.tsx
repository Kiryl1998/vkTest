import { useEffect, useState } from 'react';
import './App.css';
import { Group } from './types/groups';
import Groups from './components/groups/groups';

const groupsData: Group[] = [
  {
    id: 1,
    name: 'Котики',
    closed: false,
    avatar_color: 'red',
    members_count: 457,
    friends: [
      {
        first_name: 'Маша',
        last_name: 'Петрова',
      },
      {
        first_name: 'Фёдор',
        last_name: 'Агапов',
      },
      {
        first_name: 'Вера',
        last_name: 'Петрова',
      },
    ],
  },
  {
    id: 2,
    name: 'Собачки',
    closed: false,
    avatar_color: 'green',
    members_count: 147,
  },
  {
    id: 3,
    name: 'Бабочки',
    closed: true,
    avatar_color: 'yellow',
    members_count: 2,
    friends: [
      {
        first_name: 'Василий',
        last_name: 'Гончаров',
      },
    ],
  },
  {
    id: 4,
    name: 'Утята',
    closed: false,
    avatar_color: 'blue',
    members_count: 88,
    friends: [
      {
        first_name: 'Маша',
        last_name: 'Пивоварова',
      },
      {
        first_name: 'Илья',
        last_name: 'Кот',
      },
    ],
  },
  {
    id: 5,
    name: 'Мишки',
    closed: true,
    avatar_color: 'red',
    members_count: 4,
  },
  {
    id: 6,
    name: 'Улитки',
    closed: true,
    members_count: 99,
    friends: [
      {
        first_name: 'Маша',
        last_name: 'Петрова',
      },
    ],
  },
  {
    id: 7,
    name: 'Выдры',
    closed: false,
    avatar_color: 'purple',
    members_count: 5,
    friends: [
      {
        first_name: 'Ирина',
        last_name: 'Харитонова',
      },
      {
        first_name: 'Владислав',
        last_name: 'Самсонов',
      },
      {
        first_name: 'Сергей',
        last_name: 'Антонов',
      },
    ],
  },
  {
    id: 8,
    name: 'Зайки',
    closed: false,
    avatar_color: 'white',
    members_count: 777,
  },
  {
    id: 9,
    name: 'Кролики',
    closed: true,
    avatar_color: 'yellow',
    members_count: 8,
    friends: [
      {
        first_name: 'Даша',
        last_name: 'Елец',
      },
    ],
  },
  {
    id: 10,
    name: 'Утконосы',
    closed: true,
    members_count: 0,
  },
  {
    id: 11,
    name: 'Куропатки',
    closed: false,
    avatar_color: 'red',
    members_count: 33,
    friends: [
      {
        first_name: 'Зоя',
        last_name: 'Петрова',
      },
      {
        first_name: 'Марфа',
        last_name: 'Зайцева',
      },
    ],
  },
  {
    id: 12,
    name: 'Козлики',
    closed: false,
    members_count: 7,
    friends: [
      {
        first_name: 'Катя',
        last_name: 'Самсонова',
      },
    ],
  },
  {
    id: 13,
    name: 'Тигры',
    closed: false,
    avatar_color: 'orange',
    members_count: 11,
    friends: [
      {
        first_name: 'Лев',
        last_name: 'Лещенко',
      },
      {
        first_name: 'Фёдор',
        last_name: 'Бондарчук',
      },
      {
        first_name: 'Вера',
        last_name: 'Брежнева',
      },
    ],
  },
  {
    id: 14,
    name: 'Птички',
    closed: true,
    avatar_color: 'blue',
    members_count: 23,
  },
];

// Задержка в 1 секунду
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isNil(value: any): value is undefined | null {
  return value === undefined || value === null;
}

// Метод для получения данных
const mockGroups = async () => {
  await delay(1000);
  return { result: 1, data: groupsData };
};

interface Response {
  result: number;
  data: Group[];
}

async function getGroups(): Promise<Group[] | undefined> {
  return mockGroups()
    .then((response: Response) => {
      if (response.result === 1) {
        return response.data;
      }

      throw new Error('Ошибка получения данных');
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initGroups();
  }, []);

  function initGroups(): void {
    getGroups()
      .then((data: Group[] | undefined) => setGroups(data ?? []))
      .finally(() => setLoading(false));
  }

  function filterByClosed(isClosed: boolean): void {
    getGroups().then((data: Group[] | undefined) => {
      const filteredGroups = (data ?? []).filter(
        (item: Group) => item.closed === isClosed
      );
      setGroups(filteredGroups);
    });
  }

  function filterByColor(color: string | undefined): void {
    if (isNil(color)) {
      return;
    }

    getGroups().then((data: Group[] | undefined) => {
      const filteredGroups = (data ?? []).filter(
        (item: Group) => item.avatar_color === color
      );
      setGroups(filteredGroups);
    });
  }

  function filterByFriends(): void {
    getGroups().then((data: Group[] | undefined) => {
      const filteredGroups = (data ?? []).filter(
        (item: Group) => !isNil(item.friends) && item.friends.length > 0
      );
      setGroups(filteredGroups);
    });
  }

  function showAllGroups(): void {
    initGroups();
  }

  const uniqueColors = new Set();

  // Фильтруем массив объектов, оставляя только уникальные значения avatar_color
  const filteredGroupsData = groups.filter((group) => {
    if (!uniqueColors.has(group.avatar_color)) {
      uniqueColors.add(group.avatar_color);
      return true;
    }
    return false;
  });

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <>
      <div className="tabsCategories">
        <span onClick={() => showAllGroups()}>Все</span>
        <span onClick={() => filterByClosed(true)}>Закрытые</span>
        <span onClick={() => filterByClosed(false)}>Открытые</span>
      </div>
      <div className="tabsCategoriesColor">
        {filteredGroupsData.map((group) => (
          <span
            key={group.id}
            onClick={() => filterByColor(group.avatar_color)}
            style={{ color: group.avatar_color }}
          >
            {group.avatar_color}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="btnFriends"
        onClick={() => filterByFriends()}
      >
        Has friends
      </button>
      <div className="wrap">
        {groups.map((group) => (
          <Groups key={group.id} group={group} />
        ))}
      </div>
    </>
  );
}

export default App;
