import { render, screen, act } from '@testing-library/react';
import Home from './Home';
import {Provider} from 'react-redux';
import store from '../../store';
import { HashRouter } from 'react-router-dom';

const Wrapper = ({children}) => <HashRouter><Provider store={store}>{children}</Provider></HashRouter>;

describe('home component should work', () => {
    it('should show the correct shops', async () => {
        render(<Home />, {
            wrapper: Wrapper
        });
    })
})