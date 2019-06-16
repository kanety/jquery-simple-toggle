import $ from 'jquery';

import SimpleToggle from './simple-toggle';
import { NAMESPACE } from './consts';

$.fn.simpleToggle = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      $elem.data(NAMESPACE, new SimpleToggle($elem, options));
    }
  });
};

$.SimpleToggle = SimpleToggle;
