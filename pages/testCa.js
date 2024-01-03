import { expect } from "chai"

export class testCa{   //A class Name

  constructor(page){

    //Below are the Element locators of page
    this.page = page
    this.AnnualIncome_textbox = page.getByRole('textbox', { name: 'Your annual income (before tax)' })
    this.OtherIncome_textbox = page.getByRole('textbox', { name: 'Your annual other income (optional)' })
    this.MonthlyExpenses_textbox = page.getByRole('textbox', { name: 'Monthly living expenses' })
    this.LoanRepay_textbox = page.getByRole('textbox', { name: 'Other loan monthly repayments' })
    this.CreditLimit_textbox = page.getByRole('textbox', { name: 'Total credit card limits' })
    this.EstimateButton = page.getByRole('button', { name: 'Work out how much I could borrow' })
    this.expectedValue = '$482,000'
    this.selector = '#borrowResultTextAmount';  //id value has been passed as a CSS selector value
        
  }
  async goto()
  {
      await this.page.goto('https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/');
  }

    //Below are the action methods
    async ANZCalculator(Annual, Other, Monthly, Loan, Credit)
    {
        await this.AnnualIncome_textbox.fill(Annual)
        await this.OtherIncome_textbox.fill(Other)
        await this.MonthlyExpenses_textbox.fill(Monthly)
        await this.LoanRepay_textbox.fill(Loan)
        await this.CreditLimit_textbox.fill(Credit)
        await this.EstimateButton.click()

        await this.page.waitForTimeout(10000);
        
    }

    async actualValue(){
    return this.page.$eval(this.selector, (element) => element.textContent)
    await expect(page.getByText('$426,000')).toBeVisible();
    await page.screenshot({ path: 'screenshot.png' });
   

  }
  
  
}