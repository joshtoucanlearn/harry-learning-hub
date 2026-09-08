'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

// Browser port of FLAME's actual terminal galaxy. See assets/GALAXY-SOURCE.md.
const vertexSource = `#version 300 es
in vec2 position;
void main(){ gl_Position=vec4(position,0.0,1.0); }`;
const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float clock;
uniform float home_view;
uniform sampler2D nebula_noise;
out vec4 outputColour;
const int BAYER[16]=int[](0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5);
// Harry's quieter midnight/slate palette; FLAME's original dither and geometry.
const vec3 PALETTE[9]=vec3[](
 vec3(.024,.035,.051),vec3(.036,.057,.082),vec3(.055,.084,.116),
 vec3(.082,.122,.161),vec3(.122,.176,.216),vec3(.184,.251,.290),
 vec3(.267,.337,.365),vec3(.376,.439,.459),vec3(.537,.584,.592)
);
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 palette_colour(float value,vec2 pixel){
 ivec2 cell=ivec2(mod(pixel,4.0));
 float threshold=(float(BAYER[cell.x+cell.y*4])+0.5)/16.0;
 float level=clamp(value,0.0,1.0)*8.0;
 int index=int(floor(level));
 if(fract(level)>threshold){index=min(index+1,8);}
 return PALETTE[index];
}
vec3 stars(vec2 pixel,float cell_size,float salt,float t,float speed){
 vec2 point=pixel+floor(vec2(t*speed,-t*speed*.35));
 vec2 cell=floor(point/cell_size);
 vec2 local=mod(point,cell_size);
 float seed=hash(cell+salt);
 vec2 position=floor(vec2(hash(cell+salt+31.0),hash(cell+salt+77.0))*(cell_size-6.0))+3.0;
 vec2 distance_to_star=abs(local-position);
 float centre=float(max(distance_to_star.x,distance_to_star.y)<.5);
 float cross_shape=float(min(distance_to_star.x,distance_to_star.y)<.5&&max(distance_to_star.x,distance_to_star.y)<1.5);
 float shape=mix(centre,max(centre,cross_shape*.5),step(.965,seed));
 float twinkle=.76+.24*sin(t*(.30+seed*.35)+seed*45.0);
 vec3 colour=mix(vec3(.40,.53,.65),vec3(.85,.87,.81),seed);
 return colour*shape*twinkle*step(.30,seed);
}
// One brief meteor every fourteen seconds, away from the central wordmark.
vec3 shooting_star(vec2 pixel,vec2 grid,float t){
 float cycle=floor(t/14.0);
 float phase=mod(t,14.0)-6.0;
 if(phase<0.0||phase>1.15){return vec3(0.0);}
 vec2 start=grid*vec2(.62+hash(vec2(cycle,13.0))*.25,.07+hash(vec2(cycle,29.0))*.12);
 vec2 direction=normalize(vec2(-1.0,.42));
 vec2 head=floor(start+direction*phase*grid.x*.25);
 vec2 delta=pixel-head;
 float behind=-dot(delta,direction);
 float across=abs(dot(delta,vec2(-direction.y,direction.x)));
 float tail_length=clamp(grid.x*.10,12.0,30.0);
 float trail=step(0.0,behind)*step(behind,tail_length)*(1.0-smoothstep(.3,1.1,across))*pow(max(0.0,1.0-behind/tail_length),1.6);
 float point=1.0-smoothstep(.3,1.4,length(delta));
 float fade=smoothstep(0.0,.16,phase)*(1.0-smoothstep(.72,1.15,phase));
 return vec3(.62,.78,.86)*max(trail*.58,point*.78)*fade;
}
void main(){
 float t=clock;
 vec2 grid=resolution;
 vec2 pixel=vec2(floor(gl_FragCoord.x),floor(resolution.y-gl_FragCoord.y));
 vec2 uv=(pixel+.5)/grid;
 vec2 noise_uv=uv*vec2(grid.x/grid.y,1.0);
 vec2 drift=vec2(t*.0007,-t*.00028);
 float broad=texture(nebula_noise,noise_uv*.61+drift).r;
 float detail=texture(nebula_noise,noise_uv*1.55-drift*.6+vec2(.34,.67)).r;
 float dust=texture(nebula_noise,noise_uv*3.2+drift*.4+vec2(.71,.13)).r;
 float band_axis=uv.y+uv.x*.70-.91;
 float band=exp(-pow(band_axis*3.6,2.0));
 float density=max(0.0,broad*1.05+detail*.43-.47);
 density*=.35+band*1.25;
 density-=smoothstep(.52,.77,dust)*band*.20;
 density+=sin(t*.065)*band*.012;
 vec3 colour=palette_colour(density,pixel);
 colour+=stars(pixel,21.0,4.0,t,.12)*.45;
 colour+=stars(pixel,37.0,91.0,t,.27)*.70;
 float navigation=(1.0-smoothstep(.24,.42,uv.x))*(1.0-smoothstep(.46,.63,uv.y));
 colour*=1.0-navigation*.40;
 if(home_view>.5){
   float shadow=1.0-smoothstep(.09,.24,max(colour.r,max(colour.g,colour.b)));
   float blue=exp(-dot((uv-vec2(.25,.28))*2.0,(uv-vec2(.25,.28))*2.0));
   float teal=exp(-dot((uv-vec2(.8,.72))*2.2,(uv-vec2(.8,.72))*2.2));
   float breathe=.82+.18*sin(t*.045);
   colour+=shadow*breathe*(vec3(.012,.020,.043)*blue+vec3(.004,.027,.023)*teal);
   colour+=shooting_star(pixel,grid,t);
 }
 outputColour=vec4(colour,1.0);
}`;
const MOTION_KEY = 'harry-hub-sky-paused';
export function GalaxySky({ home = false }: { home?: boolean }) {
  const homeRef = useRef(home);
  homeRef.current = home;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(true);
  const [available, setAvailable] = useState(false);
  const pausedRef = useRef(true);
  const redrawRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    redrawRef.current?.();
  }, [home]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    function preference() {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(MOTION_KEY);
      } catch {}
      const next = media.matches || saved === 'true';
      setPaused(next);
      pausedRef.current = next;
      redrawRef.current?.();
    }
    preference();
    media.addEventListener('change', preference);
    return () => media.removeEventListener('change', preference);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;
    let stopped = false,
      frame = 0,
      last = 0,
      elapsed = 0,
      loaded = false;
    const shaders: WebGLShader[] = [];
    const program = gl.createProgram();
    if (!program) return;
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) throw Error('Shader unavailable');
      shaders.push(shader);
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
        throw Error('Shader unavailable');
      return shader;
    }
    let buffer: WebGLBuffer | null = null,
      texture: WebGLTexture | null = null;
    try {
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw Error('Renderer unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } catch {
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      return;
    }
    const timeLocation = gl.getUniformLocation(program, 'clock'),
      sizeLocation = gl.getUniformLocation(program, 'resolution'),
      homeLocation = gl.getUniformLocation(program, 'home_view');
    function draw() {
      if (stopped || !loaded || document.hidden) return;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(sizeLocation, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLocation, elapsed);
      gl!.uniform1f(homeLocation, homeRef.current ? 1 : 0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    function tick(now: number) {
      frame = 0;
      if (stopped || pausedRef.current || document.hidden) return;
      if (!last) last = now;
      if (now - last >= 1000 / 24) {
        elapsed += Math.min((now - last) / 1000, 0.12);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function resume() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      draw();
      if (loaded && !pausedRef.current && !document.hidden && !stopped)
        frame = requestAnimationFrame(tick);
    }
    function resize() {
      const artScale = Math.max(4, window.innerWidth / 560);
      canvas!.width = Math.max(1, Math.floor(window.innerWidth / artScale));
      canvas!.height = Math.max(1, Math.floor(window.innerHeight / artScale));
      draw();
    }
    function lost(event: Event) {
      event.preventDefault();
      stopped = true;
      cancelAnimationFrame(frame);
      canvas!.style.opacity = '0';
      setAvailable(false);
    }
    const noise = new Image();
    noise.onload = () => {
      if (stopped) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        noise,
      );
      loaded = true;
      resize();
      canvas.style.opacity = '1';
      setAvailable(true);
      resume();
    };
    noise.src = new URL('../assets/galaxy-noise.png', import.meta.url).href;
    redrawRef.current = resume;
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', resume);
    canvas.addEventListener('webglcontextlost', lost);
    return () => {
      stopped = true;
      noise.onload = null;
      cancelAnimationFrame(frame);
      redrawRef.current = null;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', resume);
      canvas.removeEventListener('webglcontextlost', lost);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
    };
  }, []);
  function toggle() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    try {
      localStorage.setItem(MOTION_KEY, String(next));
    } catch {}
    redrawRef.current?.();
  }
  return (
    <>
      <div className="galaxy-backdrop" aria-hidden="true">
        <canvas ref={canvasRef} className="galaxy-sky" />
        <div className="sky-shade" />
      </div>
      {available && (
        <button
          className="sky-toggle"
          aria-pressed={paused}
          onClick={toggle}
          title={paused ? 'Animate the background' : 'Pause the background'}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? 'Play sky' : 'Pause sky'}</span>
        </button>
      )}
    </>
  );
}
