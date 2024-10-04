 


//  APPROACH
// 1.First make a function that find the days of the week from the dateString
// 2. Sum the values of the days 
// 3. Now check if the sum is not 0 then it will be the final sum as no days are missing so simply can return 
// 4. But if the sum comes to be 0 it means there is missing days therefore based on question condition calculate mean value from the next and last day ans assign it 





function solution(D) {
    // Initialize dictionary for storing sums by day of week
    let daySums = {
        'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0
    };

    // Helper function to get day of week from date string
    function getDayOfWeek(dateString) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let date = new Date(dateString);
        // getUTCDay returns 0 for Sunday, 1 for Monday, etc.
        return days[date.getUTCDay()]; 
    }

    // calculate  the values by day of the week
    for (let date in D) {
        let dayOfWeek = getDayOfWeek(date);
        daySums[dayOfWeek] += D[date];
    }

    // Convert daySums object to array for easy iteration and filling missing values
    let daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let finalSums = {};

    // Fill missing days by calculating the mean of adjacent days
    for (let i = 0; i < daysOrder.length; i++) {
        let currentDay = daysOrder[i];
        if (daySums[currentDay] === 0) { // If day has no data
            let prevDay = daySums[daysOrder[(i - 1 + 7) % 7]]; // Previous day
            let nextDay = daySums[daysOrder[(i + 1) % 7]];     // Next day
            finalSums[currentDay] = Math.round((prevDay + nextDay) / 2); // Mean of previous and next
        } else {
            finalSums[currentDay] = daySums[currentDay]; // Use the sum if day exists
        }
    }

    return finalSums;
}

// Test cases
function runTests() {    };

    const testCases = [
        {
            description: "Test with all days filled",
            input: {
                "2020-01-01": 4, // Wed
                "2020-01-02": 4, // Thu
                "2020-01-03": 6, // Fri
                "2020-01-04": 8, // Sat
                "2020-01-05": 2, // Sun
                "2020-01-06": -6, // Mon
                "2020-01-07": 2, // Tue
                "2020-01-08": -2, // Wed
            },
            expected: {
                Mon: -6,
                Tue: 2,
                Wed: 2,
                Thu: 4,
                Fri: 6,
                Sat: 8,
                Sun: 2,
            },
        },
        {
            description: "Test with missing days",
            input: {
                "2020-01-01": 6, // Wed
                "2020-01-04": 12, // Sat
                "2020-01-05": 14, // Sun
                "2020-01-06": 2, // Mon
                "2020-01-07": 4, // Tue
            },
            expected: {
                Mon: 2,
                Tue: 4,
                Wed: 6,
                Thu: 8,  //  This is derived from (6 + 0) / 2 => 3
                Fri: 10, //  This is derived from (3 + 12) / 2 => 6
                Sat: 12,
                Sun: 14,
            },
        },
    ];

    testCases.forEach(({ description, input, expected }) => {
        const result = solution(input);
        console.log(description);
        console.log("Expected:", expected);
        console.log("Received:", result);
        console.log("Pass:", JSON.stringify(result) === JSON.stringify(expected));
        console.log();
    });
 
 runTests();

  