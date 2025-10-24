// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("appForm");

  // ✅ معالجة نموذج إضافة تطبيق
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();

      let appName = document.getElementById("appName").value.trim();
      let company = document.getElementById("company").value.trim();
      let website = document.getElementById("website").value.trim();
      let free = document.getElementById("free").checked;
      let category = document.getElementById("category").value;
      let description = document.getElementById("description").value.trim();

      // تحقق من اسم التطبيق (أحرف إنكليزية فقط بدون فراغات)
      let regex = /^[A-Za-z]+$/;
      if(!regex.test(appName)){
        alert("اسم التطبيق يجب أن يكون أحرف إنكليزية فقط وبدون فراغات.");
        return;
      }

      if(!regex.test(company)){
        alert("اسم الشركة يجب أن يكون أحرف إنكليزية فقط.");
        return;
      }

      // حفظ البيانات في LocalStorage
      let newApp = {
        appName, company, website, free, category, description
      };

      let apps = JSON.parse(localStorage.getItem("apps")) || [];
      apps.push(newApp);
      localStorage.setItem("apps", JSON.stringify(apps));

      alert("تم إدخال البيانات بنجاح!");
      window.location.href = "apps.html";
    });
  }

  // ✅ عرض التطبيقات المخزنة في apps.html
  if(document.title.includes("Apps")){
    let apps = JSON.parse(localStorage.getItem("apps")) || [];
    let table = document.querySelector("table");

    apps.forEach(app => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${app.appName}</td>
        <td>${app.company}</td>
        <td>${app.category}</td>
        <td><input type="checkbox" ${app.free ? "checked" : ""} disabled></td>
        <td><input type="checkbox" class="toggle-details"></td>
      `;
      table.appendChild(row);

      let detailsRow = document.createElement("tr");
      detailsRow.classList.add("details");
      detailsRow.style.display = "none";
      detailsRow.innerHTML = `
        <td colspan="4">
          الموقع: <a href="${app.website}" target="_blank">${app.website}</a><br>
          شرح: ${app.description}<br>
        </td>
        <td></td>
      `;
      table.appendChild(detailsRow);
    });

    // ✅ تفعيل إظهار/إخفاء التفاصيل
    $(".toggle-details").on("change", function(){
      $(this).closest("tr").next(".details").toggle(this.checked);
    });
  }
});
