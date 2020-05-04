import React, { useState } from 'react';
import styled from '@emotion/styled';
// import { pallet, spacing } from '../../../constants/style-guide';
import { Content, Header1, Header2, Section } from '../../common/Structure';
import { Button } from '../../common/Button';
import { FormInput } from '../../common/Forms';
import { generate } from '../../../services/qr-code';
import { Spinner } from '../../common/Spinner';

const Image = styled('img')``;

export const QrCodes = () => {
  const [url, setUrl] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [dataUrl, setDataUrl] = useState('');

  const onClick = async () => {
    setIsBusy(true);
    const generatedDataUrl = await generate(url);
    setDataUrl(generatedDataUrl);
    setIsBusy(false);
  };

  return (
    <Content>
      <Header1>QR Code Generator</Header1>
      <Section>
        <FormInput
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          label="Url"
          isRequired={true}
        />
      </Section>
      <Section>
        <Button onClick={onClick} isBusy={isBusy}>
          Generate
        </Button>
      </Section>

      <Section>
        <Header2>Output will appear below</Header2>
        {isBusy && <Spinner variante="large" />}
        {dataUrl && <Image src={dataUrl} />}
      </Section>
    </Content>
  );
};
