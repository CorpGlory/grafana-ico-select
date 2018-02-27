import coreModule from 'grafana/app/core/core_module';
import { ICONS_LIST } from './icons-list';


const styles = `
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

.icon-select .dropdown-menu>li>a  {
  line-height: 2.4;
}

.icon-select .dropdown-menu>li>a .fa {
  position: relative;
  top: 3px;
  left: 0px;
}

.icon-select .dropdown-menu>li>a:hover .fa {
  color: black;
}

.icon-select .dropdown-menu {
  max-height: 177px;
}
</style>
`

const htmlTemplateSelected = styles + `
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

const htmlTemplateSelect = styles + `
<div class='icon-select'>
  <input
    type="text"
    class="gf-form-input ng-valid ng-empty ng-dirty ng-valid-parse ng-touched"
    empty-to-null=""
    ng-model=""
    placeholder="icon name"
    ng-change="ctrl.render()"
  />
  <span class="query-part-parameters">
    <ul class="typeahead dropdown-menu" style="top: 35px; left: 0px; display: block; width: 194px">
      <li ng-repeat="icon in options">
        <a href="#">
          <i class="fa {{ icon }}"></i>
          {{ icon }}
        </a>
      </li>
    </ul>
  </span>
</div>
`;

const htmlTemplateFiltered = styles + `
<div class='icon-select'>
  <input
    type="text"
    class="gf-form-input ng-valid ng-empty ng-dirty ng-valid-parse ng-touched"
    empty-to-null=""
    ng-model="filter"
    placeholder="icon name"
    ng-change="ctrl.render()"
  />
  <span class="query-part-parameters">
    <ul class="typeahead dropdown-menu" style="top: 35px; left: 0px; display: block; width: 194px">
      <li ng-repeat="icon in filteredOptions">
        <a href="#">
          <i class="fa {{ icon.name }}"></i>
          {{ icon.prefix }}<strong>{{ filter }}</strong>{{ icon.sufix }}
        </a>
      </li>
    </ul>
  </span>
</div>
`;


coreModule
  .directive('iconSelect', function() {
    return {
      template: htmlTemplateFiltered,
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        scope.options = ICONS_LIST;
        scope.myValue = "asd";
        scope.filter = "des";

        function getFilteredOptions() {
          var res: any[] = [];
          for(var i = 0; i < ICONS_LIST.length; i++) {
            var index = ICONS_LIST[i].indexOf(scope.filter);
            if(index < 0) {
              continue;
            }
            res.push({
              name: ICONS_LIST[i],
              prefix: ICONS_LIST[i].substr(0, index),
              suffix: ICONS_LIST[i].substr(index + 1 + scope.filter.length)
            });
          }
          return res;
        }

        scope.filteredOptions = getFilteredOptions();

      }
    };
  });
