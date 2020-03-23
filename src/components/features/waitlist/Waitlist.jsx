import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import qs from 'query-string';
import styled from '@emotion/styled';
import {
  Header1,
  Section,
  Paragraph,
  Emphasis,
  Emoji,
  FullPageWrapper,
} from '../../common/Structure';
import { Button as BaseButton } from '../../common/Button';
import { animation, spacing } from '../../../constants/style-guide';
import { addToWaitlist } from '../../../services/adapter';
import { WaitlistForm } from './WaitlistForm';
import { media } from '../../../utils/media';
import { addMember } from '../../../redux/email/actions';

const ContentWrapper = styled(FullPageWrapper)`
  padding: ${spacing.quadruple}px 0;
  animation: fade-in 0.5s 1;
`;

const Button = styled(BaseButton)`
  transition: opacity ${animation};
  &.is-hidden {
    opacity: 0;
  }
`;

const FormWrapper = styled('div')`
  width: 50%;
  ${media.mobile()} {
    width: 100%;
  }
  &.is-hidden {
    display: none;
    opacity: 0;
  }
  &.is-visible {
    display: block;
    animation: fade-in 0.5s;
  }
`;

export const Waitlist = ({ history, location }) => {
  const dispatch = useDispatch();
  const { open } = qs.parse(location.search);
  const [isViewingForm, setIsViewingForm] = useState(open === 'true');

  const signupForNewsLetter = async (values) => {
    const { email, firstName, lastName } = values;
    try {
      dispatch(addMember({ email, firstName, lastName, tags: ['Newsletter'] }));
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (values) => {
    try {
      await addToWaitlist({ ...values, formSource: 'Pre-launch waitlist' });
      history.push('/thank-you');
    } catch (err) {
      console.error(err);
    }
    if (values.newsletterSignup) {
      signupForNewsLetter(values);
    }
  };

  return (
    <ContentWrapper>
      <Header1>
        Welcome to Jammin&apos; Jams! We are <Emphasis>so stoked</Emphasis> that you are here.
      </Header1>
      <Section>
        <Paragraph>
          We created Jammin&apos; Jams with the intent of celebrating all that is happy in life by
          doing what we love. Jam invites us to live in the present moment. We aim to transform the
          best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and
          bass. At Jammin&apos; Jams, we firmly believe that fun and passion can be tasted. This is
          why we will always play a live DJ set while making jam in our home kitchen. We keep our
          hearts pumping and our jams jammin with funky techno beats, and we hope you’ll do the
          same!
        </Paragraph>
        <Paragraph>
          We&apos;re just getting started with this thrilling adventure and would love for you to
          join us on this crazy ride. Please fill out the brief survey below and sign up for our
          waiting list so you can be notified as soon as we open up our subscription service. Space
          will be limited so sign up now to be first in line <Emoji label="please">🙏🏽</Emoji>
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
          <WaitlistForm onSubmit={onSubmit} />
        </FormWrapper>
      </Section>
    </ContentWrapper>
  );
};
