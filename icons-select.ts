import coreModule from 'grafana/app/core/core_module';
import { ICONS_LIST } from './icons-list';


const htmlTemplateSelected = `  
<style>
  .icon-select {
    position: relative;
  }
  .icon-select .fa {
    position: absolute;
    top: 9px;
    left: 9px;
    font-size: 19px;
  }
  .icon-select input {
    padding-left: 30px;
  }
</style>
<div class='icon-select'>
  <i class="fa fa-clock-o"></i>
  <input 
    type="text" 
    class="gf-form-input ng-valid ng-empty ng-dirty ng-valid-parse ng-touched" 
    empty-to-null="" 
    ng-model="'fa-clock-o'" 
    ng-change="ctrl.render()" 
    ng-model-onblur=""
  />
</div>
`

const htmlTemplateSelect = `

<div class="gf-form">
  <div class="dropdown cascade-open">
    <a
      class="query-part-name pointer dropdown-toggle" 
      data-toggle="dropdown"
    >
        field
    </a>
    <span>(</span>
    <span class="query-part-parameters">
      <a class="graphite-func-param-link pointer" style="display: none;">de</a><input type="text" class="hide input-mini tight-form-func-param" data-provide="typeahead" style="width: 30.375px; display: inline-block;">
      <ul class="typeahead dropdown-menu" style="top: 21px; left: 31.5px; display: block;">
          <li data-value="level description" class=""><a href="#">level description</a></li>
          <li data-value="water_level" class="active"><a href="#">water_level</a></li>
      </ul>
    </span>
    <span>)</span>
  </div>

</div>
`;


coreModule
  .directive('iconSelect', function() {
    return {
      template: htmlTemplateSelected,
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        scope.options = ICONS_LIST;
        scope.myValue = "asd";
      }
    };
  });
