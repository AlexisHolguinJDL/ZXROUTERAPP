sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.idom.zxrouterbtp.controller.Main", {
		onInit: function () {
			this.getRouter().getRoute("RouteMain").attachPatternMatched(this._onViewMatched, this);
		},
		_onViewMatched: function (oEvent) {
			var sIsClient = "";
			var sLanguage = jQuery.sap.getUriParameters().get("sap-language");
			if (!sLanguage) {
				sLanguage = window["sap-ushell-config"].startupConfig.language;
			}
			if ((oEvent.getParameter("arguments") && oEvent.getParameter("arguments").IsClient) || jQuery.sap.getUriParameters().get("IsClient") ||
				window.location.hash.indexOf("IsClient") > 0) {
				if (oEvent.getParameter("arguments") && oEvent.getParameter("arguments").IsClient) {
					sIsClient = oEvent.getParameter("arguments").IsClient;
				} else if (jQuery.sap.getUriParameters().get("IsClient")) {
					sIsClient = jQuery.sap.getUriParameters().get("IsClient");
				} else {
					sIsClient = window.location.hash.substring(window.location.hash.indexOf("IsClient"));
					sIsClient = this.getUrlParameter(sIsClient, "IsClient");
				}
			}
			if ((oEvent.getParameter("arguments") && oEvent.getParameter("arguments").IdApp) || jQuery.sap.getUriParameters().get("IdApp") ||
				window.location.hash.indexOf("IdApp") > 0) {
				var sIdApp = "";
				if (oEvent.getParameter("arguments") && oEvent.getParameter("arguments").IdApp) {
					sIdApp = oEvent.getParameter("arguments").IdApp;
				} else if (jQuery.sap.getUriParameters().get("IdApp")) {
					sIdApp = jQuery.sap.getUriParameters().get("IdApp");
				} else {
					sIdApp = window.location.hash.substring(window.location.hash.indexOf("IdApp"));
					sIdApp = this.getUrlParameter(sIdApp, "IdApp");
				}
				var sDomain = ".dispatcher.eu3.hana.ondemand.com",
					sIdDev = "c3563wjipz",
					sIdQas = "zn8v2t19df",
					sIdPrd = "s7e5f2f6b",
					sUrl = "";
				if (window.location.href.indexOf("erp.idom.com") >= 0) {
					sUrl = "https://" + sIdApp + "-" + sIdPrd + sDomain;
				} else if (window.location.href.indexOf("sapqas.idom.com") >= 0) {
					sUrl = "https://" + sIdApp + "-" + sIdQas + sDomain;
				} else {
					sUrl = "https://" + sIdApp + "-" + sIdDev + sDomain;
				}
				if (sIsClient.length > 0) {
					//debugger;
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
			} else {
				MessageBox.error(this.getI18n().getText("errorOpenApp"), {
					onClose: function () {
						this.onNavBack();
					}.bind(this)
				});
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