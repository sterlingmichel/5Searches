/* global Mongo */

wrapAsync = (Meteor.wrapAsync)? Meteor.wrapAsync : Meteor._wrapAsync;

Mongo.Collection.prototype.group = function(keys, condition, initial, reduce, finalize, command, options, callback) {
  var coll;
  if (this.rawCollection) {
    // >= Meteor 1.0.4
    coll = this.rawCollection();
  } else {
	// < Meteor 1.0.4
    coll = this._getCollection();
  }

  return wrapAsync(coll.group.bind(coll))(keys, condition, initial, reduce, finalize, command, options, callback);
}; 

//
//Mongo.Collection.prototype.aggregate = function(pipelines, options) {
//  var coll;
//  if (this.rawCollection) {
//    // >= Meteor 1.0.4
//    coll = this.rawCollection();
//  } else {
//	// < Meteor 1.0.4
//    coll = this._getCollection();
//  }
//  return wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
//};