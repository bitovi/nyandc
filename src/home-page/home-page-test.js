import QUnit from 'steal-qunit';
import { ViewModel } from './home-page';

// ViewModel unit tests
QUnit.module('nyandc/home-page');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the home-page component');
});
