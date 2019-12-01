import React, { useState } from 'react';
import styled from '@emotion/styled';
import { pallet, spacing } from '../../constants/style-guide';
import { Content, Header1, Paragraph } from '../common/Structure';
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

export const LogoBuilder = () => {
  const defaultColorMap = {
    leftEnd: pallet.peach,
    leftBar: pallet.peach,
    headband: pallet.peach,
    rightBar: pallet.peach,
    rightEnd: pallet.peach,
    peach: pallet.peach,
  };
  const [colorMap, setColorMap] = useState(defaultColorMap);

  const handleChange = (name) => (value) => {
    setColorMap({ ...colorMap, [name]: value });
  };

  return (
    <Content>
      <Header1>Build a new Logo!</Header1>
      <Grid>
        <LeftCol>
          <Fieldset>
            <Label>Left End</Label>
            <Input onChange={handleChange('leftEnd')} />
          </Fieldset>

          <Fieldset>
            <Label>Left Bar</Label>
            <Input onChange={handleChange('leftBar')} />
          </Fieldset>

          <Fieldset>
            <Label>Right End</Label>
            <Input onChange={handleChange('rightEnd')} />
          </Fieldset>

          <Fieldset>
            <Label>Right Bar</Label>
            <Input onChange={handleChange('rightBar')} />
          </Fieldset>

          <Fieldset>
            <Label>Headband</Label>
            <Input onChange={handleChange('headband')} />
          </Fieldset>

          <Fieldset>
            <Label>Peach</Label>
            <Input onChange={handleChange('peach')} />
          </Fieldset>

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
