export function editorIconSizeDirective() {
  return {
    template: `
      <div class="gf-form inline">
        <label class="gf-form-label width-12">
          Icon size
          <tip>
            Icon size (% of panel height). If icon is too wide - it would scale to fit.
          </tip>
        </label>
        <div class="gf-form-select-wrapper width-6">
          <select
            class="gf-form-input"
            ng-model="iconSize"
            ng-options="fontSize for fontSize in fontSizes"
          />
        </div>
      </div>`,
    restrict: 'E',
    scope: {
      iconSize: '='
    },
    link(scope) {
      // TODO: move to argument
      scope.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%']
    }
  };
}
