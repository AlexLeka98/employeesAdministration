const pdfExport = document.getElementById("pdfExport");
console.log("Here: ",pdfExport);
const pdfExportButton = document.getElementById("exportPDF");
pdfExportButton.addEventListener("click", ()=> {
    html2pdf(pdfExport);
})