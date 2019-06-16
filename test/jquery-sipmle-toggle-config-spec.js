describe('jquery-simple-toggle-config', () => {
  describe('default value', () => {
    it('gets and sets defaults', () => {
      let defaults = $.SimpleToggle.getDefaults();
      expect(defaults.store).toEqual(null);

      defaults = $.SimpleToggle.setDefaults({store: 'local'});
      expect(defaults.store).toEqual('local');
    });
  });
});
