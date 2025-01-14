var urlAPI = "https://apimhstiki.ptov.my.id/";
var urlSTORED = `${urlAPI}/testi`;
var urlLIST;

$("#infsukses").hide();
$("#infgagal").hide();

$(function(){
    listdata();
});

$("#ftesti").on('submit', function(ev){
    ev.preventDefault();
    var nDta = $(this).serialize(); // Ambil data dari form
    var nim = $("input[name='NIM']").val(); // Ambil NIM dari input
    urlLIST = urlAPI + "/testi-" + nim + "/read"; // Update URL LIST berdasarkan NIM

    $.ajax({
        url: urlSTORED,
        method: 'POST',
        data: nDta,
        dataType: 'json',
        success: function(dt){
            console.log(dt); // Log respons dari server
            $("#infsukses").show();
            if(dt.error == 0){
                $("#infsukses").html("Data Testimoni telah di simpan");
                listdata(); // Refresh data setelah simpan
            } else {
                $("#infgagal").show();
                $("#infgagal").html("Terjadi kendala di saat penyimpanan");
            }
        },
        error: function(){
            console.log("Pengiriman ke server gagal");
        }
    });
});

function listdata(){
    $.ajax({
        url: urlLIST,
        method: 'GET',
        dataType: 'json',
        success: function(dta){
            $("tbody").empty(); // Kosongkan tabel sebelum menambahkan data baru
            let tbl = "";
            let idx = 0;
            if((dta.error == 0) || (dta.error == 4)) {
                dta.TESTI.forEach(function(isi){
                    idx = isi.IDX;
                    tbl += `<tr>
                    <td>${isi.NAMA}</td>
                    <td>${isi.EMAIL}</td>
                    <td>${isi.TESTI}</td>
                    <td>${isi.IPX}</td>
                    <td><a onclick="destroy('${idx}')" class="btn btn-danger btn-sm"> Hapus </a></td>
                  </tr>`;
                });
                $("tbody").html(tbl);
            }
        },
        error: function(){
            console.log("Gagal mengambil Data Testimoni");
        }
    });
}

function destroy(idx){
    $.ajax({
        url: urlDEL,
        method: 'POST',
        data: 'ACT=destroy&NIM=' + nim + '&IDX=' + idx,
        dataType: 'json',
        success: function(dta){
            if(dta.error == 0){
                $("#infsukses").show();
                $("#infsukses").html("Data Testimoni berhasil di hapus");
                listdata(); // Refresh data setelah hapus
            } else {
                $("#infgagal").show();
            }
        },
        error: function(){
            console.log("terjadi masalah saat hapus data");
        }
    });
}


const lightMode = document.querySelector('.light-mode');
const darkMode = document.querySelector('.dark-mode');
const menuNavigation = document.querySelector('.menu');
const menuBar = document.querySelector('.fa-bars');
const scrollTop = document.querySelector('.scrolltop');
const iconWa = document.querySelector('.icon-wa');

window.addEventListener('scroll', () => {
    if(window.scrollY > 100 ) {
        iconWa.classList.add('active');
    } else {
        iconWa.classList.remove('active');
    }
} )

window.addEventListener('scroll', () => {
    if (window.scrollY > 100 ) {
        scrollTop.classList.add('active')
    } else {
        scrollTop.classList.remove('active');
    }
} )

menuBar.addEventListener('click', () => {
    menuBar.classList.toggle('is-active');
    menuNavigation.classList.toggle('menu-active');
})

lightMode .addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-active');
    darkMode.classList.toggle('active');
    lightMode.classList.toggle('active');
})    

darkMode.addEventListener('click', () => {
    document.body.classList.remove('dark-mode-active');
    darkMode.classList.remove('active');
    lightMode.classList.remove('active');
})

// scroll top