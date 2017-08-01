'use strict';

(function (angular) {
  angular.module('app', []);
})(angular);

(function (angular) {
  angular.module('app').component('demoList', {
    controller: DemoListController,
    templateUrl: 'src/components/demo-list/demo-list.tpl.html'
  });

  function DemoListController() {
    var vm = this;

    vm.$onInit = function () {
      vm.items = createRandomItemList();
    };

    var createRandomItemList = function createRandomItemList() {
      var itemFactories = {
        1: createSmallItem.bind(null),
        2: createLargeItem.bind(null)
      };

      return Array(1000).fill().map(function (_, id) {
        var type = Math.floor(Math.random() * 2 + 1);
        return itemFactories[type](id);
      });
    };

    var createSmallItem = function createSmallItem(id) {
      return {
        id: id,
        title: 'Entry #' + id,
        isLarge: false
      };
    };

    var createLargeItem = function createLargeItem(id) {
      return {
        id: id,
        title: 'Entry #' + id,
        isLarge: true,
        project: Math.floor(Math.random() * 15000 + 1),
        postcode: 'B7 4BB',
        projectManager: 'Alex'
      };
    };
  }
})(angular);

(function (angular) {
  angular.module('app').directive('virtualListScroller', ['$log', '$window', function ($log, $window) {
    var OFFSET_COUNT = 10;
    var scrollerSizerElement = null;
    var scrollerOffsetElement = null;
    var scrollerElement = null;

    /**
     * Update the size of the scroller container so that it fills the available space.
     */
    var resizeScroller = function resizeScroller() {
      var container = angular.element('#js-scroller-container');
      var windowHeight = $window.innerHeight;
      var scrollerTopPosition = container.offset().top;
      var bodyPadding = 20;
      var headerHeight = 100;
      var scrollerHeight = windowHeight - scrollerTopPosition - bodyPadding - headerHeight;

      container.height(scrollerHeight);
    };

    var resizeScrollerSizer = function resizeScrollerSizer(height) {
      if (scrollerSizerElement === null) {
        return;
      }

      scrollerSizerElement.height(height);
    };

    /**
     * Find the closest number in an array of numbers compared to the number provided
     *
     * @param number
     * @param numbers
     * @return {number}
     */
    var closestNumberIndex = function closestNumberIndex(number, numbers) {
      var current = numbers[0];
      var currentIndex = 0;
      var difference = Math.abs(number - current);

      for (var val = 0; val < numbers.length; val++) {
        var newDifference = Math.abs(number - numbers[val]);

        if (newDifference < difference) {
          difference = newDifference;
          current = numbers[val];
          currentIndex = val;
        }
      }

      return currentIndex;
    };

    var updateOffsetYPosition = function updateOffsetYPosition(position) {
      scrollerOffsetElement.css({ transform: 'translateY(' + position + 'px)' });
    };

    var handleScroll = function handleScroll(sizerHeight, renderedItems) {
      var scrollPosition = scrollerElement.scrollTop();

      // If we are already at the bottom of the list then don't do anything else
      if (scrollPosition >= sizerHeight) {
        updateOffsetYPosition(sizerHeight);
        return;
      }

      // Find the closest row to our current scroll position
      var rowPositions = Object.keys(renderedItems);
      var closestRowIndex = closestNumberIndex(scrollPosition, rowPositions);

      // Find the rows that we need to render
      var start = closestRowIndex - OFFSET_COUNT >= 0 ? closestRowIndex - OFFSET_COUNT : 0;
      var end = closestRowIndex + OFFSET_COUNT <= rowPositions.length ? closestRowIndex + OFFSET_COUNT : rowPositions.length;
      var indexes = rowPositions.slice(start, end);

      // Hide the rows we don't need to render and show the ones that do need to be rendered
      rowPositions.forEach(function (position) {
        if (indexes.indexOf(position) === -1) {
          $(renderedItems[position]).hide();
        } else {
          $(renderedItems[position]).show();
        }
      });

      // Update the Y position once the offset amount above are shown
      var updatePosition = Math.max(0, closestRowIndex - OFFSET_COUNT) === 0 ? 0 : indexes[0];
      updateOffsetYPosition(updatePosition);
    };

    /**
     * Show all of the elements and move the scroll bar to the top
     *
     * @param renderedItems
     */
    var resetScroller = function resetScroller(renderedItems) {

      if (scrollerElement) {
        scrollerElement.scrollTop(0);
      }

      Object.keys(renderedItems).forEach(function (position) {
        $(renderedItems[position]).show();
      });

      scrollerElement.trigger('scroll');
    };

    return {
      restrict: 'A',
      transclude: true,
      scope: {
        sizerHeight: '<',
        renderedItems: '<'
      },
      templateUrl: 'src/components/virtual-list-scroller/virtual-list-scroller.tpl.html',
      link: function link(scope) {
        scrollerElement = $('.scroller');
        scrollerSizerElement = $('.js-scroller-sizer');
        scrollerOffsetElement = $('.js-scroller-offset');

        // Resize when the directive is created
        // angular.element($window).on('resize', resizeScroller).trigger('resize');

        scope.$watch('sizerHeight', resizeScrollerSizer);
        scope.$watch('renderedItems', function () {
          if (scope.renderedItems) {
            resetScroller(scope.renderedItems);
          }
        });

        scrollerElement.on('scroll', function () {
          return handleScroll(scope.sizerHeight, scope.renderedItems);
        });
      }
    };
  }]);
})(angular);

(function (angular) {
  angular.module('app').component('virtualList', {
    controller: VirtualListController,
    templateUrl: 'src/components/virtual-list/virtual-list.tpl.html',
    bindings: {
      'items': '<'
    }
  });

  VirtualListController.$inject = ['$timeout'];

  function VirtualListController($timeout) {
    var vm = this;

    vm.$onInit = function () {
      $timeout(function () {
        var renderedItems = {};

        $('.js-list-row').each(function () {
          var row = $(this)[0];
          renderedItems[row.offsetTop] = row;
        });

        vm.renderedItems = renderedItems;
        vm.scrollerHeight = Object.keys(renderedItems).slice(-1)[0];
      });
    };
  }
})(angular);

//# sourceMappingURL=bundle.concat.js.map
//# sourceMappingURL=bundle.transpiled.js.map
