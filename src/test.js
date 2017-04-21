import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'nyandc/models/test';

import 'nyandc/home-page/home-page-test';

F.attach(QUnit);

QUnit.module('nyandc functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('nyandc main page shows up', function() {
  F('title').text('nyandc', 'Title is set');
});
