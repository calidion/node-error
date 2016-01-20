import assert from 'assert';
import Generator from '../lib/generator';
import Errorable from '../lib/errorable';
import errorable from '../lib';

var json = {
  I: {
    Love: {
      You: {
        messages: {
          'zh-CN': '我爱你！',
          'en-US': 'I Love U!'
        },
        code: 1
      }
    }
  },
  Me: {
    alias: 'I'
  },
  Hello: {
    code: 100,
    messages: {
    }
  }
};

describe('Generator', function() {
  it('Should generate errors', function() {
    var generator = new Generator(json, 'zh-CN');
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.ILoveYou !== undefined);
    assert.equal(true, generator.errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, generator.errors.ILoveYou.message === '我爱你！');
    generator.save('./lib/data/errors.json');
    generator = new Generator(json, 'en-US');
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.ILoveYou !== undefined);
    assert.equal(true, generator.errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, generator.errors.ILoveYou.message === 'I Love U!');

    var error = {
      History: {
        Not: {
          Found: {
            'en-US': 'Price History Not Found!',
            'zh-CN': '价格历史未找到！'
          }
        }
      }
    };
    var errorThrown = false;
    try {
      var g = new Generator(error, 'zh-CN');
    } catch (e) {
      errorThrown = true;
    }
    assert.equal(true, g === undefined);
    assert.equal(true, errorThrown);
  });
});

describe('Index', function() {
  it('Should generate errors', function() {
    assert.equal(true, errorable.Errorable === Errorable);
    assert.equal(true, errorable.Generator === Generator);
  });
});
