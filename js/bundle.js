!function t(e,r,i){function s(n,a){if(!r[n]){if(!e[n]){var l="function"==typeof require&&require;if(!a&&l)return l(n,!0);if(o)return o(n,!0);throw new Error("Cannot find module '"+n+"'")}var p=r[n]={exports:{}};e[n][0].call(p.exports,function(t){var r=e[n][1][t];return s(r?r:t)},p,p.exports,t,e,r,i)}return r[n].exports}for(var o="function"==typeof require&&require,n=0;n<i.length;n++)s(i[n]);return s}({1:[function(t,e,r){"use strict";var i=t("./controllers/filters-controller").FiltersController,s=t("./data/filters-data").filtersData,o=t("./components/scheme-changer").SchemeChanger,n=t("./components/iframe").Iframe,a=t("./components/supported-browser").SupportedBrowser,l=t("./components/presets").Presets,p=t("./controllers/router-controller").RouterController,c=t("./components/modal").Modal,u=t("./components/additional-url-params-processor").AdditionalUrlParamsProcessor,h=function(){var t="apply-filters",e="."+t;this.supportedBrowser=new a,this.supportedBrowser.isBrowserSupported&&(this.routerController=new p({srcParam:"src",filtersParam:"filters",modalParam:"modal"}),this.filtersController=new i({viewWrapper:".css-filters",filtersData:s,onFiltersChange:this.onFiltersChange.bind(this)}),this.iframe=new n({iframeWrapper:".iframe-wrapper",iframeBoxTmlpEl:".iframe-box-tmpl",src:this.routerController.getIframeSrcFromUrl()||"http://malyw.github.io/",srcForm:".src-form",srcInput:".src-input",onIframeSrcChange:this.onIframeSrcChange.bind(this)}),this.modal=new c({modalWrapper:".modal-wrapper",modalBoxTmplEl:".modal-box-tmpl",applyClass:t,onModalVisibilityChange:this.onModalVisibilityChange.bind(this),isOpen:this.routerController.getModalFromUrl()}),this.schemeChanger=new o({filtersModelData:this.filtersController.getFiltersModelData(),applySelector:e}),this.presets=new l({btnGroup:".presets .button-group",activeFilters:this.routerController.getFiltersFromUrl(),onPresetActivated:this.onPresetActivated.bind(this)}),this.additionalUrlParamsProcessor=new u({routerController:this.routerController}),window.self!==window.top&&document.body.classList.add("iframe"))};h.prototype.onPresetActivated=function(t){this.filtersController.setFiltersFromPreset(t)},h.prototype.onFiltersChange=function(t){this.schemeChanger.setScheme(t),this.routerController.setFiltersToUrl(this.filtersController.getActiveFiltersData())},h.prototype.onIframeSrcChange=function(t){this.routerController.setIframeSrcToUrl(t)},h.prototype.onModalVisibilityChange=function(t){this.routerController.setModalToUrl(t)},r.App=h},{"./components/additional-url-params-processor":2,"./components/iframe":3,"./components/modal":4,"./components/presets":5,"./components/scheme-changer":6,"./components/supported-browser":7,"./controllers/filters-controller":8,"./controllers/router-controller":9,"./data/filters-data":10}],2:[function(t,e,r){"use strict";function i(t,e){Object.keys(e).forEach(function(r){t.forEach(function(t){t.style[r]=e[r]})})}var s=function(t){this.options=t,this.checkHideContentExcept(),this.checkOverflowHeight()};s.prototype.checkHideContentExcept=function(){var t=this.options.routerController.getParamFromUrl("hideContentExcept");if(t){var e=t.split(","),r="#container > *";e.forEach(function(t){r+=":not("+t+")"});var s=document.querySelectorAll(r);i(Array.prototype.slice.call(s),{display:"none"})}},s.prototype.checkOverflowHeight=function(){var t=this.options.routerController.getParamFromUrl("overflowHeight");t&&i([document.querySelector("html"),document.body],{overflow:"hidden",height:t+"px","min-height":0})},r.AdditionalUrlParamsProcessor=s},{}],3:[function(t,e,r){"use strict";var i=function(t){this.options=t,this.iframeWrapper=document.querySelector(this.options.iframeWrapper),this.iframeBoxTmlpEl=document.querySelector(this.options.iframeBoxTmlpEl),this.src=this.options.src,this.appendIframe(),this.srcForm=this.iframeWrapper.querySelector(this.options.srcForm),this.srcInput=this.iframeWrapper.querySelector(this.options.srcInput),this.iframe=this.iframeWrapper.querySelector("iframe"),this.setInputSrcValue(this.src),this.setIframeSrc(this.src),this.bindEvents()};i.prototype.appendIframe=function(){this.iframeWrapper.innerHTML=this.iframeBoxTmlpEl.textContent},i.prototype.bindEvents=function(){this.srcForm.addEventListener("submit",this.onSubmit.bind(this),!1)},i.prototype.setIframeSrc=function(){this.iframe.setAttribute("src",this.src),this.options.onIframeSrcChange(this.src)},i.prototype.setInputSrcValue=function(t){this.srcInput.value=t},i.prototype.onSubmit=function(t){var e=this.srcInput.value;e!==this.src&&(this.src=e,this.setIframeSrc(e)),t.preventDefault()},r.Iframe=i},{}],4:[function(t,e,r){"use strict";var i="show-modal",s=function(t){this.options=t,this.applyClass=this.options.applyClass,this.isOpen=this.options.isOpen,this.body=document.querySelector("body"),this.pageContainer=document.getElementById("container"),this.modalWrapper=document.querySelector(this.options.modalWrapper),this.modalBoxTmplEl=document.querySelector(this.options.modalBoxTmplEl),this.appendTmpl(),this.closeBtnEl=this.modalWrapper.querySelector(".close-btn"),this.modalActionsEl=document.querySelector(".modal-actions"),this.openBtnEl=this.modalActionsEl.querySelector(".open-modal-btn"),this.setView(),this.modalActionsEl.style.display="",this.bindEvents()};s.prototype.appendTmpl=function(){this.modalWrapper.innerHTML=this.modalBoxTmplEl.textContent},s.prototype.setView=function(){this.isOpen?this.open():this.close()},s.prototype.open=function(){this.body.classList.add(i),this.pageContainer.classList.add(this.applyClass),this.modalWrapper.style.display="block",this.isOpen=!0,this.options.onModalVisibilityChange(this.isOpen)},s.prototype.close=function(){this.modalWrapper.style.display="none",this.pageContainer.style["-webkit-filter"]="none",setTimeout(function(){this.body.classList.remove(i),this.pageContainer.classList.remove(this.applyClass),this.pageContainer.style["-webkit-filter"]="",this.isOpen=!1,this.options.onModalVisibilityChange(this.isOpen)}.bind(this),500)},s.prototype.bindEvents=function(){document.addEventListener("keyup",function(t){27===t.keyCode&&this.close()}.bind(this)),this.closeBtnEl.addEventListener("click",this.close.bind(this)),this.openBtnEl.addEventListener("click",this.open.bind(this))},r.Modal=s},{}],5:[function(t,e,r){"use strict";var i=t("../data/presets-data").presetsData,s=function(t){this.options=t,this.btnGroup=document.querySelector(this.options.btnGroup),this.createDom(),this.setActiveFiltersOnInit()};s.prototype.createDom=function(){i.forEach(function(t){var e=document.createElement("span");e.classList.add("button"),e.textContent=t.name,e.addEventListener("click",this.setFilters.bind(this,t.filters),!1),this.btnGroup.appendChild(e)},this)},s.prototype.setFilters=function(t){this.options.onPresetActivated(t)},s.prototype.getActiveFiltersFromData=function(){var t=null;return i.forEach(function(e){e.activeOnInit&&(t=e)}),t.filters},s.prototype.setActiveFiltersOnInit=function(){var t=this.options.activeFilters;t||(t=this.getActiveFiltersFromData()),this.setFilters(t)},r.Presets=s},{"../data/presets-data":11}],6:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=i.filterProperty,o=i.getCssDeclaration,n=function(t){this.options=t,this.applySelector=this.options.applySelector,this.sheet=this.createSheet(),this.appliedFilterText=document.querySelector(".applied-filter"),this.setScheme(t.filtersModelData)};n.prototype.setScheme=function(t){var e=i.cloneObj(t),r=this.generateFilterCss(e);this.setFilterCss(r)},n.prototype.generateFilterCss=function(t){var e,r,i,s=this.getEnabledFilters(t),o="",n="",a="";for(e in s)i=s[e],r=i.current,o=i.postfix||"",n=i.filterCss||"",a+=this.generateCssValue(e,r,o,n);return a},n.prototype.generateCssValue=function(t,e,r,i){var s="";return s=i?i.replace(/\%CURRENT\%/gi,e+r):e+r," "+t+"("+s+")"},n.prototype.getEnabledFilters=function(t){var e,r,i={};for(e in t)r=t[e],0!==r.current&&(i[e]=r);return i},n.prototype.setFilterCss=function(t){t||(t=" none");var e=o(s,t);this.setCSSRules(e),this.appliedFilterText.textContent=e},n.prototype.createSheet=function(){var t=document.createElement("style");return t.type="text/css",document.head.appendChild(t),t},n.prototype.setCSSRules=function(t){this.sheet.innerHTML=this.applySelector+"{"+t+"}"},r.SchemeChanger=n},{"../utils/utils":16}],7:[function(t,e,r){"use strict";function i(t,e){return typeof t===e}function s(t,e){return!!~(""+t).indexOf(e)}function o(t,e){for(var r in t){var i=t[r];if(!s(i,"-")&&void 0!==h[i])return"pfx"==e?i:!0}return!1}function n(t,e,r){for(var s in t){var o=e[t[s]];if(void 0!==o)return r===!1?t[s]:i(o,"function")?o.bind(r||e):o}return!1}function a(t,e,r){var s=t.charAt(0).toUpperCase()+t.slice(1),a=(t+" "+m.join(s+" ")+s).split(" ");return i(e,"string")||i(e,"undefined")?o(a,e):(a=(t+" "+y.join(s+" ")+s).split(" "),n(a,e,r))}var l=["flexbox","cssColumns","cssFilters","inputRange","classList","arrayForEach","bind","objectKeys","objectCreate"],p=function(){this.unsupportedFeatures=this.checkFeatures(),this.unsupportedFeaturesEl=document.getElementById("unsupportedFeatures"),this.isBrowserSupported=0===this.unsupportedFeatures.length,this.isBrowserSupported||this.showUnsupportedMsg(this.unsupportedFeatures)};p.prototype.showUnsupportedMsg=function(t){document.body.className+=" not-supported-browser";for(var e="",r=0;r<t.length;r++)e+="<li>"+t[r]+"</li>";this.unsupportedFeaturesEl.innerHTML=e},p.prototype.checkFeatures=function(){var t,e,r,i=[];for(e=l.length;e--;)t=l[e],r=this[t](),r||i.push(t);return i},p.prototype.objectCreate=function(){return"function"==typeof Object.create},p.prototype.objectKeys=function(){return"function"==typeof Object.keys},p.prototype.bind=function(){return"function"==typeof Function.prototype.bind},p.prototype.arrayForEach=function(){return"function"==typeof Array.prototype.forEach},p.prototype.classList=function(){return"classList"in document.createElement("_")},p.prototype.inputRange=function(){var t=document.createElement("input");try{return t.type="range","range"==t.type?!0:!1}catch(e){return!1}},p.prototype.cssFilters=function(){var t=document.createElement("div");return t.style.cssText=f.join("filter:blur(2px); "),!!t.style.length&&(void 0===document.documentMode||document.documentMode>9)},p.prototype.cssColumns=function(){return a("columnCount")},p.prototype.flexbox=function(){return a("flexWrap")};var c="modernizr",u=document.createElement(c),h=u.style,f=" -webkit- -moz- -o- -ms- ".split(" "),d="Webkit Moz O ms",m=d.split(" "),y=d.toLowerCase().split(" ");r.SupportedBrowser=p},{}],8:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../models/filters-model").FiltersModel,o=t("../views/filters-view").FiltersView,n=function(t){this.options=t,this.filtersModel=new s({filtersData:t.filtersData}),this.filtersView=new o({viewWrapper:t.viewWrapper,filtersModelData:this.filtersModel.getFiltersData()}),this.bindEvents()};n.prototype.bindEvents=function(){this.filtersView.on("filterChanged",this.onFilterViewChanged,this)},n.prototype.onFilterViewChanged=function(t){this.filtersModel.onFilterViewChanged(t),this.triggerDataChanged()},n.prototype.getFiltersModelData=function(){return this.filtersModel.getFiltersData()},n.prototype.triggerDataChanged=function(){this.options.onFiltersChange(this.getFiltersModelData())},n.prototype.setFiltersFromPreset=function(t){var e,r=i.cloneObj(this.filtersModel.getFiltersData());for(e in r)r[e].current=t[e]?t[e]:0;this.filtersView.setFilterValues(r),this.filtersModel.setFiltersData(r),this.triggerDataChanged()},n.prototype.getActiveFiltersData=function(){var t,e=i.cloneObj(this.filtersModel.getFiltersData()),r={};for(t in e)0!==e[t].current&&(r[t]=e[t].current);return r},r.FiltersController=n},{"../models/filters-model":14,"../utils/utils":16,"../views/filters-view":18}],9:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,o=function(t){this.options=t};i.inherit(o,s),o.prototype.setSearchString=function(t){history.replaceState({},document.title,"?"+t)},o.prototype.getParamFromUrl=function(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var e=new RegExp("[\\?&]"+t+"=([^&#]*)"),r=e.exec(location.search);return null===r?"":decodeURIComponent(r[1].replace(/\+/g," "))},o.prototype.setParamToUrl=function(t,e){t=encodeURI(t),e=encodeURI(e);for(var r,i=document.location.search.substr(1).split("&"),s=i.length;s--;)if(r=i[s].split("="),r[0]==t){r[1]=e,i[s]=r.join("=");break}0>s&&(i[i.length]=[t,e].join("=")),""===i[0]&&i.shift(),this.setSearchString(i.join("&"))},o.prototype.getIframeSrcFromUrl=function(){var t=this.getParamFromUrl(this.options.srcParam);return t||(t=null),t},o.prototype.getFiltersFromUrl=function(){var t=this.getParamFromUrl(this.options.filtersParam);if(t)try{t=JSON.parse(t)}catch(e){t=null}else t=null;return t},o.prototype.getModalFromUrl=function(){var t=this.getParamFromUrl(this.options.modalParam);return!!Number(t)},o.prototype.setIframeSrcToUrl=function(t){this.getIframeSrcFromUrl()!==t&&this.setParamToUrl(this.options.srcParam,t)},o.prototype.setFiltersToUrl=function(t){this.getFiltersFromUrl()!==t&&this.setParamToUrl(this.options.filtersParam,JSON.stringify(t))},o.prototype.setModalToUrl=function(t){this.getModalFromUrl()!==t&&this.setParamToUrl(this.options.modalParam,t?1:0)},r.RouterController=o},{"../utils/events-system":15,"../utils/utils":16}],10:[function(t,e,r){"use strict";var i={blur:{max:10,postfix:"px"},brightness:{max:10},contrast:{max:10},grayscale:{max:1},"drop-shadow":{max:50,postfix:"px",filterCss:"%CURRENT% %CURRENT% 10px black"},"hue-rotate":{max:360,postfix:"deg"},invert:{max:1},opacity:{max:1},saturate:{max:10},sepia:{max:1}};r.filtersData=i},{}],11:[function(t,e,r){"use strict";r.presetsData=[{name:"Reset",filters:{}},{name:"Inverted",filters:{invert:1,"hue-rotate":180,brightness:.9}},{name:"Vintage",filters:{grayscale:.1,saturate:1,sepia:.6}},{name:"Grayscale",filters:{grayscale:1}},{name:"Acid",filters:{"hue-rotate":72,saturate:3,sepia:.2},activeOnInit:!0}]},{}],12:[function(t){"use strict";!function(){var e=t("./app").App;window.App=new e}()},{"./app":1}],13:[function(t,e,r){"use strict";var i=function(t){this.options=t,this.setData(this.options.filterData)};i.prototype.getData=function(){var t={max:this.max,current:this.current,name:this.name};return this.postfix&&(t.postfix=this.postfix),this.filterCss&&(t.filterCss=this.filterCss),t},i.prototype.setData=function(t){var e;for(e in t)this[e]=t[e]},i.prototype.setValue=function(t){this.current=t},r.FilterModel=i},{}],14:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("./filter-model").FilterModel,o=function(t){this.options=t,this.initFiltersData=this.options.filtersData,this.filtersModels={},this.filtersData={},this.createFilters(this.initFiltersData)};o.prototype.createFilters=function(t){var e;for(e in t)this.createFilter(e,t[e])},o.prototype.createFilter=function(t,e){var r=i.cloneObj(e);r.current=0,r.name=t;var o=new s({filterData:r});this.filtersModels[t]=o,this.filtersData[t]=o.getData()},o.prototype.getFiltersData=function(){return this.filtersData},o.prototype.getFilterModel=function(t){return this.filtersModels[t]},o.prototype.updateFilterData=function(t){var e=this.filtersModels[t];this.filtersData[t]=e.getData()},o.prototype.setFiltersData=function(t){return this.filtersData=t},o.prototype.onFilterViewChanged=function(t){var e=this.getFilterModel(t.name);e.setValue(t.value),this.updateFilterData(t.name)},r.FiltersModel=o},{"../utils/utils":16,"./filter-model":13}],15:[function(t,e,r){"use strict";var i=Array.prototype.slice,s=function(t){var e,r=!1;return function(){return r?e:(r=!0,e=t.apply(this,arguments),t=null,e)}},o=function(){this._events=void 0};o.prototype.on=function(t,e,r){if(!a(this,"on",t,[e,r])||!e)return this;this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:r,ctx:r||this}),this},o.prototype.once=function(t,e,r){if(!a(this,"once",t,[e,r])||!e)return this;var i=this,o=s(function(){i.off(t,o),e.apply(this,arguments)});return o._callback=e,this.on(t,o,r)},o.prototype.off=function(t,e,r){if(!this._events||!a(this,"off",t,[e,r]))return this;if(!t&&!e&&!r)return this._events=void 0,this;var i;if(!t)throw new Error('Argument "name" hasnt passed');i=[t];for(var s=0,o=i.length;o>s;s++){t=i[s];var n=this._events[t];if(n)if(e||r){for(var l=[],p=0,c=n.length;c>p;p++){var u=n[p];(e&&e!==u.callback&&e!==u.callback._callback||r&&r!==u.context)&&l.push(u)}l.length?this._events[t]=l:delete this._events[t]}else delete this._events[t]}return this},o.prototype.trigger=function(t){if(!this._events)return this;var e=i.call(arguments,1);if(!a(this,"trigger",t,e))return this;var r=this._events[t],s=this._events.all;return r&&this.triggerEvents(r,e),s&&this.triggerEvents(s,arguments),this},o.prototype.triggerEvents=function(t,e){var r,i=-1,s=t.length,o=e[0],n=e[1],a=e[2];switch(e.length){case 0:for(;++i<s;)(r=t[i]).callback.call(r.ctx);return;case 1:for(;++i<s;)(r=t[i]).callback.call(r.ctx,o);return;case 2:for(;++i<s;)(r=t[i]).callback.call(r.ctx,o,n);return;case 3:for(;++i<s;)(r=t[i]).callback.call(r.ctx,o,n,a);return;default:for(;++i<s;)(r=t[i]).callback.apply(r.ctx,e);return}};var n=/\s+/,a=function(t,e,r,i){if(!r)return!0;if("object"==typeof r){for(var s in r)t[e].apply(t,[s,r[s]].concat(i));return!1}if(n.test(r)){for(var o=r.split(n),a=0,l=o.length;l>a;a++)t[e].apply(t,[o[a]].concat(i));return!1}return!0};r.EventsSystem=o},{}],16:[function(t,e,r){"use strict";r.inherit=function(t,e){var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t,t.superclass_=e.prototype},r.cloneObj=function(t){var e={};return Object.keys(t).forEach(function(r){e[r]=t[r]}),e},r.getCssDeclaration=function(t,e){return t+":"+e+";"},r.filterProperty=function(){var t,e,i,s,o=document.createElement("div"),n=["-moz-filter","-webkit-filter","-ms-filter"],a="invert(0.1)";for(t=0,e=n.length;e>t;t++)if(i=n[t],o.style.cssText=r.getCssDeclaration(i,a),o.style.length){s=i;break}return s||(s="filter"),s}()},{}],17:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,o=function(t){this.options=t,this.name=this.options.filterData.name,this.container=document.createDocumentFragment(),this.createDom(this.options.filterData),this.inputEl=this.container.querySelector(".range"),this.bindEvents()};i.inherit(o,s),o.prototype.createDom=function(t){var e=document.createElement("div"),r='<div class="filter-box">                    <span class="filter-text">                        '+this.name+'                    </span>                    <div class="input-wrapper">                        <input class="range" type="range"                            min="0"                            max="'+t.max+'"                            step="'+t.max/10+'"                            value="0"                        />                    <div>                </div>';e.classList.add("filter"),e.innerHTML=r,this.container.appendChild(e)},o.prototype.bindEvents=function(){this.inputEl.addEventListener("input",this.onFilterValueChange.bind(this))},o.prototype.onFilterValueChange=function(){this.trigger("filterChanged",{name:this.name,value:Number(this.inputEl.value)})},r.FilterView=o},{"../utils/events-system":15,"../utils/utils":16}],18:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,o=t("./filter-view").FilterView,n=function(t){this.options=t,this.filtersViews={},this.initFiltersModelData=this.options.filtersModelData,this.viewWrapperEl=document.querySelector(this.options.viewWrapper),this.createFilters(this.initFiltersModelData)};i.inherit(n,s),n.prototype.createFilters=function(t){var e;for(e in t)this.createFilter(e,t[e])},n.prototype.createFilter=function(t,e){var r=i.cloneObj(e),s=new o({filterData:r});this.filtersViews[t]=s,s.on("filterChanged",this.onFilterChange,this),this.appendFilter(s)},n.prototype.appendFilter=function(t){return this.viewWrapperEl.appendChild(t.container)},n.prototype.onFilterChange=function(t){this.trigger("filterChanged",t)},n.prototype.setFilterValues=function(t){var e;for(e in t){if(!this.filtersViews[e])throw"Incorrect filter data";this.filtersViews[e].inputEl.value=t[e].current}},r.FiltersView=n},{"../utils/events-system":15,"../utils/utils":16,"./filter-view":17}]},{},[12]);