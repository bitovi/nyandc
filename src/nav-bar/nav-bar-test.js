import QUnit from 'steal-qunit';
import { ViewModel } from './nav-bar';

// ViewModel unit tests
QUnit.module('nyandc/nav-bar');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the nav-bar component');
});
