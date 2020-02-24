/* eslint-disable func-names */
import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import { Calendar } from 'calendar';
import { Header1, Section } from '../../common/Structure';
import { Label } from '../../common/Forms';
import { media } from '../../../utils/media';
import { Select } from '../../common/Select';
import { pallet, spacing, font, border } from '../../../constants/style-guide';
import { Article } from '../../common/Article';

const ContentWrapper = styled('div')``;

const DeliveryTypeWrapper = styled('div')`
  width: 60%;
  margin: 0 auto;
  ${media.mobile()} {
    width: 100%;
  }
  label {
    font-weight: ${font.weight.semiBold};
  }
`;

const D3Wrapper = styled('div')`
  margin-top: ${spacing.double}px;
  display: flex;
  justify-content: center;

  & > .calendar {
    width: 70%;
    height: 200px;
    border: ${border};
    border-radius: ${spacing.regular}px;
    padding: ${spacing.regular}px;
  }

  & > .calendar tbody td {
    border: ${border};
    text-align: center;
    vertical-align: middle;
    padding: ${spacing.regular}px;
    min-height: ${spacing.quadruple}px;
    height: 100%;
  }

  & > .calendar td.empty {
    border: none;
  }

  & td.delivery-day-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${pallet.plum};
  }
`;

const BICYCLE = 'BICYCLE';
const OTHER = 'OTHER';

const DELIVERY_TYPES = [
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
    .style('font-weight', font.weight.semiBold)
    .text(monthConfig.month);

  weeks.forEach(function(week) {
    body
      .append('tr')
      .selectAll('td')
      .data(week)
      .enter()
      .append('td')
      .attr('class', function(d) {
        return d > 0 ? 'cal-cell' : 'empty';
      })
      .text(function(d) {
        const showNumber = d > 0 && d !== deliveryDay;
        return showNumber ? d : '';
      })
      .each(function(d) {
        if (d === deliveryDay) {
          const cell = d3.select(this);
          cell
            .attr('class', 'delivery-day-cell')
            .append('img')
            .attr('src', '/assets/favicons/favicon.ico')
            .attr('width', '30px');
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
    <D3Wrapper>
      <table className="calendar" ref={tableRef} />
    </D3Wrapper>
  );
};

export const DeliveryCalendarContent = () => {
  const [currentDeliveryType, setContentDeliveryType] = useState(BICYCLE);
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
        <DeliveryTypeWrapper>
          <Label>Delivery Type</Label>
          <Select
            name="deliveryType"
            options={DELIVERY_TYPES}
            value={DELIVERY_TYPES.find((option) => option.value === currentDeliveryType)}
            onChange={handleChange}
          />
        </DeliveryTypeWrapper>
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

export const DeliveryCalendar = () => (
  <Fragment>
    <Article Middle={DeliveryCalendarContent} />
  </Fragment>
);
