import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import { spacing, pallet, font, boxShadow } from '../../../constants/style-guide';
import { Content } from '../../common/Structure';
import { media } from '../../../utils/media';
import { Button } from '../../common/Button';
import { DeliveryMethod } from './DeliveryMethod';
import { Shipping } from './Shipping';
import { Payment } from './Payment';

const SectionWrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  ${media.mobile()} {
    width: 80%;
  }
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

const SectionFooter = ({ activeSection, setActiveSection, isValid }) => {
  const activeIndex = SECTIONS.findIndex((section) => section === activeSection);
  const prevSection = SECTIONS[activeIndex - 1];
  const nextSection = SECTIONS[activeIndex + 1];
  return (
    <SectionFooterWrapper>
      {prevSection ? (
        <Button variant="secondary" onClick={() => setActiveSection(prevSection)}>
          Edit Previous
        </Button>
      ) : (
        <div />
      )}
      {nextSection && (
        <Button disabled={!isValid} onClick={() => setActiveSection(nextSection)}>
          Continue
        </Button>
      )}
    </SectionFooterWrapper>
  );
};

export const Checkout = () => {
  const [values, setValues] = useState({});
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [_isValid, setIsValid] = useState(false);

  const onUpdate = (name, value, isValid = false) => {
    setValues({ ...values, [name]: value });
    setIsValid(isValid);
  };

  return (
    <Content>
      {SECTIONS.map((section, i) => {
        const { header, Component } = section;
        return (
          <SectionWrapper key={section.header}>
            <SectionHeader>
              <StepCircle>{i + 1}</StepCircle>
              <HeaderText>{header}</HeaderText>
            </SectionHeader>
            {section === activeSection && (
              <Fragment>
                <ContentWrapper>
                  <Component onUpdate={onUpdate} values={values} />
                </ContentWrapper>
                <SectionFooter
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  isValid={_isValid}
                />
              </Fragment>
            )}
          </SectionWrapper>
        );
      })}
    </Content>
  );
};
