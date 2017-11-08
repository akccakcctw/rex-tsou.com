(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var getCardCase = function getCardCase() {
  return document.querySelector('.card-case');
};
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
var expandCard = function expandCard(el, cb) {
  var targetCard = getCard(el);
  var targetContent = targetCard.querySelector('.card__content');
  if (targetCard.classList.contains('big')) {
    Velocity(targetCard, { width: window.innerWidth - getCardCase().offsetWidth - 80 + 'px' }, {
      duration: 500,
      complete: function complete() {
        setTimeout(function () {
          Velocity(targetCard, { maxHeight: targetContent.getBoundingClientRect().height + 30 + 'px' }, { complete: cb });
        }, 500);
      }
    });
  } else {
    Velocity(targetCard, { maxHeight: targetContent.getBoundingClientRect().height + 30 + 'px' }, { complete: cb });
  }
};
var takeCard = function takeCard(el, cb) {
  var targetCard = getCard(el);
  Velocity(targetCard, { translateX: getCardCase().offsetWidth }, {
    duration: 500,
    easing: 'easeInOut',
    complete: function complete() {
      targetCard.classList.add('is-taken');
      expandCard(el, cb);
    }
  });
};
var packCard = function packCard(el, cb) {
  if (el) {
    Velocity(el, { maxHeight: '100%' }, {
      duration: 500,
      complete: function complete() {
        el.classList.remove('is-taken');
        Velocity(el, { translateX: '', width: '100%' }, { complete: cb });
      }
    });
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

var websites = [{
  name: 'Teach For Taiwan 為台灣而教 - 官網',
  url: 'http://www.teach4taiwan.org/',
  intro: '',
  cover: 'assets/works/teach4taiwan.jpg',
  date: {
    y: 2017,
    m: 10
  }
}, {
  name: '漢來美食 - 官網',
  url: 'http://www.hilai-foods.com/',
  intro: '',
  cover: 'assets/works/hilai.jpg',
  date: {
    y: 2017,
    m: 3
  }
}, {
  name: '柯達大飯店 - 官網',
  url: 'http://www.khotels.com.tw/',
  intro: '',
  cover: 'assets/works/khotels.jpg',
  date: {
    y: 2016,
    m: 10
  }
}, {
  name: '南院旅墅 - 官網',
  url: 'http://www.southurban-hotel.com.tw/',
  intro: '',
  cover: 'assets/works/ny-hotel.jpg',
  date: {
    y: 2016,
    m: 6
  }
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
  var isAnim = false;
  var getBgColor = function getBgColor(el) {
    var colorVal = window.getComputedStyle(el, null).getPropertyValue('background-image');
    return colorVal.match(/rgba\(.+?,.+?,.+?,.+?\)/)[0];
  };
  console.log('rex-tsou.com');

  [].forEach.call(btnList, function (btn) {
    btn.addEventListener('mouseenter', function (e) {
      enterBtn(e.currentTarget);
    });
    btn.addEventListener('mouseleave', function (e) {
      leaveBtn(e.currentTarget);
    });
    btn.addEventListener('click', function (e) {
      if (isAnim) return;
      isAnim = true;
      var el = e.currentTarget;
      var targetColor = getBgColor(el);
      document.querySelector('.bg-mask').style.background = targetColor;
      var takenCard = document.querySelector('.is-taken');
      packCard(takenCard, function () {
        caseContainer.classList.add('is-active');
        takeCard(el, function () {
          isAnim = false;
        });
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

  var showWorks = function showWorks(data, target) {
    var item = d3.select(target).selectAll('div').data(data).enter().append('div');

    // content
    var content = item.classed('item', true).append('div').classed('content', true);

    content.append('a').attr('href', function (d) {
      return d.url;
    }).attr('target', '_blank').attr('rel', 'noopener').append('div').classed('name', true).text(function (d) {
      return d.name;
    });

    content.filter(function (d) {
      return d.date;
    }).append('time').text(function (d) {
      return d.date.y + '-' + d.date.m;
    });

    // thumbnail
    item.filter(function (d) {
      return d.cover;
    }).append('a').attr('href', function (d) {
      return d.url;
    }).attr('target', '_blank').attr('rel', 'noopener').classed('thumbnail', true).append('img').attr('src', function (d) {
      return d.cover;
    });
  };

  showWorks(websites, '.type--websites .list');
  showWorks(openSources, '.type--open-source .list');
});

})));
