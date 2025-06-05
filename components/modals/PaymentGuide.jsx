import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomModal from './CustomModal';
import expenseApi from '../../apis/expense';

// 결제 전략 열거형
const PaymentStrategy = {
  LARGE_BILLS: "최대 화폐 수 위주",
  MINIMIZE_CHANGE: "거스름돈 최소화"
};

// 통화 설정 클래스
class CurrencyConfig {
  constructor(countryCode, currencySymbol, denominations, decimalPlaces) {
    this.countryCode = countryCode;
    this.currencySymbol = currencySymbol;
    this.denominations = denominations;
    this.decimalPlaces = decimalPlaces;
  }
}

// 통합 결제 시스템 클래스
class IntegratedPaymentSystem {
  constructor() {
    this.currencies = {
      'US': new CurrencyConfig('US', '$', [100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01], 2),
      'CN': new CurrencyConfig('CN', '¥', [100, 50, 20, 10, 5, 1, 0.5, 0.1, 0.05, 0.01], 2),
      'JP': new CurrencyConfig('JP', '¥', [10000, 5000, 2000, 1000, 500, 100, 50, 10, 5, 1], 0)
    };
  }

  _round(amount, places) {
    return Math.round(amount * Math.pow(10, places)) / Math.pow(10, places);
  }

  // 개선된 거스름돈 최소화 알고리즘 (동적 계획법 + 백트래킹)
  _findMinimumChangePayment(amount, wallet, currency) {
    const denominations = currency.denominations;
    const maxWalletValue = Object.entries(wallet).reduce((sum, [denom, count]) => 
      sum + parseFloat(denom) * count, 0);
    
    // 검색 범위를 합리적으로 제한 (목표 금액의 150% 또는 지갑 총액 중 작은 값)
    const searchLimit = Math.min(
      this._round(amount * 1.5, currency.decimalPlaces),
      maxWalletValue
    );

    let bestSolution = null;
    let minChange = Infinity;

    const memo = new Map();

    const findOptimalPayment = (targetAmount, denomIndex, currentUsed, currentTotal) => {
      // 기저 조건: 목표 금액 이상 지불한 경우
      if (currentTotal >= targetAmount) {
        const change = this._round(currentTotal - targetAmount, currency.decimalPlaces);
        if (change < minChange) {
          minChange = change;
          bestSolution = {
            used: { ...currentUsed },
            totalPaid: currentTotal,
            change: change
          };
        }
        return change === 0; // 정확한 금액이면 탐색 종료
      }

      // 모든 화폐를 확인했지만 목표 금액에 도달하지 못한 경우
      if (denomIndex >= denominations.length) {
        return false;
      }

      // 메모이제이션 키
      const key = `${targetAmount}-${denomIndex}-${currentTotal}`;
      if (memo.has(key)) {
        return memo.get(key);
      }

      const denom = denominations[denomIndex];
      const maxCount = wallet[denom] || 0;
      let found = false;

      // 이 화폐 단위를 0개부터 최대 보유량까지 사용
      for (let count = 0; count <= maxCount; count++) {
        const newTotal = this._round(currentTotal + denom * count, currency.decimalPlaces);
        
        // 검색 범위를 초과하면 중단
        if (newTotal > searchLimit) break;

        const newUsed = { ...currentUsed };
        if (count > 0) {
          newUsed[denom] = count;
        }

        if (findOptimalPayment(targetAmount, denomIndex + 1, newUsed, newTotal)) {
          found = true;
          break; // 정확한 금액을 찾았으면 종료
        }
      }

      memo.set(key, found);
      return found;
    };

    findOptimalPayment(amount, 0, {}, 0);

    if (bestSolution) {
      return {
        strategy: PaymentStrategy.MINIMIZE_CHANGE,
        used: bestSolution.used,
        totalPaid: bestSolution.totalPaid,
        change: bestSolution.change
      };
    }

    return { 
      error: `${PaymentStrategy.MINIMIZE_CHANGE} 전략으로 지불 불가 (지갑 잔액 확인 필요)`,
      strategy: PaymentStrategy.MINIMIZE_CHANGE 
    };
  }

  // 최대 화폐 우선 전략 
  _findLargeBillsPayment(amount, wallet, currency) {
    const denominations = currency.denominations;
    let remaining = this._round(amount, currency.decimalPlaces);
    const used = {};

    // 1단계: 큰 화폐부터 사용
    for (const denom of denominations) {
      if (remaining <= 0) break;
      const count = Math.min(Math.floor(remaining / denom), wallet[denom] || 0);
      if (count > 0) {
        used[denom] = count;
        remaining = this._round(remaining - denom * count, currency.decimalPlaces);
      }
    }
    // 2단계: 부족한 금액이 있다면 가장 작은 화폐로 보완
    if (remaining > 0) {
      const reversedDenominations = [...denominations].reverse();
      
      for (const denom of reversedDenominations) {
        if (remaining <= 0) break;
        
        const availableCount = (wallet[denom] || 0) - (used[denom] || 0);
        const neededCount = Math.ceil(remaining / denom);
        const useCount = Math.min(neededCount, availableCount);
        
        if (useCount > 0) {
          used[denom] = (used[denom] || 0) + useCount;
          remaining = this._round(remaining - denom * useCount, currency.decimalPlaces);
        }
      }
    }

    const totalPaid = Object.entries(used).reduce((sum, [k, v]) => sum + parseFloat(k) * v, 0);
    const change = this._round(totalPaid - amount, currency.decimalPlaces);

    // 여전히 부족한 경우
    if (totalPaid < amount) {
      return { 
        error: `${PaymentStrategy.LARGE_BILLS} 전략으로 지불 불가 (${currency.currencySymbol}${this._round(amount - totalPaid, currency.decimalPlaces)} 부족)`,
        strategy: PaymentStrategy.LARGE_BILLS 
      };
    }

    return {
      strategy: PaymentStrategy.LARGE_BILLS,
      used: used,
      totalPaid: totalPaid,
      change: change
    };
  }

  _recommendPayment(amount, wallet, currency, strategy) {
    if (strategy === PaymentStrategy.MINIMIZE_CHANGE) {
      return this._findMinimumChangePayment(amount, wallet, currency);
    } else {
      return this._findLargeBillsPayment(amount, wallet, currency);
    }
  }

  _recommendChange(changeAmount, currency, strategy) {
    if (changeAmount <= 0) {
      return {
        strategy: strategy,
        change: {},
        totalAmount: 0
      };
    }

    const denominations = strategy === PaymentStrategy.LARGE_BILLS 
      ? currency.denominations 
      : [...currency.denominations].reverse();
      
    let remaining = this._round(changeAmount, currency.decimalPlaces);
    const change = {};

    for (const denom of denominations) {
      if (remaining <= 0) break;
      const count = Math.floor(remaining / denom);
      if (count > 0) {
        change[denom] = count;
        remaining = this._round(remaining - denom * count, currency.decimalPlaces);
      }
    }

    if (remaining > 0 && remaining < Math.pow(10, -currency.decimalPlaces)) {
      remaining = 0;
    }

    if (remaining > 0) {
      return { 
        error: `${strategy} 전략으로 거스름돈 계산 불가 (${currency.currencySymbol}${remaining} 오차)`,
        strategy: strategy 
      };
    }

    return {
      strategy: strategy,
      change: change,
      totalAmount: changeAmount
    };
  }

  processTransaction(countryCode, foodPrice, wallet) {
    if (!this.currencies[countryCode]) {
      return { error: "지원하지 않는 국가" };
    }

    const currency = this.currencies[countryCode];
    const roundedPrice = this._round(foodPrice, currency.decimalPlaces);
    const walletTotal = this._round(
      Object.entries(wallet).reduce((sum, [k, v]) => sum + parseFloat(k) * v, 0),
      currency.decimalPlaces
    );

    if (walletTotal < roundedPrice) {
      return {
        error: `지갑 잔액 부족: ${currency.currencySymbol}${walletTotal}으로는 ${currency.currencySymbol}${roundedPrice} 결제 불가`,
        currency: currency.currencySymbol,
        walletTotal: walletTotal,
        requiredAmount: roundedPrice
      };
    }

    const recommendations = { payment: {}, change: {} };

    // 각 전략별로 결제 방법 계산
    [PaymentStrategy.LARGE_BILLS, PaymentStrategy.MINIMIZE_CHANGE].forEach(strategy => {
      const pay = this._recommendPayment(roundedPrice, { ...wallet }, currency, strategy);
      recommendations.payment[strategy] = pay;

      // 거스름돈이 있는 경우에만 거스름돈 구성 계산
      if (!pay.error && pay.change > 0) {
        const change = this._recommendChange(pay.change, currency, strategy);
        recommendations.change[strategy] = change;
      }
    });

    return {
      currency: currency.currencySymbol,
      foodPrice: roundedPrice,
      walletTotal: walletTotal,
      recommendations: recommendations
    };
  }
}

const PaymentGuide = ({ isVisible, onClose, onSubmit, selectedMenus, total, guideResult }) => {
  // selectedMenus에서 실제 가격 합산 계산
  const calculatedTotal = useMemo(() => {
    if (!selectedMenus || selectedMenus.length === 0) return 0;
    
    return selectedMenus.reduce((sum, menu) => {
      // price_original에서 숫자만 추출
      const price = parseFloat(menu.price_original.replace(/[^0-9.]/g, '')) || 0;
      return sum + price;
    }, 0);
  }, [selectedMenus]);
  
  const totalUSD = total > 0 ? total : calculatedTotal;
  const totalKRW = Math.round(totalUSD * 1464);
  
  const paymentResult = useMemo(() => {
    const system = new IntegratedPaymentSystem();
    
    // 더미 지갑 데이터 
    const dummyWallet = {
      20.0: 0,   
      10.0: 1,   
      5.0: 3,    
      1.0: 3,    
      0.25: 0,   
      0.10: 0,   
      0.05: 0,   
      0.01: 5,   
    };
    
    // 실제 total 값이 있으면 사용하고, 없으면 더미값 사용
    const priceToUse = totalUSD > 0 ? totalUSD : 12.75;
    const result = system.processTransaction("US", priceToUse, dummyWallet);
    console.log('개선된 결제 계산 결과:', result);
    return result;
  }, [totalUSD]);

  const currencySymbol = paymentResult?.currency || '$';

  // 📌 api 호출
  // 지불 가이드 지출 등록
  const handleSubmit = async () => {
    const payload = {
      trip_id: todayTripId,
      total_price_original: totalUSD,
      total_price_krw: totalKRW,
      menus: selectedMenus,
    };

    try {
      const addExpense = await expenseApi.addAiExpense(payload);
      console.log('지불 가이드 지출 등록 결과:', addExpense);
      if (addExpense) {
        Alert.alert('선택한 메뉴 지출이 등록되었습니다.');
        onClose();
        onSubmit();
      }
    } catch (err) {
      console.error('지불 가이드 지출 등록 실패:', err);
      Alert.alert('선택한 메뉴 지출 등록에 실패했습니다.'); 
    }
  }

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="AI 지불 가이드"
    >
      <ScrollView style={{ maxHeight: 550 }}>
        <View style={styles.container}>
          {/* 메뉴 목록 */}
          {selectedMenus && selectedMenus.map((menu, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.menuText}>{menu.menu_original}</Text>
              <Text style={styles.priceText}>{menu.price_original}</Text>
            </View>
          ))}
        
          {/* 합계 */}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalUSD}>{currencySymbol}{totalUSD.toFixed(2)}</Text>
          </View>
          <View style={styles.krwRow}>
            <Text style={styles.krw}>KRW</Text>
            <Text style={styles.krwAmount}>{totalKRW.toLocaleString()}원</Text>
          </View>

          {/* 결제 방법 안내 */}
          {paymentResult && !paymentResult.error && (
            <View>
              <Text style={styles.algoTitle}>다음과 같이 지불하세요</Text>
             
              {/* 각 전략별 결제 방법 */}
              {Object.entries(paymentResult.recommendations.payment).map(([strategyName, paymentData], idx, arr) => {
                if (paymentData.error) {
                  return (
                    <View key={strategyName} style={[styles.paymentBox, styles.errorBox, { marginBottom: 20 }]}>
                      <Text style={styles.errorText}>{paymentData.error}</Text>
                    </View>
                  );
                }

                const isExactPayment = paymentData.change === 0;
                const isMinimalChange = strategyName === PaymentStrategy.MINIMIZE_CHANGE;

                return (
                  <React.Fragment key={strategyName}>
                    <View style={[styles.paymentBox, { marginBottom: 10 }]}>
                      {/* 사용할 화폐 */}
                      {Object.entries(paymentData.used).map(([denom, count]) => (
                        <View key={denom} style={styles.breakdownRow}>
                          <Text style={styles.breakdownText}>
                            {currencySymbol}{parseFloat(denom).toFixed(2)} × {count}개
                          </Text>
                          <Text style={styles.breakdownSubtotal}>
                            = {currencySymbol}{(parseFloat(denom) * count).toFixed(2)}
                          </Text>
                        </View>
                      ))}
                
                      {/* 총 지불 금액 */}
                      <View style={styles.totalPaymentRow}>
                        <Text style={styles.paid}>
                          총 지불: {currencySymbol}{paymentData.totalPaid.toFixed(2)}
                        </Text>
                        <View style={styles.changeRow}>
                        </View>
                      </View>

                      {/* 거스름돈 구성 */}
                      {paymentData.change > 0 && paymentResult.recommendations.change[strategyName] && !paymentResult.recommendations.change[strategyName].error && (
                        <View style={{ marginTop: 8 }}>
                          <Text style={styles.breakdownText}>거스름돈:</Text>
                          {Object.entries(paymentResult.recommendations.change[strategyName].change).map(([denom, count]) => (
                            <View key={denom} style={styles.breakdownRow}>
                              <Text style={styles.breakdownText}>
                                {currencySymbol}{parseFloat(denom).toFixed(2)} × {count}개
                              </Text>
                              <Text style={styles.breakdownSubtotal}>
                                = {currencySymbol}{(parseFloat(denom) * count).toFixed(2)}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                    
                    {/* 두 전략 사이에 "또는" 표시 */}
                    {idx === arr.length - 2 && (
                      <View style={{ alignItems: 'center', paddingVertical: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#888' }}>또는</Text>
                      </View>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          )}

          {/* 에러 처리 */}
          {paymentResult && paymentResult.error && (
            <View style={[styles.paymentBox, styles.errorBox]}>
              <Text style={styles.paymentTitle}>결제 불가</Text>
              <Text style={styles.errorText}>{paymentResult.error}</Text>
              {paymentResult.walletTotal && paymentResult.requiredAmount && (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.breakdownText}>
                    부족 금액: {currencySymbol}{(paymentResult.requiredAmount - paymentResult.walletTotal).toFixed(2)}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </CustomModal>
  );
};

export default PaymentGuide;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  priceText: {
    fontSize: 15,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  totalUSD: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  krwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  krw: {
    fontSize: 14,
    color: '#999',
  },
  krwAmount: {
    fontSize: 14,
    color: '#999',
  },
  paymentTitle: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
  },
  paymentBox: {
    backgroundColor: '#E6F1FF',
    borderRadius: 10,
    padding: 20,
    gap: 5,
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    paddingLeft: 10,
  },
  breakdownText: {
    fontSize: 15,
    fontWeight: '500',
  },
  breakdownSubtotal: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 15,
    color: '#d32f2f',
    fontWeight: '500',
  },
  totalPaymentRow: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 12,
    padding: 10,
    alignItems: 'center',
  },
  paid: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  changeLabel: {
    fontSize: 15,
    color: '#666',
  },
  changeValue: {
    fontSize: 15,
    color: '#333',
  },
  perfectChange: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  hasChange: {
    color: '#FF9800',
    fontWeight: '600',
  },
  algoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
});