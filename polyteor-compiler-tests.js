// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by polyteor-compiler.js.
import { name as packageName } from "meteor/polyteor-compiler";

// Write your tests here!
// Here is an example.
Tinytest.add('polyteor-compiler - example', function (test) {
  test.equal(packageName, "polyteor-compiler");
});
