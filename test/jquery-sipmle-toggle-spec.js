describe('jquery-simple-toggle', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic use', () => {
    let $menuContainer, $panelContainer;
    let $menus, $paneles;

    beforeEach(() => {
      $menuContainer = $('#basic');
      $menus = $menuContainer.find('a');
      $panelContainer = $('#basic_panel');
      $paneles = $panelContainer.find('div');
    });

    it('shows panel', () => {
      $menus.eq(0).click();
      expect($menus.eq(0).hasClass('toggle-current')).toEqual(true);
      expect($paneles.eq(0).hasClass('toggle-current')).toEqual(true);
    });

    it('toggles panel', () => {
      $menus.eq(0).click();
      $menus.eq(1).click();
      expect($menus.eq(0).hasClass('toggle-current')).toEqual(false);
      expect($menus.eq(1).hasClass('toggle-current')).toEqual(true);
      expect($paneles.eq(0).hasClass('toggle-current')).toEqual(false);
      expect($paneles.eq(1).hasClass('toggle-current')).toEqual(true);
    });
  });

  describe('callbacks', () => {
    let $menuContainer, $panelContainer;
    let $menus, $paneles;
    let $message;

    beforeEach(() => {
      $menuContainer = $('#callbacks');
      $menus = $menuContainer.find('a');
      $panelContainer = $('#callbacks_panel');
      $paneles = $panelContainer.find('div');
      $message = $('#message');
    });

    it('runs callbacks', () => {
      $menus.eq(0).click();
      $menus.eq(1).click();
      expect($message.text()).toContain('show: panel1');
      expect($message.text()).toContain('hide: panel1');
      expect($message.text()).toContain('show: panel2');
    });
  });
});
