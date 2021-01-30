import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakepointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map(
        (result) =>
          result.breakpoints[
            '(max-width: 599.98px) and (orientation: portrait)'
          ]
      ),
      shareReplay()
    );
  constructor(private breakepointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
