import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private readonly targetDate = new Date('2026-06-01T00:00:00');
  private intervalId: number | undefined;

  protected readonly timeLeft = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  ngOnInit(): void {
    this.updateTimeLeft();
    this.intervalId = window.setInterval(() => this.updateTimeLeft(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
    }
  }

  private updateTimeLeft(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    const remaining = Math.max(distance, 0);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    this.timeLeft.set({ days, hours, minutes, seconds });
  }
}
