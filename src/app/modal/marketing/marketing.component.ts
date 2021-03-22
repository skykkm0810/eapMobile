import { Component, OnInit } from '@angular/core';
import { Agreement } from '../../interface/interface'
@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  text = Agreement.marketing;

}
