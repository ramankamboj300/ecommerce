import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  Customers: any;
  searchValue: string = '';
  constructor(private service:ProductsService) { 
    this.getCustomers();
  }

  getCustomers(){
    this.service.getCustomers().subscribe((data:any)=>{
      console.log(data);
      if(data.message == "Ok"){
        this.Customers = data.result;
      }
    },(error:any)=>{
      console.log(error);
    });
  }

  searchCustomers() {
    if (this.searchValue) {
      this.Customers = this.Customers.filter((customer: any) =>
        customer.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.getCustomers();
    }
  }
}
