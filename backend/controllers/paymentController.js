const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')('sk_test_51NPo70SBajNSIwSx2UnUsJiVk9gJLukzq4Mw1EAOy2T1oVug8J2bgMP1IJpLPTTdgPEgUmmkzbm7TTj0o6LbYqu700iDJ1jjw6');

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        description: 'Description of the transaction',
        
        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: 'pk_test_51NPo70SBajNSIwSx4oEEEOqLlDzyeAN4B7rgmdhASdg8wb7mbY6LWB8bGDpeIcux4WmU6PYUd6sxiitSzpzgZLae00CxpCyYQY'
    })

})