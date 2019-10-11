import React from 'react';
import {Input, Icon} from "antd";

import './style.css';

class SearchWidget extends React.Component {
    render() {
        return (
          <div className="search-widget">
            <Input addonBefore={<Icon type="search" />} placeholder="search" />
          </div>
        );
    }
};

export default SearchWidget;
