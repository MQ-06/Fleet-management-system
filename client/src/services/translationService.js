// translations.js
import axios from 'axios';

const BASE = '/api/translations';

export const fetchTranslations = () => axios.get(BASE);

export const addTranslation = (data) => axios.post(BASE, data);


