'use client'
import { useEffect, useRef } from 'react'

/**
 * HobsonOrb — WebGL fluid orb (royal blue + cyan + gold accents)
 * States: 'idle' | 'listening' | 'thinking' | 'speaking'
 * Props:
 *   size?: number (px, default 180)
 *   state?: string
 *   onClick?: () => void
 *   label?: string
 */
export default function HobsonOrb({ size = 180, state = 'idle', onClick, label }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(state)

  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    const STATE = {
      idle:      { speed: 0.22, wave: 0.28, glow: 0.45, goldPulse: 0.30, colorShift: 0.0  },
      listening: { speed: 0.55, wave: 0.52, glow: 0.65, goldPulse: 0.50, colorShift: 0.08 },
      thinking:  { speed: 1.10, wave: 0.72, glow: 0.80, goldPulse: 0.70, colorShift: 0.18 },
      speaking:  { speed: 0.80, wave: 0.90, glow: 1.00, goldPulse: 0.90, colorShift: 0.12 },
    }
    const cur = { speed: 0.22, wave: 0.28, glow: 0.45, goldPulse: 0.30, colorShift: 0.0 }
    const lerp = (a, b, t) => a + (b - a) * t
    let simPhase = 0

    const VS = `attribute vec2 aPos; varying vec2 vUV;
      void main(){ vUV = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`

    const FS = `precision highp float;
      varying vec2 vUV;
      uniform float uTime,uSpeed,uWave,uGlow,uGoldPulse,uColorShift,uAmplitude;
      uniform vec2 uResolution;
      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
      vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
        vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g;
        vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
        float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
        vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.;
        vec4 sh=-step(h,vec4(0.));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
        vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
        return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }
      void main(){
        vec2 asp=uResolution/min(uResolution.x,uResolution.y);
        vec2 p=(vUV-.5)*asp;
        float dist=length(p);
        float t=uTime*uSpeed;
        float r=0.44;
        float edge=smoothstep(r+0.015,r-0.01,dist);
        vec3 nDir=normalize(vec3(p,sqrt(max(0.,r*r-dist*dist))));
        float ampBoost=1.0+uAmplitude*2.2;
        float n1=snoise(nDir*3.2+vec3(t*0.7,t*0.5,t*0.3))*uWave*ampBoost;
        float n2=snoise(nDir*5.8+vec3(-t*0.4,t*0.8,-t*0.6))*uWave*0.55*ampBoost;
        float n3=snoise(nDir*9.5+vec3(t*0.3,-t*0.9,t*0.5))*uWave*0.28*ampBoost;
        float noise=n1+n2+n3;
        float pole=pow(abs(nDir.y),3.5);
        float goldAmt=pole*uGoldPulse*(1.0+sin(t*1.8)*0.3);
        float goldBoost=goldAmt*(1.0+uAmplitude*1.5);
        float noiseN=noise*0.5+0.5;
        vec3 deepBlue=vec3(0.04+uColorShift*0.3,0.12,0.65);
        vec3 cyanBlue=vec3(0.05+uColorShift*0.2,0.62,1.00);
        vec3 brightCyan=vec3(0.55,0.92,1.00);
        vec3 col=mix(deepBlue,cyanBlue,noiseN);
        col=mix(col,brightCyan,pow(noiseN,2.2)*0.65);
        vec3 gold=vec3(1.0,0.72,0.12);
        col=mix(col,gold,goldBoost*0.75);
        col+=gold*goldBoost*0.4;
        float crest=pow(max(0.,noise+0.2),1.8);
        col+=vec3(0.5,0.85,1.0)*crest*0.55*(1.0+uAmplitude);
        col+=vec3(0.1,0.45,1.0)*uAmplitude*0.7;
        float rim=pow(1.0-smoothstep(0.0,r,dist),3.0);
        col+=vec3(0.2,0.7,1.0)*rim*uGlow*0.9;
        float bloom=exp(-dist*dist*9.0)*uGlow*0.35;
        vec3 bloomCol=mix(vec3(0.1,0.55,1.0),gold,goldBoost*0.4);
        col+=bloomCol*bloom;
        float light=dot(nDir,normalize(vec3(-0.6,0.5,0.8)))*0.25+0.75;
        col*=light;
        float alpha=edge*(0.92+noise*0.08);
        if(dist>r){
          float outerBloom=exp(-(dist-r)*(dist-r)*120.0)*uGlow*0.5;
          gl_FragColor=vec4(bloomCol*outerBloom,outerBloom); return;
        }
        gl_FragColor=vec4(col*alpha,alpha);
      }`

    function compile(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src); gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uSpeed = gl.getUniformLocation(prog, 'uSpeed')
    const uWave = gl.getUniformLocation(prog, 'uWave')
    const uGlow = gl.getUniformLocation(prog, 'uGlow')
    const uGoldPulse = gl.getUniformLocation(prog, 'uGoldPulse')
    const uColorShift = gl.getUniformLocation(prog, 'uColorShift')
    const uAmplitude = gl.getUniformLocation(prog, 'uAmplitude')
    const uResolution = gl.getUniformLocation(prog, 'uResolution')
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    let raf, t0 = null, audioAmp = 0, alive = true
    const getSimAmplitude = (s) => {
      if (s === 'speaking') { simPhase += 0.08; return Math.abs(Math.sin(simPhase)*0.7 + Math.sin(simPhase*2.3)*0.3) * 0.85 }
      if (s === 'listening') { simPhase += 0.05; return Math.abs(Math.sin(simPhase)*0.4) * 0.5 }
      if (s === 'thinking') { simPhase += 0.03; return Math.abs(Math.sin(simPhase*0.7)) * 0.3 }
      return 0
    }
    const render = (ts) => {
      if (!alive) return
      if (!t0) t0 = ts
      const elapsed = (ts - t0) * 0.001
      const tgt = STATE[stateRef.current] || STATE.idle
      const spd = 0.035
      cur.speed = lerp(cur.speed, tgt.speed, spd)
      cur.wave = lerp(cur.wave, tgt.wave, spd)
      cur.glow = lerp(cur.glow, tgt.glow, spd)
      cur.goldPulse = lerp(cur.goldPulse, tgt.goldPulse, spd)
      cur.colorShift = lerp(cur.colorShift, tgt.colorShift, spd)
      audioAmp = lerp(audioAmp, getSimAmplitude(stateRef.current), 0.15)
      gl.uniform1f(uTime, elapsed)
      gl.uniform1f(uSpeed, cur.speed)
      gl.uniform1f(uWave, cur.wave)
      gl.uniform1f(uGlow, cur.glow)
      gl.uniform1f(uGoldPulse, cur.goldPulse)
      gl.uniform1f(uColorShift, cur.colorShift)
      gl.uniform1f(uAmplitude, audioAmp)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <span className="inline-flex flex-col items-center select-none align-middle">
      <button
        type="button"
        onClick={onClick}
        aria-label={label || 'Talk to Hobson'}
        className="relative rounded-full cursor-pointer transition-transform hover:scale-[1.04] focus:outline-none inline-block align-middle"
        style={{ width: size, height: size }}
      >
        <canvas ref={canvasRef} className="w-full h-full rounded-full block" />
      </button>
      {label && (
        <span className="mt-3 block text-[11px] tracking-[0.28em] uppercase text-[#7ab8f5]/80 font-medium">
          {label}
        </span>
      )}
    </span>
  )
}
