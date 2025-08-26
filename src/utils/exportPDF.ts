// utils/exportPDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportRow {
  full_name: string;
  email: string;
  phone: string;
  source: string;
  customer_id: string;
  status: string;
  join_type: string;
  key: string;
}





export const exportProfilesToPDF = (
  rowData: ExportRow[],
  pageSize?: number,
  storeFilter?: string,
  segmentName?: string
) => {
  const doc = new jsPDF("l", "pt", "a4");

  const appliedStore = storeFilter || "All Stores";
  const appliedSegment = segmentName ? ` [${segmentName}]` : "";
  const title = `${pageSize} User Profiles from ${appliedStore}${appliedSegment}`;

  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  const x = (pageWidth - textWidth) / 2;

  doc.setFontSize(14);
  doc.text(title, x, 30);

  const tableData = rowData.map((row) => [
    row.full_name,
    row.email,
    row.phone,
    row.source,
    row.customer_id,
    row.status,
    row.key,
    row.join_type
  ]);

  autoTable(doc, {
    startY: 50,
    head: [
      ["Full Name", "Email", "Phone", "Source", "Customer ID", "Status", "Key", "Join Type"],
    ],
    body: tableData,
    styles: {
      fontSize: 9,
      cellPadding: { top: 4, right: 4, bottom: 4, left: 4 },
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [0, 79, 167],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 180 },
      2: { cellWidth: 90 },
      3: { cellWidth: 100 },
      4: { cellWidth: 80, halign: "center" },
      5: { cellWidth: 80 },
      6: { cellWidth: 80 },
      7: { cellWidth: 80 },
    },
    margin: { left: 40, right: 40 },
    tableWidth: "auto",
    theme: "striped",
  });

  doc.save("UserProfiles.pdf");
};
