(function() {
    'use strict';

    var fetchNews = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', './assets/data.json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response))
            }
            else {
                reject('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    });

    function renderTemplate(htmlTemplate, content) {
        var keys = Object.keys(content);

        return keys.reduce(
            function(acc, key) {
                var replaceItem = '{{' + key + '}}';

                return acc.replace(replaceItem, content[key])
            },
            htmlTemplate
        );
    }

    fetchNews.then(function(response) {
        var breakingNewsItemHTML = '<li><span>{{publishedAt}}</span><a href="{{link}}">{{title}}</a></li>';
        var popularItemHTML = '<li><span>{{order}}</span><a href="{{link}}">{{title}}</a></li>';

        var breakingNewsList = response.data.breakingNews.map(function(item) {
            return renderTemplate(breakingNewsItemHTML, item);
        });

        var popularList = response.data.mostPopular.map(function(item) {
            return renderTemplate(popularItemHTML, item);
        });

        var breakingNewsEle = document.querySelector('.nc-section__container-left-list');
        breakingNewsEle.innerHTML = breakingNewsList.join('');

        var mostPopularEle = document.querySelector('.nc-section__container-right-list');
        mostPopularEle.innerHTML = popularList.join('');
    })

})()