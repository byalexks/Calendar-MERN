import React from 'react'
import { Provider } from "react-redux";

import { AppRouter } from './components/routes/AppRouter'
import { store } from './components/store/store';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  )
}

