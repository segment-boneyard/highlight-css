
var assert = require('assert');
var Highlight = require('highlight');
var css = require('highlight-css');

var h;

describe('highlight-css', function(){
  beforeEach(function(){
    h = Highlight().use(css);
  });

  it('should expose a plugin function', function(){
    assert.equal('function', typeof css);
  });

  it('should match comments', function(){
    test(
      'a /* comment \n across lines */',
      'a <span class="Highlight-comment">/* comment \n across lines */</span>'
    );
  });

  it('should match at-rules', function(){
    test(
      '@at-rule',
      '<span class="Highlight-at-rule">@at-rule</span>'
    );
  });

  it('should match functions', function(){
    test(
      'do()',
      '<span class="Highlight-function">do' +
      '<span class="Highlight-punctuation">(</span>' +
      '</span>' +
      '<span class="Highlight-punctuation">)</span>'
    );
  });

  it('should match keywords', function(){
    test('!important', '<span class="Highlight-keyword">!important</span>');
    test('inherit', '<span class="Highlight-keyword">inherit</span>');
  });

  it('should match numbers', function(){
    test('42', '<span class="Highlight-number">42</span>');
    test('#00f', '<span class="Highlight-number">#00f</span>');
    test('8.3', '<span class="Highlight-number">8.3</span>');
    test('-8', '<span class="Highlight-operator">-</span><span class="Highlight-number">8</span>');
  });

  it('should match operators', function(){
    test('+', '<span class="Highlight-operator">+</span>');
    test('*', '<span class="Highlight-operator">*</span>');
  });

  it('should match properties', function(){

  });

  it('should match strings', function(){
    test('"string"', '<span class="Highlight-string">&quot;string&quot;</span>');
    test('\'string\'', '<span class="Highlight-string">&#39;string&#39;</span>');
  });
  it('should match punctuation', function(){
    test(',', '<span class="Highlight-punctuation">,</span>');
    test('{', '<span class="Highlight-punctuation">{</span>');
  });

  it('should match a complex example', function(){
    var css = 'div#id.class::pseudo {\n'
      + 'float: left;\n'
      + 'width: 50%;\n'
      + 'font-size: 28em !important;\n'
      + '}\n'
      + '\n'
      + 'body {\n'
      + 'border: none;\n'
      + '}';

    test(css, ''
      + '<span class="Highlight-selector">div'
      + '<span class="Highlight-id">#id</span>'
      + '<span class="Highlight-class">.class</span>'
      + '<span class="Highlight-pseudo-element">::pseudo</span>'
      + ' '
      + '<span class="Highlight-punctuation">{</span>'
      + '</span>'
      + '\n'
      + '<span class="Highlight-property">float</span>'
      + '<span class="Highlight-punctuation">:</span>'
      + ' left'
      + '<span class="Highlight-punctuation">;</span>'
      + '\n'
      + '<span class="Highlight-property">width</span>'
      + '<span class="Highlight-punctuation">:</span>'
      + ' '
      + '<span class="Highlight-number">50</span>'
      + '<span class="Highlight-operator">%</span>'
      + '<span class="Highlight-punctuation">;</span>'
      + '\n'
      + '<span class="Highlight-property">font-size</span>'
      + '<span class="Highlight-punctuation">:</span>'
      + ' '
      + '<span class="Highlight-number">28</span>'
      + '<span class="Highlight-constant">em</span>'
      + ' '
      + '<span class="Highlight-keyword">!important</span>'
      + '<span class="Highlight-punctuation">;</span>'
      + '\n'
      + '<span class="Highlight-punctuation">}</span>'
      + '\n\n'
      + '<span class="Highlight-selector">body '
      + '<span class="Highlight-punctuation">{</span>'
      + '</span>'
      + '\n'
      + '<span class="Highlight-property">border</span>'
      + '<span class="Highlight-punctuation">:</span>'
      + ' '
      + '<span class="Highlight-keyword">none</span>'
      + '<span class="Highlight-punctuation">;</span>'
      + '\n'
      + '<span class="Highlight-punctuation">}</span>');
  });
});

/**
 * Test convenience.
 *
 * @param {String} input
 * @param {String} output
 */

function test(input, output){
  var code = h.string(input, 'css');
  assert.equal(code, output);
}

/**
 * Fixture.
 */

function fixture(arg, thing){
  var life = 42;
  var everything = Infinity;
  var ret = 'the meaning of life is: ' + life; // or so we think
  if (everything) {
    return ret;
  }
}