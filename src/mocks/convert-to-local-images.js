import process from 'node:process';
import path from 'node:path';
import { createWriteStream, access, rmdir, mkdir } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { Readable } from "node:stream";
import { Buffer } from 'node:buffer';
import EventEmitter from 'node:events';

import sharp from 'sharp';

import products from './products.json' with { type: 'json' };

const pathToPublic = path.resolve(process.cwd(), 'public');
const pathToImages = path.resolve(pathToPublic, 'images');

// Утилиты для преобразований изображений
const toJpeg = (buffer, pathToImage) => {
  return sharp(buffer).jpeg({ quality: 40 }).toFile(pathToImage).catch(() => console.log('Ошибка конвертации: ', pathToImage));
};

const toWebp = (buffer, pathToImage) => {
  return sharp(buffer).webp({ quality: 40 }).toFile(pathToImage).catch(() => console.log('Ошибка конвертации: ', pathToImage));
};

const toAvif = (buffer, pathToImage) => {
  return sharp(buffer).avif({ quality: 40 }).toFile(pathToImage).catch(() => console.log('Ошибка конвертации: ', pathToImage));
};

// Для отложенных действий после алгоритма с неизвестным количеством шагов
class TimerEmitter extends EventEmitter {
  constructor(fn, ms = 1000) {
    super();
    this.ms = ms;
    this.setTimeout(fn);
  }

  clearPreviousTimer() {
    console.log('Timer clear')
    clearTimeout(this.timeout);
  }

  setTimeout(fn) {
    this.timeout = setTimeout(() => {
      fn();
    }, this.ms);
  }
}

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
 * @param {String} imageUrl URL изображения
 * @param {String} title Имя файла
 * @param {Function} onEnd Функция, вызываемая после закрытия дескриптора файла
 */
async function createAllImages(imageUrl, title, onEnd = () => {}, callCount = 0) {
  const extFile = path.extname(imageUrl);
  const titleForFile = title + (extFile || '.jpg'); 

  try {
    const response = await fetch(imageUrl);
    const pathToImage = path.resolve(pathToImages, titleForFile).toLowerCase().replace(/\s+/, '-');
   
    const writeStream = createWriteStream(pathToImage);

    Readable.fromWeb(response.body).pipe(writeStream).on('close', onEnd);
  } catch (error) {
    console.log(`Не удалось загрузить: ${titleForFile}`);
    // console.log(error);
    if (callCount < 3) createAllImages(imageUrl, title, onEnd, ++callCount);
  }
}

/**
 * Функция пробега по дереву
 * @param {Function} fnToProvide Callback, который вложим в функцию загрузки
 */
function convertToLocalImages(fnToProvide) {
  const iterateArrays = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach((product) => {
        const imageUrl = product.image;
        createAllImages(imageUrl, product.title, fnToProvide);
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

/**
 * Минимизация изображений, конвертация в форматы  .webp, .avif
 */
async function minimizeImages() {
  const dir = await readdir(pathToImages);

  console.log('Начинаю минимизировать:');
  console.log(JSON.stringify(dir));

  for (const imageName of dir) {
    try {
      const extFile = path.extname(imageName);
      const pathToImage = path.resolve(pathToImages, imageName);
  
      const buffer = await readFile(pathToImage);
  
      const bufferToJpeg = Buffer.from(buffer);
      const bufferToWebp = Buffer.from(bufferToJpeg);
      const bufferToAvif = Buffer.from(bufferToWebp);
    
      const pathToJpeg = pathToImage;
      const pathToWebp = pathToImage.replace(extFile, '.webp');
      const pathToAvif = pathToImage.replace(extFile, '.avif');
    
      toJpeg(bufferToJpeg, pathToJpeg)
      toWebp(bufferToWebp, pathToWebp);
      toAvif(bufferToAvif, pathToAvif); 
    } catch (error) {
      console.log('Ошибка конвертации: ', imageName);
    }
  }
}

async function main() {
  const timerEmitter = new TimerEmitter(() => {
    minimizeImages();
  }, 25000);

  await init();
  convertToLocalImages(() => {
    timerEmitter.clearPreviousTimer();
    timerEmitter.setTimeout(minimizeImages);
  });
}

main();
