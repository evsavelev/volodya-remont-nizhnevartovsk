document.documentElement.setAttribute('translate','no');
document.documentElement.classList.add('notranslate');
document.body && document.body.setAttribute('translate','no');
if(!document.querySelector('meta[name="google"]')){const m=document.createElement('meta');m.name='google';m.content='notranslate';document.head.appendChild(m)}

const mobileFix=document.createElement('style');
mobileFix.textContent=`html,body{max-width:100%;overflow-x:hidden}.hero-grid,.hero-copy,.hero-copy h1,.lead{min-width:0;max-width:100%}.hero-media{background-image:url('assets/images/living-room-v2.jpg?v=6')!important;background-position:center 45%!important}.review-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:start}.review-copy h2{font-family:Georgia,serif;font-weight:500;font-size:clamp(36px,4.3vw,54px);line-height:1.04;letter-spacing:-1px;margin:12px 0 18px}.review-copy p{color:#68716c;font-size:17px;line-height:1.65}.review-trust{margin-top:28px;padding:20px 22px;border:1px solid #d9d1c3;border-radius:14px;background:#fff;display:flex;flex-direction:column;gap:4px}.review-trust span{color:#6c746f;font-size:13px}.lead-form select{width:100%;border:1px solid #d5cec2;border-radius:10px;padding:13px 14px;margin-top:7px;font:inherit;background:#fff;color:#17201b}.review-form{box-shadow:0 18px 50px rgba(20,31,25,.08)!important}@media(max-width:980px){.review-grid{grid-template-columns:1fr;gap:28px}}@media(max-width:640px){.hero{min-height:720px}.hero-grid{padding:130px 0 105px!important}.hero-copy{width:100%;overflow:hidden}.hero-copy h1{width:100%;max-width:100%;font-size:clamp(32px,8.9vw,39px)!important;line-height:1.04!important;letter-spacing:-.7px!important;overflow-wrap:normal;word-break:normal;margin:14px 0 20px!important}.lead{font-size:16px!important;line-height:1.48!important}.eyebrow{font-size:10px!important;letter-spacing:.12em!important}.hero-actions{gap:10px}.gallery figure,.gallery .g1,.gallery .g2,.gallery .g3,.gallery .g4,.gallery .g5,.gallery .g6{height:auto!important;aspect-ratio:4/5}.gallery .g2{aspect-ratio:16/10}.gallery picture,.gallery img{width:100%!important;height:100%!important}.gallery img{object-fit:cover!important}.gallery figcaption{font-size:12px!important;padding:10px 12px!important}.review-copy h2{font-size:38px}.review-form{padding:24px!important}}@media(max-width:390px){.hero-copy h1{font-size:32px!important;letter-spacing:-.4px!important}}`;
document.head.appendChild(mobileFix);

function setPhoto(selector,src){
  document.querySelectorAll(selector).forEach(img=>{
    const picture=img.closest('picture');
    if(picture) picture.querySelectorAll('source').forEach(s=>s.remove());
    img.style.display='block';
    img.style.background='transparent';
    img.removeAttribute('srcset');
    img.src=src;
  });
}

// Один проверенный комплект из шести исходных фотографий.
setPhoto('.gallery .g1 img','assets/images/living-room-v2.jpg?v=6');
setPhoto('.gallery .g2 img','assets/images/kitchen-v2.jpg?v=6');
setPhoto('.gallery .g3 img','assets/images/bathroom.webp?v=6');
setPhoto('.gallery .g4 img','assets/images/bath-detail.webp?v=6');
setPhoto('.gallery .g5 img','assets/images/toilet.webp?v=6');
setPhoto('.gallery .g6 img','assets/images/decor-wall.webp?v=6');
setPhoto('.photo-stack img','assets/images/decor-wall.webp?v=6');
setPhoto('.furniture img','assets/images/kitchen-v2.jpg?v=6');

const heroMedia=document.querySelector('.hero-media');
if(heroMedia){heroMedia.style.backgroundImage="url('assets/images/living-room-v2.jpg?v=6')";heroMedia.style.backgroundPosition='center 45%'}

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('load',()=>{img.style.background='transparent'});
  img.addEventListener('error',()=>{img.style.background='#ddd';img.alt=img.alt||'Фотография работы временно недоступна'},{once:true});
});

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}))}

async function copyText(text){try{await navigator.clipboard.writeText(text);return true}catch(err){try{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();return ok}catch(e){return false}}}

const form=document.getElementById('lead-form');
const note=document.getElementById('form-note');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const name=(data.get('name')||'').toString().trim();const phone=(data.get('phone')||'').toString().trim();const task=(data.get('task')||'').toString().trim();const text=`Здравствуйте, Володя! Хочу обсудить ремонт.${name?`\nИмя: ${name}`:''}${phone?`\nТелефон: ${phone}`:''}${task?`\nЗадача: ${task}`:''}`;const copied=await copyText(text);if(note){note.textContent=copied?'Заявка скопирована. Открываю страницу ВКонтакте — вставьте текст в сообщение.':'Открываю ВКонтакте. Скопируйте данные из формы вручную.'}setTimeout(()=>window.open('https://vk.ru/id1084594994','_blank','noopener'),150)})}

const reviewForm=document.getElementById('review-form');
const reviewNote=document.getElementById('review-note');
if(reviewForm){reviewForm.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(reviewForm);const name=(data.get('review_name')||'').toString().trim();const rating=(data.get('review_rating')||'5').toString();const review=(data.get('review_text')||'').toString().trim();if(!name||!review){if(reviewNote)reviewNote.textContent='Заполните имя и текст отзыва.';return}const stars='★★★★★'.slice(0,Number(rating))+'☆☆☆☆☆'.slice(0,5-Number(rating));const text=`Здравствуйте, Володя! Хочу оставить отзыв о вашей работе.\n\nИмя: ${name}\nОценка: ${stars} (${rating}/5)\nОтзыв: ${review}`;const copied=await copyText(text);if(reviewNote){reviewNote.textContent=copied?'Отзыв скопирован. Открываю ВКонтакте — вставьте его в сообщение Володе.':'Открываю ВКонтакте. Скопируйте отзыв из формы вручную.'}setTimeout(()=>window.open('https://vk.ru/id1084594994','_blank','noopener'),150)})}
