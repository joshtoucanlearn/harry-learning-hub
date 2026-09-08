import { navigate } from './navigation.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=process.env.HUB_URL||'http://127.0.0.1:4173/harry-learning-hub/';
await page.goto(url);await page.getByRole('button',{name:'Pause sky',exact:true}).waitFor();
const pixels=()=>page.locator('.galaxy-sky').evaluate(c=>{const gl=c.getContext('webgl2');const data=new Uint8Array(c.width*c.height*4);gl.drawArrays(gl.TRIANGLES,0,6);gl.readPixels(0,0,c.width,c.height,gl.RGBA,gl.UNSIGNED_BYTE,data);let hash=2166136261;for(const value of data)hash=Math.imul(hash^value,16777619);return hash;});
const before=await pixels();await page.waitForTimeout(1800);assert.notEqual(await pixels(),before,'The FLAME sky should actually animate');
await page.getByRole('button',{name:'Pause sky',exact:true}).click();const still=await pixels();await page.waitForTimeout(1200);assert.equal(await pixels(),still,'Pause must freeze the shader');
await page.reload();await page.getByRole('button',{name:'Play sky',exact:true}).waitFor();assert.equal(await page.locator('.galaxy-sky').evaluate(c=>c.width),360);
assert.equal(await page.getByRole('button',{name:'Notebook',exact:true}).count(),0);await navigate(page,'The Record');await page.getByRole('heading',{name:'The Record.',exact:true}).waitFor();
// Context loss must reveal the static version and hide the unusable play control.
await page.locator('.galaxy-sky').evaluate(c=>c.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await page.waitForFunction(()=>document.querySelector('.galaxy-sky').style.opacity==='0');assert.equal(await page.locator('.sky-toggle').count(),0);
const reduced=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});await reduced.goto(url);await reduced.getByRole('button',{name:'Play sky',exact:true}).waitFor();assert.equal(await reduced.locator('.sky-toggle').getAttribute('aria-pressed'),'true');assert.equal(await reduced.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
const fallback=await browser.newPage();await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}});await fallback.goto(url);await fallback.getByRole('heading',{name:'Welcome to Harry Baker MEDIA'}).waitFor();const background=await fallback.locator('.galaxy-backdrop').evaluate(el=>getComputedStyle(el).backgroundImage);assert.match(background,/galaxy-still/);const fallbackAsset=background.match(/url\(["']?(.*?)["']?\)/)[1];assert.equal((await fallback.request.get(fallbackAsset)).ok(),true);assert.equal(await fallback.locator('.sky-toggle').count(),0);
for(const width of [1440,768,390]){await reduced.setViewportSize({width,height:1000});for(const tab of ['Home','Matchday','Football Journalism','The Record','Stats lab','Review','Teacher']){await navigate(reduced,tab);assert.equal(await reduced.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${tab} overflow`);}}
await reduced.evaluate(()=>document.documentElement.style.fontSize='200%');for(const tab of ['Home','The Record','Football Journalism']){await navigate(reduced,tab);assert.equal(await reduced.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`200% ${tab} overflow`);}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: actual animation, frozen pause, stored preference, reduced motion, WebGL fallback/context loss, renamed navigation, responsive layouts and 200% text.');
