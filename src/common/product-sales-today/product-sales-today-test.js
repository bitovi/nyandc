import QUnit from 'steal-qunit';
import { ViewModel } from './product-sales-today';

// ViewModel unit tests
QUnit.module('nyandc/common/product-sales-today');

QUnit.test('Has product', function(){
  var vm = new ViewModel();
  QUnit.ok(vm.product);
});
