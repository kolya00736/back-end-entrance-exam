const cacheService = require('../services/cacheService');
const base64url = require('base64url');

exports.getFileData = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const data = await cacheService.getData('files', id);
  if (data.error) {
    res.status(data.status || 500).json(data.data || { message: data.message });
  } else {
    res.json(data);
  }
};

exports.getUrlData = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const id = base64url(url);
  const data = await cacheService.getData('urls', id);
  
  if (data.error) {
    res.status(data.status || 500).json(data.data || { message: data.message });
  } else {
    res.json(data);
  }
};

exports.setData = async (req, res) => {
  const { type, id } = req.params;
  const { value } = req.body;
  await cacheService.setData(type, id, value);
  res.status(201).end();
};

exports.clearCache = async (req, res) => {
  await cacheService.clearCache();
  res.status(204).end();
};

exports.setCacheSize = async (req, res) => {
  const { size } = req.body;
  await cacheService.setCacheSize(size);
  res.status(200).end();
};