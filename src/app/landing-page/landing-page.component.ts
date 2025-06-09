import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarWidget } from './components/topbarwidget.component';
import { FeaturesWidget } from './components/featureswidget';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, RouterModule, TopbarWidget,  FeaturesWidget,   RippleModule, StyleClassModule, ButtonModule, DividerModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
router: any;

}
