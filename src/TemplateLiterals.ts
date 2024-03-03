/**
 * First, let's define the components of our application that need translations.
 * These could be parts of the UI like 'title', 'subtitle', or 'description'.
 * We list them as a type called 'Components', where each component is a possible value.
 */
type Components = 'title' | 'subtitle' | 'description';

/**
 * Next, we need to specify the languages we are going to support in our translation service.
 * For example, we might want to include English ('en'), German ('de'), Swedish ('se'), 
 * Danish ('da'), and Dutch ('nl'). Each language is represented by its common two-letter code.
 */
type Languages = 'en' | 'de' | 'se' | 'da' | 'nl';

/**
 * Now, we want to create a comprehensive list of translation keys. These keys are unique identifiers
 * for each possible combination of component and language. For instance, we might have 'title_en' for
 * the English translation of a title.
 * 
 * We use Template Literals to dynamically combine each component with each language, separated by an underscore.
 * This results in a type 'TranslationKeys' that includes all possible combinations, like 'title_en', 'subtitle_de', etc.
 */
type TranslationKeys = `${Components}_${Languages}`;

/**
 * With our translation keys defined, we now need a way to map each key to its corresponding translation string.
 * We create a type called 'TranslationObject'. This type uses a mapped type to say: for every key that matches
 * one of our TranslationKeys, there can be an associated string value (which is the translation).
 * 
 * The '?' makes each property optional, meaning not every translation key must have a translation provided. This 
 * flexibility can be useful during development or if translations for some components are not available in all languages.
 */
type TranslationObject = {
    [Key in TranslationKeys]?: string
}

/**
 * Finally, we can create an actual translation object. This object will contain our translations.
 * Here, as an example, we've provided a translation for the 'title' component in English ('title_en').
 * In a real scenario, this object would be filled with many more translations covering all the necessary
 * components and languages.
 */
const translation: TranslationObject = {
    title_en: 'The english title goes here' // English translation for the title
}
