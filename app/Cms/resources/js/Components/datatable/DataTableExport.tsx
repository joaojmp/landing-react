import jsPDF from 'jspdf';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import autoTable from 'jspdf-autotable';

import { Button } from '@cms/Components/ui/button';
import { FaCopy, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";

export default function DataTableExport({ fileData }: any) {
    const copyToClipboard = async (fileData: JSON) => {
        await navigator.clipboard.writeText(JSON.stringify(fileData));
    };

    const exportToExcel = async (jsonData: JSON) => {
        try {
            if (!Array.isArray(jsonData)) {
                throw new Error('Input data must be an array.');
            }

            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('Registros');

            if (jsonData.length > 0 && typeof jsonData[0] === 'object') {
                const headers = Object.keys(jsonData[0]);
                worksheet.addRow(headers);
            }

            jsonData.forEach((data) => {
                const values = Object.values(data);
                worksheet.addRow(values);
            });

            const buffer = await workbook.xlsx.writeBuffer();
            FileSaver.saveAs(new Blob([buffer]), 'Registros.xlsx');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    const exportToPdf = async (fileData: any) => {
        const doc = new jsPDF('l', 'mm', 'a4');
        const head = [Object.keys(fileData[0])];
        const body = fileData.map((row: any) => Object.values(row));
        autoTable(doc, { head, body });
        doc.save('Registros.pdf');
    }

    return (
        <TooltipProvider>
            <div className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild onClick={() => copyToClipboard(fileData)}>
                        <Button type="button" variant="outline">
                            <FaCopy />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copiar para área de transferência</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild onClick={() => exportToExcel(fileData)}>
                        <Button type="button" variant="outline">
                            <FaFileExcel />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Exportar para Excel</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild onClick={() => exportToPdf(fileData)}>
                        <Button type="button" variant="outline">
                            <FaFilePdf />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Exportar para PDF</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
};