import React from 'react';
import { className } from 'postcss-selector-parser';

const DesktopNavigation = (props) => {
    return (
        <div className="col l2 xl2 hide-on-med-and-down desktop-nav">
            <ul>
                <li>All classes</li>
                <li>Pre-birth</li>
                <li>Post-birth</li>
                <li>Health</li>
                <li>Sport</li>
                <li>Massage</li>

            </ul>
        </div>
    );
};

export default DesktopNavigation;