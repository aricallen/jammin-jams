import React, { useState, useRef, useEffect } from 'react';
import qs from 'query-string';
import styled from '@emotion/styled';
import useForm from 'react-hook-form';
import { Content, Header1, Section, Paragraph, Emphasis, Emoji } from '../common/Structure';
import { Input, FormError, Fieldset, Label, Form } from '../common/Forms';
import { Select } from '../common/Select';
import { Button as BaseButton } from '../common/Button';
import { animation, spacing } from '../../constants/style-guide';
import { addToWaitlist } from '../../services/adapter';
import { media } from '../../utils/media';
import * as d3 from 'd3';
import { Calendar } from 'calendar';

const ContentWrapper = styled(Content)`
  margin: 0 auto;
  width: 100%;
`;

const D3Wrapper = styled('div')`
  & > .calendar {
    width: 70%;
    height: 200px;
  }

  & > .calendar tbody td {
    border: 1px solid black;
    text-align: center;
    vertical-align: top;
  }

  & > .calendar td.empty {
    border: none;
  }
`;

const BICYCLE = 'Bike';
const MINDWERK = 'Mindwerk';

const DELIVERYTYPES = [
  {
    label: BICYCLE,
    value: BICYCLE,
  },
  {
    label: MINDWERK,
    value: MINDWERK,
  },
];

const calendarData = [
  { month: 'April', num: 4, [BICYCLE]: 22, [MINDWERK]: 25 },
  { month: 'May', num: 5, [BICYCLE]: 20, [MINDWERK]: 23 },
  { month: 'June', num: 6, [BICYCLE]: 20, [MINDWERK]: 23 },
  { month: 'July', num: 7, [BICYCLE]: 20, [MINDWERK]: 23 },
];

const MonthCalendar = ({ month, deliveryType }) => {
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

  const deliveries = (tableRef) => {
    const cal = new Calendar();
    const table = d3.select(tableRef);
    const header = table.append('thead');
    const body = table.append('tbody');
    const weeks = cal.monthDays(2020, month['num']);
    const deliveryDay = month[deliveryType];

    console.log('selected delivery type is:');
    console.log(deliveryType);
    console.log(month);
    console.log('to be delivered on:');
    console.log(deliveryDay);

    header
      .append('tr')
      .append('td')
      .attr('colspan', 17)
      .style('text-align', 'center')
      .text(month['month']);

    weeks.forEach(function(week) {
      body
        .append('tr')
        .selectAll('td')
        .data(week)
        .enter()
        .append('td')
        .attr('class', function(d) {
          return d > 0 ? '' : 'empty';
        })
        .text(function(d) {
          if (d == deliveryDay) {
            const imgData = [];
            const url =
              'https://previews.123rf.com/images/siraphol/siraphol1507/siraphol150700002/41819348-marmalade-jam-jar-isolated-on-white-background.jpg';
            imgData.push(url);
            d3.select(this).style('background-color', 'purple');
          } else {
            return d > 0 ? d : '';
          }
        });
    });
  };

  const tableRef = useRef();

  useEffect(() => {
    if (tableRef.current) {
      deliveries(tableRef.current);
    }
  }, [tableRef.current]);

  return (
    <D3Wrapper id="deliveries">
      <table class="calendar" ref={tableRef}></table>
    </D3Wrapper>
  );
};

export const DeliveryCalendar = () => {
  const [currentDeliveryType, setContentDeliveryType] = useState('bike');
  const handleChange = (option) => {
    setContentDeliveryType(option.value);
  };

  return (
    <ContentWrapper>
      <Header1>Delivery Dates Calendar - Marked in Purple</Header1>
      <Section>
        Even though we try to plan ahead as much as possible, please note that bike delivery dates
        are estimates.
      </Section>
      <Section>
        Stay tuned for a notification email at least one week prior to delivery for the month.
      </Section>
      <Section>
        <Fieldset className="required">
          <Label>Delivery Type</Label>
          <Select name="deliveryType" options={DELIVERYTYPES} onChange={handleChange} />
        </Fieldset>
      </Section>
      <Section>{currentDeliveryType}</Section>
      <Section>
        {calendarData.map((month) => (
          <MonthCalendar month={month} deliveryType={currentDeliveryType} />
        ))}
      </Section>
      <Section></Section>
    </ContentWrapper>
  );
};
