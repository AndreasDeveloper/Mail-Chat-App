// Importing JS Files
import {DOMElements} from './base';

// * -- Dropdown functionality -- * \\

// - FUNCTION | - Arrow Down Dropdown functionality - \\
(() => {
    // Toggler Helper Function
    const toggler = () => {
        if (DOMElements.arrowDownIcon.classList.contains('ion-ios-arrow-down')) {
            DOMElements.arrowDownIcon.classList.remove('icon', 'ion-ios-arrow-down');
            DOMElements.arrowDownIcon.classList.add('icon', 'ion-ios-arrow-forward');
        } else if (DOMElements.arrowDownIcon.classList.contains('ion-ios-arrow-forward')) {
            DOMElements.arrowDownIcon.classList.remove('icon', 'ion-ios-arrow-forward');
            DOMElements.arrowDownIcon.classList.add('icon', 'ion-ios-arrow-down');
        }
    };
    // Click Event Listener on Arrow Down Icon
    DOMElements.arrowDownIcon.addEventListener('click', () => {
        DOMElements.inboxDropdownContent.classList.toggle('dropdownOff');
        toggler();
    });
})();