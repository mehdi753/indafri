import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProposComponent } from './propos/propos.component';
import { ProduitComponent } from './produit/produit.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CompteComponent } from './compte/compte.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF as fabFacebookF,
  faTwitter as fabTwitter,
  faGooglePlusG as fabGooglePlusG,
  faLinkedinIn as fabLinkedinIn,
  faPinterestP as fabPinterestP,
  faYoutube as fabYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt as fasMapMarkerAlt, faChevronUp as fasChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from './footer/footer.component';
import { CountUpModule } from 'countup.js-angular2';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './material/material.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AgmCoreModule } from '@agm/core';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './services/contact.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { TestComponent } from './test/test.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { DataService } from './services/data.service'

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProposComponent,
    ProduitComponent,
    ContactComponent,
    InscriptionComponent,
    CompteComponent,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
    DashboardComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CountUpModule,
    InViewportModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AnimateOnScrollModule.forRoot(),
    HttpClientModule,
    NgxMatIntlTelInputModule
  ],
  entryComponents: [
    InscriptionComponent,
    CompteComponent,
    ModalComponent,
  ],
  providers: [
    AuthService,
    ContactService,
    DataService,
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(
      fabFacebookF, fabTwitter, fabGooglePlusG, fabLinkedinIn,
      fabPinterestP, fabYoutube, fasMapMarkerAlt, fasChevronUp);
  }
}
