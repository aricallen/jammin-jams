import React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header1, Section, Paragraph, Emphasis, Emoji } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';
import { addToWaitlist } from '../../../services/adapter';
import { WaitlistForm } from './WaitlistForm';
import { media } from '../../../utils/media';
import { addMember } from '../../../redux/email/actions';
import { LinkLikeSpan } from '../../common/Links';
import { Article } from '../../common/Article';

const ContentWrapper = styled('div')`
  animation: fade-in 0.5s 1;
`;

const FormWrapper = styled('div')`
  width: 50%;
  ${media.mobile()} {
    width: 100%;
  }
`;

export const AtCapacityContent = withRouter(({ history }) => {
  const dispatch = useDispatch();

  const signupForNewsLetter = (values) => {
    const { email, firstName, lastName } = values;
    dispatch(addMember({ email, firstName, lastName, tags: ['Newsletter'] }));
  };

  const onSubmit = async (values) => {
    try {
      await addToWaitlist({ values, formSource: 'At capacity waitlist' });
      history.push('/thank-you');
    } catch (err) {
      console.error(err);
    }
    if (values.newsletterSignup) {
      signupForNewsLetter(values);
    }
  };

  const onClickSignUp = () => {
    document.querySelector('[name="newsletterSignup"]').scrollIntoView();
  };

  return (
    <ContentWrapper>
      <Header1>Oh noes! We are at full capacity. 😩</Header1>
      <Section>
        <Paragraph>
          First, we are <Emphasis>absolutely thrilled</Emphasis> you want some of our jam.{' '}
          Unfortunately, our jam production is on such a small scale and are only able to support a
          limited set of subscriptions (for now!).
        </Paragraph>
        <Paragraph>
          But fear not! <Emoji label="Muscle emoji">💪🏽</Emoji> Fill out the form below to join our
          waitlist and be first in line for when we expand. Also be sure to{' '}
          <LinkLikeSpan onClick={onClickSignUp}>sign up</LinkLikeSpan> for our newsletter so you can
          stay up to date on our #jamjourneys.
        </Paragraph>
      </Section>

      <Section style={{ marginBottom: spacing.quadruple }}>
        <FormWrapper>
          <WaitlistForm onSubmit={onSubmit} />
        </FormWrapper>
      </Section>
    </ContentWrapper>
  );
});

export const AtCapacity = () => {
  return <Article Middle={AtCapacityContent} />;
};
