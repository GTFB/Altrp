const LANG_OPTIONS = [
  { value: "aa", title: "Afar", label: "Afaraf", direction: "ltr" },
  { value: "ab", title: "Abkhaz", label: "Аҧсуа", direction: "ltr" },
  { value: "ae", title: "Avestan", label: "Avesta", direction: "ltr" },
  { value: "af", title: "Afrikaans", label: "Afrikaans", direction: "ltr" },
  { value: "ak", title: "Akan", label: "Akan", direction: "ltr" },
  { value: "am", title: "Amharic", label: "አማርኛ", direction: "ltr" },
  { value: "an", title: "Aragonese", label: "Aragonés", direction: "ltr" },
  { value: "ar", title: "Arabic", label: "العربية", direction: "rtl" },
  { value: "as", title: "Assamese", label: "অসমীয়া", direction: "ltr" },
  { value: "av", title: "Avaric", label: "авар мацӀ", direction: "ltr" },
  { value: "ay", title: "Aymara", label: "aymar aru", direction: "ltr" },
  { value: "az", title: "Azerbaijani", label: "azərbaycan dili", direction: "ltr" },
  { value: "ba", title: "Bashkir", label: "башҡорт теле", direction: "ltr" },
  { value: "be", title: "Belarusian", label: "беларуская мова", direction: "ltr" },
  { value: "bg", title: "Bulgarian", label: "български език", direction: "ltr" },
  { value: "bh", title: "Bihari", label: "भोजपुरी", direction: "ltr" },
  { value: "bi", title: "Bislama", label: "Bislama", direction: "ltr" },
  { value: "bm", title: "Bambara", label: "bamanankan", direction: "ltr" },
  { value: "bn", title: "Bengali", label: "বাংলা", direction: "ltr" },
  { value: "bo", title: "Tibetan", label: "བོད་ཡིག", direction: "ltr" },
  { value: "br", title: "Breton", label: "brezhoneg", direction: "ltr" },
  { value: "bs", title: "Bosnian", label: "bosanski jezik", direction: "ltr" },
  { value: "ca", title: "Catalan", label: "català", direction: "ltr" },
  { value: "ce", title: "Chechen", label: "нохчийн мотт", direction: "ltr" },
  { value: "ch", title: "Chamorro", label: "Chamoru", direction: "ltr" },
  { value: "co", title: "Corsican", label: "corsu", direction: "ltr" },
  { value: "cr", title: "Cree", label: "ᓀᐦᐃᔭᐍᐏᐣ", direction: "ltr" },
  { value: "cs", title: "Czech", label: "čeština", direction: "ltr" },
  { value: "cu", title: "Church Slavic", label: "словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ", direction: "ltr" },
  { value: "cv", title: "Chuvash", label: "чӑваш чӗлхи", direction: "ltr" },
  { value: "cy", title: "Welsh", label: "Cymraeg", direction: "ltr" },
  { value: "da", title: "Danish", label: "dansk", direction: "ltr" },
  { value: "de", title: "German", label: "Deutsch", direction: "ltr" },
  { value: "dv", title: "Divehi", label: "ދިވެހި", direction: "rtl" },
  { value: "dz", title: "Dzongkha", label: "རྫོང་ཁ", direction: "ltr" },
  { value: "ee", title: "Ewe", label: "Eʋegbe", direction: "ltr" },
  { value: "el", title: "Greek", label: "Ελληνικά", direction: "ltr" },
  { value: "en", title: "English", label: "English", direction: "ltr" },
  { value: "eo", title: "Esperanto", label: "Esperanto", direction: "ltr" },
  { value: "es", title: "Spanish", label: "Español", direction: "ltr" },
  { value: "et", title: "Estonian", label: "eesti", direction: "ltr" },
  { value: "eu", title: "Basque", label: "euskara", direction: "ltr" },
  { value: "fa", title: "Persian", label: "فارسی", direction: "rtl" },
  { value: "ff", title: "Fula", label: "Fulfulde", direction: "ltr" },
  { value: "fi", title: "Finnish", label: "suomi", direction: "ltr" },
  { value: "fj", title: "Fijian", label: "Na Vosa Vakaviti", direction: "ltr" },
  { value: "fo", title: "Faroese", label: "føroyskt", direction: "ltr" },
  { value: "fr", title: "French", label: "français", direction: "ltr" },
  { value: "fy", title: "Frisian", label: "Frysk", direction: "ltr" },
  { value: "ga", title: "Irish", label: "Gaeilge", direction: "ltr" },
  { value: "gd", title: "Scottish Gaelic", label: "Gàidhlig", direction: "ltr" },
  { value: "gl", title: "Galician", label: "galego", direction: "ltr" },
  { value: "gn", title: "Guarani", label: "Avañe'ẽ", direction: "ltr" },
  { value: "gu", title: "Gujarati", label: "ગુજરાતી", direction: "ltr" },
  { value: "gv", title: "Manx", label: "Gaelg", direction: "ltr" },
  { value: "ha", title: "Hausa", label: "Hausa", direction: "ltr" },
  { value: "he", title: "Hebrew", label: "עברית", direction: "rtl" },
  { value: "hi", title: "Hindi", label: "हिन्दी", direction: "ltr" },
  { value: "ho", title: "Hiri Motu", label: "Hiri Motu", direction: "ltr" },
  { value: "hr", title: "Croatian", label: "hrvatski jezik", direction: "ltr" },
  { value: "ht", title: "Haitian Creole", label: "Kreyòl ayisyen", direction: "ltr" },
  { value: "hu", title: "Hungarian", label: "Magyar", direction: "ltr" },
  { value: "hy", title: "Armenian", label: "Հայերեն", direction: "ltr" },
  { value: "hz", title: "Herero", label: "Otjiherero", direction: "ltr" },
  { value: "ia", title: "Interlingua", label: "Interlingua", direction: "ltr" },
  { value: "id", title: "Indonesian", label: "Bahasa Indonesia", direction: "ltr" },
  { value: "ie", title: "Interlingue", label: "Interlingue", direction: "ltr" },
  { value: "ig", title: "Igbo", label: "Asụsụ Igbo", direction: "ltr" },
  { value: "ii", title: "Sichuan Yi", label: "ꆈꌠꁱꂷ", direction: "ltr" },
  { value: "ik", title: "Inupiaq", label: "Iñupiaq", direction: "ltr" },
  { value: "io", title: "Ido", label: "Ido", direction: "ltr" },
  { value: "is", title: "Icelandic", label: "Íslenska", direction: "ltr" },
  { value: "it", title: "Italian", label: "Italiano", direction: "ltr" },
  { value: "iu", title: "Inuktitut", label: "ᐃᓄᒃᑎᑐᑦ", direction: "ltr" },
  { value: "ja", title: "Japanese", label: "日本語", direction: "ltr" },
  { value: "jv", title: "Javanese", label: "Basa Jawa", direction: "ltr" },
  { value: "ka", title: "Georgian", label: "ქართული", direction: "ltr" },
  { value: "kg", title: "Kongo", label: "Kikongo", direction: "ltr" },
  { value: "ki", title: "Kikuyu", label: "Gĩkũyũ", direction: "ltr" },
  { value: "kj", title: "Kuanyama", label: "Kwanyama", direction: "ltr" },
  { value: "kk", title: "Kazakh", label: "Қазақ тілі", direction: "ltr" },
  { value: "kl", title: "Greenlandic", label: "kalaallisut", direction: "ltr" },
  { value: "km", title: "Khmer", label: "ភាសាខ្មែរ", direction: "ltr" },
  { value: "kn", title: "Kannada", label: "ಕನ್ನಡ", direction: "ltr" },
  { value: "ko", title: "Korean", label: "한국어", direction: "ltr" },
  { value: "kr", title: "Kanuri", label: "Kanuri", direction: "ltr" },
  { value: "ks", title: "Kashmiri", label: "कश्मीरी", direction: "rtl" },
  { value: "ku", title: "Kurdish", label: "Kurdî", direction: "rtl" },
  { value: "kv", title: "Komi", label: "коми кыв", direction: "ltr" },
  { value: "kw", title: "Cornish", label: "Kernewek", direction: "ltr" },
  { value: "ky", title: "Kyrgyz", label: "Кыргызча", direction: "ltr" },
  { value: "la", title: "Latin", label: "Latine", direction: "ltr" },
  { value: "lb", title: "Luxembourgish", label: "Lëtzebuergesch", direction: "ltr" },
  { value: "lg", title: "Ganda", label: "Luganda", direction: "ltr" },
  { value: "li", title: "Limburgish", label: "Limburgs", direction: "ltr" },
  { value: "ln", title: "Lingala", label: "Lingála", direction: "ltr" },
  { value: "lo", title: "Lao", label: "ພາສາລາວ", direction: "ltr" },
  { value: "lt", title: "Lithuanian", label: "lietuvių kalba", direction: "ltr" },
  { value: "lu", title: "Luba-Katanga", label: "Tshiluba", direction: "ltr" },
  { value: "lv", title: "Latvian", label: "latviešu valoda", direction: "ltr" },
  { value: "mg", title: "Malagasy", label: "Malagasy fiteny", direction: "ltr" },
  { value: "mh", title: "Marshallese", label: "Kajin M̧ajeļ", direction: "ltr" },
  { value: "mi", title: "Maori", label: "te reo Māori", direction: "ltr" },
  { value: "mk", title: "Macedonian", label: "македонски јазик", direction: "ltr" },
  { value: "ml", title: "Malayalam", label: "മലയാളം", direction: "ltr" },
  { value: "mn", title: "Mongolian", label: "Монгол хэл", direction: "ltr" },
  { value: "mr", title: "Marathi", label: "मराठी", direction: "ltr" },
  { value: "ms", title: "Malay", label: "بهاس ملايو", direction: "ltr" },
  { value: "mt", title: "Maltese", label: "Malti", direction: "ltr" },
  { value: "my", title: "Burmese", label: "ဗမာစာ", direction: "ltr" },
  { value: "na", title: "Nauru", label: "Ekakairũ Naoero", direction: "ltr" },
  { value: "nb", title: "Norwegian Bokmål", label: "Norsk bokmål", direction: "ltr" },
  { value: "nd", title: "Northern Ndebele", label: "isiNdebele", direction: "ltr" },
  { value: "ne", title: "Nepali", label: "नेपाली", direction: "ltr" },
  { value: "ng", title: "Ndonga", label: "Owambo", direction: "ltr" },
  { value: "nl", title: "Dutch", label: "Nederlands", direction: "ltr" },
  { value: "nn", title: "Norwegian Nynorsk", label: "Norsk nynorsk", direction: "ltr" },
  { value: "no", title: "Norwegian", label: "Norsk", direction: "ltr" },
  { value: "nr", title: "Southern Ndebele", label: "isiNdebele", direction: "ltr" },
  { value: "nv", title: "Navajo", label: "Diné bizaad", direction: "ltr" },
  { value: "ny", title: "Chichewa", label: "chiCheŵa", direction: "ltr" },
  { value: "oc", title: "Occitan", label: "occitan", direction: "ltr" },
  { value: "oj", title: "Ojibwa", label: "ᐊᓂᔑᓈᐯᒧᐎᓐ", direction: "ltr" },
  { value: "om", title: "Oromo", label: "Afaan Oromoo", direction: "ltr" },
  { value: "or", title: "Oriya", label: "ଓଡ଼ିଆ", direction: "ltr" },
  { value: "os", title: "Ossetian", label: "ирон æвзаг", direction: "ltr" },
  { value: "pa", title: "Punjabi", label: "ਪੰਜਾਬੀ", direction: "ltr" },
  { value: "pi", title: "Pali", label: "पालि", direction: "ltr" },
  { value: "pl", title: "Polish", label: "Polski", direction: "ltr" },
  { value: "ps", title: "Pashto", label: "پښتو", direction: "rtl" },
  { value: "pt", title: "Portuguese", label: "Português", direction: "ltr" },
  { value: "qu", title: "Quechua", label: "Runa Simi", direction: "ltr" },
  { value: "rm", title: "Romansh", label: "rumantsch grischun", direction: "ltr" },
  { value: "rn", title: "Kirundi", label: "Ikirundi", direction: "ltr" },
  { value: "ro", title: "Romanian", label: "limba română", direction: "ltr"},
  { value: "ru", title: "Russian", label: "Русский", direction: "ltr" },
  { value: "rw", title: "Kinyarwanda", label: "Kinyarwanda", direction: "ltr" },
  { value: "sa", title: "Sanskrit", label: "संस्कृतम्", direction: "ltr" },
  { value: "sc", title: "Sardinian", label: "sardu", direction: "ltr" },
  { value: "sd", title: "Sindhi", label: "सिन्धी", direction: "rtl" },
  { value: "se", title: "Northern Sami", label: "Davvisámegiella", direction: "ltr" },
  { value: "sg", title: "Sango", label: "yângâ tî sängö", direction: "ltr" },
  { value: "si", title: "Sinhala", label: "සිංහල", direction: "ltr" },
  { value: "sk", title: "Slovak", label: "slovenčina", direction: "ltr" },
  { value: "sl", title: "Slovenian", label: "slovenščina", direction: "ltr" },
  { value: "sm", title: "Samoan", label: "gagana fa'a Samoa", direction: "ltr" },
  { value: "sn", title: "Shona", label: "chiShona", direction: "ltr" },
  { value: "so", title: "Somali", label: "Soomaaliga", direction: "ltr" },
  { value: "sq", title: "Albanian", label: "Shqip", direction: "ltr" },
  { value: "sr", title: "Serbian", label: "српски језик", direction: "ltr" },
  { value: "ss", title: "Swati", label: "SiSwati", direction: "ltr" },
  { value: "st", title: "Southern Sotho", label: "Sesotho", direction: "ltr" },
  { value: "su", title: "Sundanese", label: "Basa Sunda", direction: "ltr" },
  { value: "sv", title: "Swedish", label: "svenska", direction: "ltr" },
  { value: "sw", title: "Swahili", label: "Kiswahili", direction: "ltr" },
  { value: "ta", title: "Tamil", label: "தமிழ்", direction: "ltr" },
  { value: "te", title: "Telugu", label: "తెలుగు", direction: "ltr" },
  { value: "tg", title: "Tajik", label: "тоҷикӣ", direction: "ltr" },
  { value: "th", title: "Thai", label: "ไทย", direction: "ltr" },
  { value: "ti", title: "Tigrinya", label: "ትግርኛ", direction: "ltr" },
  { value: "tk", title: "Turkmen", label: "Türkmen", direction: "ltr" },
  { value: "tl", title: "Tagalog", label: "Wikang Tagalog", direction: "ltr" },
  { value: "tn", title: "Tswana", label: "Setswana", direction: "ltr" },
  { value: "to", title: "Tonga", label: "faka Tonga", direction: "ltr" },
  { value: "tr", title: "Turkish", label: "Türkçe", direction: "ltr" },
  { value: "ts", title: "Tsonga", label: "Xitsonga", direction: "ltr" },
  { value: "tt", title: "Tatar", label: "татарча", direction: "ltr" },
  { value: "tw", title: "Twi", label: "Twi", direction: "ltr" },
  { value: "ty", title: "Tahitian", label: "Reo Tahiti", direction: "ltr" },
  { value: "ug", title: "Uyghur", label: "ئۇيغۇرچە", direction: "rtl" },
  { value: "uk", title: "Ukrainian", label: "українська мова", direction: "ltr" },
  { value: "ur", title: "Urdu", label: "اردو", direction: "rtl" },
  { value: "uz", title: "Uzbek", label: "zbek", direction: "ltr" },
  { value: "ve", title: "Venda", label: "Tshivenḓa", direction: "ltr" },
  { value: "vi", title: "Vietnamese", label: "Tiếng Việt", direction: "ltr" },
  { value: "vo", title: "Volapük", label: "Volapük", direction: "ltr" },
  { value: "wa", title: "Walloon", label: "Walon", direction: "ltr" },
  { value: "wo", title: "Wolof", label: "Wollof", direction: "ltr" },
  { value: "xh", title: "Xhosa", label: "isiXhosa", direction: "ltr" },
  { value: "yi", title: "Yiddish", label: "ייִדיש", direction: "rtl" },
  { value: "yo", title: "Yoruba", label: "Yorùbá", direction: "ltr" },
  { value: "za", title: "Zhuang", label: "Cuengh", direction: "ltr" },
  { value: "zh", title: "Chinese", label: "中文", direction: "ltr" },
  { value: "zu", title: "Zulu", label: "isiZulu", direction: "ltr" }
]

export default LANG_OPTIONS