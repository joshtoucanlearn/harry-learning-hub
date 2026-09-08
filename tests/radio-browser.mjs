import assert from 'node:assert/strict';
import { navigate } from './navigation.mjs';

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const url = process.env.HUB_URL || 'http://127.0.0.1:4173/harry-learning-hub/';
const errors = [];
const requests = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('request', (request) => {
  if (/\.mp3(?:\?|$)/.test(request.url())) requests.push(request.url());
});

// Inspect the real Web Audio output, without replacing playback or its promises.
await page.addInitScript(() => {
  const createGain = AudioContext.prototype.createGain;
  AudioContext.prototype.createGain = function () {
    const gain = createGain.call(this);
    const analyser = this.createAnalyser();
    gain.connect(analyser);
    window.radioOutput = { gain, analyser, context: this };
    return gain;
  };
});

try {
  await page.goto(url);
  await page
    .getByRole('button', { name: 'Start Paul Allen’s mix', exact: true })
    .waitFor();
  assert.equal(
    requests.length,
    0,
    'The mix must not download before a user starts it',
  );
  assert.equal(await page.locator('audio').getAttribute('src'), null);
  const slider = page.getByRole('slider', {
    name: 'Radio volume',
    exact: true,
  });
  assert.equal(await page.locator('#radio-controls').isVisible(), false);
  await page.locator('.radio-character').hover();
  await slider.waitFor();
  assert.equal(await slider.inputValue(), '25');
  await page.mouse.move(500, 200);
  assert.equal(await page.locator('#radio-controls').isVisible(), false);

  await page
    .getByRole('button', { name: 'Start Paul Allen’s mix', exact: true })
    .click();
  await page.waitForFunction(() => {
    const audio = document.querySelector('audio');
    return (
      !audio.paused &&
      audio.currentTime > 0.2 &&
      document.querySelector('.radio-pet.is-playing')
    );
  });
  assert.match(
    await page.locator('.radio-now-playing').innerText(),
    /Zorrovian — BOOTUP/,
  );
  await page.waitForFunction(() => {
    const data = new Float32Array(window.radioOutput.analyser.fftSize);
    window.radioOutput.analyser.getFloatTimeDomainData(data);
    return data.some((value) => Math.abs(value) > 0.0001);
  });
  assert.equal(
    await page.evaluate(() => window.radioOutput.gain.gain.value),
    0.25,
  );

  await slider.focus();
  await slider.press('Home');
  await page.waitForFunction(
    () => window.radioOutput.gain.gain.value < 0.00001,
  );
  assert.equal(await slider.inputValue(), '0');
  await slider.press('ArrowRight');
  await slider.press('ArrowRight');
  assert.equal(await slider.inputValue(), '2');
  await page.waitForFunction(
    () => Math.abs(window.radioOutput.gain.gain.value - 0.02) < 0.00001,
  );

  const firstTime = await page
    .locator('audio')
    .evaluate((audio) => audio.currentTime);
  const firstSource = await page.locator('audio').getAttribute('src');
  await navigate(page, 'Football Journalism');
  assert.equal(await page.locator('audio').getAttribute('src'), firstSource);
  assert.ok(
    (await page.locator('audio').evaluate((audio) => audio.currentTime)) >
      firstTime,
    'Music continues between views',
  );

  await page.locator('.radio-character').hover();
  await page.getByRole('button', { name: 'Pause radio', exact: true }).click();
  const pausedAt = await page
    .locator('audio')
    .evaluate((audio) => audio.currentTime);
  await page.waitForTimeout(250);
  assert.equal(
    await page.locator('audio').evaluate((audio) => audio.currentTime),
    pausedAt,
  );
  await page.locator('.radio-character').hover();
  await page.getByRole('button', { name: 'Play radio', exact: true }).click();
  await page.waitForFunction(
    (time) => document.querySelector('audio').currentTime > time,
    pausedAt,
  );

  await page
    .getByRole('button', { name: 'Next radio track', exact: true })
    .click();
  await page.waitForFunction(() =>
    document
      .querySelector('.radio-now-playing')
      .textContent.includes('Doc Scott'),
  );
  assert.notEqual(await page.locator('audio').getAttribute('src'), firstSource);
  await page.locator('audio').evaluate((audio) => {
    audio.currentTime = audio.duration - 0.05;
  });
  await page.waitForFunction(() =>
    document
      .querySelector('.radio-now-playing')
      .textContent.includes('The Alliance'),
  );

  // Rapid skips must leave the final requested track playing, with no stale pause/error.
  await page
    .getByRole('button', { name: 'Next radio track', exact: true })
    .click({ clickCount: 3, delay: 30 });
  await page.waitForFunction(() =>
    document
      .querySelector('.radio-now-playing')
      .textContent.includes('40 Lucky'),
  );
  assert.equal(
    await page.locator('audio').evaluate((audio) => audio.paused),
    false,
  );
  await page.locator('.radio-character').hover();
  await page.getByRole('button', { name: 'Pause radio', exact: true }).click();

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await navigate(page, 'Home');
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const box = await page.locator('.radio-pet').boundingBox();
    assert.ok(
      box.x >= 0 && box.x + box.width <= width && box.y + box.height <= 844,
    );
    const heading = await page.locator('.welcome-heading').boundingBox();
    assert.ok(
      heading.y + heading.height < box.y,
      'The radio must not cover the welcome',
    );
  }
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.screenshot({ path: 'qa/radio-home-mobile.png' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await navigate(page, 'Football Journalism');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.screenshot({ path: 'qa/radio-football-desktop.png' });
  await page.locator('.radio-character').hover();
  await page.screenshot({ path: 'qa/radio-hover-desktop.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.radio-character').hover();
  await page.getByRole('button', { name: 'Play radio', exact: true }).click();
  await page.waitForFunction(
    () => !!document.querySelector('.radio-pet.is-playing'),
  );
  assert.equal(
    await page
      .locator('.radio-character img')
      .evaluate((img) => getComputedStyle(img).animationName),
    'none',
  );

  await page.reload();
  await page
    .getByRole('button', { name: 'Start Paul Allen’s mix', exact: true })
    .waitFor();
  await page.locator('.radio-character').focus();
  await page.keyboard.press('Tab');
  await slider.waitFor();
  assert.equal(
    await slider.inputValue(),
    '2',
    'Volume persists without autoplay',
  );
  assert.equal(await page.locator('audio').getAttribute('src'), null);
  // A phone has an explicit tap target for the same controls; no hover needed.
  const phone = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await phone.goto(url);
  const touchControls = phone.getByRole('button', {
    name: 'Radio controls',
    exact: true,
  });
  await touchControls.waitFor();
  assert.equal(await phone.locator('#radio-controls').isVisible(), false);
  await touchControls.tap();
  await phone
    .getByRole('slider', { name: 'Radio volume', exact: true })
    .waitFor();
  await phone.screenshot({ path: 'qa/radio-touch-controls.png' });
  await touchControls.tap();
  assert.equal(await phone.locator('#radio-controls').isVisible(), false);
  await phone.close();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: real audio signal, quiet start, gain/mute, volume persistence, pause/resume, skip, automatic advance, rapid skips, navigation continuity, reduced motion, hover/keyboard/touch controls and mobile layouts.',
  );
} finally {
  await browser.close();
}
