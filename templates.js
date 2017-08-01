angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/demo-list/demo-list.tpl.html',
    "<virtual-list items=\"$ctrl.items\"></virtual-list>"
  );


  $templateCache.put('src/components/virtual-list-scroller/virtual-list-scroller.tpl.html',
    "<div id=\"scroller__container\"><div class=\"scroller\"><div class=\"js-scroller-sizer scroller__sizer\"></div><ul class=\"js-scroller-offset scroller__offset\" ng-transclude></ul></div></div>"
  );


  $templateCache.put('src/components/virtual-list/virtual-list.tpl.html',
    "<div class=\"container\"><div virtual-list-scroller sizer-height=\"$ctrl.scrollerHeight\" rendered-items=\"$ctrl.renderedItems\"><li ng-repeat=\"item in $ctrl.items track by item.id\" class=\"js-list-row scroller__item\">{{ ::item.title }}<div ng-if=\"item.isLarge\"><p>{{ ::item.project }}</p><p>{{ ::item.postcode }}</p><p>{{ ::item.projectManager }}</p></div></li></div></div>"
  );

}]);
