import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/header/Header.js';

describe('loan-header', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-header></loan-header>`);
    await element.updateComplete;
  });

  it('should change classlist when EN button is clicked', async () => {
    const enButton = element.shadowRoot.getElementById('en-GB');
    const nlButton = element.shadowRoot.getElementById('nl-NL');

    // Initial class checks
    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(enButton.classList.contains('btn-cursor')).to.be.false;
    expect(nlButton.classList.contains('bg-btn-color')).to.be.false;
    expect(nlButton.classList.contains('btn-cursor')).to.be.true;

    // Click the EN button
    enButton.click();
    await element.updateComplete;

    // Class checks after clicking EN button
    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(enButton.classList.contains('btn-cursor')).to.be.false;
    expect(nlButton.classList.contains('bg-btn-color')).to.be.false;
    expect(nlButton.classList.contains('btn-cursor')).to.be.true;
  });

  it('should change class list when NL button is clicked', async () => {
    const enButton = element.shadowRoot.getElementById('en-GB');
    const nlButton = element.shadowRoot.getElementById('nl-NL');

    // Initial class checks
    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(enButton.classList.contains('btn-cursor')).to.be.false;
    expect(nlButton.classList.contains('bg-btn-color')).to.be.false;
    expect(nlButton.classList.contains('btn-cursor')).to.be.true;

    // Click the NL button
    nlButton.click();
    await element.updateComplete;

    // Class checks after clicking NL button
    expect(enButton.classList.contains('bg-btn-color')).to.be.false;
    expect(enButton.classList.contains('btn-cursor')).to.be.true;
    expect(nlButton.classList.contains('bg-btn-color')).to.be.true;
    expect(nlButton.classList.contains('btn-cursor')).to.be.false;
  });
});
