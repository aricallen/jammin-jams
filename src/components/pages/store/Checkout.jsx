import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { spacing, pallet, font, boxShadow } from '../../../constants/style-guide';
import { Content } from '../../common/Structure';
import { media } from '../../../utils/media';
import { Button } from '../../common/Button';
import { Spinner } from '../../common/Spinner';
import { DeliveryMethod } from './DeliveryMethod';
import { Shipping } from './Shipping';
import { Payment } from './Payment';
import { CartPreview } from './CartPreview';
import { CreateAccount } from './CreateAccount';

const STRIPE_SCRIPT_ID = 'STRIPE_SCRIPT_ID';
const STRIPE_SRC = 'https://js.stripe.com/v3/';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 3fr 1fr;
  ${media.mobile()} {
    grid-template-columns: auto;
  }
`;

const Form = styled('form')``;

const FormCol = styled('div')`
  margin: 0 auto;
  width: 80%;
  padding-right: ${spacing.quadruple}px;
`;

const CartCol = styled('div')`
  ${media.mobile()} {
    display: none;
  }
`;

const SectionWrapper = styled('div')`
  margin-bottom: ${spacing.double}px;
  box-shadow: ${boxShadow};
`;

const SectionHeader = styled('div')`
  display: flex;
  align-items: center;
  padding: ${spacing.double}px;
`;

const HeaderText = styled('span')`
  font-size: ${font.size.large}px;
`;

const SectionFooterWrapper = styled('div')`
  padding: ${spacing.double}px;
  display: flex;
  justify-content: space-between;
`;

const StepCircle = styled('div')`
  background-color: ${pallet.light.strawberry};
  border: 1px solid ${pallet.strawberry};
  width: 40px;
  height: 40px;
  margin-right: ${spacing.double}px;
  padding: ${spacing.regular}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ContentWrapper = styled(Content)``;

const SECTIONS = [
  {
    header: 'Create Account',
    Component: CreateAccount,
  },
  {
    header: 'Delivery',
    Component: DeliveryMethod,
  },
  {
    header: 'Shipping',
    Component: Shipping,
  },
  {
    header: 'Payment',
    Component: Payment,
  },
];

const SectionFooter = ({ activeSection, onEditPrev, isValid }) => {
  const activeIndex = SECTIONS.findIndex((section) => section === activeSection);
  const prevSection = SECTIONS[activeIndex - 1];
  const nextSection = SECTIONS[activeIndex + 1];
  return (
    <SectionFooterWrapper>
      {prevSection ? (
        <Button variant="secondary" onClick={onEditPrev}>
          Edit Previous
        </Button>
      ) : (
        <div />
      )}
      {nextSection && (
        <Button disabled={!isValid} type="submit">
          Continue
        </Button>
      )}
    </SectionFooterWrapper>
  );
};

export const Checkout = () => {
  const [values, setValues] = useState({});
  const [isStripeLoaded, setIsStripeLoaded] = useState(!!document.getElementById(STRIPE_SCRIPT_ID));
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [_isValid, setIsValid] = useState(false);
  const cart = useSelector((state) => state.cart.data);

  const loadStripe = () => {
    if (!isStripeLoaded && cart.length > 0) {
      const scriptTag = document.createElement('script');
      scriptTag.src = STRIPE_SRC;
      scriptTag.id = STRIPE_SCRIPT_ID;
      scriptTag.addEventListener('load', () => {
        setIsStripeLoaded(true);
      });
      document.head.appendChild(scriptTag);
    }
  };
  useEffect(loadStripe, []);

  if (cart.length === 0) {
    return <Redirect to="/store" />;
  }

  if (!isStripeLoaded) {
    return <Spinner variant="large" />;
  }

  const onUpdate = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onEditPrev = () => {
    const activeIndex = SECTIONS.findIndex((section) => section === activeSection);
    const prevSection = SECTIONS[activeIndex - 1];
    setActiveSection(prevSection);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const activeIndex = SECTIONS.findIndex((section) => section === activeSection);
    const nextSection = SECTIONS[activeIndex + 1];
    setActiveSection(nextSection);
  };

  return (
    <Content>
      <Grid>
        <FormCol>
          {SECTIONS.map((section, i) => {
            const { header, Component } = section;
            return (
              <SectionWrapper key={section.header}>
                <SectionHeader>
                  <StepCircle>{i + 1}</StepCircle>
                  <HeaderText>{header}</HeaderText>
                </SectionHeader>
                {section === activeSection && (
                  <Form onSubmit={onSubmit}>
                    <ContentWrapper>
                      <Component onUpdate={onUpdate} values={values} setIsValid={setIsValid} />
                    </ContentWrapper>
                    <SectionFooter
                      activeSection={activeSection}
                      onEditPrev={onEditPrev}
                      isValid={_isValid}
                    />
                  </Form>
                )}
              </SectionWrapper>
            );
          })}
        </FormCol>
        <CartCol>
          <CartPreview />
        </CartCol>
      </Grid>
    </Content>
  );
};
