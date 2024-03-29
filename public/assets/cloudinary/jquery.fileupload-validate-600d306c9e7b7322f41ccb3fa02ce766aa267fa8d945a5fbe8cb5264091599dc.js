/*
 * jQuery File Upload Validation Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fileupload-process"],t):t("object"==typeof exports?require("jquery"):window.jQuery)}(function(t){"use strict";t.blueimp.fileupload.prototype.options.processQueue.push({action:"validate",always:!0,acceptFileTypes:"@",maxFileSize:"@",minFileSize:"@",maxNumberOfFiles:"@",disabled:"@disableValidation"}),t.widget("blueimp.fileupload",t.blueimp.fileupload,{options:{getNumberOfFiles:t.noop,messages:{maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small"}},processActions:{validate:function(e,i){if(i.disabled)return e;var n,o=t.Deferred(),s=this.options,r=e.files[e.index];return(i.minFileSize||i.maxFileSize)&&(n=r.size),"number"===t.type(i.maxNumberOfFiles)&&(s.getNumberOfFiles()||0)+e.files.length>i.maxNumberOfFiles?r.error=s.i18n("maxNumberOfFiles"):!i.acceptFileTypes||i.acceptFileTypes.test(r.type)||i.acceptFileTypes.test(r.name)?n>i.maxFileSize?r.error=s.i18n("maxFileSize"):"number"===t.type(n)&&n<i.minFileSize?r.error=s.i18n("minFileSize"):delete r.error:r.error=s.i18n("acceptFileTypes"),r.error||e.files.error?(e.files.error=!0,o.rejectWith(this,[e])):o.resolveWith(this,[e]),o.promise()}}})});