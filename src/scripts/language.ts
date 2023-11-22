import * as csv from 'csv';

// https://docs.godotengine.org/en/stable/tutorials/i18n/locales.html
/* snippet to 
{
	let codes = '';
	let names = '';

	for(const td of document.querySelector('#list-of-supported-language-codes table').querySelectorAll('tbody td:first-child')) {
		codes += `'${td.innerText.replace("'", "\\'")}' | `;
	}
	
	for(const td of document.querySelector('#list-of-supported-language-codes table').querySelectorAll('tbody td:not(:first-child)')) {
		names += `'${td.innerText.replace("'", "\\'")}' | `;
	}
	
	console.log(codes); // change this depending on which one.
}
*/


/**
 * Abbreviations of language names.
 */
type LANGUAGE_CODE =
	'aa' | 'ab' | 'ace' | 'ach' | 'ada' | 'ady' | 'ae' | 'aeb' | 'af' | 'afh' | 'agq' | 'ain'     |
	'agr' | 'ak' | 'akk' | 'akz' | 'ale' | 'aln' | 'alt' | 'am' | 'an' | 'ang' | 'anp' | 'ar'     |
	'arc' | 'arn' | 'aro' | 'arp' | 'arq' | 'ars' | 'arw' | 'ary' | 'arz' | 'as' | 'asa' | 'ase'  |
	'ast' | 'av' | 'avk' | 'awa' | 'ayc' | 'ay' | 'az' | 'ba' | 'bal' | 'ban' | 'bar' | 'bas'     |
	'bax' | 'bbc' | 'bbj' | 'be' | 'bej' | 'bem' | 'ber' | 'bew' | 'bez' | 'bfd' | 'bfq' | 'bg'   |
	'bhb' | 'bgn' | 'bho' | 'bi' | 'bik' | 'bin' | 'bjn' | 'bkm' | 'bla' | 'bm' | 'bn' | 'bo'     |
	'bpy' | 'bqi' | 'br' | 'brh' | 'brx' | 'bs' | 'bss' | 'bua' | 'bug' | 'bum' | 'byn' | 'byv'   |
	'ca' | 'cad' | 'car' | 'cay' | 'cch' | 'ccp' | 'ce' | 'ceb' | 'cgg' | 'ch' | 'chb' | 'chg'    |
	'chk' | 'chm' | 'chn' | 'cho' | 'chp' | 'chr' | 'chy' | 'cic' | 'ckb' | 'csb' | 'cmn' | 'co'  |
	'cop' | 'cps' | 'cr' | 'crh' | 'crs' | 'cs' | 'csb' | 'cu' | 'cv' | 'cy' | 'da' | 'dak'       |
	'dar' | 'dav' | 'de' | 'del' | 'den' | 'dgr' | 'din' | 'dje' | 'doi' | 'dsb' | 'dtp' | 'dua'  |
	'dum' | 'dv' | 'dyo' | 'dyu' | 'dz' | 'dzg' | 'ebu' | 'ee' | 'efi' | 'egl' | 'egy' | 'eka'    |
	'el' | 'elx' | 'en' | 'enm' | 'eo' | 'es' | 'esu' | 'et' | 'eu' | 'ewo' | 'ext' | 'fa'        |
	'fan' | 'fat' | 'ff' | 'fi' | 'fil' | 'fit' | 'fj' | 'fo' | 'fon' | 'fr' | 'frc' | 'frm'      |
	'fro' | 'frp' | 'frr' | 'frs' | 'fur' | 'fy' | 'ga' | 'gaa' | 'gag' | 'gan' | 'gay' | 'gba'   |
	'gbz' | 'gd' | 'gez' | 'gil' | 'gl' | 'glk' | 'gmh' | 'gn' | 'goh' | 'gom' | 'gon' | 'gor'    |
	'got' | 'grb' | 'grc' | 'gsw' | 'gu' | 'guc' | 'gur' | 'guz' | 'gv' | 'gwi' | 'ha' | 'hai'    |
	'hak' | 'haw' | 'he, iw' | 'hi' | 'hif' | 'hil' | 'hit' | 'hmn' | 'ho' | 'hne' | 'hr'         |
	'hsb' | 'hsn' | 'ht' | 'hu' | 'hup' | 'hus' | 'hy' | 'hz' | 'ia' | 'iba' | 'ibb' | 'id, in'   |
	'ie' | 'ig' | 'ii' | 'ik' | 'ilo' | 'inh' | 'io' | 'is' | 'it' | 'iu' | 'izh' | 'ja' | 'jam'  |
	'jbo' | 'jgo' | 'jmc' | 'jpr' | 'jrb' | 'jut' | 'jv' | 'ka' | 'kaa' | 'kab' | 'kac' | 'kaj'   |
	'kam' | 'kaw' | 'kbd' | 'kbl' | 'kcg' | 'kde' | 'kea' | 'ken' | 'kfo' | 'kg' | 'kgp' | 'kha'  |
	'kho' | 'khq' | 'khw' | 'ki' | 'kiu' | 'kj' | 'kk' | 'kkj' | 'kl' | 'kln' | 'km' | 'kmb'      |
	'kn' | 'ko' | 'koi' | 'kok' | 'kos' | 'kpe' | 'kr' | 'krc' | 'kri' | 'krj' | 'krl' | 'kru'    |
	'ks' | 'ksb' | 'ksf' | 'ksh' | 'ku' | 'kum' | 'kut' | 'kv' | 'kw' | 'ky' | 'lag' | 'la'       |
	'lad' | 'lag' | 'lah' | 'lam' | 'lb' | 'lez' | 'lfn' | 'lg' | 'li' | 'lij' | 'liv' | 'lkt'    |
	'lmo' | 'ln' | 'lo' | 'lol' | 'lou' | 'loz' | 'lrc' | 'lt' | 'ltg' | 'lu' | 'lua' | 'lui'     |
	'lun' | 'luo' | 'lus' | 'luy' | 'lv' | 'lzh' | 'lzz' | 'mad' | 'maf' | 'mag' | 'mai' | 'mak'  |
	'man' | 'mas' | 'mde' | 'mdf' | 'mdr' | 'men' | 'mer' | 'mfe' | 'mg' | 'mga' | 'mgh' | 'mgo'  |
	'mh' | 'mhr' | 'mi' | 'mic' | 'min' | 'miq' | 'mjw' | 'mk' | 'ml' | 'mn' | 'mnc' | 'mni'      |
	'mnw' | 'mos' | 'moh' | 'mr' | 'mrj' | 'ms' | 'mt' | 'mua' | 'mus' | 'mwl' | 'mwr' | 'mwv'    |
	'my' | 'mye' | 'myv' | 'mzn' | 'na' | 'nah' | 'nan' | 'nap' | 'naq' | 'nan' | 'nb, no' | 'nd' |
	'nds' | 'ne' | 'new' | 'nhn' | 'ng' | 'nia' | 'niu' | 'njo' | 'nl' | 'nmg' | 'nn' | 'nnh'     |
	'nog' | 'non' | 'nov' | 'nqo' | 'nr' | 'nso' | 'nus' | 'nv' | 'nwc' | 'ny' | 'nym' | 'nyn'    |
	'nyo' | 'nzi' | 'oc' | 'oj' | 'om' | 'or' | 'os' | 'osa' | 'ota' | 'pa' | 'pag' | 'pal'       |
	'pam' | 'pap' | 'pau' | 'pcd' | 'pcm' | 'pdc' | 'pdt' | 'peo' | 'pfl' | 'phn' | 'pi' | 'pl'   |
	'pms' | 'pnt' | 'pon' | 'pr' | 'prg' | 'pro' | 'prs' | 'ps' | 'pt' | 'qu' | 'quc' | 'qug'     |
	'quy' | 'quz' | 'raj' | 'rap' | 'rar' | 'rgn' | 'rif' | 'rm' | 'rn' | 'ro' | 'rof' | 'rom'    |
	'rtm' | 'ru' | 'rue' | 'rug' | 'rup' | 'rw' | 'rwk' | 'sa' | 'sad' | 'sah' | 'sam' | 'saq'    |
	'sas' | 'sat' | 'saz' | 'sba' | 'sbp' | 'sc' | 'scn' | 'sco' | 'sd' | 'sdc' | 'sdh' | 'se'    |
	'see' | 'seh' | 'sei' | 'sel' | 'ses' | 'sg' | 'sga' | 'sgs' | 'sh' | 'shi' | 'shn' | 'shs'   |
	'shu' | 'si' | 'sid' | 'sk' | 'sl' | 'sli' | 'sly' | 'sm' | 'sma' | 'smj' | 'smn' | 'sms'     |
	'sn' | 'snk' | 'so' | 'sog' | 'son' | 'sq' | 'sr' | 'srn' | 'srr' | 'ss' | 'ssy' | 'st'       |
	'stq' | 'su' | 'suk' | 'sus' | 'sux' | 'sv' | 'sw' | 'swb' | 'swc' | 'syc' | 'syr' | 'szl'    |
	'ta' | 'tcy' | 'te' | 'tem' | 'teo' | 'ter' | 'tet' | 'tg' | 'th' | 'the' | 'ti' | 'tig'      |
	'tiv' | 'tk' | 'tkl' | 'tkr' | 'tl' | 'tlh' | 'tli' | 'tly' | 'tmh' | 'tn' | 'to' | 'tog'     |
	'tpi' | 'tr' | 'tru' | 'trv' | 'ts' | 'tsd' | 'tsi' | 'tt' | 'ttt' | 'tum' | 'tvl' | 'tw'     |
	'twq' | 'ty' | 'tyv' | 'tzm' | 'udm' | 'ug' | 'uga' | 'uk' | 'umb' | 'unm' | 'ur' | 'uz'      |
	'vai' | 've' | 'vec' | 'vep' | 'vi' | 'vls' | 'vmf' | 'vo' | 'vot' | 'vro' | 'vun' | 'wa'     |
	'wae' | 'wal' | 'war' | 'was' | 'wbp' | 'wo' | 'wuu' | 'xal' | 'xh' | 'xmf' | 'xog' | 'yao'   |
	'yap' | 'yav' | 'ybb' | 'yi' | 'yo' | 'yrl' | 'yue' | 'yuw' | 'za' | 'zap' | 'zbl' | 'zea'    |
	'zen' | 'zgh' | 'zh' | 'zu' | 'zun' | 'zza';

/**
 * Full language names.
 */
type LANGUAGE_NAME =
	'Afar' | 'Abkhazian' | 'Achinese' | 'Acoli' | 'Adangme' | 'Adyghe' | 'Avestan' | 'Tunisian Arabic' |
	'Afrikaans' | 'Afrihili' | 'Aghem' | 'Ainu' | 'Aguaruna' | 'Akan' | 'Akkadian' | 'Alabama'         |
	'Aleut' | 'Gheg Albanian' | 'Southern Altai' | 'Amharic' | 'Aragonese' | 'Old English' | 'Angika'  |
	'Arabic' | 'Aramaic' | 'Mapudungun' | 'Araona' | 'Arapaho' | 'Algerian Arabic' | 'Najdi Arabic'    |
	'Arawak' | 'Moroccan Arabic' | 'Egyptian Arabic' | 'Assamese' | 'Asu' | 'American Sign Language'   |
	'Asturian' | 'Avaric' | 'Kotava' | 'Awadhi' | 'Southern Aymara' | 'Aymara' | 'Azerbaijani'         |
	'Bashkir' | 'Baluchi' | 'Balinese' | 'Bavarian' | 'Bassa' | 'Bamun' | 'Batak Toba' | 'Ghomala'     |
	'Belarusian' | 'Beja' | 'Bemba' | 'Berber' | 'Betawi' | 'Bena' | 'Bafut' | 'Badaga' | 'Bulgarian'  |
	'Bhili' | 'Western Balochi' | 'Bhojpuri' | 'Bislama' | 'Bikol' | 'Bini' | 'Banjar' | 'Kom'         |
	'Siksika' | 'Bambara' | 'Bengali' | 'Tibetan' | 'Bishnupriya' | 'Bakhtiari' | 'Breton' | 'Brahui'  |
	'Bodo' | 'Bosnian' | 'Akoose' | 'Buriat' | 'Buginese' | 'Bulu' | 'Bilin' | 'Medumba' | 'Catalan'   |
	'Caddo' | 'Carib' | 'Cayuga' | 'Atsam' | 'Chakma' | 'Chechen' | 'Cebuano' | 'Chiga' | 'Chamorro'   |
	'Chibcha' | 'Chagatai' | 'Chuukese' | 'Mari' | 'Chinook Jargon' | 'Choctaw' | 'Chipewyan'          |
	'Cherokee' | 'Cheyenne' | 'Chickasaw' | 'Central Kurdish' | 'Kashubian' | 'Mandarin Chinese'       |
	'Corsican' | 'Coptic' | 'Capiznon' | 'Cree' | 'Crimean Tatar' | 'Seselwa Creole French' | 'Czech'  |
	'Kashubian' | 'Church Slavic' | 'Chuvash' | 'Welsh' | 'Danish' | 'Dakota' | 'Dargwa' | 'Taita'     |
	'German' | 'Delaware' | 'Slave' | 'Dogrib' | 'Dinka' | 'Zarma' | 'Dogri' | 'Lower Sorbian'         |
	'Central Dusun' | 'Duala' | 'Middle Dutch' | 'Dhivehi' | 'Jola-Fonyi' | 'Dyula' | 'Dzongkha'       |
	'Dazaga' | 'Embu' | 'Ewe' | 'Efik' | 'Emilian' | 'Ancient Egyptian' | 'Ekajuk' | 'Greek'           |
	'Elamite' | 'English' | 'Middle English' | 'Esperanto' | 'Spanish' | 'Central Yupik' | 'Estonian'  |
	'Basque' | 'Ewondo' | 'Extremaduran' | 'Persian' | 'Fang' | 'Fanti' | 'Fulah' | 'Finnish'          |
	'Filipino' | 'Tornedalen Finnish' | 'Fijian' | 'Faroese' | 'Fon' | 'French' | 'Cajun French'       |
	'Middle French' | 'Old French' | 'Arpitan' | 'Northern Frisian' | 'Eastern Frisian' | 'Friulian'   |
	'Western Frisian' | 'Irish' | 'Ga' | 'Gagauz' | 'Gan Chinese' | 'Gayo' | 'Gbaya'                   |
	'Zoroastrian Dari' | 'Scottish Gaelic' | 'Geez' | 'Gilbertese' | 'Galician' | 'Gilaki'             |
	'Middle High German' | 'Guarani' | 'Old High German' | 'Goan Konkani' | 'Gondi' | 'Gorontalo'      |
	'Gothic' | 'Grebo' | 'Ancient Greek' | 'Swiss German' | 'Gujarati' | 'Wayuu' | 'Frafra' | 'Gusii'  |
	'Manx' | 'Gwichʼin' | 'Hausa' | 'Haida' | 'Hakka Chinese' | 'Hawaiian' | 'Hebrew' | 'Hindi'        |
	'Fiji Hindi' | 'Hiligaynon' | 'Hittite' | 'Hmong' | 'Hiri Motu' | 'Chhattisgarhi' | 'Croatian'     |
	'Upper Sorbian' | 'Xiang Chinese' | 'Haitian' | 'Hungarian' | 'Hupa' | 'Huastec' | 'Armenian'      |
	'Herero' | 'Interlingua' | 'Iban' | 'Ibibio' | 'Indonesian' | 'Interlingue' | 'Igbo'               |
	'Sichuan Yi' | 'Inupiaq' | 'Iloko' | 'Ingush' | 'Ido' | 'Icelandic' | 'Italian' | 'Inuktitut'      |
	'Ingrian' | 'Japanese' | 'Jamaican Creole English' | 'Lojban' | 'Ngomba' | 'Machame'               |
	'Judeo-Persian' | 'Judeo-Arabic' | 'Jutish' | 'Javanese' | 'Georgian' | 'Kara-Kalpak' | 'Kabyle'   |
	'Kachin' | 'Jju' | 'Kamba' | 'Kawi' | 'Kabardian' | 'Kanembu' | 'Tyap' | 'Makonde'                 |
	'Kabuverdianu' | 'Kenyang' | 'Koro' | 'Kongo' | 'Kaingang' | 'Khasi' | 'Khotanese'                 |
	'Koyra Chiini' | 'Khowar' | 'Kikuyu' | 'Kirmanjki' | 'Kuanyama' | 'Kazakh' | 'Kako'                |
	'Kalaallisut' | 'Kalenjin' | 'Central Khmer' | 'Kimbundu' | 'Kannada' | 'Korean' | 'Komi-Permyak'  |
	'Konkani' | 'Kosraean' | 'Kpelle' | 'Kanuri' | 'Karachay-Balkar' | 'Krio' | 'Kinaray-a'            |
	'Karelian' | 'Kurukh' | 'Kashmiri' | 'Shambala' | 'Bafia' | 'Colognian' | 'Kurdish' | 'Kumyk'      |
	'Kutenai' | 'Komi' | 'Cornish' | 'Kirghiz' | 'Langi' | 'Latin' | 'Ladino' | 'Langi' | 'Lahnda'     |
	'Lamba' | 'Luxembourgish' | 'Lezghian' | 'Lingua Franca Nova' | 'Ganda' | 'Limburgan' | 'Ligurian' |
	'Livonian' | 'Lakota' | 'Lombard' | 'Lingala' | 'Lao' | 'Mongo' | 'Louisiana Creole' | 'Lozi'      |
	'Northern Luri' | 'Lithuanian' | 'Latgalian' | 'Luba-Katanga' | 'Luba-Lulua' | 'Luiseno' | 'Lunda' |
	'Luo' | 'Mizo' | 'Luyia' | 'Latvian' | 'Literary Chinese' | 'Laz' | 'Madurese' | 'Mafa' | 'Magahi' |
	'Maithili' | 'Makasar' | 'Mandingo' | 'Masai' | 'Maba' | 'Moksha' | 'Mandar' | 'Mende' | 'Meru'    |
	'Morisyen' | 'Malagasy' | 'Middle Irish' | 'Makhuwa-Meetto' | 'Metaʼ' | 'Marshallese'              |
	'Eastern Mari' | 'Māori' | 'Mi\'kmaq' | 'Minangkabau' | 'Mískito' | 'Karbi' | 'Macedonian'         |
	'Malayalam' | 'Mongolian' | 'Manchu' | 'Manipuri' | 'Mon' | 'Mossi' | 'Mohawk' | 'Marathi'         |
	'Western Mari' | 'Malay' | 'Maltese' | 'Mundang' | 'Muscogee' | 'Mirandese' | 'Marwari'            |
	'Mentawai' | 'Burmese' | 'Myene' | 'Erzya' | 'Mazanderani' | 'Nauru' | 'Nahuatl'                   |
	'Min Nan Chinese' | 'Neapolitan' | 'Nama' | 'Min Nan Chinese' | 'Norwegian Bokmål'                 |
	'North Ndebele' | 'Low German' | 'Nepali' | 'Newari' | 'Central Nahuatl' | 'Ndonga' | 'Nias'       |
	'Niuean' | 'Ao Naga' | 'Dutch' | 'Kwasio' | 'Norwegian Nynorsk' | 'Ngiemboon' | 'Nogai'            |
	'Old Norse' | 'Novial' | 'N\'ko' | 'South Ndebele' | 'Pedi' | 'Nuer' | 'Navajo'                    |
	'Classical Newari' | 'Nyanja' | 'Nyamwezi' | 'Nyankole' | 'Nyoro' | 'Nzima' | 'Occitan' | 'Ojibwa' |
	'Oromo' | 'Odia' | 'Ossetic' | 'Osage' | 'Ottoman Turkish' | 'Panjabi' | 'Pangasinan' | 'Pahlavi'  |
	'Pampanga' | 'Papiamento' | 'Palauan' | 'Picard' | 'Nigerian Pidgin' | 'Pennsylvania German'       |
	'Plautdietsch' | 'Old Persian' | 'Palatine German' | 'Phoenician' | 'Pali' | 'Polish'              |
	'Piedmontese' | 'Pontic' | 'Pohnpeian' | 'Pirate' | 'Prussian' | 'Old Provençal' | 'Dari'          |
	'Pushto' | 'Portuguese' | 'Quechua' | 'K\'iche' | 'Chimborazo Highland Quichua'                    |
	'Ayacucho Quechua' | 'Cusco Quechua' | 'Rajasthani' | 'Rapanui' | 'Rarotongan' | 'Romagnol'        |
	'Riffian' | 'Romansh' | 'Rundi' | 'Romanian' | 'Rombo' | 'Romany' | 'Rotuman' | 'Russian'          |
	'Rusyn' | 'Roviana' | 'Aromanian' | 'Kinyarwanda' | 'Rwa' | 'Sanskrit' | 'Sandawe' | 'Sakha'       |
	'Samaritan Aramaic' | 'Samburu' | 'Sasak' | 'Santali' | 'Saurashtra' | 'Ngambay' | 'Sangu'         |
	'Sardinian' | 'Sicilian' | 'Scots' | 'Sindhi' | 'Sassarese Sardinian' | 'Southern Kurdish'         |
	'Northern Sami' | 'Seneca' | 'Sena' | 'Seri' | 'Selkup' | 'Koyraboro Senni' | 'Sango'              |
	'Old Irish' | 'Samogitian' | 'Serbo-Croatian' | 'Tachelhit' | 'Shan' | 'Shuswap'                   |
	'Chadian Arabic' | 'Sinhala' | 'Sidamo' | 'Slovak' | 'Slovenian' | 'Lower Silesian' | 'Selayar'    |
	'Samoan' | 'Southern Sami' | 'Lule Sami' | 'Inari Sami' | 'Skolt Sami' | 'Shona' | 'Soninke'       |
	'Somali' | 'Sogdien' | 'Songhai' | 'Albanian' | 'Serbian' | 'Sranan Tongo' | 'Serer' | 'Swati'     |
	'Saho' | 'Southern Sotho' | 'Saterland Frisian' | 'Sundanese' | 'Sukuma' | 'Susu' | 'Sumerian'     |
	'Swedish' | 'Swahili' | 'Comorian' | 'Congo Swahili' | 'Classical Syriac' | 'Syriac' | 'Silesian'  |
	'Tamil' | 'Tulu' | 'Telugu' | 'Timne' | 'Teso' | 'Tereno' | 'Tetum' | 'Tajik' | 'Thai'             |
	'Chitwania Tharu' | 'Tigrinya' | 'Tigre' | 'Tiv' | 'Turkmen' | 'Tokelau' | 'Tsakhur' | 'Tagalog'   |
	'Klingon' | 'Tlingit' | 'Talysh' | 'Tamashek' | 'Tswana' | 'Tongan' | 'Nyasa Tonga' | 'Tok Pisin'  |
	'Turkish' | 'Turoyo' | 'Taroko' | 'Tsonga' | 'Tsakonian' | 'Tsimshian' | 'Tatar' | 'Muslim Tat'    |
	'Tumbuka' | 'Tuvalu' | 'Twi' | 'Tasawaq' | 'Tahitian' | 'Tuvinian' | 'Central Atlas Tamazight'     |
	'Udmurt' | 'Uyghur' | 'Ugaritic' | 'Ukrainian' | 'Umbundu' | 'Unami' | 'Urdu' | 'Uzbek' | 'Vai'    |
	'Venda' | 'Venetian' | 'Veps' | 'Vietnamese' | 'West Flemish' | 'Main-Franconian' | 'Volapük'      |
	'Votic' | 'Võro' | 'Vunjo' | 'Walloon' | 'Walser' | 'Wolaytta' | 'Waray' | 'Washo' | 'Warlpiri'    |
	'Wolof' | 'Wu Chinese' | 'Kalmyk' | 'Xhosa' | 'Mingrelian' | 'Soga' | 'Yao' | 'Yapese' | 'Yangben' |
	'Yemba' | 'Yiddish' | 'Yoruba' | 'Nheengatu' | 'Yue Chinese' | 'Papua New Guinea' | 'Zhuang'       |
	'Zapotec' | 'Blissymbols' | 'Zeelandic' | 'Zenaga' | 'Standard Moroccan Tamazight' | 'Chinese'     |
	'Zulu' | 'Zuni' | 'Zaza';

//const UNLOADED = -1;

const all: {[key: string]: Language} = {};

class Language {
	code: LANGUAGE_CODE;
	name: LANGUAGE_NAME;
	data: {[key: string]: string} = {};
	loaded: boolean = false;

	/**
	 * 
	 * @param code Abbreviation of language name.
	 * @param name Name of the language.
	 */
	constructor(code: LANGUAGE_CODE, name: LANGUAGE_NAME) {
		this.code = code;
		this.name = name;
	}

	/**
	 * @param id Text unique ID. Such as "ttSaveSettings". Used to apply text to labels.
	 */
	get(id: string): string | null {
		return this.data[id] || null;
	}

	load() {}
}

/*
{
	let codes = [];
	let names = [];

	for(const td of document.querySelector('#list-of-supported-language-codes table').querySelectorAll('tbody td:first-child')) {
		codes.push(`${td.innerText.replace("'", "\\'")}`);
	}
	
	for(const td of document.querySelector('#list-of-supported-language-codes table').querySelectorAll('tbody td:not(:first-child)')) {
		names.push(`${td.innerText.replace("'", "\\'")}`);
	}
	
  var out = '[';
  const ENTRY_WIDTH = 10;
  
	for(let i = 0; i < codes.length; ++i) {
    out += `['${codes[i]}','${names[i]}']`;
    if(i != codes.length - 1) out += ',';
    if(i % ENTRY_WIDTH == 0 && i != 0) out += '\n';
  }
  
  out += ']';
  
  console.log(out);
}
*/

const LANGUAGE_ARRAY: [LANGUAGE_CODE, LANGUAGE_NAME][] =
[
	['aa','Afar'],['ab','Abkhazian'],['ace','Achinese'],['ach','Acoli'],['ada','Adangme'],['ady','Adyghe'],['ae','Avestan'],['aeb','Tunisian Arabic'],['af','Afrikaans'],['afh','Afrihili'],['agq','Aghem'],
	['ain','Ainu'],['agr','Aguaruna'],['ak','Akan'],['akk','Akkadian'],['akz','Alabama'],['ale','Aleut'],['aln','Gheg Albanian'],['alt','Southern Altai'],['am','Amharic'],['an','Aragonese'],
	['ang','Old English'],['anp','Angika'],['ar','Arabic'],['arc','Aramaic'],['arn','Mapudungun'],['aro','Araona'],['arp','Arapaho'],['arq','Algerian Arabic'],['ars','Najdi Arabic'],['arw','Arawak'],
	['ary','Moroccan Arabic'],['arz','Egyptian Arabic'],['as','Assamese'],['asa','Asu'],['ase','American Sign Language'],['ast','Asturian'],['av','Avaric'],['avk','Kotava'],['awa','Awadhi'],['ayc','Southern Aymara'],
	['ay','Aymara'],['az','Azerbaijani'],['ba','Bashkir'],['bal','Baluchi'],['ban','Balinese'],['bar','Bavarian'],['bas','Bassa'],['bax','Bamun'],['bbc','Batak Toba'],['bbj','Ghomala'],
	['be','Belarusian'],['bej','Beja'],['bem','Bemba'],['ber','Berber'],['bew','Betawi'],['bez','Bena'],['bfd','Bafut'],['bfq','Badaga'],['bg','Bulgarian'],['bhb','Bhili'],
	['bgn','Western Balochi'],['bho','Bhojpuri'],['bi','Bislama'],['bik','Bikol'],['bin','Bini'],['bjn','Banjar'],['bkm','Kom'],['bla','Siksika'],['bm','Bambara'],['bn','Bengali'],
	['bo','Tibetan'],['bpy','Bishnupriya'],['bqi','Bakhtiari'],['br','Breton'],['brh','Brahui'],['brx','Bodo'],['bs','Bosnian'],['bss','Akoose'],['bua','Buriat'],['bug','Buginese'],
	['bum','Bulu'],['byn','Bilin'],['byv','Medumba'],['ca','Catalan'],['cad','Caddo'],['car','Carib'],['cay','Cayuga'],['cch','Atsam'],['ccp','Chakma'],['ce','Chechen'],
	['ceb','Cebuano'],['cgg','Chiga'],['ch','Chamorro'],['chb','Chibcha'],['chg','Chagatai'],['chk','Chuukese'],['chm','Mari'],['chn','Chinook Jargon'],['cho','Choctaw'],['chp','Chipewyan'],
	['chr','Cherokee'],['chy','Cheyenne'],['cic','Chickasaw'],['ckb','Central Kurdish'],['csb','Kashubian'],['cmn','Mandarin Chinese'],['co','Corsican'],['cop','Coptic'],['cps','Capiznon'],['cr','Cree'],
	['crh','Crimean Tatar'],['crs','Seselwa Creole French'],['cs','Czech'],['csb','Kashubian'],['cu','Church Slavic'],['cv','Chuvash'],['cy','Welsh'],['da','Danish'],['dak','Dakota'],['dar','Dargwa'],
	['dav','Taita'],['de','German'],['del','Delaware'],['den','Slave'],['dgr','Dogrib'],['din','Dinka'],['dje','Zarma'],['doi','Dogri'],['dsb','Lower Sorbian'],['dtp','Central Dusun'],
	['dua','Duala'],['dum','Middle Dutch'],['dv','Dhivehi'],['dyo','Jola-Fonyi'],['dyu','Dyula'],['dz','Dzongkha'],['dzg','Dazaga'],['ebu','Embu'],['ee','Ewe'],['efi','Efik'],
	['egl','Emilian'],['egy','Ancient Egyptian'],['eka','Ekajuk'],['el','Greek'],['elx','Elamite'],['en','English'],['enm','Middle English'],['eo','Esperanto'],['es','Spanish'],['esu','Central Yupik'],
	['et','Estonian'],['eu','Basque'],['ewo','Ewondo'],['ext','Extremaduran'],['fa','Persian'],['fan','Fang'],['fat','Fanti'],['ff','Fulah'],['fi','Finnish'],['fil','Filipino'],
	['fit','Tornedalen Finnish'],['fj','Fijian'],['fo','Faroese'],['fon','Fon'],['fr','French'],['frc','Cajun French'],['frm','Middle French'],['fro','Old French'],['frp','Arpitan'],['frr','Northern Frisian'],
	['frs','Eastern Frisian'],['fur','Friulian'],['fy','Western Frisian'],['ga','Irish'],['gaa','Ga'],['gag','Gagauz'],['gan','Gan Chinese'],['gay','Gayo'],['gba','Gbaya'],['gbz','Zoroastrian Dari'],
	['gd','Scottish Gaelic'],['gez','Geez'],['gil','Gilbertese'],['gl','Galician'],['glk','Gilaki'],['gmh','Middle High German'],['gn','Guarani'],['goh','Old High German'],['gom','Goan Konkani'],['gon','Gondi'],
	['gor','Gorontalo'],['got','Gothic'],['grb','Grebo'],['grc','Ancient Greek'],['gsw','Swiss German'],['gu','Gujarati'],['guc','Wayuu'],['gur','Frafra'],['guz','Gusii'],['gv','Manx'],
	['gwi','Gwichʼin'],['ha','Hausa'],['hai','Haida'],['hak','Hakka Chinese'],['haw','Hawaiian'],['he, iw','Hebrew'],['hi','Hindi'],['hif','Fiji Hindi'],['hil','Hiligaynon'],['hit','Hittite'],
	['hmn','Hmong'],['ho','Hiri Motu'],['hne','Chhattisgarhi'],['hr','Croatian'],['hsb','Upper Sorbian'],['hsn','Xiang Chinese'],['ht','Haitian'],['hu','Hungarian'],['hup','Hupa'],['hus','Huastec'],
	['hy','Armenian'],['hz','Herero'],['ia','Interlingua'],['iba','Iban'],['ibb','Ibibio'],['id, in','Indonesian'],['ie','Interlingue'],['ig','Igbo'],['ii','Sichuan Yi'],['ik','Inupiaq'],
	['ilo','Iloko'],['inh','Ingush'],['io','Ido'],['is','Icelandic'],['it','Italian'],['iu','Inuktitut'],['izh','Ingrian'],['ja','Japanese'],['jam','Jamaican Creole English'],['jbo','Lojban'],
	['jgo','Ngomba'],['jmc','Machame'],['jpr','Judeo-Persian'],['jrb','Judeo-Arabic'],['jut','Jutish'],['jv','Javanese'],['ka','Georgian'],['kaa','Kara-Kalpak'],['kab','Kabyle'],['kac','Kachin'],
	['kaj','Jju'],['kam','Kamba'],['kaw','Kawi'],['kbd','Kabardian'],['kbl','Kanembu'],['kcg','Tyap'],['kde','Makonde'],['kea','Kabuverdianu'],['ken','Kenyang'],['kfo','Koro'],
	['kg','Kongo'],['kgp','Kaingang'],['kha','Khasi'],['kho','Khotanese'],['khq','Koyra Chiini'],['khw','Khowar'],['ki','Kikuyu'],['kiu','Kirmanjki'],['kj','Kuanyama'],['kk','Kazakh'],
	['kkj','Kako'],['kl','Kalaallisut'],['kln','Kalenjin'],['km','Central Khmer'],['kmb','Kimbundu'],['kn','Kannada'],['ko','Korean'],['koi','Komi-Permyak'],['kok','Konkani'],['kos','Kosraean'],
	['kpe','Kpelle'],['kr','Kanuri'],['krc','Karachay-Balkar'],['kri','Krio'],['krj','Kinaray-a'],['krl','Karelian'],['kru','Kurukh'],['ks','Kashmiri'],['ksb','Shambala'],['ksf','Bafia'],
	['ksh','Colognian'],['ku','Kurdish'],['kum','Kumyk'],['kut','Kutenai'],['kv','Komi'],['kw','Cornish'],['ky','Kirghiz'],['lag','Langi'],['la','Latin'],['lad','Ladino'],
	['lag','Langi'],['lah','Lahnda'],['lam','Lamba'],['lb','Luxembourgish'],['lez','Lezghian'],['lfn','Lingua Franca Nova'],['lg','Ganda'],['li','Limburgan'],['lij','Ligurian'],['liv','Livonian'],
	['lkt','Lakota'],['lmo','Lombard'],['ln','Lingala'],['lo','Lao'],['lol','Mongo'],['lou','Louisiana Creole'],['loz','Lozi'],['lrc','Northern Luri'],['lt','Lithuanian'],['ltg','Latgalian'],
	['lu','Luba-Katanga'],['lua','Luba-Lulua'],['lui','Luiseno'],['lun','Lunda'],['luo','Luo'],['lus','Mizo'],['luy','Luyia'],['lv','Latvian'],['lzh','Literary Chinese'],['lzz','Laz'],
	['mad','Madurese'],['maf','Mafa'],['mag','Magahi'],['mai','Maithili'],['mak','Makasar'],['man','Mandingo'],['mas','Masai'],['mde','Maba'],['mdf','Moksha'],['mdr','Mandar'],
	['men','Mende'],['mer','Meru'],['mfe','Morisyen'],['mg','Malagasy'],['mga','Middle Irish'],['mgh','Makhuwa-Meetto'],['mgo','Metaʼ'],['mh','Marshallese'],['mhr','Eastern Mari'],['mi','Māori'],
	['mic','Mi\'kmaq'],['min','Minangkabau'],['miq','Mískito'],['mjw','Karbi'],['mk','Macedonian'],['ml','Malayalam'],['mn','Mongolian'],['mnc','Manchu'],['mni','Manipuri'],['mnw','Mon'],
	['mos','Mossi'],['moh','Mohawk'],['mr','Marathi'],['mrj','Western Mari'],['ms','Malay'],['mt','Maltese'],['mua','Mundang'],['mus','Muscogee'],['mwl','Mirandese'],['mwr','Marwari'],
	['mwv','Mentawai'],['my','Burmese'],['mye','Myene'],['myv','Erzya'],['mzn','Mazanderani'],['na','Nauru'],['nah','Nahuatl'],['nan','Min Nan Chinese'],['nap','Neapolitan'],['naq','Nama'],
	['nan','Min Nan Chinese'],['nb, no','Norwegian Bokmål'],['nd','North Ndebele'],['nds','Low German'],['ne','Nepali'],['new','Newari'],['nhn','Central Nahuatl'],['ng','Ndonga'],['nia','Nias'],['niu','Niuean'],
	['njo','Ao Naga'],['nl','Dutch'],['nmg','Kwasio'],['nn','Norwegian Nynorsk'],['nnh','Ngiemboon'],['nog','Nogai'],['non','Old Norse'],['nov','Novial'],['nqo','N\'ko'],['nr','South Ndebele'],
	['nso','Pedi'],['nus','Nuer'],['nv','Navajo'],['nwc','Classical Newari'],['ny','Nyanja'],['nym','Nyamwezi'],['nyn','Nyankole'],['nyo','Nyoro'],['nzi','Nzima'],['oc','Occitan'],
	['oj','Ojibwa'],['om','Oromo'],['or','Odia'],['os','Ossetic'],['osa','Osage'],['ota','Ottoman Turkish'],['pa','Panjabi'],['pag','Pangasinan'],['pal','Pahlavi'],['pam','Pampanga'],
	['pap','Papiamento'],['pau','Palauan'],['pcd','Picard'],['pcm','Nigerian Pidgin'],['pdc','Pennsylvania German'],['pdt','Plautdietsch'],['peo','Old Persian'],['pfl','Palatine German'],['phn','Phoenician'],['pi','Pali'],
	['pl','Polish'],['pms','Piedmontese'],['pnt','Pontic'],['pon','Pohnpeian'],['pr','Pirate'],['prg','Prussian'],['pro','Old Provençal'],['prs','Dari'],['ps','Pushto'],['pt','Portuguese'],
	['qu','Quechua'],['quc','K\'iche'],['qug','Chimborazo Highland Quichua'],['quy','Ayacucho Quechua'],['quz','Cusco Quechua'],['raj','Rajasthani'],['rap','Rapanui'],['rar','Rarotongan'],['rgn','Romagnol'],['rif','Riffian'],
	['rm','Romansh'],['rn','Rundi'],['ro','Romanian'],['rof','Rombo'],['rom','Romany'],['rtm','Rotuman'],['ru','Russian'],['rue','Rusyn'],['rug','Roviana'],['rup','Aromanian'],
	['rw','Kinyarwanda'],['rwk','Rwa'],['sa','Sanskrit'],['sad','Sandawe'],['sah','Sakha'],['sam','Samaritan Aramaic'],['saq','Samburu'],['sas','Sasak'],['sat','Santali'],['saz','Saurashtra'],
	['sba','Ngambay'],['sbp','Sangu'],['sc','Sardinian'],['scn','Sicilian'],['sco','Scots'],['sd','Sindhi'],['sdc','Sassarese Sardinian'],['sdh','Southern Kurdish'],['se','Northern Sami'],['see','Seneca'],
	['seh','Sena'],['sei','Seri'],['sel','Selkup'],['ses','Koyraboro Senni'],['sg','Sango'],['sga','Old Irish'],['sgs','Samogitian'],['sh','Serbo-Croatian'],['shi','Tachelhit'],['shn','Shan'],
	['shs','Shuswap'],['shu','Chadian Arabic'],['si','Sinhala'],['sid','Sidamo'],['sk','Slovak'],['sl','Slovenian'],['sli','Lower Silesian'],['sly','Selayar'],['sm','Samoan'],['sma','Southern Sami'],
	['smj','Lule Sami'],['smn','Inari Sami'],['sms','Skolt Sami'],['sn','Shona'],['snk','Soninke'],['so','Somali'],['sog','Sogdien'],['son','Songhai'],['sq','Albanian'],['sr','Serbian'],
	['srn','Sranan Tongo'],['srr','Serer'],['ss','Swati'],['ssy','Saho'],['st','Southern Sotho'],['stq','Saterland Frisian'],['su','Sundanese'],['suk','Sukuma'],['sus','Susu'],['sux','Sumerian'],
	['sv','Swedish'],['sw','Swahili'],['swb','Comorian'],['swc','Congo Swahili'],['syc','Classical Syriac'],['syr','Syriac'],['szl','Silesian'],['ta','Tamil'],['tcy','Tulu'],['te','Telugu'],
	['tem','Timne'],['teo','Teso'],['ter','Tereno'],['tet','Tetum'],['tg','Tajik'],['th','Thai'],['the','Chitwania Tharu'],['ti','Tigrinya'],['tig','Tigre'],['tiv','Tiv'],
	['tk','Turkmen'],['tkl','Tokelau'],['tkr','Tsakhur'],['tl','Tagalog'],['tlh','Klingon'],['tli','Tlingit'],['tly','Talysh'],['tmh','Tamashek'],['tn','Tswana'],['to','Tongan'],
	['tog','Nyasa Tonga'],['tpi','Tok Pisin'],['tr','Turkish'],['tru','Turoyo'],['trv','Taroko'],['ts','Tsonga'],['tsd','Tsakonian'],['tsi','Tsimshian'],['tt','Tatar'],['ttt','Muslim Tat'],
	['tum','Tumbuka'],['tvl','Tuvalu'],['tw','Twi'],['twq','Tasawaq'],['ty','Tahitian'],['tyv','Tuvinian'],['tzm','Central Atlas Tamazight'],['udm','Udmurt'],['ug','Uyghur'],['uga','Ugaritic'],
	['uk','Ukrainian'],['umb','Umbundu'],['unm','Unami'],['ur','Urdu'],['uz','Uzbek'],['vai','Vai'],['ve','Venda'],['vec','Venetian'],['vep','Veps'],['vi','Vietnamese'],
	['vls','West Flemish'],['vmf','Main-Franconian'],['vo','Volapük'],['vot','Votic'],['vro','Võro'],['vun','Vunjo'],['wa','Walloon'],['wae','Walser'],['wal','Wolaytta'],['war','Waray'],
	['was','Washo'],['wbp','Warlpiri'],['wo','Wolof'],['wuu','Wu Chinese'],['xal','Kalmyk'],['xh','Xhosa'],['xmf','Mingrelian'],['xog','Soga'],['yao','Yao'],['yap','Yapese'],
	['yav','Yangben'],['ybb','Yemba'],['yi','Yiddish'],['yo','Yoruba'],['yrl','Nheengatu'],['yue','Yue Chinese'],['yuw','Papua New Guinea'],['za','Zhuang'],['zap','Zapotec'],['zbl','Blissymbols'],
	['zea','Zeelandic'],['zen','Zenaga'],['zgh','Standard Moroccan Tamazight'],['zh','Chinese'],['zu','Zulu'],['zun','Zuni'],['zza','Zaza']
];

const UNASSIGNED_TEXT = '<<UNASSIGNED>>';

for(const lang of LANGUAGE_ARRAY)
	all[lang[0]] = new Language(lang[0], lang[1]);

/**
 * 
 * @param id Text unique ID. Such as "ttSaveSettings". Used to apply text to labels.
 * @param to Language to translate to.
 */
const translate = (_id: string, _to: LANGUAGE_CODE) => {};

/**
 * 
 * @param element 
 * @param language 
 */
const update = (element: HTMLElement, language: Language) => {
	// return if doesn't have a label attribute.
	const label = element.getAttribute('label');
	if(label === null) return;

	// check and return if language has a label entry.
	const text = language.get(label);

	if(text !== null)
		if(text.length) {
			element.innerText = text;
			return;
		}
	
	// use english if selected language doesn't have a label entry.
	const text_en = all['en'].get(label);
	
	if(text_en !== null)
		if(text_en.length) {
			element.innerText = text_en;
			return;
		}
	
	// use "UNASSIGNED" if label is not even assigned in english yet.
	element.innerText = UNASSIGNED_TEXT;
};

/**
 * Updates all elements on the page to reflect selected language.
 */
const updateAll = (language: Language) => {
	for(const elem of document.querySelectorAll('[label]')) {
		update(elem as HTMLElement, language);
	}
};

const language = {
	Language,
	
	UNASSIGNED_TEXT,

	translate,
	update, updateAll,

	all,
};

export default language;