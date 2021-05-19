import React from 'react'
import { Provider } from "react-redux";

import { AppRouter } from '../src/components/routes/AppRouter'
import { store } from '../src/store/store';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  )
}

