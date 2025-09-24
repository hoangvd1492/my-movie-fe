'use client'
import { Provider } from 'react-redux';
import { store } from '../_lib/redux/store';

export const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}