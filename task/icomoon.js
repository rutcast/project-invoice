/*global require,module*/
/**
 * Processes icomoon font package to less files
 * @example <caption>Grunt config</caption>
icomoon: {
	updatefont: {
		src: sPathSrc+'/icons/Pano.zip'
		,destLess: sPathSrc+'/style/iconfont.less'
		,destFonts: sPathSrc+'/style/fonts/'
		,iconName: 'pano'
	}
}
 */
var fs = require('fs')
	,xml2js = require('xml2js')
	,AdmZip = require('adm-zip')
	//
	//
	//
	//
	,commander = require('commander')
			.usage('[options] <files ...>')
			.option('--source [source]', 'Source path')
			.option('--target [target]', 'Target path')
			.option('--targetFile [targetFile]', 'Target file path')
			.parse(process.argv)
	//
	//
	//
	//
	//
	,sFontDest = commander.target||'./temp/fonts/'
	,sFontSrc = commander.source||'./icomoon.zip'
	,sDest = commander.targetFile||'./temp/icomoon.less'
	,isLess = sDest.split('.').pop()==='less' // or sass
	//
	,zip = new AdmZip(sFontSrc)
	,unzip = zip.extractAllTo('temp',true)
	//
	,sSrc = fs.readFileSync('temp/style.css').toString().replace(/fonts/g,'/fonts')
	//
//            ,pop1=console.log('p1',!!sSrc.match(/(\[.*{)([^}]*)/))
//            ,pop3=console.log('p3',!!sSrc.match(/\"([^-]+)-"/))
	,sIconClassContents = sSrc.match(/(\[.*{)([^}]*)/).pop()
//            ,pop2=console.log('p2',!!sIconClassContents.match(/'([^']+)'/))
	,sIconName = sIconClassContents.match(/'([^']+)'/).pop()
	,aIconPrefix = sSrc.match(/\"([^-]+)-"/)
	,sIconPrefix = aIconPrefix?aIconPrefix.pop():'icon_'
	//
	,rxMatch = new RegExp('\\.'+sIconPrefix+'([\\-\\w]+):before \\{\n\\s+content: ([^;]*);\n}','g')
	,rxVars = new RegExp('\\.'+sIconPrefix+'-([\\-\\w]+):before \\{\n\\s+content: ([^;]*);\n}','g')
	,rxRules = new RegExp('\\.'+sIconPrefix+'-([\\-\\w]+):before \\{\n\\s+content: ([^;]*);\n}','g')
	,rxReplace = new RegExp('\\.'+sIconPrefix+'-[\\s\\S.]*','g')
	,aMatch = sSrc.match(rxMatch)
	,sVars = ''
	,sRules = ''
	,sIconMixins = (isLess?'.':'@mixin ')+sIconPrefix+'-icon(){'+sIconClassContents+'}\n'
unzip; // prevent jshint error

console.log('Extracting',aMatch?aMatch.length:0,'icons prefixed \''+sIconPrefix+'\' from',sFontSrc); // log
console.log('\tto',sDest); // log
sFontDest&&console.log('\tto',sFontDest); // log

var aKey = [], aCode = [];

// create variables for icon character
aMatch&&aMatch.forEach(function(block){
	/**/aKey.push(block.replace(rxVars,'$1'));
//			/**/aCode.push(block.replace(rxVars,'$2').match(/\d+/g).pop());
	/**/aCode.push(String.fromCharCode(parseInt(block.replace(rxVars,'$2').match(/\d+/g).pop(),10)+12));
//			/**/aCode.push(JSON.parse('["'+block.replace(rxVars,'$2').match(/\\\d+/g)+'"]'));
//			/**/aCode.push(String.fromCharCode(parseInt(block.replace(rxVars,'$2').match(/\\\d+/g),16)));
//			/**/aCode.push(String.fromCharCode(block.replace(rxVars,'$2').match(/\d+/g)));
	var sVarVar = isLess?'@':'$';
	sVars += block.replace(rxVars,sVarVar+sIconPrefix+'-$1: $2;\n');
	sRules += block.replace(rxRules,'.'+sIconPrefix+'-$1:before { content: '+sVarVar+sIconPrefix+'-$1; }\n');

	var sIcon = block.match(/\.\w+-([^:]+)/)[1];

//@mixin keyframes($animationName) {
//			sIconMixins += '.icon('+sIcon+'){'
	if (isLess) {
		sIconMixins += '.icon('+sIcon+'){'
			+'&:before{'
				+'&:extend([class^="'+sIconPrefix+'-"]);'
				+'&:extend(.'+sIconPrefix+'-'+sIcon+':before);'
			+'}'
		+'}\n';
	} else {
		sIconMixins += '@mixin icon-'+sIcon+'(){'
			+'&:before{'
				+'@include '+sIconPrefix+'-icon();'
				+'content: $icon-'+sIcon+';'
			+'}'
		+'}\n';
	}
});

//####################################################
//		console.log('aKey',aKey); // log
//		console.log('aCode',aCode); // log
var sSvg = 'temp/fonts/' + sIconName + '.svg'
	,oSvgData = fs.readFileSync(sSvg,'ascii')
	,oXml2js = new xml2js.Parser()
	,sSvgMixin = ".svgmixin(){background-image: url(\"data:image/svg+xml;utf8," +
		"<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024' viaewBox='0 -1024 1024 1024'>" +
//				"<g transform='translate(0,11)'>" +
//				"<g transform='scale(1,1)'>" +
		"<path d=''></path>" +
		"</svg>\");}"
	,sSvgMixins = ''
;
oXml2js.parseString(oSvgData.substring(0,oSvgData.length),function(err,result) {
	var aGlyph = result.svg.defs[0].font[0].glyph;
	aGlyph.forEach(
		function(glyph){
			var oAttr = glyph.$
				,sCode = oAttr.unicode
				,iIndex = aCode.indexOf(sCode)
				,sPrefix = aKey[iIndex];
			if (sPrefix) {
				sSvgMixins += sSvgMixin.replace('mixin','-'+sPrefix).replace('d=\'\'','d=\''+oAttr.d+'\'')+'\n';
			}
//					console.log('unicode',sCode,aCode.indexOf(sCode),oAttr['horiz-adv-x']); // log
			//console.log('unicode',sCode,aCode.indexOf(sCode),oAttr.d); // log
			//console.log('glyph',oAttr.unicode,oAttr.d); // log
		}
	);
});
//####################################################

sSrc = sSrc.replace(rxReplace,
	'\n\n// variables\n\n'+sVars
	+'\n\n// rules\n\n'+sRules
	+'\n\n// mixins\n\n'+sIconMixins+'\n\n'+(isLess?sSvgMixins:'// scss svg mixins missing')
);

fs.writeFileSync(sDest,sSrc);
console.log('file written:',sDest); // log

// move fonts files
if (sFontDest) {
	var sFontsDir = 'temp/fonts/';
	// create dirs if not exist
	if (!fs.existsSync(sFontDest)) {
		fs.mkdirSync(sFontDest);
	}
	// copy files to dirs
	console.log('copying fonts:',sFontDest); // log
	fs.readdirSync(sFontsDir).forEach(function(fileName) {
		console.log('\t',fileName); // log
		var sTargetFile = sFontDest+fileName;
		if (fs.existsSync(sTargetFile)) fs.unlinkSync(sTargetFile);
		fs.linkSync(sFontsDir+fileName, sTargetFile);
	});
}