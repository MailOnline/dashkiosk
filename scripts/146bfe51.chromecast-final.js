!function(a){"use strict";function b(a){a=a||{},this.timeout=a.timeout||3e4,this.heartbeat=null}var c="urn:x-cast:com.deezer.cast.dashkiosk";"https:"===a.location.protocol&&(a.location.href=a.location.href.replace(/^https:/,"http:")),b.prototype.setup=function(){var b=a.cast,d=this;a.addEventListener("message",function(a){return d.ack(a)});var e=30,f=new b.receiver.CastReceiverManager.Config;f.maxInactivity=e,f.statusText="Waiting for an URL",this.castReceiverManager=b.receiver.CastReceiverManager.getInstance(),this.messageBus=this.castReceiverManager.getCastMessageBus(c),this.messageBus.onMessage=function(a){var b=JSON.parse(a.data),c=b.url;d.load(c)},this.castReceiverManager.start(f)};var d=a.document.getElementById("dashboard"),e=a.document.getElementById("loading");b.prototype.load=function(a){console.info("[Dashkiosk/Chromecast] Asked to display URL",a),d.classList.remove("show"),e.classList.add("show"),this.url=a,this.schedule(),d.src=a+"#timeout="+this.timeout,this.castReceiverManager.setApplicationState("Receiver: "+this.url)},b.prototype.deadline=function(a){console.warn("[Dashkiosk/Chromecast] Heartbeat missed, reload"),this.load(a)},b.prototype.ack=function(a){"ready"===a.data&&this.heartbeat&&(console.debug("[Dashkiosk/Chromecast] Heartbeat received"),this.schedule(),d.classList.add("show"),e.classList.remove("show"))},b.prototype.schedule=function(){var a=this;clearTimeout(this.heartbeat),this.heartbeat=setTimeout(function(){a.deadline(a.url)},this.timeout)},a.onload=function(){var a=new b;a.setup()}}(window);