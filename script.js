// إخفاء الانترو بعد 2.5 ثانية
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("main").style.display = "block";
}, 2500);

// دوال الإضافة
function addLeader() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="كود القيادة" />
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("leaders").appendChild(div);
}

function addOfficer() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="كود الضابط" />
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("officers").appendChild(div);
}

function addNco() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="كود ضابط الصف" />
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("ncos").appendChild(div);
}

function addUnit() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="الكود" />
    <select>
      <option value="في الخدمة">في الخدمة</option>
      <option value="مشغول">مشغول</option>
      <option value="مشغول - اختبار">مشغول - اختبار</option>
      <option value="مشغول - تدريب">مشغول - تدريب</option>
      <option value="مشغول حالة موجه 10">مشغول حالة موجه 10</option>
    </select>
    <select>
      <option value="">— الموقع —</option>
      <option>الشمال</option>
      <option>وسط</option>
      <option>الشرق</option>
      <option>الجنوب</option>
      <option>ساندي</option>
      <option>بوليتو</option>
    </select>
    <button onclick="this.parentNode.remove()">🗑️</button>
  `;
  document.getElementById("units").appendChild(div);
}

function addSpeedUnit() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="الكود" />
                   <select><option>فايبكس</option><option>موتركس</option></select>
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("speedUnits").appendChild(div);
}

function addBikeUnit() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="الكود" />
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("bikeUnits").appendChild(div);
}

function addSharedUnit() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="الكود الأول" /> +
                   <input type="text" placeholder="الكود الثاني" /> |
                   <input type="text" placeholder="الموقع" />
                   <button onclick="this.parentNode.remove()">🗑️</button>`;
  document.getElementById("sharedUnits").appendChild(div);
}

// إنشاء النتيجة النهائية
function generateReport() {
  const ops = document.getElementById("opsName").value;
  const dep = document.getElementById("opsDeputy").value;
  const leaderCodes = [...document.querySelectorAll("#leaders input")].map(i => i.value).filter(Boolean).join(" - ");
  const officerCodes = [...document.querySelectorAll("#officers input")].map(i => i.value).filter(Boolean).join(" - ");
  const ncos = [...document.querySelectorAll("#ncos input")].map(i => i.value).filter(Boolean).join(" - ");
  const manager = document.getElementById("shiftManager").value;

  const units = [...document.querySelectorAll("#units div")].map(d => {
    const vals = [...d.querySelectorAll("input,select")].map(v => v.value).filter(Boolean);
    return vals.join(" | ");
  }).filter(Boolean);

  const speed = [...document.querySelectorAll("#speedUnits div")].map(d => [...d.querySelectorAll("input,select")].map(v => v.value).join(" | ")).filter(Boolean);
  const bikes = [...document.querySelectorAll("#bikeUnits input")].map(i => i.value).filter(Boolean);
  const shared = [...document.querySelectorAll("#sharedUnits div")].map(d => [...d.querySelectorAll("input")].map(v => v.value).join(" + ")).filter(Boolean);

  const now = new Date();
  const time = now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });

  const resultText = `
استلام العمليات 📌
اسم العمليات : ${ops}
النائب مركز العمليات : ${dep}

القيادات
${leaderCodes || "-"}

الضباط
${officerCodes || "-"}

مسؤل فترة
${manager || "-"}

ضباط الصف
${ncos || "-"}

توزيع الوحدات
${units.join("\n") || "-"}

وحدات سبيد يونت
${speed.join("\n") || "-"}

وحدات دباب
${bikes.join("\n") || "-"}

وحدات مشتركة
${shared.join("\n") || "-"}

وقت الاستلام: ${time}
وقت التسليم: 
تم التسليم إلى :
  `.trim();

  document.getElementById("result").value = resultText;
}

function copyResult() {
  const res = document.getElementById("result");
  res.select();
  document.execCommand("copy");
  alert("✅ تم نسخ النتيجة بنجاح!");
}
