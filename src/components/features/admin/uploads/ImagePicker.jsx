import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Select } from '../../../common/Select';
import { fetchMany } from '../../../../redux/uploads/actions';
import { Spinner } from '../../../common/Spinner';
import { isResolved } from '../../../../utils/meta-status';

const Wrapper = styled('div')``;

const createOption = (upload = {}) => ({
  label: upload?.title,
  value: upload?.id,
});

const createOptions = (uploads) => uploads.map(createOption);

const Picker = ({ onChange, selectedId, uploadsState }) => {
  const options = createOptions(uploadsState.data);
  const selectedUpload = uploadsState.data.find((upload) => upload.id === +selectedId);

  if (!isResolved(uploadsState.meta.many)) {
    return <Spinner />;
  }

  return (
    <Select
      options={options}
      value={createOption(selectedUpload)}
      placeholder="Select image..."
      onChange={onChange}
    />
  );
};

export const ImagePicker = ({ onChange, selectedId }) => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);

  const fetchUploads = () => {
    dispatch(fetchMany());
  };
  useEffect(fetchUploads, []);

  return (
    <Wrapper>
      <Picker onChange={onChange} selectedId={selectedId} uploadsState={uploadsState} />
    </Wrapper>
  );
};
