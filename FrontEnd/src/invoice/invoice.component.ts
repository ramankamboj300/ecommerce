import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../app/frontend/checkout/payment.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  InvoiceDetails: any;

  constructor(private paymentService:PaymentService, private router: ActivatedRoute) {
     this.router.queryParamMap.subscribe((params: any) =>
     this.getInvoiceDetailByOrderID(params.params.orderID)
    );
  }

  getInvoiceDetailByOrderID(id:any){
    this.paymentService.getInvoiceDetailByOrderID(id).subscribe(data=>{
      console.log(data);
      if(data.message=="Ok"){
        this.InvoiceDetails = data.result[0];
      }
    });
  }

   downloadPDF() {
    const data = document.getElementById('invoice');

    if (!data) return;

    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    });
  }

}
