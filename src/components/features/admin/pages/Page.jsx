import React, { Fragment, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useCrudState } from '../../../../hooks/useCrudState';
import * as MetaStatus from '../../../../utils/meta-status';
import { Spinner } from '../../../common/Spinner';
import { Section } from '../../../common/Structure';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { FormInput, Label, TextArea } from '../../../common/Forms';
import { CharacterCounter } from '../../../common/CharacterCounter';

const LabelWrapper = styled(Label)``;

const LabelWithCounter = (props) => {
  const { value, label, limit } = props;
  return (
    <LabelWrapper>
      {label} <CharacterCounter str={value} limit={limit} />
    </LabelWrapper>
  );
};

export const Page = () => {
  const { fetch, update, create, state } = useCrudState(null);
  const { params } = useRouteMatch();
  const history = useHistory();
  const { pageId } = params;
  const isNewPageMeta = pageId === 'new';

  const [values, setValues] = useState({});

  useEffect(() => {
    if (!isNewPageMeta) {
      fetch(`/api/admin/pages/${pageId}`).then((pageData) => {
        setValues(pageData);
      });
    }
  }, [pageId]);

  if (!isNewPageMeta && !MetaStatus.isResolved(state.meta)) {
    return <Spinner />;
  }

  const onClickSave = () => {
    if (isNewPageMeta) {
      create(`/api/admin/pages`, values).then((created) => setValues(created));
    } else {
      update(`/api/admin/pages/${pageId}`, values).then((updated) => setValues(updated));
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <Fragment>
      <Header
        title="Page Meta"
        Controls={() => (
          <Fragment>
            <Button onClick={() => history.push('/admin/pages')} variant="secondary">
              Go Back
            </Button>
            <Button onClick={onClickSave}>Save</Button>
          </Fragment>
        )}
      />
      <Section>
        <FormInput
          label={
            <LabelWithCounter
              label="Page Title (recommended < 60 characters)"
              value={values.title}
              limit={60}
            />
          }
          name="title"
          value={values.title || ''}
          onChange={handleChange('title')}
        />
        <FormInput
          label="Page Url (relative) e.g. /jam-journeys"
          name="url"
          value={values.url || ''}
          onChange={handleChange('url')}
        />
        <FormInput
          label="Page Image"
          name="image"
          value={values.image || ''}
          onChange={handleChange('image')}
        />
        <LabelWithCounter
          label="Description that shows in search (recommended < 150 characters)"
          value={values.description}
          limit={150}
        />
        <TextArea
          name="description"
          value={values.description || ''}
          rows={5}
          onChange={handleChange('description')}
        />
      </Section>
    </Fragment>
  );
};
