import $ from 'jquery';
import Store from '@kanety/js-store';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  menuSelector: 'a[href]',
  menuAttr: 'href',
  boxContainer: '',
  boxSelector: '[name]',
  boxAttr: 'name',
  hideCurrentBox: true,
  store: null,
  storeKey: null
};

export default class SimpleToggle {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$menuContainer = $(element);
    this.$boxContainer = $(this.options.boxContainer);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    if (this.options.store && this.options.storeKey) {
      this.store = new Store({
        type: this.options.store,
        key: this.options.storeKey
      });
    }

    this.init();
  }

  init() {
    this.$menuContainer.addClass(`${NAMESPACE}-menu`);
    this.$boxContainer.addClass(`${NAMESPACE}-box`);

    this.boxes().each((i, elem) => {
      let $box = $(elem);
      if (!$box.hasClass('toggle-current')) {
        $box.hide();
      }
    });

    this.unbind();
    this.bind();

    this.load();
  }

  bind() {
    this.$menuContainer.on(`click.${this.namespace}`, this.options.menuSelector, (e) => {
      let $menu = $(e.currentTarget);
      let $box = this.findBox($menu.attr(this.options.menuAttr));
      if ($box.length) {
        if ($menu.hasClass('toggle-current')) {
          if (this.options.hideCurrentBox) {
            this.hide($menu, $box);
          }
        } else {
          this.show($menu, $box);
        }
      }
      e.preventDefault();
    });
  }

  unbind() {
    this.$menuContainer.off(`.${this.namespace}`);
  }

  menus() {
    return this.$menuContainer.find(this.options.menuSelector);
  }

  boxes() {
    return this.$boxContainer.find(this.options.boxSelector);
  }

  findMenu(name) {
    return this.menus().filter((i, menu) => {
      return $(menu).attr(this.options.menuAttr).replace(/^#/, '') == name.replace(/^#/, '');
    });
  }

  findBox(name) {
    return this.boxes().filter((i, box) => {
      return $(box).attr(this.options.boxAttr).replace(/^#/, '') == name.replace(/^#/, '');
    });
  }

  currentMenu() {
    return this.menus().filter('.toggle-current');
  }

  currentBox() {
    return this.boxes().filter('.toggle-current');
  }

  show($menu, $box) {
    let $currentMenu = this.currentMenu();
    let $currentBox = this.currentBox();
    if ($currentMenu.length && $currentBox.length) {
      this.hide($currentMenu, $currentBox);
    }

    $menu.addClass('toggle-current');
    $box.addClass('toggle-current').show();

    this.save();
    this.$menuContainer.trigger('toggle:show', [$box]);
  }

  hide($menu, $box) {
    $menu.removeClass('toggle-current');
    $box.removeClass('toggle-current').hide();

    this.save();
    this.$menuContainer.trigger('toggle:hide', [$box]);
  }

  load() {
    if (!this.store) return;

    let data = this.store.get();
    if (!data) return;

    let $menu = this.findMenu(data.name);
    let $box = this.findBox(data.name);
    if ($menu.length && $box.length) {
      this.show($menu, $box);
    }
  }

  save() {
    if (!this.store) return;

    let $current = this.currentBox();
    if ($current.length) {
      let data = { name: $current.attr(this.options.boxAttr) };
      this.store.set(data);
    } else {
      this.store.remove();
    }
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(DEFAULTS, options);
  }
}
