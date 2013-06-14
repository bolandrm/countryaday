countries.filter('expandLanguages', function() {
  var langCodes;

  langCodes = {
    "ab": "Abkhaz",
    "aa": "Afar",
    "af": "Afrikaans",
    "ak": "Akan",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "an": "Aragonese",
    "hy": "Armenian",
    "as": "Assamese",
    "av": "Avaric",
    "ae": "Avestan",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "bm": "Bambara",
    "ba": "Bashkir",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bh": "Bihari",
    "bi": "Bislama",
    "bs": "Bosnian",
    "br": "Breton",
    "bg": "Bulgarian",
    "my": "Burmese",
    "ca": "Catalan; Valencian",
    "ch": "Chamorro",
    "ce": "Chechen",
    "ny": "Chichewa; Chewa; Nyanja",
    "zh": "Chinese",
    "cv": "Chuvash",
    "kw": "Cornish",
    "co": "Corsican",
    "cr": "Cree",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "dv": "Divehi; Dhivehi; Maldivian;",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "ee": "Ewe",
    "fo": "Faroese",
    "fj": "Fijian",
    "fi": "Finnish",
    "fr": "French",
    "ff": "Fula; Fulah; Pulaar; Pular",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek, Modern",
    "gn": "Guaraní",
    "gu": "Gujarati",
    "ht": "Haitian; Haitian Creole",
    "ha": "Hausa",
    "he": "Hebrew (modern)",
    "hz": "Herero",
    "hi": "Hindi",
    "ho": "Hiri Motu",
    "hu": "Hungarian",
    "ia": "Interlingua",
    "id": "Indonesian",
    "ie": "Interlingue",
    "ga": "Irish",
    "ig": "Igbo",
    "ik": "Inupiaq",
    "io": "Ido",
    "is": "Icelandic",
    "it": "Italian",
    "iu": "Inuktitut",
    "ja": "Japanese",
    "jv": "Javanese",
    "kl": "Kalaallisut, Greenlandic",
    "kn": "Kannada",
    "kr": "Kanuri",
    "ks": "Kashmiri",
    "kk": "Kazakh",
    "km": "Khmer",
    "ki": "Kikuyu, Gikuyu",
    "rw": "Kinyarwanda",
    "ky": "Kirghiz, Kyrgyz",
    "kv": "Komi",
    "kg": "Kongo",
    "ko": "Korean",
    "ku": "Kurdish",
    "kj": "Kwanyama, Kuanyama",
    "la": "Latin",
    "lb": "Luxembourgish, Letzeburgesch",
    "lg": "Luganda",
    "li": "Limburgish, Limburgan, Limburger",
    "ln": "Lingala",
    "lo": "Lao",
    "lt": "Lithuanian",
    "lu": "Luba-Katanga",
    "lv": "Latvian",
    "gv": "Manx",
    "mk": "Macedonian",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Māori",
    "mr": "Marathi (Marāṭhī)",
    "mh": "Marshallese",
    "mn": "Mongolian",
    "na": "Nauru",
    "nv": "Navajo, Navaho",
    "nb": "Norwegian Bokmål",
    "nd": "North Ndebele",
    "ne": "Nepali",
    "ng": "Ndonga",
    "nn": "Norwegian Nynorsk",
    "no": "Norwegian",
    "ii": "Nuosu",
    "nr": "South Ndebele",
    "oc": "Occitan",
    "oj": "Ojibwe, Ojibwa",
    "cu": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
    "om": "Oromo",
    "or": "Oriya",
    "os": "Ossetian, Ossetic",
    "pa": "Panjabi, Punjabi",
    "pi": "Pāli",
    "fa": "Persian",
    "pl": "Polish",
    "ps": "Pashto, Pushto",
    "pt": "Portuguese",
    "qu": "Quechua",
    "rm": "Romansh",
    "rn": "Kirundi",
    "ro": "Romanian, Moldavian, Moldovan",
    "ru": "Russian",
    "sa": "Sanskrit (Saṁskṛta)",
    "sc": "Sardinian",
    "sd": "Sindhi",
    "se": "Northern Sami",
    "sm": "Samoan",
    "sg": "Sango",
    "sr": "Serbian",
    "gd": "Scottish Gaelic; Gaelic",
    "sn": "Shona",
    "si": "Sinhala, Sinhalese",
    "sk": "Slovak",
    "sl": "Slovene",
    "so": "Somali",
    "st": "Southern Sotho",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "ss": "Swati",
    "sv": "Swedish",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "bo": "Tibetan Standard, Tibetan, Central",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tonga (Tonga Islands)",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "tw": "Twi",
    "ty": "Tahitian",
    "ug": "Uighur, Uyghur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "ve": "Venda",
    "vi": "Vietnamese",
    "vo": "Volapük",
    "wa": "Walloon",
    "cy": "Welsh",
    "wo": "Wolof",
    "fy": "Western Frisian",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "za": "Zhuang, Chuang"
  };
  return function(text) {
    var code, codes, out, _i, _len, _ref;

    if (text === void 0) {
      return "";
    }
    out = [];
    _ref = text.split(',');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      code = _ref[_i];
      if (code.indexOf('-') !== -1) {
        codes = code.split('-');
        out.push("" + langCodes[codes[0]] + "(" + codes[1] + ")");
      } else {
        if (langCodes.hasOwnProperty(code)) {
          out.push(langCodes[code]);
        } else {
          out.push(code.toUpperCase());
        }
      }
    }
    return out.join(', ');
  };
});

countries.filter('addCommas', function() {
  return function(number) {
    if (number === void 0) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
});

countries.filter('titleize', function() {
  return function(text) {
    return text.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});

map.directive('worldmap', [
  '$location', 'Country', 'MapValues', function($location, Country, MapValues) {
    return {
      restrict: 'E',
      template: '<div class="map"></div>',
      replace: true,
      scope: {},
      controller: [
        '$scope', '$element', 'MapValues', function($scope, $element, MapValues) {
          var onClick, updateColors;

          onClick = function(e, code) {
            return $scope.$apply(function() {
              return $location.path("/country/" + (Country.fromCode(code).name));
            });
          };
          updateColors = function() {
            return $element.vectorMap('get', 'mapObject').series.regions[0].setValues($scope.mapValues);
          };
          $scope.mapValues = MapValues.values;
          $scope.$watch('mapValues', updateColors, true);
          return $element.vectorMap({
            map: 'world_mill_en',
            zoomButtons: true,
            backgroundColor: '#FFFFFF',
            regionStyle: {
              initial: {
                fill: '#8D8D8D'
              }
            },
            series: {
              regions: [
                {
                  attribute: 'fill',
                  scale: {
                    'current': '#555555',
                    'today': '#E74C3c',
                    'learned': '#27AE60',
                    'initial': '#8D8D8D'
                  }
                }
              ]
            },
            onRegionClick: onClick
          });
        }
      ]
    };
  }
]);

countries.factory('MapValues', [
  '$cookieStore', function($cookieStore) {
    var MapValues, firstCountryCode;

    MapValues = {};
    MapValues.values = {};
    MapValues.setToday = function(code) {
      var k, v, _ref;

      _ref = this.values;
      for (k in _ref) {
        v = _ref[k];
        if (v === 'today') {
          this.values[k] = 'initial';
          break;
        }
      }
      return this.values[code] = 'today';
    };
    MapValues.setCurrent = function(code) {
      var k, v, _ref;

      _ref = this.values;
      for (k in _ref) {
        v = _ref[k];
        if (v === 'current') {
          this.values[k] = 'initial';
          break;
        }
      }
      if (code && this.values[code] !== 'today') {
        return this.values[code] = 'current';
      }
    };
    if ($cookieStore.get('firstCountry')) {
      firstCountryCode = $cookieStore.get('firstCountry');
      MapValues.setToday(firstCountryCode);
    }
    return MapValues;
  }
]);
