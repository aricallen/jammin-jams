/* eslint-disable react/no-array-index-key */
import React from 'react';
import random from 'random';
import styled from '@emotion/styled';
import { Emoji } from './Structure';
import { spacing } from '../../constants/style-guide';

/**
 * 🍇🍈🍉🍊🍋🍌🍍🍎🍐🍏🍑🍒🍓🥝🥥🥭
 */

const fruits = [
  {
    emoji: '🍇',
    label: 'grapes',
  },
  {
    emoji: '🍈',
    label: 'melon',
  },
  {
    emoji: '🍉',
    label: 'watermelon',
  },
  {
    emoji: '🍊',
    label: 'tangerine',
  },
  {
    emoji: '🍋',
    label: 'lemon',
  },
  {
    emoji: '🍌',
    label: 'banana',
  },
  {
    emoji: '🍍',
    label: 'pineapple',
  },
  {
    emoji: '🍎',
    label: 'apple',
  },
  {
    emoji: '🍐',
    label: 'pear',
  },
  {
    emoji: '🍏',
    label: 'green-apple',
  },
  {
    emoji: '🍑',
    label: 'peach',
  },
  {
    emoji: '🍒',
    label: 'cherries',
  },
  {
    emoji: '🍓',
    label: 'strawberry',
  },
  {
    emoji: '🥝',
    label: 'kiwi',
  },
  {
    emoji: '🥭',
    label: 'mango',
  },
];

const List = styled('ul')`
  list-style-type: none;
`;
const ListItem = styled('li')`
  margin-top: ${spacing.regular}px;
  &:first-child {
    margin-top: initial;
  }
`;

const ItemWrapper = styled('div')`
  display: flex;
  align-items: flex-start;
`;

const BulletWrapper = styled('div')`
  margin-right: ${spacing.double}px;
`;

const ContentWrapper = styled('div')``;

const getRandomSet = (size, max = fruits.length) => {
  const set = new Set();
  const maxSize = Math.min(size, max);
  while (set.size < maxSize) {
    const randInt = random.int(0, maxSize);
    set.add(randInt);
  }
  return Array.from(set);
};

const Item = ({ Content, Bullet }) => {
  return (
    <ItemWrapper>
      <BulletWrapper>
        <Bullet />
      </BulletWrapper>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </ItemWrapper>
  );
};

export const BulletList = ({ contentItems = [] }) => {
  const randomSet = getRandomSet(contentItems.length);
  return (
    <List>
      {contentItems.map((Content, i) => {
        const emojiItem = fruits[randomSet[i]];
        const Bullet = () => <Emoji label={emojiItem.label}>{emojiItem.emoji}</Emoji>;
        return (
          <ListItem key={`${emojiItem.label}_${i}`}>
            <Item Content={Content} Bullet={Bullet} />
          </ListItem>
        );
      })}
    </List>
  );
};
