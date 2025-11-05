<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تحديث مركز العمليات للشرطة</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- شاشة البداية (الانترو) -->
  <div id="intro">
    <h1>🚔 شرطة ريسبكت 🚔</h1>
    <h2>تحديث مركز العمليات للشرطة</h2>
  </div>

  <!-- المحتوى الرئيسي -->
  <div id="main" style="display:none">
    <h2 class="title">📋 نموذج استلام العمليات</h2>

    <div class="section">
      <label>اسم العمليات:</label>
      <input id="opsName" type="text" />
    </div>

    <div class="section">
      <label>النائب مركز العمليات:</label>
      <input id="opsDeputy" type="text" />
    </div>

    <hr>

    <!-- الأقسام -->
    <div class="section">
      <label>القيادات:</label>
      <div id="leaders"></div>
      <button onclick="addLeader()">➕ أضف قيادة</button>
    </div>

    <div class="section">
      <label>الضباط:</label>
      <div id="officers"></div>
      <button onclick="addOfficer()">➕ أضف ضابط</button>
    </div>

    <div class="section">
      <label>مسؤول الفترة (اسم + كود):</label>
      <input id="shiftManager" type="text" placeholder="مثال: عبدالله صالح 145" />
    </div>

    <div class="section">
      <label>ضباط الصف (كود):</label>
      <div id="ncos"></div>
      <button onclick="addNco()">➕ أضف ضابط صف</button>
    </div>

    <hr>

    <!-- توزيع الوحدات -->
    <h3>🚓 توزيع الوحدات</h3>
    <div id="units"></div>
    <button onclick="addUnit()">➕ أضف وحدة</button>

    <h3>🚀 وحدات سبيد يونت</h3>
    <div id="speedUnits"></div>
    <button onclick="addSpeedUnit()">➕ أضف وحدة سبيد يونت</button>

    <h3>🏍️ وحدات دباب</h3>
    <div id="bikeUnits"></div>
    <button onclick="addBikeUnit()">➕ أضف وحدة دباب</button>

    <h3>🤝 وحدات مشتركة</h3>
    <div id="sharedUnits"></div>
    <button onclick="addSharedUnit()">➕ أضف وحدة مشتركة</button>

    <hr>

    <div class="buttons">
      <button onclick="generateReport()">📄 استخراج النتيجة</button>
      <button onclick="copyResult()">📋 نسخ النتيجة</button>
      <input type="file" id="uploadImage" accept="image/*" />
    </div>

    <textarea id="result" placeholder="النتيجة النهائية ستظهر هنا ويمكنك التعديل عليها"></textarea>
  </div>

  <script src="script.js"></script>
</body>
</html>
