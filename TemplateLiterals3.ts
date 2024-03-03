/**
 * We start with a list of European countries and their respective phone codes.
 * The list is marked as 'const' to ensure its contents cannot be changed, 
 * making each entry (country and code) a literal type instead of just a string.
 * This precise typing is crucial for the compile-time safety features we'll implement.
 */
const euCountryPhoneCodes = [
    { country: 'Austria', code: '+43' },
    { country: 'Belgium', code: '+32' },
    { country: 'Bulgaria', code: '+359' },
    { country: 'Croatia', code: '+385' },
    { country: 'Cyprus', code: '+357' },
    { country: 'Czech Republic', code: '+420' },
    { country: 'Denmark', code: '+45' },
    { country: 'Slovakia', code: '+421' },
    { country: 'Slovenia', code: '+386' },
    { country: 'Spain', code: '+34' },
    { country: 'Sweden', code: '+46' }
] as const;

/**
 * 'CountryType' extracts the type for country names from our list. It does this by
 * looking at the type of 'euCountryPhoneCodes', picking an element from the array ('number' is used
 * as an index type here), and then accessing the 'country' property of that element.
 * The result is a union type of all possible country names, like 'Austria' | 'Belgium' | ... | 'Sweden'.
 */
type CountryType = typeof euCountryPhoneCodes[number]['country'];

/**
 * Similarly, 'CodeType' extracts the type for the phone codes from our list, 
 * resulting in a union of all possible phone codes, like '+43' | '+32' | ... | '+46'.
 */
type CodeType = typeof euCountryPhoneCodes[number]['code'];

/**
 * 'FormattedNumberType' is a template literal type that constructs a type for formatted phone numbers.
 * It starts with a country code (from our list of codes) and can be followed by any string,
 * representing the rest of the phone number. This ensures that only valid country codes from our list
 * can be used at the start of a formatted phone number.
 */
type FormattedNumberType = `${CodeType}${string}`;

/**
 * 'GetFormattedPhoneNumber' is a function that takes a country name and a phone number as arguments
 * and returns the phone number formatted with the correct country code.
 * 
 * The function first finds the country code corresponding to the given country name.
 * If the country is not found in our list, it throws an error, ensuring runtime safety by preventing
 * the function from proceeding with an undefined or incorrect country code.
 * 
 * Finally, it returns the formatted phone number by concatenating the country code with the provided number.
 * The return type 'FormattedNumberType' ensures that the function can only return a string that matches
 * one of the valid country codes followed by the phone number.
 */
function GetFormattedPhoneNumber(country: CountryType, number: string): FormattedNumberType {
    const countryCode = euCountryPhoneCodes.find(item => item.country === country)?.code;
    if (!countryCode) throw new Error("Invalid country"); // Checks at runtime if the country is valid.

    // return `+1${number}` This will get compile time error since +1 is not a valid phone code here
    return `${countryCode}${number}`; // Correctly formats the phone number with its country code.
}


const formattedNumber = GetFormattedPhoneNumber('Sweden', '731111111'); // Output : +46731111111