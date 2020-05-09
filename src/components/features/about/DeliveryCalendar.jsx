/* eslint-disable func-names */
import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import { Calendar } from 'calendar';
import { Header1, Section, Paragraph } from '../../common/Structure';
import { Label } from '../../common/Forms';
import { media } from '../../../utils/media';
import { Select } from '../../common/Select';
import { pallet, spacing, font, border } from '../../../constants/style-guide';
import { Article } from '../../common/Article';
import { MetaTags } from '../../common/MetaTags';
import { DeliveryType, CALENDAR_DATA } from '../../../utils/delivery-helpers';

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
    width: 80%;
    height: 200px;
    border: ${border};
    border-radius: ${spacing.regular}px;
  }

  & > .calendar tbody td {
    border: ${border};
    text-align: center;
    vertical-align: middle;
    padding: ${spacing.regular}px;
    min-height: ${spacing.quadruple}px;
    width: ${spacing.quadruple + spacing.regular}px;
    height: 100%;
  }

  & > .calendar td.day-of-week {
    text-align: center;
    padding: 0;
    border: 0;
  }

  & > .calendar td.empty {
    border: none;
    opacity: 0;
  }
  & > .calendar td.empty::before {
    content: '-';
  }

  & td.delivery-day-cell {
    background-color: ${pallet.plum};
    background-image: url('/assets/favicons/favicon.ico');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const DELIVERY_TYPES = [
  {
    label: DeliveryType.BICYCLE,
    value: DeliveryType.BICYCLE,
  },
  // {
  //   label: OTHER,
  //   value: OTHER,
  // },
];

const buildCalendar = (tableRef, monthConfig, deliveryType) => {
  const cal = new Calendar();
  const table = d3.select(tableRef);
  const header = table.append('thead');
  const body = table.append('tbody');
  const weeks = cal.monthDays(2020, monthConfig.num);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const deliveryDays = monthConfig[deliveryType];

  header
    .append('tr')
    .append('td')
    .attr('colspan', 17)
    .style('text-align', 'center')
    .style('font-weight', font.weight.semiBold)
    .text(monthConfig.month);

  // add days of the week
  body.append('tr');
  daysOfWeek.forEach((day) => {
    body
      .select('tr')
      .append('td')
      .attr('class', 'day-of-week')
      .text(day);
  });

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
        const showNumber = d > 0 && !deliveryDays.includes(+d);
        return showNumber ? d : '';
      })
      .each(function(d) {
        if (deliveryDays.includes(+d)) {
          const cell = d3.select(this);
          cell.attr('class', 'delivery-day-cell');
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
  const [currentDeliveryType, setContentDeliveryType] = useState(DeliveryType.BICYCLE);
  const handleChange = (option) => {
    setContentDeliveryType(option.value);
  };

  return (
    <ContentWrapper>
      <MetaTags
        title="Delivery Dates Calendar"
        description="Find out when will be delivering our sweet jams to you. Dates are estimates and may change."
        path="/about/delivery-calendar"
      />
      <Header1>Delivery Dates Calendar</Header1>
      <Section>
        <Paragraph>
          Even though we try to plan ahead as much as possible, please note that bike delivery dates
          are estimates.
        </Paragraph>
        <Paragraph>
          Look out for a notification email at least one week prior to delivery for the month.
        </Paragraph>
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
