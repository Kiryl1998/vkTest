import { useState } from 'react';
import { Group } from '../../types/groups';

import style from './groups.module.css';

interface PropsGroups {
  group: Group;
}

const Groups = ({ group }: PropsGroups) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className={style.wrap}>
      <div style={{ backgroundColor: group.avatar_color }} className={style.avatar}></div>
      <h2>{group.name}</h2>
      <p>{group.closed ? 'Группа: Закрытая' : 'Группа: Открытая'}</p>
      <p>Подписчиков: {group.members_count}</p>
      {group.friends && (
        <div>
          <h3 className={style.friend} onClick={() => setActive(!active)}>
            Друзья:
          </h3>
          {group.friends.map((friend) => (
            <p
              className={[style.name, active && style.active].join(' ')}
              key={friend.first_name}
            >{`${friend.first_name} ${friend.last_name}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};
export default Groups;
