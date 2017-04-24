import QUnit from 'steal-qunit';
import { ViewModel } from './product-page';

// ViewModel unit tests
QUnit.module('nyandc/product-page');

QUnit.test('Has app', function(){
  var vm = new ViewModel();
  QUnit.ok(vm.app, 'useful for setting page title');
});
