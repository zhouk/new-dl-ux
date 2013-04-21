@if (0===0) @end/*
:: ----------------------------------------------------------
:: artTemplate - Compile Tools v1.0 beta4
:: https://github.com/aui/artTemplate
:: Released under the MIT, BSD, and GPL Licenses
:: Email: 1987.tangbin@gmail.com
:: ----------------------------------------------------------

@echo off
title loading..
cd %~dp0
call CScript.EXE "%~dpnx0" //Nologo //e:jscript %*
title Compile Tools
goto cmd
*/

// ģ������·��
var template = require('../../template.js');

// ģ�������Զ����﷨֧�֡������ʹ���﷨�����ע�ʹ���
// require('../../extensions/template-syntax.js');

// js��ʽ������·��
var js_beautify = require('./lib/beautify.js');

// ���ô������ģ�����
var $charset = 'UTF-8';

// ����ǰ��ģ��Ŀ¼·��
var $path = './demo/templates/';

// ���ø����������뷽ʽ��
// Ϊtrue���¡��ÿ���������ļ��У�Ϊfalse�򵥶�������ļ�
var $cloneHelpers = false;





// ����ϵͳ���API��װ
var OS = {
	
	file: {
	
		/** 
		 * �ļ���ȡ
		 * @param	{String}		�ļ�·��
		 * @param	{String}		ָ���ַ���
		 * @param 	{Boolean} 		�Ƿ�Ϊ����������. Ĭ��false
		 * @return	{String} 	    �ļ�����
		 */
		read: function (path, charset, isBinary) {
			charset = charset || 'UTF-8';
			var stream = new ActiveXObject('adodb.stream');
			var fileContent;

			stream.type = isBinary ? 1 : 2;
			stream.mode = 3;
			stream.open();
			stream.charset = charset;
			try {
				stream.loadFromFile(path);
			} catch (e) {
				OS.console.log(path);
				throw e;
			}
			fileContent = new String(stream.readText());
			fileContent.charset = charset;
			stream.close();
			return fileContent.toString();
		},


		/**
		 * �ļ�д��
		 * @param 	{String} 		�ļ�·��
		 * @param 	{String} 		Ҫд�������
		 * @param	{String}		ָ���ַ���. Ĭ��'UTF-8'
		 * @param 	{Boolean} 		�Ƿ�Ϊ����������. Ĭ��false
		 * @return 	{Boolean} 		�����Ƿ�ɹ�
		 */
		 write: function (path, data, charset, isBinary) {
			var stream = new ActiveXObject('adodb.stream');
			
			stream.type = isBinary ? 1 : 2;

			if (charset) {
				stream.charset = charset;
			} else if (!isBinary) {
				stream.charset = 'UTF-8';
			}
			
			try {
				stream.open();
				if (!isBinary) {
					stream.writeText(data);
				} else {
					stream.write(data);
				}
				stream.saveToFile(path, 2);

				return true;
			} catch (e) {
				throw e;
			} finally {
				stream.close();
			}

			return true;
		},

		
		/**
		 * ö��Ŀ¼�������ļ���(������Ŀ¼�ļ�)
		 * @param	{String}	Ŀ¼
		 * @return	{Array}		�ļ��б�
		 */
		get: (function (path) {
			var fso = new ActiveXObject('Scripting.FileSystemObject');
			var listall = function (infd) {
			
				var fd = fso.GetFolder(infd + '\\');
				var fe = new Enumerator(fd.files);
				var list = [];
				
				while(!fe.atEnd()) { 
					list.push(fe.item() + '');
					fe.moveNext();
				}
				
				var fk = new Enumerator(fd.SubFolders);
				for (; !fk.atEnd(); fk.moveNext()) {
					list = list.concat(listall(fk.item()));
				}
				
				return list;
			};
			
			return function (path) {
				var list = [];
				try {
					list = listall(path);
				} catch (e) {
				}
				return list;
			}
		})()
	},
	
	app: {


        /**
         * ��ȡ����·����
         * @return  {String}
         */
        getFullName: function () {
          return WScript.ScriptFullName
        },
	
		/**
		 * ��ȡ���в���
		 * @return	{Array}			�����б�
		 */
		getArguments: function () {
			var Arguments = WScript.Arguments;
			var length = Arguments.length;
			var args = [];
			
			if (length) {
				for (var i = 0; i < length; i ++) {
					args.push(Arguments(i));
				}
			}
			
			return args;
		},
		
		quit: function () {
			WScript.Quit(OS.app.errorlevel);
		},
		
		errorlevel: 0
	},
	
	// ����̨
	console: {
		error: function (message) {
			OS.app.errorlevel = 1;
			WScript.Echo(message);
		},
		log: function (message) {
			WScript.Echo(message);
		}
	}
};

var Global = this;
var console = OS.console;
var log = console.log;
var error = console.error;

function require (path) {
	this.$dependencies = this.$dependencies || [];
	this.$dependencies.push(path);
}

this.$dependencies = this.$dependencies || [];
for (var i = 0; i < this.$dependencies.length; i ++) {
	Global.eval(OS.file.read(this.$dependencies[i], 'UTF-8'));
}


/*-----*/


if (!Array.prototype.forEach) {
  // ES5 15.4.4.18
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
  Array.prototype.forEach = function(fn, context) {
    for (var i = 0, len = this.length >>> 0; i < len; i++) {
      if (i in this) {
        fn.call(context, this[i], i, this);
      }
    }
  }; 
}

if (!String.prototype.trim) {
String.prototype.trim = (function() {

    // http://perfectionkills.com/whitespace-deviations/
    var whiteSpaces = [

      '\\s',
      '00A0', // 'NO-BREAK SPACE'
      '1680', // 'OGHAM SPACE MARK'
      '180E', // 'MONGOLIAN VOWEL SEPARATOR'
      '2000-\\u200A',
      '200B', // 'ZERO WIDTH SPACE (category Cf)
      '2028', // 'LINE SEPARATOR'
      '2029', // 'PARAGRAPH SEPARATOR'
      '202F', // 'NARROW NO-BREAK SPACE'
      '205F', // 'MEDIUM MATHEMATICAL SPACE'
      '3000' //  'IDEOGRAPHIC SPACE'

    ].join('\\u');

    var trimLeftReg = new RegExp('^[' + whiteSpaces + ']+');
    var trimRightReg = new RegExp('[' + whiteSpaces + ']+$');

    return function() {
      return String(this).replace(trimLeftReg, '').replace(trimRightReg, '');
    }

  })();
}



/*!
 * ģ�������
 * @see     https://github.com/aui/artTemplate
 * @param   {String}    ģ��
 * @param   {String}    �ⲿ������������ѡ���������ڴ�ָ���ⲿ��������ģ�����ƣ�
 * @return  {String}    ����õ�ģ��
 */
var compileTemplate = (function () {

template.isCompress = true;

// ��װ��RequireJS��SeaJSģ��
var toModule = function (code, includeHelpers) {

    template.onerror = function (e) {
        throw e;
    };

    var render = template.compile(code);
    var prototype = render.prototype;

    render = render.toString()
    .replace(/^function\s+(anonymous)/, 'function');



    // ��ȡincludeģ��
    // @see https://github.com/seajs/seajs/blob/master/src/util-deps.js
    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*include|(?:^|[^$])\binclude\s*\(\s*(["'])(.+?)\1\s*(,\s*(.+?)\s*)?\)/g; //"
    var SLASH_RE = /\\\\/g

    function parseDependencies(code) {
      var ret = [];
	  var uniq = {};

      code.replace(SLASH_RE, "")
          .replace(REQUIRE_RE, function(m, m1, m2) {
            if (m2 && !uniq.hasOwnProperty(m2)) {
              ret.push(m2);
			  uniq[m2] = true;
            }
          })

      return ret
    };

    var dependencies = [];
    parseDependencies(render).forEach(function (id) {
        dependencies.push('"' + id + '": ' + 'require("' + id + '")');
    });
    var isDependencies = dependencies.length;
    dependencies = '{' + dependencies.join(',') + '}';


    // �����������
    var helpers;

    if (includeHelpers) {
    	includeHelpers = includeHelpers.replace(/\.js$/, '');
        helpers = 'require("' + includeHelpers + '")';
    } else {
        helpers = [];
        for (var name in prototype) {
            if (name !== '$render') {
                helpers.push('"' + name + '": ' + prototype[name].toString());
            }
        }
        helpers = '{' + helpers.join(',') + '}';
    }


    code = 'define(function (require) {\n'
         +      (isDependencies ? 'var dependencies = ' + dependencies + ';' : '')
         +      'var helpers = ' + helpers + ';\n'
         +      (isDependencies ? 'var $render = function (id, data) {'
         +          'return dependencies[id](data);'
         +      '};' : '')
         +      'var Render = ' + render  + ';\n'
         +      'Render.prototype = helpers;'
         +      'return function (data) {\n'
         +          (isDependencies ? 'helpers.$render = $render;' : '')
         +          'return new Render(data) + "";'
         +      '};\n'
         + '});';
    
    
    return code;
};


// ��ʽ��js
var beautify = function (code) {
    
    if (typeof js_beautify !== 'undefined') {
        var config = {
            indent_size: 4,
            indent_char: ' ',
            preserve_newlines: true,
            braces_on_own_line: false,
            keep_array_indentation: false,
            space_after_anon_function: true
        };
        code = js_beautify(code, config);
    }
    return code;
};


return function (source, includeHelpers) {
    var amd = toModule(source, includeHelpers);
    return beautify(amd);
}

})();


// Canonicalize a path
// realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
function realpath (path) {
  var DOT_RE = /\/\.\//g
  var MULTIPLE_SLASH_RE = /([^:\/])\/\/+/g
  var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//g

  // /a/b/./c/./d ==> /a/b/c/d
  path = path.replace(DOT_RE, "/")

  // "file:///a//b/c"  ==> "file:///a/b/c"
  // "http://a//b/c"   ==> "http://a/b/c"
  // "https://a//b/c"  ==> "https://a/b/c"
  // "/a/b//"          ==> "/a/b/"
  path = path.replace(MULTIPLE_SLASH_RE, "$1\/")

  // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
  while (path.match(DOUBLE_DOT_RE)) {
    path = path.replace(DOUBLE_DOT_RE, "/")
  }

  return path
}

// ���·��ת��Ϊ����·��
if (/^\./.test($path)) {
  $path = realpath((OS.app.getFullName().replace(/[^\/\\]*?$/, '') + $path).replace(/\\/g, '/'));
}

log('$charset = ' + $charset);
log('$cloneHelpers = ' + $cloneHelpers);
log('$path = ' + $path);
log('-----------------------');


var args = OS.app.getArguments(); // ��ȡʹ����ק��ʽ�򿪵��ļ��б�
var list = args.length ? args : OS.file.get($path); // ��������ļ��б�



list.forEach(function (path, index) {
    // ��·�� "\" ת���� "/"
    path = list[index] = path.replace(/\\/g, '/');
    
    // �Ϸ���У��
    if (path.indexOf($path) !== 0) {
        error('���棺' + path + '����ģ��Ŀ¼�У����ܵ���·������');
    }
});




// �Ѹ����������Ϊ�������ļ�
if (!$cloneHelpers) {
    var helpers = [];
    var helpersName = '$helpers.js';
    var path = $path + helpersName;
    for (var name in template.prototype) {
        if (name !== '$render') {
            helpers.push('"' + name + '": ' + template.prototype[name].toString());
        }
    }
    helpers = '{\r\n' + helpers.join(',\r\n') + '}';

    var module = 'define(function () {'
    +	'return ' + helpers
	+ '});'

    if (typeof js_beautify !== 'undefined') {
        var config = {
            indent_size: 4,
            indent_char: ' ',
            preserve_newlines: true,
            braces_on_own_line: false,
            keep_array_indentation: false,
            space_after_anon_function: true
        };
        module = js_beautify(module, config);
    }

	
	OS.file.write(path, module, $charset);
}




// ��������ģ��
list.forEach(function (path) {
	var rname = /\.(html|htm)$/i;
	if (!rname.test(path)) {
		return;
	}

    var name = helpersName;
    
    // ���㸨������ģ������·��
    if (name) {
        var prefix = './';
        var length = path.replace($path, '').replace(/[^\/]/g, '').length;

        if (length) {
          prefix = (new Array(length + 1)).join('../');
        }

        name = prefix + name;
    }

	log('����: ' + path);

	var source = OS.file.read(path, $charset);
	var code = compileTemplate(source, name);
	var target = path.replace(rname, '.js');

	OS.file.write(target, code, $charset);

	log('���: ' + target);
});

log('-----------------------');
log('�������');

OS.app.quit();

/*-----------------------------------------------*//*
:cmd
::if %errorlevel% == 0 exit
pause>nul
exit
*/





