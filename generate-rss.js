const RSS = require('rss');
const fs = require('fs');
const axios = require('axios');

async function scrapeInstagram() {
    const feed = new RSS({
        title: 'Instagram RSS: handyclass.ru',
        description: 'Последние посты из Instagram',
        feed_url: 'https://raw.githubusercontent.com/SergeyLotkov/RSS/master/feed.xml',
        site_url: 'https://instagram.com/handyclass.ru',
    });

    try {
        // Мы используем общедоступный инстанс для получения данных профиля
        // Это безопасно и не вызывает банов вашего аккаунта
        const response = await axios.get('https://bibliogram.art/api/u/handyclass.ru');
        const posts = response.data.posts || [];

        posts.slice(0, 5).forEach((post) => {
            feed.item({
                title: post.text ? post.text.substring(0, 50) + '...' : 'Новый пост',
                description: post.text || 'Фото из Instagram',
                url: `https://instagram.com/p/${post.shortcode}/`,
                date: new Date(post.takenAt * 1000), // конвертируем время
            });
        });

        fs.writeFileSync('feed.xml', feed.xml({ indent: true }));
        console.log('RSS успешно обновлен с данными из API!');
    } catch (error) {
        console.error('Ошибка получения данных:', error.message);
    }
}

scrapeInstagram();