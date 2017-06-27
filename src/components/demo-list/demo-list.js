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

