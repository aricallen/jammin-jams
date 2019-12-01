import React, { useState } from 'react';
import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { ChromePicker } from 'react-color';
import { pallet, spacing } from '../../constants/style-guide';
import { Content, Header1 } from '../common/Structure';
import { Input, Button, Fieldset, Label } from '../common/Forms';
import { LogoFilled } from '../common/LogoFilled';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const LeftCol = styled('div')`
  padding: ${spacing.triple}px;
`;

const RightCol = styled('div')`
  grid-column-start: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled('div')`
  width: 80%;
`;

const InputRow = styled('div')`
  display: flex;
`;

const Swatch = styled('div')`
  height: 40px;
  min-width: 40px;
  margin-left: ${spacing.double}px;
  border-radius: ${spacing.regular}px;
  border: 1px solid black;
  cursor: pointer;
  background-color: ${p => p.bg};
`;

export const LogoBuilder = () => {
  const defaultColorMap = {
    leftEnd: pallet.peach,
    leftBar: pallet.peach,
    headband: pallet.peach,
    rightBar: pallet.peach,
    rightEnd: pallet.peach,
    peach: pallet.peach,
    all: pallet.peach,
  };
  const [colorMap, setColorMap] = useState(defaultColorMap);

  const updateAll = (event) => {
    const { value } = event.target;
    const newMap = Object.keys(colorMap).reduce((acc, curr) => {
      acc[curr] = value;
      return acc;
    }, {});
    setColorMap(newMap);
  };

  const handleChange = (name) => (event) => {
    if (name === 'all') {
      updateAll(event);
    } else {
      setColorMap({ ...colorMap, [name]: event.target.value });
    }
  };

  return (
    <Content>
      <Header1>Build a new Logo!</Header1>
      <Grid>
        <LeftCol>
          {Object.keys(colorMap).map((colorKey) => (
            <Fieldset>
              <Label>{startCase(colorKey)}</Label>
              <InputRow>
                <Input onChange={handleChange(colorKey)} />
                <Swatch bg={colorMap[colorKey]} />
              </InputRow>
            </Fieldset>
          ))}

          <Button onClick={() => console.log('colors', colorMap)}>Export Logo</Button>
        </LeftCol>

        <RightCol>
          <LogoWrapper>
            <LogoFilled colorMap={colorMap} />
          </LogoWrapper>
        </RightCol>
      </Grid>
    </Content>
  );
};
