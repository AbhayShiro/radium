"use strict";

const React = require('react');

const Enhancer = require('../lib/enhancer');
const createEsClass = require('../lib/test-helpers').createEsClass;

describe('Enhancer', () => {
  it('sets up initial state', () => {
    const Enhanced = Enhancer(React.Component);
    const instance = new Enhanced();

    expect(instance.state).to.deep.equal({_radiumStyleState: {}});
  });

  it('handles arrow functions', () => {
    const Composed = () => React.createElement('div');
    const Enhanced = Enhancer(Composed);
    const instance = new Enhanced();

    expect(instance.state).to.deep.equal({_radiumStyleState: {}});
  });

  it('handles real functions', () => {
    const Composed = function () { return React.createElement('div'); };
    const Enhanced = Enhancer(Composed);
    const instance = new Enhanced();

    expect(instance.state).to.deep.equal({_radiumStyleState: {}});
  });

  it('handles babel-ified ES classes', () => {
    const Composed = createEsClass();
    const Enhanced = Enhancer(Composed);
    const instance = new Enhanced();

    expect(instance.state).to.deep.equal({_radiumStyleState: {}});
  });

  // Regression test - `Radium wrapping not compatible with native classes?`
  // https://github.com/FormidableLabs/radium/issues/576
  it('handles native ES classes', () => {
    class Composed extends React.Component {
      render() {
        return React.createElement('div');
      }
    }
    const Enhanced = Enhancer(Composed);
    const instance = new Enhanced();

    expect(instance.state).to.deep.equal({_radiumStyleState: {}});
  });
});