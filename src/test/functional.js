import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('nyandc functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('nyandc main page shows up', function() {
  F('title').text(/.+/, 'Title is set');
});
