import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { isResolved } from '../../../../utils/meta-status';
import { Spinner } from '../../../common/Spinner';
import { Section } from '../../../common/Structure';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { spacing } from '../../../../constants/style-guide';
import { Row } from '../../../common/Tables';
import { useCrudState } from '../../../../hooks/useCrudState';

const Cell = styled('div')`
  margin-right: ${spacing.regular}px;
`;

const ListItem = ({ page }) => {
  return (
    <Row onClick={page.onSelect}>
      <Cell>{page.id}.</Cell>
      <Cell>{page.url}</Cell>
    </Row>
  );
};

export const List = () => {
  const history = useHistory();
  const { fetch, state } = useCrudState();

  useEffect(() => {
    fetch('/api/admin/pages');
  }, []);

  const isBusy = !isResolved(state.meta);

  if (isBusy) {
    return <Spinner variant="large" />;
  }

  const pages = state.data.map((page) => ({
    ...page,
    onSelect: () => history.push(`/admin/pages/${page.id}`),
  }));

  const goToCreate = () => {
    history.push('/admin/pages/new');
  };

  return (
    <Fragment>
      <Header title="Pages" Controls={() => <Button onClick={goToCreate}>Add Page Meta</Button>} />
      <Section>
        {pages.map((page) => (
          <ListItem key={page.id} page={page} />
        ))}
      </Section>
    </Fragment>
  );
};
