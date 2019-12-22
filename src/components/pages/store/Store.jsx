import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Products } from './Products';
import { DeliveryMethod } from './DeliveryMethod';
import { Payment } from './Payment';
import { Shipping } from './Shipping';

export const Store = () => {
  return (
    <Switch>
      <Route exact path="/store/products" component={Products} />
      <Route exact path="/store/delivery-method" component={DeliveryMethod} />
      <Route exact path="/store/shipping" component={Shipping} />
      <Route exact path="/store/payment" component={Payment} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};
