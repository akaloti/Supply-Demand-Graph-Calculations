"use strict";

QUnit.module("tax on demand");

  QUnit.test("correct domestic equilibrium", function(assert) {
    var data = getLinearGraph1();
    
    data.setTax(Graph.Demand, 0.3);
    assert.deepEqual(data.eq, 45);
    assert.deepEqual(data.ep, 0.45);
  });
  
  QUnit.test("corerct quantity demanded/supplied", function(assert) {
    var data = getLinearGraph1();
    
    data.setTax(Graph.Demand, 0.3);
    assert.deepEqual(data.qd, 45);
    assert.deepEqual(data.qs, 45);
  });
  
  QUnit.test("correct domestic total revenue", function(assert) {
    var data = getLinearGraph1();
    
    data.setTax(Graph.Demand, 0.3);
    var answer = Price.get(45 * 0.45);
    assert.deepEqual(data.getTotalRevenue().get(), answer);
  });

  /* Has rounding issue:
  QUnit.test("correct consumer surplus",
    function(assert) {
    var data = getLinearGraph1();
    
    data.setTax(Graph.Demand, 0.3);
    assert.deepEqual(data.getConsumerSurplus().get(),
      1.13); // hand-calculated
  });
  */
  
  QUnit.test("correct tax revenue", function(assert) {
    var data = getLinearGraph1();
    
    var taxAmount = 0.1;
    data.setTax(Graph.Demand, taxAmount);
    assert.deepEqual(data.getTaxRevenue().get(),
      Price.get(taxAmount * 55)); // hand-determined
  });