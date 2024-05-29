class homeLoanCalculatorPage{
    constructor(page){
        this.page = page;
        this.url='https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/';
    }

    async calculateLoan(annualIncome,otherIncome,livingExpenses,otherLoan,creditLimit){
        await this.page.goto(this.url)
        await this.page.fill('input[aria-describedby="q2q1i1 q2q1i2"]',annualIncome);
        await this.page.fill('input[aria-describedby="q2q2i1 q2q2i2"]',otherIncome);
        await this.page.fill('input[aria-describedby="q3q1i1 q3q1i2"]',livingExpenses);
        await this.page.fill('input[aria-describedby="q3q3i1 q3q3i2"]',otherLoan);
        await this.page.fill('input[aria-describedby="q3q5i1"]',creditLimit);
        await this.page.click('button#btnBorrowCalculater');
        await new Promise(resolve => setTimeout(resolve,2000));
        return await this.page.textContent('span#borrowResultTextAmount');
       
    }
     
}
export default homeLoanCalculatorPage;
