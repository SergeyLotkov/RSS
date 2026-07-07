const RSS = require('rss');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeInstagram() {
    const feed = new RSS({
        title: 'Мой Instagram RSS',
        description: 'Последние посты',
        site_url: 'https://instagram.com/handyclass.ru', // Укажите свой ник
    });

    try {
        // Маскируемся под реальный браузер
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        };

        const { data } = await axios.get('https://www.instagram.com/handyclass.ru/', { headers });
        const $ = cheerio.load(data);

        // Ищем мета-теги, где Instagram хранит данные о последних постах
        // Instagram часто меняет структуру, но мета-теги - самый стабильный путь
        $('meta[property="og:image"]').each((i, el) => {
            if (i > 0 && i <= 5) { // Берем несколько картинок
                feed.item({
                    title: `Пост ${i}`,
                    description: 'Новая публикация в Instagram',
                    url: 'https://instagram.com/', 
                    date: new Date(),
                });
            }
        });

        fs.writeFileSync('feed.xml', feed.xml({ indent: true }));
        console.log('RSS успешно обновлен!');
    } catch (error) {
        console.error('Ошибка:', error.message);
        // В случае ошибки не ломаем файл, оставляем старый
    }
}

scrapeInstagram();