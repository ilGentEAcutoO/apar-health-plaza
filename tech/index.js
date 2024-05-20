const longestCommonPrefix = require("./longestCommonPrefix");

// Example 1
const strs1 = ["flower", "flow", "flight"];
const result1 = longestCommonPrefix(strs1);
console.log("Longest Common Prefix:", result1); // Output: "fl"

// Example 2
const strs2 = ["dog", "racecar", "car"];
const result2 = longestCommonPrefix(strs2);
console.log("Longest Common Prefix:", result2); // Output: ""

// Additional Edge Cases
const strs3 = ["ab", "a"];
const result3 = longestCommonPrefix(strs3);
console.log("Longest Common Prefix:", result3); // Output: "a"

const strs4 = ["", "b"];
const result4 = longestCommonPrefix(strs4);
console.log("Longest Common Prefix:", result4); // Output: ""

const strs5 = ["cir", "car"];
const result5 = longestCommonPrefix(strs5);
console.log("Longest Common Prefix:", result5); // Output: ""

const strs6 = ["ca", "c"];
const result6 = longestCommonPrefix(strs6);
console.log("Longest Common Prefix:", result6); // Output: "c"

const strs7 = ["aa", "a"];
const result7 = longestCommonPrefix(strs7);
console.log("Longest Common Prefix (Edge Case 5):", result7); // Output: "a"