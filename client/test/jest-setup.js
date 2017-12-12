import 'raf/polyfill';
import {
  configure,
  shallow,
  render,
  mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import localStorage from './__mock__/local-storage';

window.localStorage = localStorage;
// react enzyme adapter
configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
