import $ from 'jquery';
import Store from '@kanety/js-store';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  menu: 'a[href]',
  menuAttr: 'href',
  panelContainer: 'body',
  panel: '[name]',
  panelAttr: 'name',
  hidable: true,
  store: null,
  storeKey: null
};

export default class SimpleToggle {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$menuContainer = $(element);
    this.$panelContainer = $(this.options.panelContainer);

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
    this.$panelContainer.addClass(`${NAMESPACE}-panel`);

    this.paneles().each((i, elem) => {
      let $panel = $(elem);
      if (!$panel.hasClass('toggle-current')) {
        $panel.hide();
      }
    });

    this.unbind();
    this.bind();

    this.load();
  }

  bind() {
    this.$menuContainer.on(`click.${this.namespace}`, this.options.menu, (e) => {
      let $menu = $(e.currentTarget);
      let $panel = this.findPanel($menu.attr(this.options.menuAttr));
      if ($panel.length) {
        if ($menu.hasClass('toggle-current')) {
          if (this.options.hidable) {
            this.hide($menu, $panel);
          }
        } else {
          this.show($menu, $panel);
        }
      }
      e.preventDefault();
    });
  }

  unbind() {
    this.$menuContainer.off(`.${this.namespace}`);
  }

  menus() {
    return this.$menuContainer.find(this.options.menu);
  }

  paneles() {
    return this.$panelContainer.find(this.options.panel);
  }

  findMenu(name) {
    return this.menus().filter((i, menu) => {
      return $(menu).attr(this.options.menuAttr).replace(/^#/, '') == name.replace(/^#/, '');
    });
  }

  findPanel(name) {
    return this.paneles().filter((i, panel) => {
      return $(panel).attr(this.options.panelAttr).replace(/^#/, '') == name.replace(/^#/, '');
    });
  }

  currentMenu() {
    return this.menus().filter('.toggle-current');
  }

  currentPanel() {
    return this.paneles().filter('.toggle-current');
  }

  show($menu, $panel) {
    let $currentMenu = this.currentMenu();
    let $currentPanel = this.currentPanel();
    if ($currentMenu.length && $currentPanel.length) {
      this.hide($currentMenu, $currentPanel);
    }

    $menu.addClass('toggle-current');
    $panel.addClass('toggle-current').show();

    this.save();
    this.$menuContainer.trigger('panel:show', [$panel]);
  }

  hide($menu, $panel) {
    $menu.removeClass('toggle-current');
    $panel.removeClass('toggle-current').hide();

    this.save();
    this.$menuContainer.trigger('panel:hide', [$panel]);
  }

  load() {
    if (!this.store) return;

    let data = this.store.get();
    if (!data) return;

    let $menu = this.findMenu(data.name);
    let $panel = this.findPanel(data.name);
    if ($menu.length && $panel.length) {
      this.show($menu, $panel);
    }
  }

  save() {
    if (!this.store) return;

    let $current = this.currentPanel();
    if ($current.length) {
      let data = { name: $current.attr(this.options.panelAttr) };
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
