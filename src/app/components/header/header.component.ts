import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links = [
    {
      title: 'link 1',
      href:''
    },
    {
      title: 'link 2',
      href:''
    },
    {
      title: 'link 3',
      href:''
    },
  ];
}
