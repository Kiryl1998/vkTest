import {
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  SimpleCell,
  View,
} from '@vkontakte/vkui';
import {
  Icon28ArticleOutline,
  Icon24LockOpenOutline,
  Icon24LockOutline,
} from '@vkontakte/icons';
import React from 'react';

import style from './simpleCell.module.css';

const Example = () => {
  const [activePanel, setActivePanel] = React.useState('list');

  return (
    <View activePanel={activePanel}>
      <Panel className={style.wrap} id="list">
        <PanelHeader>SimpleCell</PanelHeader>
        <Group header={<Header mode="secondary">Меню</Header>}>
          <SimpleCell
            onClick={() => setActivePanel('nothing')}
            expandable="auto"
            hoverClassName="StateModeLiteral"
            before={<Icon28ArticleOutline />}
            className={style.flex}
          >
            Все
          </SimpleCell>
          <SimpleCell
            onClick={() => setActivePanel('nothing')}
            expandable="auto"
            before={<Icon24LockOutline />}
            className={style.flex}
          >
            Закрытая
          </SimpleCell>
          <SimpleCell
            onClick={() => setActivePanel('nothing')}
            expandable="auto"
            before={<Icon24LockOpenOutline />}
            className={style.flex}
          >
            Открытая
          </SimpleCell>
        </Group>
      </Panel>
      <Panel id="nothing">
        <PanelHeader
          before={<PanelHeaderBack onClick={() => setActivePanel('list')} />}
        >
          Ничего
        </PanelHeader>
        <Placeholder>Тут ничего нет</Placeholder>
      </Panel>
    </View>
  );
};

export default Example;
