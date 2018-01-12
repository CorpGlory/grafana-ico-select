export function editorIconDirective() {
  return {
    template: `
      <div class="gf-form inline">
        <label class="gf-form-label width-12">
          Icon
          <tip>
            Fontawesome class name/Image URL/Data URL/HTML
          </tip>
        </label>
        <input
          type="text"
          class="gf-form-input width-12"
          data-placement="right"
          ng-model="icon"
        />
      </div>`,
    restrict: 'E',
    scope: {
      icon: '='
    }
  };
}
