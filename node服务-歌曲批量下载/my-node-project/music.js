
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { pipeline } = require('stream/promises');

// 配置参数
const DOWNLOAD_DIR = './downloads';
const SEARCH_API = 'https://music.163.com/api/search/get';
const SONG_API = 'https://music.163.com/song/media/outer/url';

async function downloadSongsByArtist(artistName) {
  try {
    // 1. 创建下载目录
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR);
    }
    const artistDir = path.join(DOWNLOAD_DIR, artistName);
    if (!fs.existsSync(artistDir)) {
      fs.mkdirSync(artistDir);
    }

    // 2. 搜索歌手歌曲列表
    const searchParams = new URLSearchParams({
      s: artistName,
      type: 1,
      limit: 50
    });
    const { data: searchData } = await axios.post(SEARCH_API, searchParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // 3. 解析并下载歌曲
    if (searchData.result?.songs) {
      for (const song of searchData.result.songs) {
        const fileName = `${song.name}-${song.artists[0].name}.mp3`;
        const filePath = path.join(artistDir, fileName);
        
        try {
          const songUrl = `${SONG_API}?id=${song.id}.mp3`;
          const response = await axios.get(songUrl, { responseType: 'stream' });
          await pipeline(response.data, fs.createWriteStream(filePath));
          console.log(`下载成功: ${fileName}`);
        } catch (err) {
          console.error(`下载失败 ${fileName}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error('全局错误:', err);
  }
}

// 使用示例
downloadSongsByArtist('凤凰传奇');
