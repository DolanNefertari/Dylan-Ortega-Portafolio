import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private title: Title, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.routerState.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      const title = currentRoute.snapshot.data['title'] || 'RMA Forest';
      this.title.setTitle(title);
    });
  }
}