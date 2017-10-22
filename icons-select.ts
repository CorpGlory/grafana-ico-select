import coreModule from 'grafana/app/core/core_module';
import { ICONS_LIST } from './icons-list';

const htmlTemplate = `
<select
  class="gf-form-input"
  ng-model="myValue"
  ng-options="n for n in options"
/>
`;


coreModule
  .directive('iconSelect', function() {
    return {
      template: htmlTemplate,
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        scope.options = ICONS_LIST;
        scope.myValue = "asd";
      }
    };
  });



