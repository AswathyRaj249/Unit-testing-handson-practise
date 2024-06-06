import { html, fixture, expect } from '@open-wc/testing';
import '../src/LoanEMIDetails/LoanEMIDetails.js';

describe('Loan EMI details', () => {
  // Write test cases inside this block
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loanemi-details></loanemi-details>`);
  });

  it('should display EMI details', () => {
    const interestRateSpan = element.shadowRoot.querySelector('.emi-details span:nth-of-type(1)');
    const monthlyEMISpan = element.shadowRoot.querySelector('.emi-details span:nth-of-type(2)');
    const principalSpan = element.shadowRoot.querySelector('.emi-details span:nth-of-type(3)');
    const interestSpan = element.shadowRoot.querySelector('.emi-details span:nth-of-type(4)');
    const totalAmountSpan = element.shadowRoot.querySelector('.emi-details span:nth-of-type(5)');

    expect(interestRateSpan.textContent.trim()).to.not.be.empty;
    expect(monthlyEMISpan.textContent.trim()).to.not.be.empty;
    expect(principalSpan.textContent.trim()).to.not.be.empty;
    expect(interestSpan.textContent.trim()).to.not.be.empty;
    expect(totalAmountSpan.textContent.trim()).to.not.be.empty;
  });

  it('should navigate to basic details on Cancel button click', async () => {
    const cancelButton = element.shadowRoot.querySelector('.cancel-btn');

    let navigated = false;
    element.addEventListener('navigate-basic-details', () => {
      navigated = true;
    });

    cancelButton.click();
    await element.updateComplete;

    expect(navigated).to.be.true;
  });

  it('should navigate to customer details on Continue button click', async () => {
    const continueButton = element.shadowRoot.querySelector('.continue-btn');

    let navigated = false;
    element.addEventListener('navigate-customer-details', () => {
      navigated = true;
    });

    continueButton.click();
    await element.updateComplete;

    expect(navigated).to.be.true;
  });

});
