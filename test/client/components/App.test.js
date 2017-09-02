import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../../../client/src/App.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('<App />', () => {
  it('renders \'Hello World!\'', () => {
    const App = shallow(<App />);
    expect(App.find('h2').text()).toBe('Hello World!');
  });
});