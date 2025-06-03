export const processPaymentGuide = (countryCode, price, wallet) => {
  const PaymentStrategy = {
    LARGE_BILLS: '최대 화폐 수 위주',
    SMALL_BILLS: '잔돈 우선 위주',
  };

  const CURRENCIES = {
    US: {
      countryCode: 'US',
      currencySymbol: '$',
      denominations: [100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01],
      decimalPlaces: 2,
    },
    CN: {
      countryCode: 'CN',
      currencySymbol: '¥',
      denominations: [100, 50, 20, 10, 5, 1, 0.5, 0.1, 0.05, 0.01],
      decimalPlaces: 2,
    },
    JP: {
      countryCode: 'JP',
      currencySymbol: '¥',
      denominations: [10000, 5000, 2000, 1000, 500, 100, 50, 10, 5, 1],
      decimalPlaces: 0,
    },
  };

  const round = (amount, places) => {
    return parseFloat(amount.toFixed(places));
  };

  const recommendPayment = (amount, wallet, currency, strategy) => {
    const denominations =
      strategy === PaymentStrategy.LARGE_BILLS
        ? currency.denominations
        : [...currency.denominations].reverse();

    let remaining = round(amount, currency.decimalPlaces);
    const used = {};

    for (const denom of denominations) {
      if (remaining <= 0) break;
      const count = Math.min(Math.floor(remaining / denom), wallet[denom] || 0);
      if (count > 0) {
        used[denom] = count;
        remaining = round(remaining - denom * count, currency.decimalPlaces);
      }
    }

    const totalPaid = Object.entries(used).reduce(
      (sum, [k, v]) => sum + parseFloat(k) * v,
      0
    );
    const change = round(totalPaid - amount, currency.decimalPlaces);

    if (remaining > 0) {
      return { error: `${strategy} 전략으로 지불 불가` };
    }

    return {
      strategy,
      used,
      total_paid: totalPaid,
      change,
    };
  };

  const recommendChange = (changeAmount, currency, strategy) => {
    const denominations =
      strategy === PaymentStrategy.LARGE_BILLS
        ? currency.denominations
        : [...currency.denominations].reverse();

    let remaining = round(changeAmount, currency.decimalPlaces);
    const change = {};

    for (const denom of denominations) {
      if (remaining <= 0) break;
      const count = Math.floor(remaining / denom);
      if (count > 0) {
        change[denom] = count;
        remaining = round(remaining - denom * count, currency.decimalPlaces);
      }
    }

    if (remaining > 0) {
      return { error: `${strategy} 전략으로 거스름돈 계산 불가` };
    }

    return {
      strategy,
      change,
      total_amount: changeAmount,
    };
  };

  const processTransaction = (countryCode, foodPrice, wallet) => {
    const currency = CURRENCIES[countryCode];
    if (!currency) {
      return { error: '지원하지 않는 국가' };
    }

    const price = round(foodPrice, currency.decimalPlaces);
    const walletTotal = Object.entries(wallet).reduce(
      (sum, [k, v]) => sum + parseFloat(k) * v,
      0
    );

    if (walletTotal < price) {
      return {
        error: `${currency.currencySymbol}${walletTotal}으로는 ${currency.currencySymbol}${price} 결제 불가`,
        currency: currency.currencySymbol,
      };
    }

    const recommendations = { payment: {}, change: {} };

    for (const strategy of Object.values(PaymentStrategy)) {
      const pay = recommendPayment(price, { ...wallet }, currency, strategy);
      recommendations.payment[strategy] = pay;

      if (!pay.error && pay.change > 0) {
        const change = recommendChange(pay.change, currency, strategy);
        recommendations.change[strategy] = change;
      }
    }

    return {
      currency: currency.currencySymbol,
      food_price: price,
      wallet_total: walletTotal,
      recommendations,
    };
  };

};