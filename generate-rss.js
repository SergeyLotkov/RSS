const RSS = require('rss');
const fs = require('fs');

// Имитация получения данных (замените на ваш логику скрейпинга)
const posts = [
    { title: 'Первый пост', url: 'https://example.com/1', date: new Date() },
    { title: 'Второй пост', url: 'https://example.com/2', date: new Date() }
];

const feed = new RSS({
    title: 'Мой Instagram RSS',
    feed_url: 'https://SergeyLotkov.github.io/RSS/feed.xml',
    site_url: 'https://instagram.com/handyclass.ru'
});

posts.forEach(post => {
    feed.item({ title: post.title, url: post.url, date: post.date });
});

// Сохраняем XML в файл
fs.writeFileSync('feed.xml', feed.xml());