import{registerVersion as t,_registerComponent as e,_getProvider as n,getApp as r}from"https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";class i extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,o.prototype.create)}}class o{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,o=this.errors[t],s=o?function(t,e){return t.replace(a,((t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`}))}(o,n):"Error",c=`${this.serviceName}: ${s} (${r}).`;return new i(r,c,n)}}const a=/\{\$([^}]+)}/g;function s(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const n=t[i],o=e[i];if(c(n)&&c(o)){if(!s(n,o))return!1}else if(n!==o)return!1}for(const t of r)if(!n.includes(t))return!1;return!0}function c(t){return null!==t&&"object"==typeof t}function u(t){return t&&t._delegate?t._delegate:t}var l;!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(l||(l={}));const f={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},p=l.INFO,d={[l.DEBUG]:"log",[l.VERBOSE]:"log",[l.INFO]:"info",[l.WARN]:"warn",[l.ERROR]:"error"},g=(t,e,...n)=>{if(e<t.logLevel)return;const r=(new Date).toISOString(),i=d[e];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);console[i](`[${r}]  ${t.name}:`,...n)};class h{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}let m,v;const w=new WeakMap,b=new WeakMap,y=new WeakMap,E=new WeakMap,_=new WeakMap;let I={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return b.get(t);if("objectStoreNames"===e)return t.objectStoreNames||y.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return k(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function T(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(v||(v=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(N(this),e),k(w.get(this))}:function(...e){return k(t.apply(N(this),e))}:function(e,...n){const r=t.call(N(this),e,...n);return y.set(r,e.sort?e.sort():[e]),k(r)}}function S(t){return"function"==typeof t?T(t):(t instanceof IDBTransaction&&function(t){if(b.has(t))return;const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{e(),r()},o=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)}));b.set(t,e)}(t),e=t,(m||(m=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,I):t);var e}function k(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{e(k(t.result)),r()},o=()=>{n(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)}));return e.then((e=>{e instanceof IDBCursor&&w.set(e,t)})).catch((()=>{})),_.set(e,t),e}(t);if(E.has(t))return E.get(t);const e=S(t);return e!==t&&(E.set(t,e),_.set(e,t)),e}const N=t=>_.get(t);const R=["get","getKey","getAll","getAllKeys","count"],A=["put","add","delete","clear"],O=new Map;function M(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(O.get(e))return O.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=A.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!R.includes(n))return;const o=async function(t,...e){const o=this.transaction(t,i?"readwrite":"readonly");let a=o.store;return r&&(a=a.index(e.shift())),(await Promise.all([a[n](...e),i&&o.done]))[0]};return O.set(e,o),o}I=(t=>({...t,get:(e,n,r)=>M(e,n)||t.get(e,n,r),has:(e,n)=>!!M(e,n)||t.has(e,n)}))(I);const C="@firebase/installations",P=new o("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function D(t){return t instanceof i&&t.code.includes("request-failed")}function B({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function L(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}async function j(t,e){const n=(await e.json()).error;return P.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function U({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function F(t,{refreshToken:e}){const n=U(t);return n.append("Authorization",function(t){return`FIS_v2 ${t}`}(e)),n}async function $(t){const e=await t();return e.status>=500&&e.status<600?t():e}function q(t){return new Promise((e=>{setTimeout(e,t)}))}const H=/^[cdef][\w-]{21}$/;function x(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=function(t){return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var e}(t);return H.test(e)?e:""}catch(t){return""}}function V(t){return`${t.appName}!${t.appId}`}const W=new Map;function K(t,e){const n=V(t);z(n,e),function(t,e){const n=function(){!G&&"BroadcastChannel"in self&&(G=new BroadcastChannel("[Firebase] FID Change"),G.onmessage=t=>{z(t.data.key,t.data.fid)});return G}();n&&n.postMessage({key:t,fid:e});0===W.size&&G&&(G.close(),G=null)}(n,e)}function z(t,e){const n=W.get(t);if(n)for(const t of n)t(e)}let G=null;const J="firebase-installations-store";let Y=null;function Z(){return Y||(Y=function(t,e,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(t,e),s=k(a);return r&&a.addEventListener("upgradeneeded",(t=>{r(k(a.result),t.oldVersion,t.newVersion,k(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),s.then((t=>{o&&t.addEventListener("close",(()=>o())),i&&t.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),s}("firebase-installations-database",1,{upgrade:(t,e)=>{if(0===e)t.createObjectStore(J)}})),Y}async function Q(t,e){const n=V(t),r=(await Z()).transaction(J,"readwrite"),i=r.objectStore(J),o=await i.get(n);return await i.put(e,n),await r.done,o&&o.fid===e.fid||K(t,e.fid),e}async function X(t){const e=V(t),n=(await Z()).transaction(J,"readwrite");await n.objectStore(J).delete(e),await n.done}async function tt(t,e){const n=V(t),r=(await Z()).transaction(J,"readwrite"),i=r.objectStore(J),o=await i.get(n),a=e(o);return void 0===a?await i.delete(n):await i.put(a,n),await r.done,!a||o&&o.fid===a.fid||K(t,a.fid),a}async function et(t){let e;const n=await tt(t.appConfig,(n=>{const r=function(t){return it(t||{fid:x(),registrationStatus:0})}(n),i=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine){return{installationEntry:e,registrationPromise:Promise.reject(P.create("app-offline"))}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(t,e){try{const n=await async function({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=B(t),i=U(t),o=e.getImmediate({optional:!0});if(o){const t=await o.getHeartbeatsHeader();t&&i.append("x-firebase-client",t)}const a={fid:n,authVersion:"FIS_v2",appId:t.appId,sdkVersion:"w:0.6.4"},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await $((()=>fetch(r,s)));if(c.ok){const t=await c.json();return{fid:t.fid||n,registrationStatus:2,refreshToken:t.refreshToken,authToken:L(t.authToken)}}throw await j("Create Installation",c)}(t,e);return Q(t.appConfig,n)}catch(n){throw D(n)&&409===n.customData.serverCode?await X(t.appConfig):await Q(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}(t,n);return{installationEntry:n,registrationPromise:r}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:nt(t)}:{installationEntry:e}}(t,r);return e=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}async function nt(t){let e=await rt(t.appConfig);for(;1===e.registrationStatus;)await q(100),e=await rt(t.appConfig);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:n}=await et(t);return n||e}return e}function rt(t){return tt(t,(t=>{if(!t)throw P.create("installation-not-found");return it(t)}))}function it(t){return 1===(e=t).registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e}async function ot({appConfig:t,heartbeatServiceProvider:e},n){const r=function(t,{fid:e}){return`${B(t)}/${e}/authTokens:generate`}(t,n),i=F(t,n),o=e.getImmediate({optional:!0});if(o){const t=await o.getHeartbeatsHeader();t&&i.append("x-firebase-client",t)}const a={installation:{sdkVersion:"w:0.6.4",appId:t.appId}},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await $((()=>fetch(r,s)));if(c.ok){return L(await c.json())}throw await j("Generate Auth Token",c)}async function at(t,e=!1){let n;const r=await tt(t.appConfig,(r=>{if(!ct(r))throw P.create("not-registered");const i=r.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+36e5}(t)}(i))return r;if(1===i.requestStatus)return n=async function(t,e){let n=await st(t.appConfig);for(;1===n.authToken.requestStatus;)await q(100),n=await st(t.appConfig);const r=n.authToken;return 0===r.requestStatus?at(t,e):r}(t,e),r;{if(!navigator.onLine)throw P.create("app-offline");const e=function(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}(r);return n=async function(t,e){try{const n=await ot(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Q(t.appConfig,r),n}catch(n){if(!D(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Q(t.appConfig,n)}else await X(t.appConfig);throw n}}(t,e),e}}));return n?await n:r.authToken}function st(t){return tt(t,(t=>{if(!ct(t))throw P.create("not-registered");const e=t.authToken;return 1===(n=e).requestStatus&&n.requestTime+1e4<Date.now()?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t;var n}))}function ct(t){return void 0!==t&&2===t.registrationStatus}async function ut(t,e=!1){const n=t;await async function(t){const{registrationPromise:e}=await et(t);e&&await e}(n);return(await at(n,e)).token}function lt(t){return P.create("missing-app-config-values",{valueName:t})}const ft=t=>{const e=t.getProvider("app").getImmediate(),r=n(e,"installations").getImmediate();return{getId:()=>async function(t){const e=t,{installationEntry:n,registrationPromise:r}=await et(e);return r?r.catch(console.error):at(e).catch(console.error),n.fid}(r),getToken:t=>ut(r,t)}};e(new h("installations",(t=>{const e=t.getProvider("app").getImmediate(),r=function(t){if(!t||!t.options)throw lt("App Configuration");if(!t.name)throw lt("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw lt(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e);return{app:e,appConfig:r,heartbeatServiceProvider:n(e,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),e(new h("installations-internal",ft,"PRIVATE")),t(C,"0.6.4"),t(C,"0.6.4","esm2017");const pt="@firebase/performance",dt=new o("performance","Performance",{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),gt=new class{constructor(t){this.name=t,this._logLevel=p,this._logHandler=g,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in l))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?f[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,l.DEBUG,...t),this._logHandler(this,l.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,l.VERBOSE,...t),this._logHandler(this,l.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,l.INFO,...t),this._logHandler(this,l.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,l.WARN,...t),this._logHandler(this,l.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,l.ERROR,...t),this._logHandler(this,l.ERROR,...t)}}("Performance");let ht,mt,vt,wt;gt.logLevel=l.INFO;class bt{constructor(t){if(this.window=t,!t)throw dt.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(t){this.performance&&this.performance.mark&&this.performance.mark(t)}measure(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)}getEntriesByType(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]}getEntriesByName(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&"undefined"!=typeof navigator&&navigator.cookieEnabled?!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()||(gt.info("IndexedDB is not supported by current browswer"),!1):(gt.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(t,e){if(!this.PerformanceObserver)return;new this.PerformanceObserver((t=>{for(const n of t.getEntries())e(n)})).observe({entryTypes:[t]})}static getInstance(){return void 0===ht&&(ht=new bt(mt)),ht}}function yt(){return vt}function Et(t,e){const n=t.length-e.length;if(n<0||n>1)throw dt.create("invalid String merger input");const r=[];for(let n=0;n<t.length;n++)r.push(t.charAt(n)),e.length>n&&r.push(e.charAt(n));return r.join("")}class _t{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Et("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Et("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===wt&&(wt=new _t),wt}}var It;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"}(It||(It={}));const Tt=["firebase_","google_","ga_"],St=new RegExp("^[a-zA-Z]\\w*$");function kt(){const t=bt.getInstance().navigator;return(null==t?void 0:t.serviceWorker)?t.serviceWorker.controller?2:3:1}function Nt(){switch(bt.getInstance().document.visibilityState){case"visible":return It.VISIBLE;case"hidden":return It.HIDDEN;default:return It.UNKNOWN}}function Rt(){const t=bt.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function At(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.appId;if(!n)throw dt.create("no app id");return n}const Ot={loggingEnabled:!0};function Mt(t,e){const n=function(){const t=bt.getInstance().localStorage;if(!t)return;const e=t.getItem("@firebase/performance/configexpire");if(!(e&&(n=e,Number(n)>Date.now())))return;var n;const r=t.getItem("@firebase/performance/config");if(!r)return;try{return JSON.parse(r)}catch(t){return}}();return n?(Ct(n),Promise.resolve()):function(t,e){return function(t){const e=t.getToken();return e.then((t=>{})),e}(t.installations).then((n=>{const r=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.projectId;if(!n)throw dt.create("no project id");return n}(t.app),i=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.apiKey;if(!n)throw dt.create("no api key");return n}(t.app),o=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,{method:"POST",headers:{Authorization:`FIREBASE_INSTALLATIONS_AUTH ${n}`},body:JSON.stringify({app_instance_id:e,app_instance_id_token:n,app_id:At(t.app),app_version:"0.6.4",sdk_version:"0.0.1"})});return fetch(o).then((t=>{if(t.ok)return t.json();throw dt.create("RC response not ok")}))})).catch((()=>{gt.info("Could not fetch config, will use default configs")}))}(t,e).then(Ct).then((t=>function(t){const e=bt.getInstance().localStorage;if(!t||!e)return;e.setItem("@firebase/performance/config",JSON.stringify(t)),e.setItem("@firebase/performance/configexpire",String(Date.now()+60*_t.getInstance().configTimeToLive*60*1e3))}(t)),(()=>{}))}function Ct(t){if(!t)return t;const e=_t.getInstance(),n=t.entries||{};return void 0!==n.fpr_enabled?e.loggingEnabled="true"===String(n.fpr_enabled):e.loggingEnabled=Ot.loggingEnabled,n.fpr_log_source?e.logSource=Number(n.fpr_log_source):Ot.logSource&&(e.logSource=Ot.logSource),n.fpr_log_endpoint_url?e.logEndPointUrl=n.fpr_log_endpoint_url:Ot.logEndPointUrl&&(e.logEndPointUrl=Ot.logEndPointUrl),n.fpr_log_transport_key?e.transportKey=n.fpr_log_transport_key:Ot.transportKey&&(e.transportKey=Ot.transportKey),void 0!==n.fpr_vc_network_request_sampling_rate?e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):void 0!==Ot.networkRequestsSamplingRate&&(e.networkRequestsSamplingRate=Ot.networkRequestsSamplingRate),void 0!==n.fpr_vc_trace_sampling_rate?e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):void 0!==Ot.tracesSamplingRate&&(e.tracesSamplingRate=Ot.tracesSamplingRate),e.logTraceAfterSampling=Pt(e.tracesSamplingRate),e.logNetworkAfterSampling=Pt(e.networkRequestsSamplingRate),t}function Pt(t){return Math.random()<=t}let Dt,Bt=1;function Lt(t){return Bt=2,Dt=Dt||function(t){return function(){const t=bt.getInstance().document;return new Promise((e=>{if(t&&"complete"!==t.readyState){const n=()=>{"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))}().then((()=>function(t){const e=t.getId();return e.then((t=>{vt=t})),e}(t.installations))).then((e=>Mt(t,e))).then((()=>jt()),(()=>jt()))}(t),Dt}function jt(){Bt=3}let Ut,Ft=3,$t=[],qt=!1;function Ht(t){setTimeout((()=>{if(0!==Ft)return $t.length?void function(){const t=$t.splice(0,1e3),e=t.map((t=>({source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)})));(function(t,e){return function(t){const e=_t.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(t).then((t=>(t.ok||gt.info("Call to Firebase backend failed."),t.json()))).then((t=>{const n=Number(t.nextRequestWaitMillis);let r=1e4;isNaN(n)||(r=Math.max(n,r));const i=t.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&($t=[...e,...$t],gt.info("Retry transport request later.")),Ft=3,Ht(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:_t.getInstance().logSource,log_event:e},t).catch((()=>{$t=[...t,...$t],Ft--,gt.info(`Tries left: ${Ft}.`),Ht(1e4)}))}():Ht(1e4)}),t)}function xt(t){return(...e)=>{!function(t){if(!t.eventTime||!t.message)throw dt.create("invalid cc log");$t=[...$t,t]}({message:t(...e),eventTime:Date.now()})}}function Vt(t,e){Ut||(Ut=xt(zt)),Ut(t,e)}function Wt(t){const e=_t.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&bt.getInstance().requiredApisAvailable()&&(t.isAuto&&Nt()!==It.VISIBLE||(3===Bt?Kt(t):Lt(t.performanceController).then((()=>Kt(t)),(()=>Kt(t)))))}function Kt(t){if(!yt())return;const e=_t.getInstance();e.loggingEnabled&&e.logTraceAfterSampling&&setTimeout((()=>Vt(t,1)),0)}function zt(t,e){return 0===e?function(t){const e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:Gt(t.performanceController.app),network_request_metric:e};return JSON.stringify(n)}(t):function(t){const e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);const n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);const r={application_info:Gt(t.performanceController.app),trace_metric:e};return JSON.stringify(r)}(t)}function Gt(t){return{google_app_id:At(t),app_instance_id:yt(),web_app_info:{sdk_version:"0.6.4",page_url:bt.getInstance().getUrl(),service_worker_status:kt(),visibility_state:Nt(),effective_connection_type:Rt()},application_process_state:0}}const Jt=["_fp","_fcp","_fid"];class Yt{constructor(t,e,n=!1,r){this.performanceController=t,this.name=e,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=bt.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw dt.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw dt.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),Wt(this)}record(t,e,n){if(t<=0)throw dt.create("nonpositive trace startTime",{traceName:this.name});if(e<=0)throw dt.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const t of Object.keys(n.metrics))isNaN(Number(n.metrics[t]))||(this.counters[t]=Math.floor(Number(n.metrics[t])));Wt(this)}incrementMetric(t,e=1){void 0===this.counters[t]?this.putMetric(t,e):this.putMetric(t,this.counters[t]+e)}putMetric(t,e){if(!function(t,e){return!(0===t.length||t.length>100)&&(e&&e.startsWith("_wt_")&&Jt.indexOf(t)>-1||!t.startsWith("_"))}(t,this.name))throw dt.create("invalid custom metric name",{customMetricName:t});this.counters[t]=function(t){const e=Math.floor(t);return e<t&&gt.info(`Metric value should be an Integer, setting the value as : ${e}.`),e}(null!=e?e:0)}getMetric(t){return this.counters[t]||0}putAttribute(t,e){const n=function(t){return!(0===t.length||t.length>40)&&(!Tt.some((e=>t.startsWith(e)))&&!!t.match(St))}(t),r=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&r)this.customAttributes[t]=e;else{if(!n)throw dt.create("invalid attribute name",{attributeName:t});if(!r)throw dt.create("invalid attribute value",{attributeValue:e})}}getAttribute(t){return this.customAttributes[t]}removeAttribute(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(t){this.startTimeUs=t}setDuration(t){this.durationUs=t}calculateTraceMetrics(){const t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(t,e,n,r){const i=bt.getInstance().getUrl();if(!i)return;const o=new Yt(t,"_wt_"+i,!0),a=Math.floor(1e3*bt.getInstance().getTimeOrigin());o.setStartTime(a),e&&e[0]&&(o.setDuration(Math.floor(1e3*e[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd)));if(n){const t=n.find((t=>"first-paint"===t.name));t&&t.startTime&&o.putMetric("_fp",Math.floor(1e3*t.startTime));const e=n.find((t=>"first-contentful-paint"===t.name));e&&e.startTime&&o.putMetric("_fcp",Math.floor(1e3*e.startTime)),r&&o.putMetric("_fid",Math.floor(1e3*r))}Wt(o)}static createUserTimingTrace(t,e){Wt(new Yt(t,e,!1,e))}}function Zt(t,e){const n=e;if(!n||void 0===n.responseStart)return;const r=bt.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),o=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,a=Math.floor(1e3*(n.responseEnd-n.startTime));!function(t){const e=_t.getInstance();if(!e.instrumentationEnabled)return;const n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((()=>Vt(t,0)),0)}({performanceController:t,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:a})}function Qt(t){yt()&&(setTimeout((()=>function(t){const e=bt.getInstance(),n=e.getEntriesByType("navigation"),r=e.getEntriesByType("paint");if(e.onFirstInputDelay){let i=setTimeout((()=>{Yt.createOobTrace(t,n,r),i=void 0}),5e3);e.onFirstInputDelay((e=>{i&&(clearTimeout(i),Yt.createOobTrace(t,n,r,e))}))}else Yt.createOobTrace(t,n,r)}(t)),0),setTimeout((()=>function(t){const e=bt.getInstance(),n=e.getEntriesByType("resource");for(const e of n)Zt(t,e);e.setupObserver("resource",(e=>Zt(t,e)))}(t)),0),setTimeout((()=>function(t){const e=bt.getInstance(),n=e.getEntriesByType("measure");for(const e of n)Xt(t,e);e.setupObserver("measure",(e=>Xt(t,e)))}(t)),0))}function Xt(t,e){const n=e.name;"FB-PERF-TRACE-MEASURE"!==n.substring(0,"FB-PERF-TRACE-MEASURE".length)&&Yt.createUserTimingTrace(t,n)}class te{constructor(t,e){this.app=t,this.installations=e,this.initialized=!1}_init(t){this.initialized||(void 0!==(null==t?void 0:t.dataCollectionEnabled)&&(this.dataCollectionEnabled=t.dataCollectionEnabled),void 0!==(null==t?void 0:t.instrumentationEnabled)&&(this.instrumentationEnabled=t.instrumentationEnabled),bt.getInstance().requiredApisAvailable()?new Promise(((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((t=>{t&&(qt||(Ht(5500),qt=!0),Lt(this).then((()=>Qt(this)),(()=>Qt(this))),this.initialized=!0)})).catch((t=>{gt.info(`Environment doesn't support IndexedDB: ${t}`)})):gt.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(t){_t.getInstance().instrumentationEnabled=t}get instrumentationEnabled(){return _t.getInstance().instrumentationEnabled}set dataCollectionEnabled(t){_t.getInstance().dataCollectionEnabled=t}get dataCollectionEnabled(){return _t.getInstance().dataCollectionEnabled}}function ee(t=r()){t=u(t);return n(t,"performance").getImmediate()}function ne(t,e){t=u(t);const r=n(t,"performance");if(r.isInitialized()){const t=r.getImmediate();if(s(r.getOptions(),null!=e?e:{}))return t;throw dt.create("already initialized")}return r.initialize({options:e})}function re(t,e){return t=u(t),new Yt(t,e)}e(new h("performance",((t,{options:e})=>{const n=t.getProvider("app").getImmediate(),r=t.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw dt.create("FB not default");if("undefined"==typeof window)throw dt.create("no window");!function(t){mt=t}(window);const i=new te(n,r);return i._init(e),i}),"PUBLIC")),t(pt,"0.6.4"),t(pt,"0.6.4","esm2017");export{ee as getPerformance,ne as initializePerformance,re as trace};

//# sourceMappingURL=firebase-performance.js.map
