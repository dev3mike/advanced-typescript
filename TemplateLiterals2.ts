/**
 * First, let's define the types of gap properties we can configure on an element. 
 * In CSS, the two main types of gaps we can adjust are 'padding' and 'margin'. 
 * By specifying these as types, we make sure our configuration can only use these terms,
 * preventing typos and unsupported values.
 */
type ElementGapType = 'padding' | 'margin';

/**
 * Next, we define the positions where these gap types can be applied. 
 * In CSS, both 'margin' and 'padding' can be applied to the 'top', 'bottom', 'left', or 'right' sides of an element. 
 * Defining these positions ensures that our configuration will only include these specific sides,
 * again avoiding unsupported values.
 */
type Positions = 'top' | 'bottom' | 'left' | 'right';

/**
 * Using template literals, we now combine the gap types and positions to create all possible CSS property names 
 * for margin and padding. This includes properties like 'margin-top' or 'padding-left'. 
 * The template also includes the gap types by themselves, allowing for shorthand properties like 'margin' or 'padding',
 * which apply to all four sides of an element.
 */
type GapCssKeys = `${ElementGapType}` | `${ElementGapType}-${Positions}`;

/**
 * For the values of these properties, we support several units of measurement, such as 'px', 'rem', 'em', 'vh', 'vw', and '%'. 
 * By defining these units, we ensure that the configuration values are always accompanied by a valid unit,
 * making our CSS values typesafe and consistent.
 */
type SizeUnits = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';

/**
 * Here, we define a type for the CSS values, combining a number with one of the valid units.
 * This allows for values like '25px' or '10%', ensuring that each value is correctly formatted for CSS.
 */
type SizeCssValues = `${number}${SizeUnits}`;

/**
 * Now, we use a mapped type to create an object type that can have any of the previously defined CSS property names as keys,
 * and their corresponding values must follow the format defined by `SizeCssValues`.
 * This object type represents the styles for an element, ensuring all property names and their values are valid and typesafe.
 */
type GapCssProp = {
    [Key in GapCssKeys]?: SizeCssValues
}

/**
 * Finally, we demonstrate how to use this configuration with an example. 
 * Here, we're creating a style configuration for a 'div' element, specifying the 'margin' and 'padding-top' properties.
 * The types ensure that these properties are spelled correctly and that their values are in a valid format.
 */
const divElement: GapCssProp = {
    margin: '25px',       // Sets the margin on all sides to 25px.
    "padding-top": '10%'  // Sets the top padding to 10% of the containing element's height.
}
