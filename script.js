document.getElementById("enterBtn").onclick = () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");
};

const leaders = [];
const officers = [];
const sergeants = [];
const units = [];

function addLeader() {
  const code = document.getElementById("leaderCode").value;
  if (!code) return;
  leaders.push(code);
  renderList("leadersList", leaders);
  document.getElementById("leaderCode").value = "";
}

function addOfficer() {
  const code = document.getElementById("officerCode").value;
  if (!code) return;
  officers.push(code);
  renderList("officersList", officers);
  document.getElementById("officerCode").value = "";
}

function addSergeant() {
  const code = document.getElementById("sergeantCode").value;
  if (!code) return;
  sergeants.push(code);
  renderList("sergeantsList", sergeants);
  document.getElementById("sergeantCode").value = "";
}

function addUnit() {
  const code = document.getElementById("unitCode").value;
  const status = document.getElementById("unitStatus").value;
  const loc = document.getElementById("unitLocation").value;
  const type = document.getElementById("unitType").value;

  if (!code) return;

  units.push({ code, status, loc, type });
  renderUnits();
  document.getElementById("unitCode").value = "";
}

function renderList(containerId, arr) {
  const container = document.getElementById(containerId);
  container.innerHTML = arr.map((x, i) =>
    `<div>${x} <button onclick="removeItem('${containerId}', ${i})">حذف</button></div>`
  ).join("");
}

function removeItem(containerId, index) {
  if (containerId === "leadersList") leaders.splice(index, 1);
  if (containerId === "officersList") officers.splice(index, 1);
  if (containerId === "sergeantsList") sergeants.splice(index, 1);
  renderList(containerId, eval(containerId.replace("List", "s")));
}

function renderUnits() {
  const container = document.getElementById("unitsList");
  container.innerHTML = units.map((u, i) => `
    <div>${u.code} | ${u.status} | ${u.loc} | ${u.type}
    <button onclick="editUnit(${i})">تعديل</button>
    <button onclick="deleteUnit(${i})">حذف</button></div>`).join("");
}

function editUnit(i) {
  const u = units[i];
  document.getElementById("unitCode").value = u.code;
  document.getElementById("unitStatus").value = u.status;
  document.getElementById("unitLocation").value = u.loc;
  document.getElementById("unitType").value = u.type;
  units.splice(i, 1);
  renderUnits();
}

function deleteUnit(i) {
  units.splice(i, 1);
  renderUnits();
}

function generateResult() {
  const op = document.getElementById("operationName").value || "";
  const dep = document.getElementById("deputyName").value || "";
  const manName = document.getElementById("managerName").value || "";
  const manCode = document.getElementById("managerCode").value || "";

  let result = `استلام العمليات 📌
اسم العمليات : ${op}
النائب مركز العمليات : ${dep}

القيادات
${leaders.join(" - ") || "-"}

الضباط
${officers.join(" - ") || "-"}

مسؤول فترة
${manName} ${manCode}

ضباط الصف
${sergeants.join(" - ") || "-"}

توزيع الوحدات  
${units.filter(u => u.type === "لا شي").map(u => `${u.code} | ${u.status} | ${u.loc}`).join("\n") || "-"}

وحدات سبيد يونت
${units.filter(u => u.type === "سبيد يونت").map(u => `${u.code} | ${u.status} | ${u.loc}`).join("\n") || "-"}

وحدات دباب
${units.filter(u => u.type === "دباب").map(u => `${u.code} | ${u.status} | ${u.loc}`).join("\n") || "-"}

وحدات مشتركة
${units.filter(u => u.type === "مشتركة").map(u => `${u.code} | ${u.status} | ${u.loc}`).join("\n") || "-"}

وقت الاستلام: —
وقت التسليم: —
تم التسليم إلى :`;

  document.getElementById("resultBox").value = result;
}
