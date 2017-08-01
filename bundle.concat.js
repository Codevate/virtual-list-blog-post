(function (angular) {
  angular.module('app', []);
})(angular);

(function (angular) {
  angular
    .module('app')
    .component('demoList', {
      controller: DemoListController,
      templateUrl: 'src/components/demo-list/demo-list.tpl.html',
    });

  function DemoListController() {
    const vm = this;

    vm.$onInit = () => {
      vm.items = createRandomItemList();
    };

    const createRandomItemList = () => {
      const itemFactories = {
        1: createSmallItem.bind(null),
        2: createLargeItem.bind(null),
      };

      return Array(1000).fill().map((_, id) => {
        const type = Math.floor((Math.random() * 2) + 1);
        return itemFactories[type](id);
      });
    };

    const createSmallItem = (id) => ({
      id: id,
      title: `Entry #${id}`,
      isLarge: false,
    });

    const createLargeItem = (id) => ({
      id: id,
      title: `Entry #${id}`,
      isLarge: true,
      project: Math.floor((Math.random() * 15000) + 1),
      postcode: 'B7 4BB',
      projectManager: 'Alex',
    });

  }
})(angular);


(function (angular) {
  angular
    .module('app')
    .directive('virtualListScroller', ['$log', '$window', function ($log, $window) {
      const OFFSET_COUNT = 10;
      let scrollerSizerElement = null;
      let scrollerOffsetElement = null;
      let scrollerElement = null;

      /**
       * Update the size of the scroller container so that it fills the available space.
       */
      const resizeScroller = () => {
        const container = angular.element('#js-scroller-container');
        const windowHeight = $window.innerHeight;
        const scrollerTopPosition = container.offset().top;
        const bodyPadding = 20;
        const headerHeight = 100;
        const scrollerHeight = (windowHeight - scrollerTopPosition - bodyPadding - headerHeight);

        container.height(scrollerHeight);
      };

      const resizeScrollerSizer = height => {
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
      const closestNumberIndex = (number, numbers) => {
        let current = numbers[0];
        let currentIndex = 0;
        let difference = Math.abs(number - current);

        for (let val = 0; val < numbers.length; val++) {
          const newDifference = Math.abs(number - numbers[val]);

          if (newDifference < difference) {
            difference = newDifference;
            current = numbers[val];
            currentIndex = val;
          }
        }

        return currentIndex;
      };

      const updateOffsetYPosition = position => {
        scrollerOffsetElement.css({ transform: `translateY(${position}px)` });
      };

      const handleScroll = (sizerHeight, renderedItems) => {
        const scrollPosition = scrollerElement.scrollTop();

        // If we are already at the bottom of the list then don't do anything else
        if (scrollPosition >= sizerHeight) {
          updateOffsetYPosition(sizerHeight);
          return;
        }

        // Find the closest row to our current scroll position
        const rowPositions = Object.keys(renderedItems);
        const closestRowIndex = closestNumberIndex(scrollPosition, rowPositions);

        // Find the rows that we need to render
        const start = (closestRowIndex - OFFSET_COUNT) >= 0 ? (closestRowIndex - OFFSET_COUNT) : 0;
        const end = (closestRowIndex + OFFSET_COUNT) <= rowPositions.length ? (closestRowIndex + OFFSET_COUNT) : rowPositions.length;
        const indexes = rowPositions.slice(start, end);

        // Hide the rows we don't need to render and show the ones that do need to be rendered
        rowPositions.forEach(position => {
          if (indexes.indexOf(position) === -1) {
            $(renderedItems[position]).hide();
          } else {
            $(renderedItems[position]).show();
          }
        });

        // Update the Y position once the offset amount above are shown
        const updatePosition = Math.max(0, closestRowIndex - OFFSET_COUNT) === 0 ? 0 : indexes[0];
        updateOffsetYPosition(updatePosition);
      };

      /**
       * Show all of the elements and move the scroll bar to the top
       *
       * @param renderedItems
       */
      const resetScroller = (renderedItems) => {

        if (scrollerElement) {
          scrollerElement.scrollTop(0);
        }

        Object
          .keys(renderedItems)
          .forEach(position => {
            $(renderedItems[position]).show();
          });

        scrollerElement.trigger('scroll');
      };

      return {
        restrict: 'A',
        transclude: true,
        scope: {
          sizerHeight: '<',
          renderedItems: '<',
        },
        templateUrl: 'src/components/virtual-list-scroller/virtual-list-scroller.tpl.html',
        link: function (scope) {
          scrollerElement = $('.scroller');
          scrollerSizerElement = $('.js-scroller-sizer');
          scrollerOffsetElement = $('.js-scroller-offset');

          // Resize when the directive is created
          // angular.element($window).on('resize', resizeScroller).trigger('resize');

          scope.$watch('sizerHeight', resizeScrollerSizer);
          scope.$watch('renderedItems', () => {
            if (scope.renderedItems) {
              resetScroller(scope.renderedItems);
            }
          });

          scrollerElement.on('scroll', () => handleScroll(scope.sizerHeight, scope.renderedItems));
        },
      };
    }]);
})(angular);


(function (angular) {
  angular
    .module('app')
    .component('virtualList', {
      controller: VirtualListController,
      templateUrl: 'src/components/virtual-list/virtual-list.tpl.html',
      bindings: {
        'items': '<',
      },
    });

  VirtualListController.$inject = ['$timeout'];

  function VirtualListController($timeout) {
    const vm = this;

    vm.$onInit = () => {
      $timeout(function () {
        const renderedItems = {};

        $('.js-list-row').each(function () {
          const row = $(this)[0];
          renderedItems[row.offsetTop] = row;
        });

        vm.renderedItems = renderedItems;
        vm.scrollerHeight = Object.keys(renderedItems).slice(-1)[0];
      });
    };
  }
})(angular);


//# sourceMappingURL=bundle.concat.js.map