const cacheModel = require('../models/cacheModel');
const axios = require('axios');
const config = require('../config/config');

const fetchDataFromApi = async (type, id) => {
  const url = `${config.apiBaseUrl}/${type}/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'x-apikey': config.apiKey
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        status: error.response.status,
        data: error.response.data
      };
    } else {
      return {
        error: true,
        message: error.message
      };
    }
  }
};

exports.getData = async (type, id) => {
  const cache = cacheModel.getCache();
  const cacheKey = `${type}_${id}`;
  
  if (cache[cacheKey]) {
    console.log('cache');
    return cache[cacheKey];
  } else {
    const data = await fetchDataFromApi(type, id);
    if (!data.error) {
      await this.setData(type, id, data);
    }
    return data;
  }
};

exports.setData = async (type, id, value) => {
  const cache = cacheModel.getCache();
  const cacheKey = `${type}_${id}`;
  
  if (Object.keys(cache).length >= cacheModel.getMaxSize()) {
    delete cache[Object.keys(cache)[0]];
  }
  cache[cacheKey] = value;
  cacheModel.setCache(cache);
};

exports.clearCache = async () => {
  cacheModel.setCache({});
};

exports.setCacheSize = async (size) => {
  cacheModel.setMaxSize(size);
};