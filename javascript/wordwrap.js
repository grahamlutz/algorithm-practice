'use strict';
/*
 * This simple coding exercise's goal is to verify your ability to design and
 * code a simple algorithm.
 *
 * We recognize that you can just Google for the answer to this problem,
 * but if you have to do that, you will likely fail the in-person
 * interview since we will do another similar but different exercise then.
 *
 * This exercise is to write a simple word wrap function.  The code takes a
 * string and inserts new-line characters in the places where the line should
 * wrap to avoid exceeding a max line length.  Such a routine would be used by
 * CSS to accomplish the "word-wrap: normal" behavior in a textarea. We have
 * provided the test cases, so all you need to do is code the logic for the
 * Wrap function.
 *
 * This exercise should take no more than an hour.  Neatness and clarity count,
 * so please re-read your code before submitting it.
 */

function wordWrap(input, maxLen) {
    // Base cases
    if (input === null || input === "" || input.length <= maxLen) return input;

    // Avoids side effects
    let string = input;

    for(let i = maxLen; i < input.length; i += maxLen) {
        if (input[i] == ' ') {
            string = replaceCharAt(string, i, '\n');
        } else {
            let j = 1;
            while (input[i] != ' ') {
                // Prevents infinite loop if first word is longer than 10 characters
                if ( (i - j) < 0 ) break;

                if (input[i - j] == ' ') {
                    string = replaceCharAt(string, (i-j), '\n');
                    // Set i to the index that was just replaced
                    // Otherwise, we could replace at index 7 then 
                    // still add maxLen to maxLen to start the next iteration
                    // at (maxLen - 7) too far ahead, making the following line too long. 
                    i = i - j;
                }
                j++;
            }
        }
    }
    return string;
}

function replaceCharAt(string, index, char){
    return string.substr(0,index) + char + string.substr(index+1);
}

// Example test cases, feel free to add more if you like.
// Test case format is: [caseName, input,
//                                 expected]
[
    ["Null",  null,
              null],
    ["Empty", "",
              ""],
    ["Short", "short",
              "short"],
    ["Clean", "This wraps at 10",
              "This wraps\nat 10"],
    ["Hard",  "This is badly written and hard to wrap",
              "This is\nbadly\nwritten\nand hard\nto wrap"],
    ["Long First Word",  "Thisisbadly written and hard to wrap",
              "Thisisbadly\nwritten\nand hard\nto wrap"],
].forEach(function (testCase) {
    // Extract the test case
    var caseName = testCase[0];
    var input = testCase[1];
    var expected = testCase[2];

    // Run the test
    var actual = wordWrap(input, 10);

    // Did it fail?
    if (actual !== expected) {
        console.log("--Failed case " + caseName + ", expected:");
        console.log(expected);
        console.log("--But got:");
        console.log(actual);
        console.log("\n\n");
    }
});
