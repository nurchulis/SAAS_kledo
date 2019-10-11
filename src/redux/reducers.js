import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import rooms from './rooms/reducers'
import channels from './channels/reducers'
import guests from './guests/reducers'
import refs from './refs/reducers'
import inits from './inits/reducers'
import bookingStatuses from './bookingStatuses/reducers'
import extras from './extras/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    rooms,
    channels,
    guests,
    refs,
    inits,
    bookingStatuses,
    extras
  })
