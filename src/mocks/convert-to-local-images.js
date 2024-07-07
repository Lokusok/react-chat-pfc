import process from 'node:process';
import path from 'node:path';
import { createWriteStream, access, rmdir, mkdir } from 'node:fs';
import { Readable } from "node:stream";

import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

import products from './products.json' with { type: 'json' };

const pathToPublic = path.resolve(process.cwd(), 'public');
const pathToImages = path.resolve(pathToPublic, 'images');

/**
 * Функция инициализации для удаления текущей директории изображений
 */
function init() {
  return new Promise((resolve) => {
    access(pathToImages, (error) => {
      if (!error) {
        return rmdir(pathToImages, { recursive: true }, () => mkdir(pathToImages, resolve));
      }
      mkdir(pathToImages, resolve);
    });
  })
}

/**
 * Получить все типы изображений. Оригинальный, webp, avif
 * @param {String} imageUrl 
 * @param {String} title
 */
async function createAllImages(imageUrl, title) {
  const titleForFile = title + (path.extname(imageUrl) || '.jpg'); 

  try {
    const response = await fetch(imageUrl);
    const pathToImage = path.resolve(pathToImages, titleForFile);
   
    const writeStream = createWriteStream(pathToImage);

    Readable.fromWeb(response.body).pipe(writeStream);

  } catch (error) {
    console.log(`Не удалось загрузить: ${titleForFile}`);
  }
}

function convertToLocalImages() {
  const iterateArrays = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach((product) => {
        const imageUrl = product.image;
        createAllImages(imageUrl, product.title);
      });
    } else {
      for (const key in obj) {
        const newObj = obj[key];
        iterateArrays(newObj)
      }
    }

    return iterateArrays.state;
  };

  iterateArrays(products);
}

async function main() {
  await init();
  convertToLocalImages();

  imagemin([pathToImages], {
    destination: pathToImages,
    plugins: [
      imageminWebp({quality: 50})
    ]
  });
}

main();
