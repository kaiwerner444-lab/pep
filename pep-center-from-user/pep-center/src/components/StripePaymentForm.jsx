import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, Lock } from 'lucide-react';

export default function StripePaymentForm({ clientSecret, onSuccess, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-confirmation',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
        <Lock className="w-4 h-4" />
        <span>Secure payment encrypted by Stripe</span>
      </div>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: '',
                email: '',
              }
            }
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-xl bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay ${(amount / 100).toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
}
