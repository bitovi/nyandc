import QUnit from 'steal-qunit';
import { ViewModel } from './home-page';

// ViewModel unit tests
QUnit.module('nyandc/home-page');

QUnit.test('Has app', function(){
  var vm = new ViewModel();
  QUnit.ok(vm.app, 'useful for setting page title');
});
