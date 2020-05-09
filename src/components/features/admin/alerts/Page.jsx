import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pick } from 'lodash';
import styled from '@emotion/styled';
import { isResolved } from '../../../../redux/utils/meta-status';
import { Spinner } from '../../../common/Spinner';
import { fetch as fetchAppMeta, update as updateAppMeta } from '../../../../redux/app-meta/actions';
import { Section } from '../../../common/Structure';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { AlertMessage } from '../../../common/AlertMessage';
import { TextArea, Label, FormInput } from '../../../common/Forms';
import { boxShadow } from '../../../../utils/style-helpers';
import { spacing, pallet } from '../../../../constants/style-guide';

const PreviewWrapper = styled('div')`
  width: 50%;
  margin: auto;
  padding: ${spacing.double}px;
  box-shadow: ${boxShadow(pallet.light.charcoal)};
`;

export const Page = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const appMetaState = useSelector((state) => state.appMeta);

  useEffect(() => {
    (async () => {
      const appMeta = await dispatch(fetchAppMeta());
      setValues(pick(appMeta, ['alertStart', 'alertEnd', 'alertMessage']));
    })();
  }, []);

  const isBusy = !isResolved(appMetaState.meta);

  if (isBusy) {
    return <Spinner variant="large" />;
  }

  const onClickSave = async () => {
    await dispatch(updateAppMeta(values));
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <Fragment>
      <Header title="Alerts" Controls={() => <Button onClick={onClickSave}>Save</Button>} />
      <Section>
        <FormInput
          name="alertStart"
          value={values.alertStart || ''}
          onChange={handleChange('alertStart')}
        />
        <FormInput
          name="alertEnd"
          value={values.alertEnd || ''}
          onChange={handleChange('alertEnd')}
        />
        <Label>Text to display (Markdown)</Label>
        <TextArea
          name="alertMessage"
          value={values.alertMessage || ''}
          rows={10}
          onChange={handleChange('alertMessage')}
        />
      </Section>
      <Section>
        <Label>Alert Preview</Label>
        <PreviewWrapper>
          <AlertMessage content={values.alertMessage} />
        </PreviewWrapper>
      </Section>
    </Fragment>
  );
};
