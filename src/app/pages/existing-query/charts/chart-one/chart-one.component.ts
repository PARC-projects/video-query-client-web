import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3'; // TODO: Drop in favor of explicit import
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IMatch, IMatchView } from '../../../../models/match.model';
import { ExistingQueryMatchService } from '../../services/existing-query-match.service';
import { ExistingQueryService } from '../../services/existing-query.service';

@Component({
  selector: 'app-chart-one',
  templateUrl: './chart-one.component.html',
  styleUrls: ['./chart-one.component.scss']
})
export class ChartOneComponent implements OnInit {
  @Input() isEditable: boolean;
  @ViewChild('chart', { static: true }) chartElm: ElementRef;

  private red = '#f44455';
  private green = '#6cc788';
  private tooltip = d3.select('body').append('div').attr('class', 'vq-tooltip');
  private validationClickedSubscription: any;  // TODO: Strongly type
  private parentGroupElement: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private levels = 6;	// How many levels or inner circles should there be drawn
  private maxValue = 0; // Max value in match set. Will be calculated in logic loop.
  private dotRadius = 6; // The size of the colored circles of each ring
  private dotStroke = 2; // The stroke size of a dot
  private margin = {
    top: this.dotRadius * 2 + this.dotStroke,
    right: this.dotRadius * 2 + this.dotStroke,
    bottom: this.dotRadius * 2 + this.dotStroke,
    left: this.dotRadius * 2 + this.dotStroke
  };
  private opacityCircles = 0.1; 	// The opacity of the circles of each blob
  private width: number;
  private height: number;
  private radius: number;
  private angleSlice: number; // The width in radians of each "slice"
  private rScale: any; // TODO: Strongly type

  constructor(
    private matchService: ExistingQueryMatchService,
    private queryService: ExistingQueryService
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
    this.drawFilters();
    this.drawGrid();
    this.drawCircles();
  }

  private initializeRedrawState() {
    this.angleSlice = Math.PI * 2 / this.matchService.matches.length;
    this.maxValue = this.determineMaxValue();
    this.width = this.chartElm.nativeElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.chartElm.nativeElement.clientHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width / 2, this.height / 2);

    // Scale for the radius
    this.rScale = d3.scaleLinear()
      .range([0, this.radius])
      .domain([0, this.maxValue]);

    // Remove whatever chart with the same id/class was present before
    const parent = d3.select(this.chartElm.nativeElement);
    parent.select('svg').remove();

    const svg = parent.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('y', 50)
      .attr('class', 'chart');

    this.parentGroupElement = svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2 + this.margin.left) + ',' + (this.height / 2 + this.margin.top) + ')');
  }

  private drawFilters() {
    const filter = this.parentGroupElement.append('defs').append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
  }

  private drawGrid() {
    const axisGrid = this.parentGroupElement.append('g').attr('class', 'axisWrapper');
    this.drawGridBackgroundCircles(axisGrid);
    this.drawGridRadiatingLines(axisGrid);
    this.drawGridText(axisGrid);
  }

  private drawGridBackgroundCircles(axisGrid: any) {
    axisGrid
      .append('circle')
      .style('fill', this.red)
      .style('fill-opacity', this.opacityCircles)
      .style('stroke', this.red)
      .attr('r', () => {
        return this.rScale(this.queryService.currentQuery.query_result.match_criterion);
      })
      .style('filter', 'url(#glow)');

    axisGrid.selectAll('.levels')
      .data(d3.range(1, (this.levels + 1)).reverse())
      .enter()
      .append('circle')
      .attr('class', 'gridCircle')
      .attr('r', (d: number) => this.radius / this.levels * d)
      .style('fill', (d: any, i: number) => {
        if (i === 0) {
          return this.green;
        }
        return 'none';
      })
      .style('fill-opacity', this.opacityCircles);

    axisGrid.selectAll('.levels')
      .data(d3.range(1, (this.levels + 1)).reverse())
      .enter()
      .append('circle')
      .attr('class', 'gridCircle')
      .attr('r', (d: number) => this.radius / this.levels * d)
      .attr('fill', 'none')
      .style('stroke', (d: any, i: number) => {
        if (i === 0) {
          return this.green;
        }
        return '#ddd';
      })
      .style('filter', 'url(#glow)');
  }

  private drawGridText(axisGrid: any) {
    axisGrid.selectAll('.axisLabel')
      .data(d3.range(1, (this.levels + 1)).reverse())
      .enter().append('text')
      .attr('class', 'axisLabel')
      .attr('x', 6)
      .attr('y', (d: number) => -d * this.radius / this.levels)
      .attr('dy', '0.5rem')
      .style('font-size', '10px')
      .style('font-size', '10px')
      .attr('fill', '#737373')
      .text((d: number) => {
        return Math.round(this.maxValue * d / this.levels * 100) / 100;
      });
  }

  private drawGridRadiatingLines(axisGrid: any) {
    const axis = axisGrid.selectAll('.axis')
      .data(this.matchService.matches)
      .enter()
      .append('g')
      .attr('class', 'axis');

    this.drawGridRadiatingLineConnectors(axis);
  }

  private drawGridRadiatingLineConnectors(axis: any) {
    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d: any, i: number) => this.rScale(this.maxValue * 1.1) * Math.cos(this.angleSlice * i - Math.PI / 2))
      .attr('y2', (d: any, i: number) => this.rScale(this.maxValue * 1.1) * Math.sin(this.angleSlice * i - Math.PI / 2))
      .attr('class', 'line')
      .style('stroke', 'white')
      .style('stroke-width', '2px');
  }

  private drawCircles() {
    const self = this;
    this.parentGroupElement.append('g')
      .attr('class', 'matchContainer')
      .selectAll('.matchCircle')
      .data(this.matchService.matches)
      .enter()
      .append('circle')
      .on('click', function (d: IMatchView, i: any, l: { forEach: (arg0: (element: any) => void) => void; }) {
        self.matchService.setActiveMatch(d);
        l.forEach((element: any) => {
          d3.select(element).attr('r', self.dotRadius);
        });
        d3.select(this).attr('r', self.dotRadius * 2);
      })
      .attr('class', 'matchCircle')
      .attr('data-id', (d: IMatch) => {
        return d.id;
      })
      .attr('r', this.dotRadius)
      .attr('cx', 0)
      .attr('cy', 0)
      .style('fill', '#ccc')
      .style('stroke', (d: IMatch) => {
        if (d.is_match) {
          return this.green;
        }
        if (!d.is_match) {
          return this.red;
        }
      })
      .style('stroke-width', this.dotStroke)
      .style('fill-opacity', 0.8)
      .on('mousemove', (d: IMatchView) => {
        this.showBarTooltip(d);
      })
      .on('mouseout', (d: IMatchView) => {
        this.hideTooltip();
      })
      .transition()
      .ease(d3.easeSin)
      .duration(1500)
      .attr('cx', (d: IMatch, i: number) => this.rScale(d.score) * Math.cos(this.angleSlice * i - Math.PI / 2))
      .attr('cy', (d: IMatch, i: number) => this.rScale(d.score) * Math.sin(this.angleSlice * i - Math.PI / 2))
      .style('fill', (d: IMatch) => {
        if (d.user_match) {
          return this.green;
        }
        if (d.user_match === false) {
          return this.red;
        }
        return '#ccc';
      });
  }

  private flipUiStateOfActiveCircle(state?: boolean): void {
    const self = this;
    d3.selectAll('.matchCircle')
      .style('fill', (d: IMatch) => {
        if (d.id === self.matchService.getActiveMatch().id) {
          d.user_match = state;
        }
        if (d.user_match) {
          return this.green;
        }
        if (d.user_match === false) {
          return this.red;
        }
        return '#ccc';
      });
  }

  private determineMaxValue(): number {
    let maxValue = 0;
    for (let i = 0; i < this.matchService.matches.length; i++) {
      if (this.matchService.matches[i]['score'] > maxValue) {
        maxValue = this.matchService.matches[i]['score'];
      }
    }
    return Math.ceil(maxValue);
  }

  private showBarTooltip(data: IMatchView): void {
    this.tooltip.style('left', d3.event.pageX + 10 + 'px')
      .style('top', d3.event.pageY - 40 + 'px')
      .style('display', 'inline-block')
      .html('Score : ' + data.score.toFixed(2) + '<br/>Video : ' +  data.match_video_path + '<br/>Time : ' + data.reference_time);
  }

  private hideTooltip(): void {
    this.tooltip.style('display', 'none');
  }
}
