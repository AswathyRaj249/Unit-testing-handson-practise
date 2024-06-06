import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {

  let element;

  beforeEach(async () => {
    element = await fixture(html`<basic-details></basic-details>`);
  });

  it('should have a disabled Type input with correct values', () => {
    const typeInput = element.shadowRoot.querySelector('input[name="type"]');
    const validTypes = ['Home Loan', 'Personal Loan', 'Home Loan Loan', 'Vacation Loan'];
    expect(validTypes).to.include(typeInput.value);
    expect(typeInput.readOnly).to.be.true;
  });

  it('should check for min and max values for period', () => {
    const periodInput = element.shadowRoot.querySelector('input[name="Period"]');
    expect(periodInput.min).to.equal('1');
    expect(periodInput.max).to.equal('20');
  });

  it('should validate amount input correctly', async () => {
    const amountInput = element.shadowRoot.querySelector('input[name="amount"]');

    amountInput.value = '5000';
    amountInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(amountInput.validity.valid).to.be.false;

    amountInput.value = '1000000000'; // 10 crore
    amountInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(amountInput.validity.valid).to.be.false;

    amountInput.value = '500000'; // Valid amount
    amountInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(amountInput.validity.valid).to.be.true;
  });

  it('should show error if amount is not entered', async () => {
    const amountInput = element.shadowRoot.querySelector('input[name="amount"]');

    amountInput.value = '';
    amountInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(amountInput.validity.valueMissing).to.be.true;
  });

  it('should validate period input correctly', async () => {
    const periodInput = element.shadowRoot.querySelector('input[name="period"]');

    periodInput.value = '0';
    periodInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(periodInput.validity.rangeUnderflow).to.be.true;

    periodInput.value = '21';
    periodInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(periodInput.validity.rangeOverflow).to.be.true;

    periodInput.value = '10'; // Valid period
    periodInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(periodInput.validity.valid).to.be.true;
  });

  it('should navigate to previous page on Previous button click', async () => {
    const previousButton = element.shadowRoot.querySelector('.btn-previous');
    const routerStub = sinon.stub(Router, 'go');
    previousButton.click();

    // Assert that Router.go was called with '/'
    expect(routerStub).to.have.been.calledOnceWith('/');
    // Restore the original Router.go method
    routerStub.restore();
  });


});
