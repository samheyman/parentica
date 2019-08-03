import React from 'react';
import { className } from 'postcss-selector-parser';

const DesktopNavigation = (props) => {
    return (
        <div className="col l3 hide-on-med-and-down desktop-nav border-debug">
            <ul>
                <li>one</li>
                <li>two</li>
            </ul>
        </div>
    );
};

export default DesktopNavigation;