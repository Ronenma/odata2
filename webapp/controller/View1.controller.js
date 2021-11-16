sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/ui/model/json/JSONModel",
			"sap/ui/core/Fragment",
			"sap/m/Token",
			"sap/m/ColumnListItem",
			"sap/m/Label"

		],
		/**
		 * @param {typeof sap.ui.core.mvc.Controller} Controller
		 */
		function (Controller, JSONModel , Fragment, Token , ColumnListItem, Label ) {
			"use strict";
			return Controller.extend("ZODATATEST.odata1.controller.View1", {

						onInit: function () {
							debugger;
							this._oMultiInput = this.getView().byId("multiInput");
							this.oColModel = new sap.ui.model.json.JSONModel();
								this.oColModel.setData({
									cols: [{
											label: "order",
											template: "productCol"
										},
										{
											label: "order type",
											template: "supplierCol"
										},
										{
											label: "text",
											template: "dimensionsCol"
										},
										{
											label: "plant",
											template: "weightCol"
										}

									]


								});
								//oTable.setModel(oColModel, "columns");

								//var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ODATA_NETWORK_SRV");
								//var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_ODATA_NETWORK_SRV/");
								//var oTable = this.byId("pTab1");
								//this._oValueHelpDialog.getTable().setModel(oModel);

								var oData = {
									"networks": {
										"results": [{

												"Aufnr": "901960",
												"Auart": "PS01",
												"Ktext": "Development industrial area  10/A",
												"Werks": "1000"
											},
											{

												"Aufnr": "903659",
												"Auart": "PS01",
												"Ktext": "Refurbishment project",
												"Werks": "1000"
											},
											{

												"Aufnr": "906239",
												"Auart": "PS01",
												"Ktext": "",
												"Werks": "1300"
											},
											{

												"Aufnr": "907480",
												"Auart": "PS01",
												"Ktext": "Diagrama de Rede 907480",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907481",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-01",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907482",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-02",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907483",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-03",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907484",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-04",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907485",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-05",
												"Werks": "SP00"
											},
											{

												"Aufnr": "907486",
												"Auart": "PS01",
												"Ktext": "Elemento PEP P-0002-01-06",
												"Werks": "SP00"
											}
										]
									}
								};

								//oJmodel.loadData("mock/mock.json"); 
								this.oJmodel = new JSONModel(oData);
								debugger;
								//this._oValueHelpDialog.getTable().setModel(oJmodel);




						},
						handleValueHelp: function () {
							debugger;


							Fragment.load({
								name: "ZODATATEST.odata1.view.ValueHelpDialogBasic",
								controller: this
							}).then(function name(oFragment) {
								this._oValueHelpDialog = sap.ui.xmlfragment("ZODATATEST.odata1.view.ValueHelpDialogBasic", this);
								this.getView().addDependent(this._oValueHelpDialog);

								// if (!this._oValueHelpDialog) {

								// this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idinput", {
								// 	supportRanges: true,
								// 	key: "order",
								// 	descriptionKey: "Aufnr",

								// 	ok: function () {},
								// 	cancel: function () {}
								// });



								//var oTable = this._oValueHelpDialog.getTable();

								//oTable.setModel(this.oProductsModel);
								//odata = this.getView().getModel();
								// 	debugger;
								// 	oTable.setModel(oProductsModel);
								// 	//oTable.bindList("/networkSet");
								// 	oTable.bindAggregation("rows", "/networkSet");


								
								this._oValueHelpDialog.getTableAsync().then(function (oTable) {

									oTable.setModel(this.oColModel, "columns");
									oTable.setModel(this.oJmodel);

									//if (oTable.bindRows) {
										//oTable.addColumn(this.oColModel);
										oTable.bindAggregation("rows", "/networks/results");
									//}

									if (oTable.bindItems) {
										oTable.bindAggregation("items", "/networks/results", function () {
											return new ColumnListItem({
												cells: aCols.map(function (column) {
													return new Label({
														text: "{" + column.template + "}"
													});
												})
											});
										});
									}
									this._oValueHelpDialog.update();
								}.bind(this));

								this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
								this._oValueHelpDialog.open();
							}.bind(this));
						},

						//this._oValueHelpDialog.getTable().bindRows("networks>/results}");

						// if (this._oValueHelpDialog.getTable().bindItems) {

						//this._oValueHelpDialog.getTable().bindRows("networks/results");
						// }

						//oTable.setModel(oModel);
						//oTable.bindItems("/networkSet",null,null,null);

						//oTable.bindRows("/networkSet");
						//this._oValueHelpDialog.update();
						// this._oValueHelpDialog.setRangeKeyFields([{
						// 		label: "order",
						// 		key: "Aufnr"
						// 	},
						// 	{
						// 		label: "type",
						// 		key: "Auart"
						// 	}
						// ]);



						//
						// this._oValueHelpDialog.open();

						onValueHelpOkPress: function (oEvent) {
							var aTokens = oEvent.getParameter("tokens");
							this._oMultiInput.setTokens(aTokens);
							this._oValueHelpDialog.close();
						},

						onValueHelpCancelPress: function () {
							this._oValueHelpDialog.close();
						},

						onValueHelpAfterClose: function () {
							this._oValueHelpDialog.destroy();
						},

						_getDefaultTokens: function () {
							var oToken = new Token({
								key: "HT-1001",
								text: "Notebook Basic 17 (HT-1001)"
							});

							return [oToken];
						}
					});
				});