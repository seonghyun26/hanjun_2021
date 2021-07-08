const serviceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';
const URL = 'https://openapi.kpx.or.kr/openapi/smp1hToday/getSmp1hToday';

var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('areaCd') + '=' + encodeURIComponent('1');
// queryParams += '&' + encodeURIComponent('tradeDay') + '=' + encodeURIComponent('20210701');

module.exports = {
    URL:function(){
        return URL;
    },
    query:function(){
        return queryParams;
    },
}