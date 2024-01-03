import {test,expect} from '@playwright/test';
import homeLoanCalculatorPage from '../pages/homeLoanCalculatorPage';
import * as calculatorData from  '../testData/calculatorData';

test('Calculator', async ({ page }) => {

    const homeLoanPage = new homeLoanCalculatorPage(page);
    const actualAmount = await homeLoanPage.calculateLoan(calculatorData.annualIncome,calculatorData.otherIncome,calculatorData.livingExpenses,
        calculatorData.otherLoan,calculatorData.creditLimit)
    expect(actualAmount).toEqual(calculatorData.expectedAmount);

});
