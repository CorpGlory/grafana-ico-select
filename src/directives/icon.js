import { fit } from '../fit';

const iconTypes = {
  FontAwesome: 0,
  Image: 1,
  Text: 2
}

export function iconDirective() {
  return {
    template: `
      <div>
        <i/>
        <img>
        <span/>
      </div>`,
    replace: true,
    restrict: 'E',
    scope: {
      color: '=',
      size: '=',
      content: '=',
      width: '=',
      height: '=',
      visible: '='
    },
    link(scope, element) {
      scope.$container = element;
      scope.$iconFA = scope.$container.find('i');
      scope.$iconImage = scope.$container.find('img');
      scope.$iconText = scope.$container.find('span');

      scope.$watch('color', this.onColorChange.bind(this));
      scope.$watch('size', this.onSizeChange.bind(this));
      scope.$watch('content', this.onContentChange.bind(this));
      scope.$watch('width', this.onWidthChange.bind(this));
      scope.$watch('height', this.onHeightChange.bind(this));

      this._render(scope);
    },
    onSizeChange: function(newVal, oldVal, scope) {
      this._fit(scope);
    },
    onColorChange: function(newVal, oldVal, scope) {
      scope.$container.css('color', newVal);
    },
    onContentChange: function(newVal, oldVal, scope) {
      this._render(scope);
    },
    onWidthChange: function(newVal, oldVal, scope) {
      scope.$container.css('width', newVal+'px');
      this._fit(scope);
    },
    onHeightChange: function(newVal, oldVal, scope) {
      scope.height = newVal;
      scope.$container.css('height', scope.height + 'px');
      scope.$container.css('line-height', scope.height + 'px');
      this._fit(scope);
    },
    _render(scope) {
      this._updateType(scope);
      switch(scope._type) {
        case(iconTypes.FontAwesome): {
          scope.$content = scope.$iconFA;
          scope.$content.css('visibility', 'hidden');
          scope.$iconFA
            .removeClass()
            .addClass('fa')
            .addClass(scope.content);
          scope.$iconImage.hide();
          scope.$iconText.hide();
          scope.$iconFA.show();
          break;
        }
        case(iconTypes.Image): {
          scope.$content = scope.$iconImage;
          scope.$content.css('visibility', 'hidden');
          scope.$iconImage
            .attr('src', '')
            .attr('src', scope.content);
          scope.$iconText.hide();
          scope.$iconFA.hide();
          scope.$iconImage.show();
          break;
        }
        case(iconTypes.Text): {
          scope.$content = scope.$iconText;
          scope.$content.css('visibility', 'hidden');
          scope.$iconText.html(scope.content);
          scope.$iconImage.hide();
          scope.$iconFA.hide();
          scope.$iconText.show();
          break;
        }
      }

      this._waitForRenderAndFit(scope);
    },
    _waitForRenderAndFit(scope) {
      var containerWidth = scope.$container.width();
      var contentWidth = scope.$content.width();
      if(containerWidth === 0 || contentWidth === 0) {
        window.requestAnimationFrame(() => {
          this._waitForRenderAndFit(scope);
        });
      } else {
        this._fit(scope);
      }
    },
    _fit(scope) {
      fit(
        scope.size,
        scope.$container,
        scope.$content,
        scope.height,
        scope._type === iconTypes.Image
      );
      this._makeVisible(scope);
    },
    _makeVisible(scope) {
      if(scope.visible !== undefined && !scope.visible) {
        window.requestAnimationFrame(() => {
          this._makeVisible(scope);
        });
      } else {
        scope.$content.css('visibility', 'visible');
      }
    },
    _updateType(scope) {
      if(this._isFontAwesome(scope)) {
        scope._type = iconTypes.FontAwesome;
      } else if(this._isImage(scope)) {
        scope._type = iconTypes.Image;
      } else {
        scope._type = iconTypes.Text;
      }
    },
    _isImage(scope) {
      var isDataURL = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
      var isHttpURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

      return (scope.content.match(isDataURL) || scope.content.match(isHttpURL))? true: false;
    },
    _isFontAwesome(scope) {
      var isFontAwesome = /^fa-([\w-]+)$/;

      return scope.content.match(isFontAwesome) !== null;
    }
  };
}
