import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import typeSpeakers from './modules/typeSpeakers';
import makeMap from './modules/map';

autocomplete( $('#address'), $('#lat'), $('#lng') );
typeAhead($('.search'));
typeSpeakers($('.search-speakers'), $('.search-speakers__add'))
makeMap($('#map'));
