import React, { useState } from 'react';
import styled from '@emotion/styled';
import useForm from 'react-hook-form';
import { Content, Header1, Section, Paragraph, Emphasis, Emoji } from '../common/Structure';
import { Input, FormError, Fieldset, Label, Form, Button as BaseButton } from '../common/Forms';
import { animation, spacing } from '../../constants/style-guide';
import { addToWaitlist } from '../../services/adapter';

const ContentWrapper = styled(Content)`
  margin: 0 auto;
  width: 80%;
  animation: fade-in 0.5s 1;
`;

const FormWrapper = styled('div')`
  width: 50%;
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

export const WelcomeForm = () => {
  const [isViewingForm, setIsViewingForm] = useState(false);
  const { handleSubmit, errors, register } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await addToWaitlist(values);
      alert('thanks!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ContentWrapper>
      <Header1>Welcome to Jammin&apos; Jams! We are <Emphasis>so stoked</Emphasis> that you are here.</Header1>
      <Section>
        <Paragraph>
          We created Jammin&apos; Jams with the intent of celebrating all that is happy in life by doing what we love.
          Jam invites us to live in the present moment. We aim to transform the best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass.
          AT Jammin&apos; Jams, we firmly believe that fun and passion can be tasted. This is why we will always play a live DJ set while making jam in our home kitchen.
          We keep our hearts pumping and our jam jammin&apos; with funky techno beats, and we hope you’ll do the same!
        </Paragraph>
        <Paragraph>
          We&apos;re just getting started with this thrilling adventure and would love for you to join us on this crazy ride.
          Please fill out the brief survey below and sign up for our waiting list so you can be notified as soon as we open up our subscription service.
          Space will be limited so sign up now <Emoji label="please">🙏🏽</Emoji>
        </Paragraph>
      </Section>

      <Section>
        <Button
          className={isViewingForm ? 'is-hidden' : 'is-visible'}
          onClick={() => setIsViewingForm(true)}
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
              <Label>Zipcode</Label>
              <Input placeholder="12345" name="zipCode" ref={register({
                required: true,
              })} />
              {errors.zipCode && <FormError>This field is required.</FormError>}
            </Fieldset>

            <Fieldset>
              <Label>Favorite jam</Label>
              <Input placeholder="peach" name="favoriteJam" ref={register} />
            </Fieldset>

            <Fieldset>
              <Label>Least favorite jam</Label>
              <Input placeholder="onion" name="leastFavoriteJam" ref={register} />
            </Fieldset>

            <Fieldset>
              <Label>Favorite genre of music</Label>
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
