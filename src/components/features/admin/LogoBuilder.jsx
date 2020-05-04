import React, { useState } from 'react';
import styled from '@emotion/styled';
import { startCase } from 'lodash';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { ChromePicker } from 'react-color';
import { pallet, spacing } from '../../../constants/style-guide';
import { Content, Header1 } from '../../common/Structure';
import { Input, Fieldset, Label } from '../../common/Forms';
import { Button } from '../../common/Button';
import { Select } from '../../common/Select';
import { LogoFilled } from '../../common/LogoFilled';

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

const ActionsRow = styled('div')`
  display: flex;
  align-items: center;
`;

const Text = styled('span')`
  padding: 0 ${spacing.regular}px;
`;

const SelectWrapper = styled('div')`
  width: 50%;
`;

const SwatchButton = styled('div')`
  height: 40px;
  min-width: 40px;
  margin-left: ${spacing.double}px;
  border-radius: ${spacing.regular}px;
  border: 1px solid black;
  cursor: pointer;
  background-color: ${(p) => p.bg};
`;

const FORMAT_OPTIONS = [
  {
    label: 'SVG',
    value: 'svg',
  },
  {
    label: 'PNG',
    value: 'png',
  },
];

const PopoverContent = ({ contentProps, colorValue, onChangeComplete }) => {
  const { position, targetRect, popoverRect } = contentProps;
  return (
    <ArrowContainer
      position={position}
      targetRect={targetRect}
      popoverRect={popoverRect}
      arrowColor="white"
    >
      <ChromePicker color={colorValue} onChangeComplete={onChangeComplete} />
    </ArrowContainer>
  );
};

const Swatch = (props) => {
  const { colorMap, colorKey, handleChange } = props;
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  return (
    <Popover
      isOpen={isShowingPopover}
      position={['left', 'top']}
      padding={10}
      onClickOutside={() => setIsShowingPopover(false)}
      content={(contentProps) => (
        <PopoverContent
          contentProps={contentProps}
          onChangeComplete={handleChange}
          colorValue={colorMap[colorKey]}
        />
      )}
    >
      <SwatchButton bg={colorMap[colorKey]} onClick={() => setIsShowingPopover(true)} />
    </Popover>
  );
};

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
  const [selectedFormatOption, setSelectedFormatOption] = useState(FORMAT_OPTIONS[0]);

  const updateAll = (value) => {
    const newMap = Object.keys(colorMap).reduce((acc, curr) => {
      acc[curr] = value;
      return acc;
    }, {});
    setColorMap(newMap);
  };

  const handleChange = (name) => (event) => {
    if (name === 'all') {
      updateAll(event.target.value);
    } else {
      setColorMap({ ...colorMap, [name]: event.target.value });
    }
  };

  const handlePickerChange = (colorKey) => (color) => {
    const { hex } = color;
    if (colorKey === 'all') {
      updateAll(hex);
    } else {
      setColorMap({ ...colorMap, [colorKey]: hex });
    }
  };

  const triggerDownload = (dataUrl) => {
    const a = document.createElement('a');
    a.download = `jj-custom-logo.${selectedFormatOption.value}`;
    a.href = dataUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const exportPng = () => {
    const svgNode = document.querySelector('svg[name="logo-filled"]');
    const serializedXml = new XMLSerializer().serializeToString(svgNode); // convert node to xml string
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgNodeBox = svgNode.getBBox();
    canvas.width = svgNodeBox.width * 10;
    canvas.height = svgNodeBox.height * 10;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    const image = new Image();
    const svgBlob = new Blob([serializedXml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      const imgUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      triggerDownload(imgUrl);
      canvas.remove();
    };
    image.src = url;
  };

  const exportSvg = () => {
    const svgNode = document.querySelector('svg[name="logo-filled"]');
    const serializedXml = new XMLSerializer().serializeToString(svgNode); // convert node to xml string
    triggerDownload(`data:application/octet-stream;base64,${btoa(serializedXml)}`);
  };

  const onClickExport = selectedFormatOption.value === 'svg' ? exportSvg : exportPng;

  return (
    <Content>
      <Header1>Build a new Logo!</Header1>
      <Grid>
        <LeftCol>
          {Object.keys(colorMap).map((colorKey) => (
            <Fieldset key={colorKey}>
              <Label>{startCase(colorKey)}</Label>
              <InputRow>
                <Input onChange={handleChange(colorKey)} value={colorMap[colorKey]} />
                <Swatch
                  colorMap={colorMap}
                  colorKey={colorKey}
                  handleChange={handlePickerChange(colorKey)}
                />
              </InputRow>
            </Fieldset>
          ))}

          <ActionsRow>
            <Button onClick={onClickExport}>Export Logo</Button>
            <Text>As</Text>
            <SelectWrapper>
              <Select
                options={FORMAT_OPTIONS}
                value={FORMAT_OPTIONS.find((option) => option.value === selectedFormatOption.value)}
                onChange={setSelectedFormatOption}
              />
            </SelectWrapper>
          </ActionsRow>
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
