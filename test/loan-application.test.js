import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-applicationt></loan-application>`);
  });

  it('should navigate to details page when navigateToDetails is called', async () => {
    const routerGoStub = sinon.stub(Router, 'go');

    expect(routerGoStub.calledOnceWith('/details')).to.be.true;

    routerGoStub.restore();
  });
});
