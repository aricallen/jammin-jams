/* eslint-disable func-names */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import { Calendar } from 'calendar';
import { Content, Header1, Section } from '../common/Structure';
import { Fieldset, Label } from '../common/Forms';
import { Select } from '../common/Select';

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

const BICYCLE = 'BICYCLE';
const OTHER = 'OTHER';

const DELIVERYTYPES = [
  {
    label: BICYCLE,
    value: BICYCLE,
  },
  {
    label: OTHER,
    value: OTHER,
  },
];

const CALENDAR_DATA = [
  { month: 'April', num: 4, [BICYCLE]: 22, [OTHER]: 25 },
  { month: 'May', num: 5, [BICYCLE]: 20, [OTHER]: 23 },
  { month: 'June', num: 6, [BICYCLE]: 20, [OTHER]: 23 },
  { month: 'July', num: 7, [BICYCLE]: 20, [OTHER]: 23 },
];

const buildCalendar = (tableRef, monthConfig, deliveryType) => {
  const cal = new Calendar();
  const table = d3.select(tableRef);
  const header = table.append('thead');
  const body = table.append('tbody');
  const weeks = cal.monthDays(2020, monthConfig.num);
  const deliveryDay = monthConfig[deliveryType];

  header
    .append('tr')
    .append('td')
    .attr('colspan', 17)
    .style('text-align', 'center')
    .text(monthConfig.month);

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
        if (d === deliveryDay) {
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

const MonthCalendar = ({ monthConfig, deliveryType }) => {
  const tableRef = useRef();

  useEffect(() => {
    if (tableRef.current) {
      buildCalendar(tableRef.current, monthConfig, deliveryType);
    }
  }, [tableRef.current]);

  return (
    <D3Wrapper id="deliveries">
      <table className="calendar" ref={tableRef} />
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
        Look out for a notification email at least one week prior to delivery for the month.
      </Section>
      <Section>
        <Fieldset className="required">
          <Label>Delivery Type</Label>
          <Select name="deliveryType" options={DELIVERYTYPES} onChange={handleChange} />
        </Fieldset>
      </Section>
      <Section key={currentDeliveryType}>
        {CALENDAR_DATA.map((monthConfig) => (
          <MonthCalendar
            key={monthConfig.month}
            monthConfig={monthConfig}
            deliveryType={currentDeliveryType}
          />
        ))}
      </Section>
      <Section />
    </ContentWrapper>
  );
};
