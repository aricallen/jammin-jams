import { spacing, font } from '../constants/style-guide';
import { processSubscription } from './adapter';

let _paymentForm = null;

const buildForm = (callbacks = {}) => {
  const paymentForm = new window.SqPaymentForm({
    applicationId: process.env.SQUARE_APPLICATION_ID,
    inputClass: 'sq-input',
    autoBuild: false,
    inputStyles: [
      {
        fontSize: `${font.size.regular}px`,
        padding: `${spacing.regular}px`,
      },
    ],
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: '• • • •  • • • •  • • • •  • • • •',
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV',
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY',
    },
    postalCode: {
      elementId: 'sq-zip-code',
      placeholder: 'Zip Code',
    },
    callbacks: {
      cardNonceResponseReceived: () => {
        console.log('nonce response callback not initialized');
      },
      ...callbacks,
    },
  });
  return paymentForm;
};

const SCRIPT_ID = 'square-form';

export const initForm = () => {
  const existingScript = document.getElementById(SCRIPT_ID);
  if (existingScript) {
    return;
  }
  const scriptTag = document.createElement('script');
  scriptTag.id = SCRIPT_ID;
  scriptTag.src = 'https://js.squareupsandbox.com/v2/paymentform';
  scriptTag.onload = () => {
    const paymentForm = buildForm();
    paymentForm.build();
    _paymentForm = paymentForm;
  };
  document.body.appendChild(scriptTag);
};

export const submitForm = async (values) => {
  _paymentForm.clientController.callbacks.cardNonceResponseReceived = (errors, nonce) => {
    if (errors) {
      console.error('Encountered errors:');
      errors.forEach((error) => {
        console.error(error.message);
      });
    } else {
      console.log('received nonce', nonce);
      console.log('form values = ', values);
      processSubscription({ nonce, ...values });
    }
  };
  _paymentForm.requestCardNonce();
};
