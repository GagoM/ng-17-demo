import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'g-map',
  standalone: true,
  imports: [],
  templateUrl: './g-map.component.html',
  styleUrl: './g-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GMapComponent implements OnInit {
  @Input({ required: true })
  coords!: { lat: string; lng: string };

  @ViewChild('map')
  mapEl!: ElementRef;

  map: any;

  async ngOnInit(): Promise<void> {
    const loader = new Loader({
      apiKey: 'AIzaSyBtDuivD6hnJveZrUvdkAuVc3Qu3qrvaBc',
      version: 'weekly',
    });
    const { Map } = await loader.importLibrary('maps');
    this.map = new Map(this.mapEl.nativeElement, {
      center: { lat: Number(this.coords.lat), lng: Number(this.coords.lng) },
      zoom: 8,
    });
  }
}
