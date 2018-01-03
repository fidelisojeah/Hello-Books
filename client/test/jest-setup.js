import 'raf/polyfill';
import {
  configure,
  shallow,
  render,
  mount,
  spyLifecycle
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';


import localStorage from './__mock__/local-storage';
import toastrMock from './__mock__/toastr-mock';

global.localStorage = localStorage;
window.localStorage = localStorage;
// react enzyme adapter
configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.moxios = moxios;
global.configureMockStore = configureMockStore;
global.middleware = [thunk];
global.mockStore = configureMockStore(middleware);
global.toastrMock = toastrMock;
