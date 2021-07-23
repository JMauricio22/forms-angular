import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styles: [],
})
export class TemplatesComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    gender: '',
  };

  countries: any[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countriesService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.user);
  }
}
