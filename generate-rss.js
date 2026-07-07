const RSS = require('rss');
const fs = require('fs');
const axios = require('axios');

async function scrapeInstagram() {
    const feed = new RSS({
        title: 'Instagram RSS: handyclass.ru',
        description: 'Последние посты из Instagram',
        site_url: 'https://instagram.com/handyclass.ru',
    });

    try {
        console.log('Попытка получения данных...');
        // Используем другой метод получения данных через публичный API
        const response = await axios.get('https://www.instagram.com/handyclass.ru/?__a=1');
        
        console.log('Данные получены, обрабатываем...');
        // В этой версии Instagram отдает JSON в поле graphql
        const posts = response.data.graphql.user.edge_owner_to_timeline_media.edges;

        posts.slice(0, 5).forEach((edge) => {
            const node = edge.node;
            feed.item({
                title: node.edge_media_to_caption.edges[0]?.node.text.substring(0, 50) || 'Фото',
                description: node.edge_media_to_caption.edges[0]?.node.text || 'Instagram Post',
                url: `https://instagram.com/p/${node.shortcode}/`,
                date: new Date(node.taken_at_timestamp * 1000),
            });
        });

        fs.writeFileSync('feed.xml', feed.xml({ indent: true }));
        console.log('Файл успешно записан!');
    } catch (error) {
        console.error('Критическая ошибка:', error.response ? error.response.status : error.message);
    }
}

scrapeInstagram();