import React, { useState } from 'react';
import qs from 'query-string';
import styled from '@emotion/styled';
import useForm from 'react-hook-form';
import { Content, Header1, Section, Paragraph, Emphasis, Emoji } from '../common/Structure';
import { Input, FormError, Fieldset, Label, Form, Select, Button as BaseButton } from '../common/Forms';
import { animation, spacing } from '../../constants/style-guide';
import { addToWaitlist } from '../../services/adapter';

const ContentWrapper = styled(Content)`
  margin: 0 auto;
  width: 80%;
  animation: fade-in 0.5s 1;
`;

const FormWrapper = styled('div')`
  @media (min-width: 1024px) {
    width: 50%;
  }
  &.is-hidden {
    opacity: 0;
  }
  &.is-visible {
    animation: fade-in 0.5s;
  }
`;

const Button = styled(BaseButton)`
  transition: opacity ${animation};
  &.is-hidden {
    opacity: 0;
  }
`;

const SubmitButton = styled(BaseButton)`
  margin-top: ${spacing.double}px;
`;

const FREQUENCIES = [
  'Once a month',
  'Once a quarter',
  'Not sure / It depends',
];

const PAIRED_WITH = [
  'Cheeses',
  'Nut butters',
  'Bread & butter',
  'Dairy (yogurt, ice cream, etc)',
  'Baked goods',
  'With a spoon (we get it)',
];

export const Waitlist = ({ history, location }) => {
  const { open } = qs.parse(location.search);
  const [isViewingForm, setIsViewingForm] = useState(open === 'true');
  const [selectValues, setSelectValues] = useState({});
  const { handleSubmit, errors, register } = useForm();

  const handleChange = (name) => (value) => {
    if (Array.isArray(value)) {
      const serialized = value.map((option) => option.value).join(', ');
      setSelectValues({
        ...selectValues,
        [name]: serialized,
      });
    } else {
      setSelectValues({
        ...selectValues,
        [name]: value.value,
      });
    }
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await addToWaitlist({
        ...values,
        ...selectValues,
      });
      history.push('/thank-you');
    } catch (err) {
      console.error(err);
    }
  };

  const frequencyOptions = FREQUENCIES.map((value) => ({
    label: value,
    value,
  }));

  const pairedOptions = PAIRED_WITH.map((value) => ({
    label: value,
    value,
  }));

  return (
    <ContentWrapper>
      <Header1>Welcome to Jammin&apos; Jams! We are <Emphasis>so stoked</Emphasis> that you are here.</Header1>
      <Section>
        <Paragraph>
          We created Jammin&apos; Jams with the intent of celebrating all that is happy in life by doing what we love.
          Jam invites us to live in the present moment. We aim to transform the best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass.
          At Jammin&apos; Jams, we firmly believe that fun and passion can be tasted. This is why we will always play a live DJ set while making jam in our home kitchen.
          We keep our hearts pumping and our jams jammin&apos; with funky techno beats, and we hope you’ll do the same!
        </Paragraph>
        <Paragraph>
          We&apos;re just getting started with this thrilling adventure and would love for you to join us on this crazy ride.
          Please fill out the brief survey below and sign up for our waiting list so you can be notified as soon as we open up our subscription service.
          Space will be limited so sign up now to be first in line <Emoji label="please">🙏🏽</Emoji>
        </Paragraph>
      </Section>

      <Section>
        <Button
          className={isViewingForm ? 'is-hidden' : 'is-visible'}
          onClick={() => {
            setIsViewingForm(true);
            history.replace({ pathname: 'waitlist', search: qs.stringify({ open: true }) });
          }}
        >
          Let&apos;s do this
        </Button>
      </Section>

      <Section>
        <FormWrapper className={isViewingForm ? 'is-visible' : 'is-hidden'}>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Fieldset className="required">
              <Label>First Name</Label>
              <Input placeholder="Jane" name="firstName" ref={register({
                required: true,
              })} />
              {errors.firstName && <FormError>This field is required.</FormError>}
            </Fieldset>

            <Fieldset className="required">
              <Label>Last Name</Label>
              <Input placeholder="Awesome" name="lastName" ref={register({
                required: true,
              })} />
              {errors.lastName && <FormError>This field is required.</FormError>}
            </Fieldset>

            <Fieldset className="required">
              <Label>Email</Label>
              <Input placeholder="jane.awesome@somemail.com" name="email" ref={register({
                required: true,
              })} />
              {errors.email && <FormError>This field is required.</FormError>}
            </Fieldset>

            <Fieldset className="required">
              <Label>Zip Code</Label>
              <Input placeholder="12345" name="zipCode" ref={register({
                required: true,
              })} />
              {errors.zipCode && <FormError>This field is required.</FormError>}
            </Fieldset>

            <Fieldset className="required">
              <Label>Preferred Subscription Frequency</Label>
              <Select
                name="preferredFrequency"
                options={frequencyOptions}
                onChange={handleChange('preferredFrequency')}
              />
            </Fieldset>

            <Fieldset>
              <Label>I eat jam with... (one or more)</Label>
              <Select
                name="pairWith"
                options={pairedOptions}
                onChange={handleChange('pairWith')}
                isMulti={true}
                closeMenuOnSelect={false}
              />
            </Fieldset>

            <Fieldset>
              <Label>Favorite Jam</Label>
              <Input placeholder="peach" name="favoriteJam" ref={register} />
            </Fieldset>

            <Fieldset>
              <Label>Least Favorite Jam</Label>
              <Input placeholder="onion" name="leastFavoriteJam" ref={register} />
            </Fieldset>

            <Fieldset>
              <Label>Favorite Genre of Music</Label>
              <Input placeholder="techno" name="favoriteGenre" ref={register} />
            </Fieldset>
            <SubmitButton
              type="submit"
            >
              Sign me up!
            </SubmitButton>
          </Form>
        </FormWrapper>
      </Section>
    </ContentWrapper>
  );
};
