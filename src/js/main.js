import * as CardCase from './card-case/index';
import skills from './data/skills';
import websites from './data/websites';
import openSources from './data/open-sources';

document.addEventListener('DOMContentLoaded', () => {
  const caseContainer = document.querySelector('.card-case-container');
  const caseEl = document.querySelector('.card-case');
  const btnList = caseEl.querySelectorAll('.btn-set .btn');
  const getBgColor = (el) => {
    const colorVal = window.getComputedStyle(el, null).getPropertyValue('background-image');
    return colorVal.match(/rgba\(.+?,.+?,.+?,.+?\)/)[0];
  };
  console.log('rex-tsou.com');

  [].forEach.call(btnList, (btn) => {
    btn.addEventListener('mouseenter', (e) => { CardCase.enterBtn(e.currentTarget); });
    btn.addEventListener('mouseleave', (e) => { CardCase.leaveBtn(e.currentTarget); });
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget;
      const targetColor = getBgColor(el);
      document.querySelector('.bg-mask').style.background = targetColor;
      const takenCard = document.querySelector('.is-taken');
      CardCase.packCard(takenCard, () => {
        caseContainer.classList.add('is-active');
        CardCase.takeCard(el);
      });
    });
  });

  const drawSkill = (data) => {
    const margin = {
      top: 5,
      right: 40,
      bottom: 20,
      left: 20,
    };
    const circle = {
      r: 10,
    };
    const chart = d3.select('svg.skill');
    const group = chart.selectAll('g')
      .data(data)
      .enter()
      .append('g');

    chart
      .attr('width', '100%')
      .attr('height', (data.length * 35) + margin.top + margin.bottom)
      .style('padding', '40px 20px');

    // create group for skill text
    group
      .append('text')
      .classed('skill-text', true)
      .attr('x', 0)
      .attr('y', (d, i) => i * 35)
      .text(d => d.name);

    group
      .append('circle')
      .classed('skill-circle', true)
      .attr('cx', 150)
      .attr('cy', (d, i) => (i * 35) - (circle.r / 2))
      .attr('r', circle.r)
      .style('fill', (d) => {
        if (d.level >= 1) return '#333';
        return 'transparent';
      })
      .style('stroke', '#111');
    group
      .append('circle')
      .classed('skill-circle', true)
      .attr('cx', 180)
      .attr('cy', (d, i) => (i * 35) - (circle.r / 2))
      .attr('r', circle.r)
      .style('fill', (d) => {
        if (d.level >= 2) return '#333';
        return 'transparent';
      })
      .style('stroke', '#111');
    group
      .append('circle')
      .classed('skill-circle', true)
      .attr('cx', 210)
      .attr('cy', (d, i) => (i * 35) - (circle.r / 2))
      .attr('r', circle.r)
      .style('fill', (d) => {
        if (d.level >= 3) return '#333';
        return 'transparent';
      })
      .style('stroke', '#111');
  };

  drawSkill(skills);

  const showWorks = (data, target) => {
    const item = d3.select(target)
      .selectAll('div')
      .data(data)
      .enter()
      .append('div');

    // content
    const content =
      item
        .classed('item', true)
        .append('div')
        .classed('content', true);

    content
      .append('a')
      .attr('href', d => d.url)
      .attr('target', '_blank')
      .attr('rel', 'noopener')
      .append('div')
      .classed('name', true)
      .text(d => d.name);

    content
      .filter(d => d.date)
      .append('time')
      .text(d => `${d.date.y}-${d.date.m}`);

    // thumbnail
    item
      .filter(d => d.cover)
      .append('a')
      .attr('href', d => d.url)
      .attr('target', '_blank')
      .attr('rel', 'noopener')
      .classed('thumbnail', true)
      .append('img')
      .attr('src', d => d.cover);
  };

  showWorks(websites, '.type--websites .list');
  showWorks(openSources, '.type--open-source .list');
});
