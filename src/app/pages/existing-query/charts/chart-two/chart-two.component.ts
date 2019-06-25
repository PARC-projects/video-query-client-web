import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

// TODO: Drop in favor of explicit import
import * as d3 from 'd3';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IMatch, IMatchView } from '../../../../models/match.model';
import { ExistingQueryMatchService } from '../../services/existing-query-match.service';

interface IMatchChartOne extends IMatch {
  x: number;
  y: number;
}

@Component({
  selector: 'app-chart-two',
  templateUrl: './chart-two.component.html',
  styleUrls: ['./chart-two.component.scss']
})
export class ChartTwoComponent implements OnInit {
  @Input() isEditable: boolean;
  @ViewChild('chart', { static: true }) chartElm: ElementRef;

  private tooltip = d3.select('body').append('div').attr('class', 'vq-tooltip');
  private validationClickedSubscription: any;  // TODO: Strongly type
  private svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private margin = {
    top: 40,
    right: 20,
    bottom: 30,
    left: 10
  };
  private height: number;
  private width: number;
  private xScale: any;
  private yScale: any;

  constructor(
    private matchService: ExistingQueryMatchService
  ) { }

  ngOnInit() {
    this.validationClickedSubscription = this.matchService.validationClicked
      .subscribe((state: boolean) => this.flipUiStateOfActiveCircle(state));

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.buildChart();
      });
  }

  resetMatches() {
    if (confirm(`Are you sure you would like to reset all matches for this query?`)) {
      this.matchService.resetMatches();
      this.buildChart();
    }
  }

  buildChart(): void {
    if (!this.matchService.matches) {
      return;
    }
    this.initializeRedrawState();
    this.buildContainer();
    this.drawAxis();
    this.drawDots();
  }

  private initializeRedrawState(): void {
    // Remove whatever chart with the same id/class was present before
    this.mapMatches();
    this.width = this.chartElm.nativeElement.clientWidth - this.margin.left - this.margin.right;

    // TODO: Magic number was derived through trial and error while viewing UI
    this.height = this.chartElm.nativeElement.clientHeight - this.margin.top - this.margin.bottom;
    this.xScale = d3.scaleLinear()
      .range([0, this.width])
      .domain([0, 1]);

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, this.getCeilingOfColumnsCount()]);
  }

  private buildContainer(): void {
    const parent = d3.select(this.chartElm.nativeElement);
    parent.select('svg').remove();

    this.svg = parent.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawAxis(): void {
    const xAxis = d3.axisBottom(this.xScale)
      .ticks(12);

    this.svg.append('g')
      .attr('class', 'x axis ')
      .attr('id', 'axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);
  }

  private drawDots(): void {
    const self = this;
    this.svg.selectAll('.dot')
      .data(this.matchService.matches)
      .enter().append('circle')
      .attr('class', 'dot')
      .on('click', function (d: IMatchView, i: number, l) {
        self.matchService.setActiveMatch(d);
        l.forEach(element => {
          d3.select(element).attr('r', 6);
        });
        d3.select(this).attr('r', 10);
      })
      .attr('r', 6)
      .attr('cx', (d: IMatchChartOne) => {
        return this.xScale(0);
      })
      .attr('cy', (d: IMatchChartOne) => {
        return this.yScale(1);
      })
      .style('fill', '#ccc')
      .on('mousemove', (d: IMatchView) => {
        this.showBarTooltip(d);
      })
      .on('mouseout', (d: IMatchView) => {
        this.hideTooltip();
      })
      .transition()
      .ease(d3.easeSin)
      .duration(1500)
      .attr('cy', (d: IMatchChartOne) => {
        return this.yScale(d.y);
      })
      .attr('cx', (d: IMatchChartOne) => {
        return this.xScale(d.x);
      })
      .attr('opacity', 0.7)
      .style('stroke-width', 2)
      .style('stroke', (d: IMatch) => {
        if (d.is_match) {
          return 'green';
        }
        if (!d.is_match) {
          return 'red';
        }
      })
      .style('stroke-width', 2);
  }

  private flipUiStateOfActiveCircle(state?: boolean): void {
    const self = this;
    d3.selectAll('.dot')
      .style('fill', (d: IMatch) => {
        if (d.id === self.matchService.getActiveMatch().id) {
          d.user_match = state;
        }
        if (d.user_match) {
          return 'green';
        }
        if (d.user_match === false) {
          return 'red';
        }
        return '#ccc';
      });
  }

  private mapMatches(): void {
    this.resetState();
    this.matchService.matches.forEach(match => {
      match.x = this.getX(match.score);
      match.y = this.getY(match.x);
    });
  }

  private resetState() {
    const parent = d3.select(this.chartElm.nativeElement);
    parent.select('svg').remove();
    this.matchService.matches.forEach(match => {
      match.x = undefined;
      match.y = undefined;
    });
  }

  private getX(score: number): number {
    for (let i = 0; i <= 9; i++) {
      const shift = i * 0.1;
      if (score >= shift && score < shift + 0.1) {
        return parseFloat((shift + 0.05).toFixed(2));
      }

      if (score === 1) {
        return 0.95;
      }
    }
    return score;
  }

  private getY(currentX: number): number {
    let dropPosition = 0;
    this.matchService.matches.forEach(match => {
      if (match.x === currentX) {
        dropPosition++;
      }
    });
    return dropPosition;
  }

  private getCeilingOfColumnsCount(): number {
    return this.matchService.matches.reduce((max, p) => p.y > max ? p.y : max, this.matchService.matches[0].y);
  }

  private showBarTooltip(data: IMatchView): void {
    this.tooltip.style('left', d3.event.pageX + 10 + 'px')
      .style('top', d3.event.pageY - 40 + 'px')
      .style('display', 'inline-block')
      .html(data.score.toFixed(2));
  }

  private hideTooltip(): void {
    this.tooltip.style('display', 'none');
  }
}
