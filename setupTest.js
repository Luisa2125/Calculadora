import 'jest-enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
console.log(localStorageMock)
global.localStorage = localStorageMock