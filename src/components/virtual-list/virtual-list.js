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

