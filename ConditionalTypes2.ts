/**
 * Define a type 'Locations' that represents a union of specific location strings.
 * Each location is a combination of a city and a country, separated by a slash.
 * This type is used to limit the acceptable values for location-related functions,
 * ensuring that only these predefined locations can be used.
 */
type Locations = 'Gothenburg/Sweden' | 'Berlin/Germany' | 'Istanbul/Turkey';

/**
 * Define a function 'getTimezone' that takes a 'location' parameter of type 'Locations'.
 * This function returns the timezone string associated with the given location.
 * 
 * The function uses a switch statement to check the value of 'location' and return
 * the corresponding timezone. This approach ensures that each case explicitly handles
 * one of the possible location values defined in the 'Locations' type.
 */
function getTimezone(location: Locations): string {
    switch (location) {
        case 'Gothenburg/Sweden':
            return 'Europe/Stockholm'; // Return the timezone for Gothenburg, Sweden
        case 'Berlin/Germany':
            return 'Europe/Berlin'; // Return the timezone for Berlin, Germany
        default:
            /**
             * If none of the defined cases match the 'location', we've encountered an unexpected value.
             * This should not happen if we handle every value in 'Locations' in the cases above.
             * 
             * To enforce this at compile time, we assign 'location' to a constant of type 'never'.
             * Since 'location' should never be anything outside of the defined cases, this assignment
             * will cause a compile-time error if a new location is added to 'Locations' but not handled
             * in the switch statement, reminding us to update the function.
             * 
             * Additionally, we throw a runtime error to handle any unexpected usage when the code runs,
             * providing a clear error message indicating that the location is invalid.
             */
            const compileTimeConstraint: never = location;
            throw new Error("Invalid location");
    }
}

/**
 * Attempt to get the timezone for 'Istanbul/Turkey'. However, in this example,
 * 'Istanbul/Turkey' is not handled in the switch statement of 'getTimezone', leading to a compile-time error
 * because of the assignment to a 'never' type in the default case. This demonstrates how TypeScript can help
 * catch unhandled cases at compile time, provided that the function's implementation correctly utilizes 'never'.
 * 
 * Note: The casting of 'Istanbul/Turkey' as any bypasses TypeScript's static type checking, simulating a scenario
 * where an unhandled case might be passed at runtime. This is generally not recommended but is used here for demonstration.
 */
const istanbulTimezone = getTimezone('Istanbul/Turkey' as any);
