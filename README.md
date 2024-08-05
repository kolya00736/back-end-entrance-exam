
# Вступительное задание для Backend специалиста

## Задача

Ваша задача - продумать и разработать структуру API для кеширования данных на серверной части, а также контроля над кешем. Вы должны выбрать API из данного списка: [Public APIs](https://github.com/public-apis/public-apis#books-ov-file). Реализуйте in-memory кеш, который позволит приложению при запросе к API сначала проверить, имеются ли данные в кеше, и выполнять запрос только в том случае, если данные в кеше отсутствуют. Также, реализуйте методы очистки кеша и изменения размера кеша.

## Требования

1. Работоспособность приложения.
2. Покрытие API документацией с помощью Swagger.
3. Построение архитектуры проекта с делением его на слои.

## Выбранный API

Для реализации выбран [VirusTotal API](https://docs.virustotal.com/reference/overview), который позволяет получать отчет об анализе файла по хешу (md5, sha1, sha256) или URL-адресу, созданный более чем 70 антивирусными продуктами.

## API Endpoints

__Main Page__
- `GET /`: Returns a JSON message about the workability of the our API.

__Swagger Documentation__

- `GET /docs`: Returns a swagger documentation page.

__VirusTotal API__

- `GET /api/cache/files/{id}`: Get file report from cache or external API.

For example use hash of [EICAR-Test-File](https://ru.wikipedia.org/wiki/EICAR-Test-File): ```275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f```

- `GET /api/cache/urls?url=<url>`: Get URL report from cache or external API.

For example: ```https://example.com```

__Cache API__

- `POST /api/cache/{type}/{id}`: Add data to cache.

- `DELETE /api/cache`: Delete all cached data.

- `POST /api/cache/size`: Set the maximum size of the cache (Default is 50).

## API Key

Change `'your-api-key'` in `config/config.js` file with your API Key from [VirusTotal API](https://docs.virustotal.com/reference/authentication) or use environment variable:

```
module.exports = {
  ...
  apiKey: process.env.API_KEY || 'your-api-key',
  ...
};
```
My API Key:
```
e953cda1a3e43bf2a0c9114ab9bfc10838766554633ec38854c309abd66cc52f
```