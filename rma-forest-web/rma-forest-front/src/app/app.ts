import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private titleService = inject(TitleService );
}
