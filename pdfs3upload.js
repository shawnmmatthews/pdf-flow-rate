'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const s3 = new AWS.S3({ params: { Bucket: process.env.BUCKET } });

module.exports.save = async (event, context, callback) => {

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const originalPage = await browser.newPage();
  const originalMarkup = '<p>Hello Human</p>';
  await originalPage.setContent(originalMarkup);
  const originalPDF = await originalPage.pdf({ format: 'A4' });

  await s3.putObject({
    Key: 'original/test.pdf',
    Body: originalPDF
  }).promise();

  const watermarkPage = await browser.newPage();
  const watermarkMarkup = '<p>Hello Human with watermark</p>';
  await watermarkPage.setContent(watermarkMarkup);
  const watermarkPDF = await watermarkPage.pdf({ format: 'A4' });

  await s3.putObject({
    Key: 'watermark/test.pdf',
    Body: watermarkPDF
  }).promise();

  await browser.close();
};