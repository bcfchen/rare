/* service to indicate whether we've landed
   on address/payment form from the "change" button
   on the confirmation page.
*/

(function() {
    'use strict';
    angular.module('rare').value('fromConfirmation', {
    	FROM_CONFIRMATION: false
    });
})();