import React from 'react'
import HomeMenu from './HomeMenu'
import ProfileMenu from './ProfileMenu'
import LanguageSelector from './LanguageSelector'

import './style.scss'

class CustomTopBar extends React.Component {
  render() {
    return (
      <div className="topbar" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div className="mr-4">
          <LanguageSelector />
        </div>
        <div className="mr-4">
          <HomeMenu />
        </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default CustomTopBar
