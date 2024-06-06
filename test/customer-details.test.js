import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import sinon from 'sinon';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<customer-details></customer-details>`);
  });


  it('test for input value changes', async () => {
    const firstName = element.shadowRoot.querySelector('input[name="first_name"]');
    const lastName = element.shadowRoot.querySelector('input[name="last_name"]');
    const dob = element.shadowRoot.querySelector('input[name="dateof_birth"]');
    const email = element.shadowRoot.querySelector('input[name="email"]');
    const mobileNumber = element.shadowRoot.querySelector('input[name="mobile_number"]');
    const monthlySalary = element.shadowRoot.querySelector('input[name="monthly_salary"]');
    const previousEMI = element.shadowRoot.querySelector('input[name="EMIs_amount"]');
    const agreeCheckbox = element.shadowRoot.querySelector('input[name="terms"]');

    firstName.value = 'John';
    lastName.value = 'Doe';
    dob.value = '2000-01-01';
    email.value = 'john.doe@example.com';
    mobileNumber.value = '9234567890';
    monthlySalary.value = '5000';
    previousEMI.value = '200';
    agreeCheckbox.checked = true;

    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    dob.dispatchEvent(new Event('input'));
    email.dispatchEvent(new Event('input'));
    mobileNumber.dispatchEvent(new Event('input'));
    monthlySalary.dispatchEvent(new Event('input'));
    previousEMI.dispatchEvent(new Event('input'));
    agreeCheckbox.dispatchEvent(new Event('change'));

    await element.updateComplete;

    expect(firstName.value).to.equal('John');
    expect(lastName.value).to.equal('Doe');
    expect(dob.value).to.equal('2000-01-01');
    expect(email.value).to.equal('john.doe@example.com');
    expect(mobileNumber.value).to.equal('1234567890');
    expect(monthlySalary.value).to.equal('5000');
    expect(previousEMI.value).to.equal('200');
    expect(agreeCheckbox.checked).to.be.true;
  });

  it('should not submit form if "I agree" is not checked', async () => {

    const agreeCheckbox = element.shadowRoot.querySelector('input[name="terms"]');
    let submitted = false;
    element.addEventListener('form-submit', () => {
      submitted = true;
    });

    agreeCheckbox.checked = false;
    agreeCheckbox.dispatchEvent(new Event('change'));
    form.dispatchEvent(new Event('submit'));

    await element.updateComplete;

    expect(submitted).to.be.false;
  });

  it('should submit form if all fields are valid and "I agree" is checked', async () => {
    const firstName = element.shadowRoot.querySelector('input[name="first_name"]');
    const lastName = element.shadowRoot.querySelector('input[name="last_name"]');
    const dob = element.shadowRoot.querySelector('input[name="dateof_birth"]');
    const email = element.shadowRoot.querySelector('input[name="email"]');
    const mobileNumber = element.shadowRoot.querySelector('input[name="mobile_number"]');
    const monthlySalary = element.shadowRoot.querySelector('input[name="monthly_salary"]');
    const previousEMI = element.shadowRoot.querySelector('input[name="EMIs_amount"]');
    const agreeCheckbox = element.shadowRoot.querySelector('input[name="terms"]');

    firstName.value = 'John';
    lastName.value = 'Doe';
    dob.value = '2000-01-01';
    email.value = 'john.doe@example.com';
    mobileNumber.value = '9234567890';
    monthlySalary.value = '5000';
    previousEMI.value = '200';
    agreeCheckbox.checked = true;

    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    dob.dispatchEvent(new Event('input'));
    email.dispatchEvent(new Event('input'));
    mobileNumber.dispatchEvent(new Event('input'));
    monthlySalary.dispatchEvent(new Event('input'));
    previousEMI.dispatchEvent(new Event('input'));
    agreeCheckbox.dispatchEvent(new Event('change'));

    await element.updateComplete;

    // Create a spy for the fetch function
    const fetchStub = sinon.stub(window, 'fetch').resolves(new Response(null, { status: 200 }));

    const nextButton = element.shadowRoot.querySelector('.nextbg-btn-color');
    nextButton.click();
    expect(fetchStub).to.have.been.calledOnce;

    // Restore the original fetch function
    fetchStub.restore();
  });

});
