sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/idom/zxrouterbtp/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.idom.zxrouterbtp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var sIsClient = "";
			var sIdApp = "";
			var sIsAriba = "";
			var sLanguage = jQuery.sap.getUriParameters().get("sap-language");
			if (!sLanguage) {
				sLanguage = window["sap-ushell-config"].startupConfig.language;
			}
			if (jQuery.sap.getUriParameters().get("IsClient") || window.location.hash.indexOf("IsClient") > 0) {
				if (jQuery.sap.getUriParameters().get("IsClient")) {
					sIsClient = jQuery.sap.getUriParameters().get("IsClient");
				} else {
					sIsClient = window.location.hash.substring(window.location.hash.indexOf("IsClient"));
					sIsClient = this.getUrlParameter(sIsClient, "IsClient");
				}
			}
			if (jQuery.sap.getUriParameters().get("IdApp") || window.location.hash.indexOf("IdApp") > 0) {
				if (jQuery.sap.getUriParameters().get("IdApp")) {
					sIdApp = jQuery.sap.getUriParameters().get("IdApp");
				} else {
					sIdApp = window.location.hash.substring(window.location.hash.indexOf("IdApp"));
					sIdApp = this.getUrlParameter(sIdApp, "IdApp");
				}
				if (sIdApp) {
					var sDomain = ".dispatcher.eu3.hana.ondemand.com",
						sIdDev = "c3563wjipz",
						sIdQas = "zn8v2t19df",
						sIdPrd = "s7e5f2f6b",
						sUrl = "https://" + sIdApp + "-";
					if (window.location.href.indexOf("erp.idom.com") >= 0) {
						sUrl = sUrl + sIdPrd + sDomain;
					} else if (window.location.href.indexOf("sapqas.idom.com") >= 0) {
						sUrl = sUrl + sIdQas + sDomain;
					} else {
						sUrl = sUrl + sIdDev + sDomain;
					}
					if (sIsClient.length > 0) {
						sDomain = ".idom.com:4300/#/";
						if (sLanguage.toUpperCase() === "ES") {
							sDomain = sDomain + "es/"
						} else {
							sDomain = sDomain + "en/"
						}
						sIdDev = "sapspdev";
						sIdQas = "sapspqas";
						sIdPrd = "sapspprd";
						sIdApp = sIdApp.replaceAll("%20", "/");
						if (window.location.href.indexOf("erp.idom.com") >= 0) {
							sUrl = "https://" + sIdPrd + sDomain + sIdApp;
						} else if (window.location.href.indexOf("sapqas.idom.com") >= 0) {
							sUrl = "https://" + sIdQas + sDomain + sIdApp;
						} else {
							sUrl = "https://" + sIdDev + sDomain + sIdApp;
						}
					}

					window.location.replace(sUrl);
				}
			}
			if (jQuery.sap.getUriParameters().get("IsAriba") || window.location.hash.indexOf("IsAriba") > 0) {
				sUrl = "";
				if (jQuery.sap.getUriParameters().get("IsAriba")) {
					sIsAriba = jQuery.sap.getUriParameters().get("IsAriba");
				} else {
					sIsAriba = window.location.hash.substring(window.location.hash.indexOf("IsAriba"));
					sIsAriba = this.getUrlParameter(sIsAriba, "IsAriba");
				}
				if (window.location.href.indexOf("erp.idom.com") >= 0) {
					//https: //s1-eu.ariba.com/Sourcing/Main/ad/loginPage/SSOActions?awsso_ap=ACM&realm=idom&awsr=true
					sUrl = "https://" + "s1-eu.ariba.com/Sourcing/Main/ad/loginPage/SSOActions?awsso_ap=ACM&realm=idom&awsr=true";
				} else if (window.location.href.indexOf("sapqas.idom.com") >= 0) {
					sUrl = "https://" + "s1-eu.ariba.com/Sourcing/Main/ad/loginPage/SSOActions?awsso_ap=ACM&realm=idom-t&awsr=true";
				} else {
					alert("No es posible acceder a la aplicación");
				}
				window.location.replace(sUrl);
			}
		},
		getUrlParameter: function (sUrl, sIdParam) {
			var sURLVariables = sUrl.split('&');
			for (var i = 0; i < sURLVariables.length; i++) {
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sIdParam) {
					return sParameterName[1];
				}
			}
			return false;
		}
	});
});