(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var getCard = function getCard(el) {
  var currentBtn = el.dataset.to;
  return document.querySelector('[data-card="' + currentBtn + '"]');
};
var enterBtn = function enterBtn(el) {
  var targetCard = getCard(el);
  targetCard.classList.add('is-hover');
};
var leaveBtn = function leaveBtn(el) {
  var targetCard = getCard(el);
  targetCard.classList.remove('is-hover');
};
var expandCard = function expandCard(el) {
  var targetCard = getCard(el);
  var targetContent = targetCard.querySelector('.card__content');
  Velocity(targetCard, { maxHeight: targetContent.getBoundingClientRect().height + 30 + 'px' });
};
var takeCard = function takeCard(el) {
  var targetCard = getCard(el);
  Velocity(targetCard, { translateX: '100%' }, {
    duration: 1000,
    easing: 'easeInOut',
    complete: function complete() {
      targetCard.classList.add('is-taken');
      expandCard(el);
    }
  });
};
var packCard = function packCard(el, cb) {
  if (el) {
    el.classList.remove('is-taken');
    Velocity(el, { translateX: '', maxHeight: '100%' }, { complete: cb });
  } else {
    cb();
  }
};

var skills = [{
  name: 'HTML5 API',
  level: 2
}, {
  name: 'CSS / SCSS',
  level: 3
}, {
  name: 'JavaScript',
  level: 3
}, {
  name: 'SEO',
  level: 2
}, {
  name: 'Vue.js',
  level: 2
}, {
  name: 'Git',
  level: 3
}, {
  name: '瀏覽器兼容性',
  level: 2
}, {
  name: '效能調校',
  level: 2
}, {
  name: 'Unix-like CLI',
  level: 2
}, {
  name: 'Bash',
  level: 1
}, {
  name: 'PHP',
  level: 1
}];

var works = [{
  name: 'Teach For Taiwan 為台灣而教 - 官網',
  url: 'http://www.teach4taiwan.org/',
  introl: '',
  cover: ''
}, {
  name: '漢來美食 - 官網',
  url: 'http://www.hilai-foods.com/',
  intro: '',
  cover: 'assets/works/hilai.jpg'
}, {
  name: '柯達大飯店 - 官網',
  url: 'http://www.khotels.com.tw/',
  intro: '',
  cover: 'assets/works/khotels.jpg'
}, {
  name: '南院旅墅 - 官網',
  url: 'http://www.southurban-hotel.com.tw/',
  intro: '',
  cover: 'assets/works/ny-hotel.jpg'
}];

var openSources = [{
  name: 'Pugass',
  url: 'https://github.com/akccakcctw/generator-pugass',
  intro: 'project structure generator for F2E development',
  cover: ''
}, {
  name: 'Front-end Navigation',
  url: 'https://akccakcctw.github.io/frontend-navigation/',
  intro: '前端工具包',
  cover: ''
}, {
  name: 'Darkli',
  url: 'https://akccakcctw.github.io/darkli/demo/',
  intro: 'Small and Clean Lightbox Script',
  cover: ''
}, {
  name: 'Walking Man',
  url: 'https://akccakcctw.github.io/walking-man/dist/',
  intro: 'Walking Man LED animation',
  cover: ''
}, {
  name: 'Clean',
  url: 'https://github.com/akccakcctw/clean',
  intro: 'A clean blog theme for hugo',
  cover: ''
}];

document.addEventListener('DOMContentLoaded', function () {
  var caseContainer = document.querySelector('.card-case-container');
  var caseEl = document.querySelector('.card-case');
  var btnList = caseEl.querySelectorAll('.btn-set .btn');
  console.log('rex-tsou.com');

  [].forEach.call(btnList, function (btn) {
    btn.addEventListener('mouseenter', function (e) {
      enterBtn(e.currentTarget);
    });
    btn.addEventListener('mouseleave', function (e) {
      leaveBtn(e.currentTarget);
    });
    btn.addEventListener('click', function (e) {
      var el = e.currentTarget;
      var takenCard = document.querySelector('.is-taken');
      packCard(takenCard, function () {
        caseContainer.classList.add('is-active');
        takeCard(el);
      });
    });
  });

  var drawSkill = function drawSkill(data) {
    var margin = {
      top: 5,
      right: 40,
      bottom: 20,
      left: 20
    };
    var circle = {
      r: 10
    };
    var chart = d3.select('svg.skill');
    var group = chart.selectAll('g').data(data).enter().append('g');

    chart.attr('width', '100%').attr('height', data.length * 35 + margin.top + margin.bottom).style('padding', '40px 20px');

    // create group for skill text
    group.append('text').classed('skill-text', true).attr('x', 0).attr('y', function (d, i) {
      return i * 35;
    }).text(function (d) {
      return d.name;
    });

    group.append('circle').classed('skill-circle', true).attr('cx', 150).attr('cy', function (d, i) {
      return i * 35 - circle.r / 2;
    }).attr('r', circle.r).style('fill', function (d) {
      if (d.level >= 1) return '#333';
      return 'transparent';
    }).style('stroke', '#111');
    group.append('circle').classed('skill-circle', true).attr('cx', 180).attr('cy', function (d, i) {
      return i * 35 - circle.r / 2;
    }).attr('r', circle.r).style('fill', function (d) {
      if (d.level >= 2) return '#333';
      return 'transparent';
    }).style('stroke', '#111');
    group.append('circle').classed('skill-circle', true).attr('cx', 210).attr('cy', function (d, i) {
      return i * 35 - circle.r / 2;
    }).attr('r', circle.r).style('fill', function (d) {
      if (d.level >= 3) return '#333';
      return 'transparent';
    }).style('stroke', '#111');
  };

  drawSkill(skills);

  var btnFlips = document.querySelectorAll('.btn-flip');
  [].forEach.call(btnFlips, function (btn) {
    btn.addEventListener('click', function () {
      btn.parentNode.parentNode.classList.toggle('is-flipped');
    });
  });

  var showWorks = function showWorks(data, target) {
    var item = d3.select(target).selectAll('div').data(data).enter().append('div');
    item.classed('item', true).append('a').attr('href', function (d) {
      return d.url;
    }).attr('target', '_blank').attr('rel', 'noopener').append('div').classed('name', true).text(function (d) {
      return d.name;
    }).append('img').classed('thumbnail', true).attr('src', function (d) {
      return d.cover;
    });
  };

  showWorks(works, '.card__content--works .list');
  showWorks(openSources, '.card__content--open-source .list');
});

})));
