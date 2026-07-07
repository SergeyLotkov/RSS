const RSS = require('rss');
const fs = require('fs');

const feed = new RSS({
    title: 'Мой Instagram RSS',
    description: 'Последние посты из Instagram',
    feed_url: 'https://SergeyLotkov.github.io/RSS/feed.xml',
    site_url: 'https://instagram.com/handyclass.ru', // Укажите ваш ник
});

// Здесь будет логика скрейпинга, пока добавим тестовый пост
feed.item({
    title: 'Тестовый пост',
    description: 'Привет, это мой первый RSS!',
    url: 'https://instagram.com/p/12345',
    date: new Date(),
});

// Записываем в файл
fs.writeFileSync('feed.xml', feed.xml({ indent: true }));
console.log('RSS файл успешно создан!');