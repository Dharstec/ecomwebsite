import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: string[] = [
    'assets/1.png',
    'assets/2.png',
    'assets/3.png',
    'assets/product_up.png'
  ];
  currentIndex: number = 0;
  private intervalId: any; // Store the interval ID

  ngOnInit(): void {
    // Start the automatic slide transition with a 3-second interval (adjust as needed)
    this.intervalId = setInterval(() => this.nextSlide(), 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.intervalId);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  

}
