describe('jquery-simple-toggle', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic use', () => {
    let $menuContainer, $boxContainer;
    let $menus, $boxes;

    beforeEach(() => {
      $menuContainer = $('#basic');
      $menus = $menuContainer.find('a');
      $boxContainer = $('#basic_box');
      $boxes = $boxContainer.find('div');
    });

    it('shows box', () => {
      $menus.eq(0).click();
      expect($menus.eq(0).hasClass('toggle-current')).toEqual(true);
      expect($boxes.eq(0).hasClass('toggle-current')).toEqual(true);
    });

    it('toggles box', () => {
      $menus.eq(0).click();
      $menus.eq(1).click();
      expect($menus.eq(0).hasClass('toggle-current')).toEqual(false);
      expect($menus.eq(1).hasClass('toggle-current')).toEqual(true);
      expect($boxes.eq(0).hasClass('toggle-current')).toEqual(false);
      expect($boxes.eq(1).hasClass('toggle-current')).toEqual(true);
    });
  });

  describe('callbacks', () => {
    let $menuContainer, $boxContainer;
    let $menus, $boxes;
    let $message;

    beforeEach(() => {
      $menuContainer = $('#callbacks');
      $menus = $menuContainer.find('a');
      $boxContainer = $('#callbacks_box');
      $boxes = $boxContainer.find('div');
      $message = $('#message');
    });

    it('runs callbacks', () => {
      $menus.eq(0).click();
      $menus.eq(1).click();
      expect($message.text()).toContain('show: box1');
      expect($message.text()).toContain('hide: box1');
      expect($message.text()).toContain('show: box2');
    });
  });
});
