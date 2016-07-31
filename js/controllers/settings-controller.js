"use strict";

/**
 * Deals with the event handlers that allow the user to change
 * the economic model.
 */
function SettingsController() {
  if (!(this instanceof SettingsController))
    alertAndThrowException(
      "Forgot 'new' before SettingsController constructor");
} // SettingsController()

SettingsController.prototype = {
  constructor : SettingsController,
  
  /**
   * @param economyModel instance of EconomyModel
   * @param textView instance of TextView
   * @param graphView instance of GraphView
   */
  setUpAllHandlers : function(economyModel, textView, graphView) {
    $("#b-world-p").click(function() {
      SettingsController.worldPriceHandler(economyModel, textView, graphView);
    });
  },
};

/**
 * @param economyModel instance of EconomyModel
 * @param textView instance of TextView
 * @param graphView instance of GraphView
 */
SettingsController.worldPriceHandler =
  function(economyModel, textView, graphView) {
  var newWp = parseFloat($("#world-p").val());
  
  if (!newWp || newWp < economyModel.ep) { // if valid input that I can handle
    try {
      economyModel.setWp(newWp);
      
      textView.updateAll(economyModel);
      graphView.updateAll(economyModel);
    }
    catch(err) {
      if (err == "demand extrapolation")
        alert("User error: World price causes extrapolation " +
          "on demand data, so no changes made.")
      else if (err == "supply extrapolation")
        alert("User error: World price causes extrapolation " +
          "on supply data, so no changes made.")
      else
        throw err;
    }
  }
  else { // if valid input that I can't handle
    alert("User Error: Because the developer wasn't particularly " +
          "knowledgeable about economics, a set world " +
          "price must be below the equilibrium price. His apologies.");
  }
};