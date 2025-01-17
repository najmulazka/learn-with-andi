import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadStyledPDF = () => {
  const element = document.getElementById('pdf-content');

  if (!element) return;

  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Set margin top and bottom to 10mm
    const marginTop = 10;
    const marginBottom = 10;

    // Calculate available height for content
    const contentHeight = pdf.internal.pageSize.getHeight() - marginTop - marginBottom;

    let heightLeft = pdfHeight;
    let position = marginTop;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= contentHeight;

    // If the content is longer than one page, add more pages
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= contentHeight;
    }

    pdf.save('styled-document.pdf');
  });
};
