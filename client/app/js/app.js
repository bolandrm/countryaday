'use strict';
var app, countries, map, welcome;

app = angular.module('countryaday', ['ngCookies', 'welcome', 'countries', 'map']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/welcome', {
      templateUrl: 'views/welcome/index.html',
      controller: 'WelcomeController'
    }).when('/country/:country', {
      templateUrl: 'views/countries/show.html',
      controller: 'CountriesController',
      resolve: {
        checkCountry: [
          '$route', '$location', 'Country', function($route, $location, Country) {
            if (!Country.isValidCountry($route.current.params.country)) {
              return $location.path('/welcome');
            }
          }
        ],
        summary: [
          '$route', 'Wikipedia', function($route, Wikipedia) {
            return Wikipedia.getSummary($route.current.params.country);
          }
        ],
        info: [
          '$route', 'GeoNames', 'Country', function($route, GeoNames, Country) {
            var country;

            country = Country.fromName($route.current.params.country);
            return GeoNames.getInfo(country.code);
          }
        ],
        news: [
          '$route', 'Feedzilla', function($route, Feedzilla) {
            return Feedzilla.getNews($route.current.params.country);
          }
        ]
      }
    }).otherwise({
      redirectTo: '/welcome'
    });
  }
]);

app.run([
  '$rootScope', '$cookies', function($rootScope, $cookies) {
    return $rootScope.$on('$routeChangeStart', function(event, next, current) {
      return $rootScope.username = $cookies['username'];
    });
  }
]);

welcome = angular.module('welcome', []);

countries = angular.module('countries', []);

map = angular.module('map', []);

countries.controller('CountriesController', [
  '$rootScope', '$scope', '$routeParams', 'MapValues', 'Country', 'summary', 'info', 'news', function($rootScope, $scope, $routeParams, MapValues, Country, summary, info, news) {
    $scope.country = $routeParams.country;
    $scope.code = Country.fromName($scope.country).code;
    MapValues.setCurrent($scope.code);
    $scope.info = info;
    $scope.news = news;
    return $scope.paragraphs = summary;
  }
]);

countries.factory('Country', function() {
  var codesToCountries, countriesToCodes, k, v;

  countriesToCodes = {
    "bangladesh": "BD",
    "belgium": "BE",
    "burkina_faso": "BF",
    "bulgaria": "BG",
    "bosnia_and_herzegovina": "BA",
    "brunei": "BN",
    "bolivia": "BO",
    "japan": "JP",
    "burundi": "BI",
    "benin": "BJ",
    "bhutan": "BT",
    "jamaica": "JM",
    "botswana": "BW",
    "brazil": "BR",
    "the_bahamas": "BS",
    "belarus": "BY",
    "belize": "BZ",
    "russia": "RU",
    "rwanda": "RW",
    "republic_of_serbia": "RS",
    "lithuania": "LT",
    "luxembourg": "LU",
    "liberia": "LR",
    "romania": "RO",
    "guinea_bissau": "GW",
    "guatemala": "GT",
    "greece": "GR",
    "equatorial_guinea": "GQ",
    "guyana": "GY",
    "georgia": "GE",
    "united_kingdom": "GB",
    "gabon": "GA",
    "guinea": "GN",
    "gambia": "GM",
    "greenland": "GL",
    "kuwait": "KW",
    "ghana": "GH",
    "oman": "OM",
    "somaliland": "_3",
    "western_sahara": "_2",
    "kosovo": "_1",
    "northern_cyprus": "_0",
    "jordan": "JO",
    "croatia": "HR",
    "haiti": "HT",
    "hungary": "HU",
    "honduras": "HN",
    "puerto_rico": "PR",
    "west_bank": "PS",
    "portugal": "PT",
    "paraguay": "PY",
    "panama": "PA",
    "papua_new_guinea": "PG",
    "peru": "PE",
    "pakistan": "PK",
    "philippines": "PH",
    "poland": "PL",
    "zambia": "ZM",
    "estonia": "EE",
    "egypt": "EG",
    "south_africa": "ZA",
    "ecuador": "EC",
    "albania": "AL",
    "angola": "AO",
    "kazakhstan": "KZ",
    "ethiopia": "ET",
    "zimbabwe": "ZW",
    "spain": "ES",
    "eritrea": "ER",
    "montenegro": "ME",
    "moldova": "MD",
    "madagascar": "MG",
    "morocco": "MA",
    "uzbekistan": "UZ",
    "myanmar": "MM",
    "mali": "ML",
    "mongolia": "MN",
    "macedonia": "MK",
    "malawi": "MW",
    "mauritania": "MR",
    "uganda": "UG",
    "malaysia": "MY",
    "mexico": "MX",
    "vanuatu": "VU",
    "france": "FR",
    "finland": "FI",
    "fiji": "FJ",
    "falkland_islands": "FK",
    "nicaragua": "NI",
    "netherlands": "NL",
    "norway": "NO",
    "namibia": "NA",
    "new_caledonia": "NC",
    "niger": "NE",
    "nigeria": "NG",
    "new_zealand": "NZ",
    "nepal": "NP",
    "ivory_coast": "CI",
    "switzerland": "CH",
    "colombia": "CO",
    "china": "CN",
    "cameroon": "CM",
    "chile": "CL",
    "canada": "CA",
    "republic_of_the_congo": "CG",
    "central_african_republic": "CF",
    "democratic_republic_of_the_congo": "CD",
    "czech_republic": "CZ",
    "cyprus": "CY",
    "costa_rica": "CR",
    "cuba": "CU",
    "swaziland": "SZ",
    "syria": "SY",
    "kyrgyzstan": "KG",
    "kenya": "KE",
    "south_sudan": "SS",
    "suriname": "SR",
    "cambodia": "KH",
    "el_salvador": "SV",
    "slovakia": "SK",
    "south_korea": "KR",
    "slovenia": "SI",
    "north_korea": "KP",
    "somalia": "SO",
    "senegal": "SN",
    "sierra_leone": "SL",
    "solomon_islands": "SB",
    "saudi_arabia": "SA",
    "sweden": "SE",
    "sudan": "SD",
    "dominican_republic": "DO",
    "djibouti": "DJ",
    "denmark": "DK",
    "germany": "DE",
    "yemen": "YE",
    "austria": "AT",
    "algeria": "DZ",
    "united_states": "US",
    "latvia": "LV",
    "uruguay": "UY",
    "lebanon": "LB",
    "laos": "LA",
    "taiwan": "TW",
    "trinidad_and_tobago": "TT",
    "turkey": "TR",
    "sri_lanka": "LK",
    "tunisia": "TN",
    "east_timor": "TL",
    "turkmenistan": "TM",
    "tajikistan": "TJ",
    "lesotho": "LS",
    "thailand": "TH",
    "french_southern_and_antarctic_lands": "TF",
    "togo": "TG",
    "chad": "TD",
    "libya": "LY",
    "united_arab_emirates": "AE",
    "venezuela": "VE",
    "afghanistan": "AF",
    "iraq": "IQ",
    "iceland": "IS",
    "iran": "IR",
    "armenia": "AM",
    "italy": "IT",
    "vietnam": "VN",
    "argentina": "AR",
    "australia": "AU",
    "israel": "IL",
    "india": "IN",
    "tanzania": "TZ",
    "azerbaijan": "AZ",
    "ireland": "IE",
    "indonesia": "ID",
    "ukraine": "UA",
    "qatar": "QA",
    "mozambique": "MZ"
  };
  codesToCountries = {};
  for (k in countriesToCodes) {
    v = countriesToCodes[k];
    codesToCountries[v] = k;
  }
  return {
    isValidCountry: function(country) {
      country = country.toLowerCase();
      return countriesToCodes.hasOwnProperty(country);
    },
    fromCode: function(code) {
      return {
        name: codesToCountries[code],
        code: code
      };
    },
    fromName: function(country) {
      return {
        name: country,
        code: countriesToCodes[country]
      };
    },
    randomCountryCode: function() {
      var keys;

      keys = Object.keys(countriesToCodes);
      return countriesToCodes[keys[Math.floor(keys.length * Math.random())]];
    }
  };
});

countries.filter('expandCurrency', function() {
  var currencyCodes;

  currencyCodes = {
    "USD": "US Dollar",
    "CAD": "Canadian Dollar",
    "EUR": "Euro",
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia-Herzegovina Convertible Mark",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BWP": "Botswanan Pula",
    "BYR": "Belarusian Ruble",
    "BZD": "Belize Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLP": "Chilean Peso",
    "CNY": "Chinese Yuan",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EEK": "Estonian Kroon",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GHS": "Ghanaian Cedi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Sheqel",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KZT": "Kazakhstani Tenge",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LTL": "Lithuanian Litas",
    "LVL": "Latvian Lats",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanma Kyat",
    "MOP": "Macanese Pataca",
    "MUR": "Mauritian Rupee",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Nuevo Sol",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "PYG": "Paraguayan Guarani",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SOS": "Somali Shilling",
    "SYP": "Syrian Pound",
    "THB": "Thai Baht",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Paʻanga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistan Som",
    "VEF": "Venezuelan Bolívar",
    "VND": "Vietnamese Dong",
    "XAF": "CFA Franc BEAC",
    "XOF": "CFA Franc BCEAO",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMK": "Zambian Kwacha"
  };
  return function(code) {
    if (currencyCodes.hasOwnProperty(code)) {
      return currencyCodes[code];
    } else {
      return code;
    }
  };
});

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

countries.factory('Feedzilla', [
  '$http', '$q', function($http, $q) {
    var cache;

    cache = {};
    return {
      getNews: function(country) {
        var news, url;

        if (cache.hasOwnProperty(country)) {
          return cache[country];
        } else {
          news = $q.defer();
          url = "http://api.feedzilla.com/v1/articles.json?q=" + country + "&title_only=1&count=6&callback=JSON_CALLBACK";
          $http.jsonp(url).success(function(data) {
            cache[country] = data.articles;
            return news.resolve(data.articles);
          });
          return news.promise;
        }
      }
    };
  }
]);

countries.factory('GeoNames', [
  '$http', '$q', function($http, $q) {
    var cache;

    cache = {};
    return {
      getInfo: function(countryCode) {
        var info, url;

        if (cache.hasOwnProperty(countryCode)) {
          return cache[countryCode];
        } else {
          info = $q.defer();
          url = "http://api.geonames.org/countryInfoJSON?username=countryaday&country=" + countryCode + "&callback=JSON_CALLBACK";
          $http.jsonp(url).success(function(data) {
            data = data.geonames[0];
            cache[countryCode] = data;
            return info.resolve(data);
          });
          return info.promise;
        }
      }
    };
  }
]);

countries.factory('Wikipedia', [
  '$http', '$q', function($http, $q) {
    var cache, extractParagraphs;

    cache = {};
    extractParagraphs = function(data) {
      var content, href, k, link, p, table, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;

      data = data.query.pages;
      for (k in data) {
        v = data[k];
        data = v.revisions[0]['*'];
        break;
      }
      content = document.createElement('div');
      content.innerHTML = data;
      _ref = content.querySelectorAll('table');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        table = _ref[_i];
        table.parentNode.removeChild(table);
      }
      _ref1 = content.querySelectorAll('a');
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        link = _ref1[_j];
        href = link.getAttribute('href');
        if (href.charAt(1) !== '/') {
          link.setAttribute('href', "http://wikipedia.org" + href);
        }
      }
      _ref2 = content.querySelectorAll('p');
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        p = _ref2[_k];
        _results.push(p.innerHTML);
      }
      return _results;
    };
    return {
      getSummary: function(country) {
        var summary, url;

        if (cache.hasOwnProperty(country)) {
          return cache[country];
        } else {
          summary = $q.defer();
          url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&rvparse=1&titles=" + country + "&format=json&redirects=1&callback=JSON_CALLBACK";
          $http.jsonp(url).success(function(data) {
            var paragraphs;

            paragraphs = extractParagraphs(data);
            cache[country] = paragraphs;
            return summary.resolve(paragraphs);
          });
          return summary.promise;
        }
      }
    };
  }
]);

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

welcome.controller('WelcomeController', [
  '$scope', '$location', '$cookieStore', 'MapValues', 'Country', function($scope, $location, $cookieStore, MapValues, Country) {
    MapValues.setCurrent();
    return $scope.learnFirstCountry = function() {
      var firstCountry;

      firstCountry = Country.randomCountryCode();
      $cookieStore.put('firstCountry', firstCountry);
      $location.path("/country/" + (Country.fromCode(firstCountry).name));
      return MapValues.setToday(firstCountry);
    };
  }
]);
