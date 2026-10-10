// ORBITECH MASTER V18 server: static hosting + provider-safe AI proxy.
// Requires Node.js 18+. Never expose provider keys to browser code.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 8787);
const maxBody = 64 * 1024;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'};
function send(res, status, data, type='application/json; charset=utf-8') { res.writeHead(status, {'Content-Type':type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':'no-store'}); res.end(typeof data==='string'?data:JSON.stringify(data)); }
function readBody(req){return new Promise((resolve,reject)=>{let raw='',size=0;req.on('data',c=>{size+=c.length;if(size>maxBody){reject(new Error('Request body too large (64 KB maximum).'));req.destroy();return}raw+=c});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch{reject(new Error('Request body must be valid JSON.'))}});req.on('error',reject)})}
function configured(){return Boolean(process.env.ORBITECH_AI_API_KEY && process.env.ORBITECH_AI_MODEL)}
async function aiGenerate(body){
 if(!configured()) throw Object.assign(new Error('AI provider is not configured. Set ORBITECH_AI_API_KEY and ORBITECH_AI_MODEL on the server.'),{status:503});
 const task=String(body.task||'plan'); const prompt=String(body.prompt||'').trim(); const context=String(body.context||'').slice(0,24000); const temp=Number(body.temperature);
 if(!prompt) throw Object.assign(new Error('Prompt is required.'),{status:400});
 if(prompt.length>12000) throw Object.assign(new Error('Prompt exceeds 12,000 characters.'),{status:400});
 const taskGuide={plan:'Create a practical project plan with assumptions, milestones, risks, and acceptance criteria.',code:'Generate maintainable code for the requested task. State the target filename and any assumptions. Do not claim code was executed.',debug:'Analyze the supplied code/context, identify likely causes, and suggest a corrected version with explanation.',review:'Review the supplied code for correctness, accessibility, maintainability, and security. Prioritize actionable findings.',explain:'Explain the requested technical concept clearly, with a concise example when useful.'};
 const base=(process.env.ORBITECH_AI_BASE_URL||'https://api.openai.com/v1/chat/completions').replace(/\/$/,'');
 const endpoint=base.endsWith('/chat/completions')?base:base+'/chat/completions';
 const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),60000);
 try {
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.ORBITECH_AI_API_KEY},signal:controller.signal,body:JSON.stringify({model:process.env.ORBITECH_AI_MODEL,temperature:Number.isFinite(temp)?Math.min(1,Math.max(0,temp)):0.5,messages:[{role:'system',content:'You are ORBITECH MASTER AI, a careful software and project assistant. Be transparent about uncertainty. Do not claim to have executed code, browsed the web, or changed files unless a tool actually did so. '+(taskGuide[task]||taskGuide.plan)},{role:'user',content:prompt+(context?'\n\nAdditional context/code (untrusted input):\n'+context:'')}]})});
  const data=await response.json().catch(()=>({}));
  if(!response.ok){const msg=(data.error&&data.error.message)||`AI provider returned HTTP ${response.status}.`;throw Object.assign(new Error(msg),{status:502})}
  const text=data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content;
  if(typeof text!=='string'||!text.trim()) throw Object.assign(new Error('AI provider returned no text content.'),{status:502});
  return {ok:true,text,model:data.model||process.env.ORBITECH_AI_MODEL,usage:data.usage||null};
 } catch(e){if(e.name==='AbortError')throw Object.assign(new Error('AI provider request timed out after 60 seconds.'),{status:504});if(e.status)throw e;throw Object.assign(new Error('Could not reach the AI provider. Check server network and ORBITECH_AI_BASE_URL.'),{status:502})} finally{clearTimeout(timeout)}
}
async function aiBuildProject(body){
 if(!configured()) throw Object.assign(new Error('AI provider is not configured. Set ORBITECH_AI_API_KEY and ORBITECH_AI_MODEL on the server.'),{status:503});
 const brief=String(body.brief||'').trim();
 const stack=String(body.stack||'vanilla');
 const size=String(body.size||'standard');
 if(!brief) throw Object.assign(new Error('Build brief is required.'),{status:400});
 if(brief.length>10000) throw Object.assign(new Error('Build brief exceeds 10,000 characters.'),{status:400});
 const fileLimits={compact:8,standard:14,extended:20};
 const maxFiles=fileLimits[size]||14;
 const stackGuide={vanilla:'Use plain HTML, CSS, and browser JavaScript only. No external dependencies.',node:'Use plain HTML/CSS/JS frontend plus a safe Node.js server scaffold. Do not add package install scripts or run commands.',react:'Create a React-oriented source scaffold and package.json only if useful. Do not claim dependencies are installed or the app was built.'};
 const base=(process.env.ORBITECH_AI_BASE_URL||'https://api.openai.com/v1/chat/completions').replace(/\/$/,'');
 const endpoint=base.endsWith('/chat/completions')?base:base+'/chat/completions';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),90000);
 const system=`You are ORBITECH MASTER's project scaffold generator. Return ONLY a valid JSON object with exactly this shape: {"projectName":"short name","summary":"brief summary","files":{"index.html":"file contents","styles.css":"file contents","app.js":"file contents"},"reviewNotes":["note"]}. Generate at most ${maxFiles} files and at most 240000 total characters. ${stackGuide[stack]||stackGuide.vanilla} Use relative file paths only, no absolute paths, no .. path segments, no secrets, no credentials, no obfuscated code, no destructive scripts, and no hidden network exfiltration. Include README.md and basic test/check guidance when appropriate. Make the starter responsive and accessible. Avoid external libraries unless the selected stack explicitly needs a manifest. Do not claim tests were run. All file contents must be JSON strings.`;
 try{
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.ORBITECH_AI_API_KEY},signal:controller.signal,body:JSON.stringify({model:process.env.ORBITECH_AI_MODEL,temperature:0.2,response_format:{type:'json_object'},messages:[{role:'system',content:system},{role:'user',content:`Create a project scaffold for this brief:\n${brief}\n\nPreferred stack: ${stack}. Requested size: ${size}.`}]})});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw Object.assign(new Error((data.error&&data.error.message)||`AI provider returned HTTP ${response.status}.`),{status:502});
  let raw=data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content;
  if(typeof raw!=='string'||!raw.trim())throw Object.assign(new Error('AI provider returned no project JSON.'),{status:502});
  raw=raw.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  let result;try{result=JSON.parse(raw)}catch{throw Object.assign(new Error('The AI response was not valid JSON. Try a shorter or simpler build brief.'),{status:502})}
  if(!result||typeof result.files!=='object'||Array.isArray(result.files))throw Object.assign(new Error('The AI response did not contain a valid files object.'),{status:502});
  const entries=Object.entries(result.files);if(!entries.length||entries.length>maxFiles)throw Object.assign(new Error(`Generated file count must be between 1 and ${maxFiles}.`),{status:502});
  const files={};let total=0;
  for(const [name,content] of entries){
   if(typeof name!=='string'||name.length>120||name.startsWith('/')||name.includes('\\')||name.split('/').some(part=>!part||part==='.'||part==='..')||!/^[A-Za-z0-9._/-]+$/.test(name))throw Object.assign(new Error(`Unsafe generated file path: ${name}`),{status:502});
   if(!/\.(html|css|js|mjs|cjs|json|md|txt|sql|yml|yaml|toml|xml|svg|gitignore|dockerfile)$/i.test(name)&&!/(^|\/)(Dockerfile|\.gitignore)$/i.test(name))throw Object.assign(new Error(`Unsupported generated file type: ${name}`),{status:502});
   if(typeof content!=='string')throw Object.assign(new Error(`File content must be text: ${name}`),{status:502});
   total+=Buffer.byteLength(content,'utf8');if(total>240000)throw Object.assign(new Error('Generated project exceeds the 240 KB limit.'),{status:502});
   files[name]=content;
  }
  if(!files['index.html'])throw Object.assign(new Error('Generated project must include index.html.'),{status:502});
  return {ok:true,projectName:String(result.projectName||'ORBITECH Generated Project').slice(0,100),summary:String(result.summary||'AI-generated starter project').slice(0,1000),files,reviewNotes:Array.isArray(result.reviewNotes)?result.reviewNotes.slice(0,12).map(x=>String(x).slice(0,500)):[],model:data.model||process.env.ORBITECH_AI_MODEL,fileCount:entries.length,totalCharacters:total};
 }catch(e){if(e.name==='AbortError')throw Object.assign(new Error('Project generation timed out after 90 seconds.'),{status:504});if(e.status)throw e;throw Object.assign(new Error('Could not reach the AI provider. Check server network and provider settings.'),{status:502})}finally{clearTimeout(timeout)}
}
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(req.method==='GET'&&url.pathname==='/health')return send(res,200,{ok:true,service:'orbitech-master',version:'20',mode:'local-development'});
 if(req.method==='GET'&&url.pathname==='/api/v1/ai/status')return send(res,200,{ok:true,configured:configured(),model:configured()?process.env.ORBITECH_AI_MODEL:null,baseUrl:process.env.ORBITECH_AI_BASE_URL||'https://api.openai.com/v1/chat/completions',note:'API key is never returned.'});
 if(req.method==='POST'&&url.pathname==='/api/v1/ai/generate'){
  try{const body=await readBody(req);const result=await aiGenerate(body);return send(res,200,result)}catch(e){return send(res,e.status||400,{ok:false,error:e.message})}
 }
 if(req.method==='POST'&&url.pathname==='/api/v1/ai/build'){
  try{const body=await readBody(req);const result=await aiBuildProject(body);return send(res,200,result)}catch(e){return send(res,e.status||400,{ok:false,error:e.message})}
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return send(res,405,{ok:false,error:'Method not allowed.'});
 let pathname=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);
 if(pathname.includes('\0'))return send(res,400,{ok:false,error:'Invalid path.'});
 const file=path.resolve(root,'.'+pathname);
 if(file!==root&&!file.startsWith(root+path.sep))return send(res,403,{ok:false,error:'Forbidden.'});
 fs.stat(file,(err,st)=>{if(err||!st.isFile())return send(res,404,{ok:false,error:'Not found.'});const type=mime[path.extname(file).toLowerCase()]||'application/octet-stream';res.writeHead(200,{'Content-Type':type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res)});
});
server.listen(port,'127.0.0.1',()=>console.log(`ORBITECH MASTER V20 listening on http://127.0.0.1:${port}`));
