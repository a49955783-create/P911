
// Data holders
let leaders = [], officers = [], ncos = [], units = [];
let startTime = '', endTime = '';

// Intro auto-hide after 2s
document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{
    document.getElementById('intro').style.display='none';
    document.getElementById('main').style.display='block';
  }, 2000);
});

// Helpers to render pill lists
function renderPills(id, arr){
  const container = document.getElementById(id);
  container.innerHTML='';
  arr.forEach((it,i)=>{
    const d = document.createElement('div');
    d.textContent = it;
    const b = document.createElement('button');
    b.textContent='حذف';
    b.style.background='#ef4444';
    b.style.padding='4px 8px';
    b.style.borderRadius='6px';
    b.onclick = ()=>{ arr.splice(i,1); renderPills(id,arr); };
    d.appendChild(b);
    container.appendChild(d);
  });
}

// Leaders/officers/ncos handlers
document.getElementById('addLeaderBtn').addEventListener('click', ()=>{
  const v = document.getElementById('leaderCode').value.trim();
  if(!v) return;
  leaders.push(v); document.getElementById('leaderCode').value=''; renderPills('leaders', leaders);
});
document.getElementById('addOfficerBtn').addEventListener('click', ()=>{
  const v = document.getElementById('officerCode').value.trim();
  if(!v) return;
  officers.push(v); document.getElementById('officerCode').value=''; renderPills('officers', officers);
});
document.getElementById('addNcoBtn').addEventListener('click', ()=>{
  const v = document.getElementById('ncoCode').value.trim();
  if(!v) return;
  ncos.push(v); document.getElementById('ncoCode').value=''; renderPills('ncos', ncos);
});

// Unit type show speed choice
document.getElementById('unitType').addEventListener('change', function(){
  document.getElementById('speedChoice').style.display = this.value === 'سبيد يونت' ? 'inline-block' : 'none';
});

// Add unit
document.getElementById('addUnitBtn').addEventListener('click', ()=>{
  const code = document.getElementById('unitCode').value.trim();
  if(!code) return;
  const status = document.getElementById('unitStatus').value;
  const loc = document.getElementById('unitLocation').value;
  const type = document.getElementById('unitType').value;
  const speedOpt = document.getElementById('speedChoice').value;
  const unit = { code, status, loc, type: type === 'سبيد يونت' ? (type + ' | ' + speedOpt) : type };
  units.push(unit);
  document.getElementById('unitCode').value='';
  renderUnits();
});

function renderUnits(){
  const tbody = document.querySelector('#unitsTable tbody');
  tbody.innerHTML='';
  units.forEach((u,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.status}</td><td>${u.code}</td><td>${u.loc}</td><td>${u.type}</td><td><button class="del-unit" data-i="${i}">حذف</button></td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.del-unit').forEach(b=> b.addEventListener('click', (e)=>{
    const i = parseInt(e.currentTarget.getAttribute('data-i'));
    units.splice(i,1); renderUnits();
  }));
}

// Time buttons
document.getElementById('startTimeBtn').addEventListener('click', ()=>{
  if(startTime) return;
  startTime = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('startTimeText').innerText = 'وقت الاستلام: ' + startTime;
});
document.getElementById('endTimeBtn').addEventListener('click', ()=>{
  endTime = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('endTimeText').innerText = 'وقت التسليم: ' + endTime;
});

// Generate result
document.getElementById('generateBtn').addEventListener('click', ()=>{
  const opName = document.getElementById('operationsName').value.trim();
  const opCode = document.getElementById('operationsCode').value.trim();
  const deputy = document.getElementById('deputy').value.trim();
  const deputyCode = document.getElementById('deputyCode').value.trim();
  const periodName = document.getElementById('periodName').value.trim();
  const periodCode = document.getElementById('periodCode').value.trim();

  const lines = [];
  lines.push('استلام العمليات 📌');
  lines.push(`اسم العمليات : ${opName}${opCode ? ' | ' + opCode : ''}`);
  lines.push(`النائب مركز العمليات : ${deputy}${deputyCode ? ' | ' + deputyCode : ''}`);
  lines.push('');
  lines.push('القيادات');
  lines.push(leaders.length ? leaders.join(' - ') : '-');
  lines.push('');
  lines.push('الضباط');
  lines.push(officers.length ? officers.join(' - ') : '-');
  lines.push('');
  lines.push('مسؤل فترة');
  lines.push(periodName ? (periodName + ' ' + periodCode) : '-');
  lines.push('');
  lines.push('ضباط الصف');
  lines.push(ncos.length ? ncos.join(' - ') : '-');
  lines.push('');
  lines.push('توزيع الوحدات');
  if(units.length){
    units.forEach(u=>{
      // if type includes speed info, extract
      lines.push(`${u.code} | ${u.status}${u.loc ? ' | ' + u.loc : ''}${u.type ? ' | ' + u.type : ''}`);
    });
  } else lines.push('-');
  lines.push('');
  lines.push('وحدات سبيد يونت');
  const speedUnits = units.filter(u=> u.type && u.type.startsWith('سبيد يونت'));
  if(speedUnits.length){
    speedUnits.forEach(s=>{
      // s.type has "سبيد يونت | فايبكس"
      const parts = s.type.split('|').map(p=>p.trim());
      lines.push(`${s.code} | ${parts[1] || ''}`);
    });
  } else lines.push('-');
  lines.push('');
  lines.push('وحدات دباب');
  const tankUnits = units.filter(u=> u.type === 'دباب');
  if(tankUnits.length) tankUnits.forEach(t=> lines.push(t.code)); else lines.push('-');
  lines.push('');
  lines.push('وحدات مشتركة');
  const shared = units.filter(u=> u.type === 'مشتركة');
  if(shared.length){
    shared.forEach(s=> lines.push(`${s.code}${s.loc ? ' | ' + s.loc : ''}`));
  } else lines.push('-');
  lines.push('');
  if(startTime) lines.push('وقت الاستلام ' + startTime);
  if(endTime) lines.push('وقت التسليم : ' + endTime);
  lines.push('تم التسليم إلى : ');

  document.getElementById('resultBox').innerText = lines.join('\n');
});

// Copy result
document.getElementById('copyBtn').addEventListener('click', ()=>{
  const text = document.getElementById('resultBox').innerText;
  navigator.clipboard.writeText(text).then(()=>{
    alert('تم نسخ النتيجة');
  }).catch(()=>{ alert('فشل النسخ'); });
});
