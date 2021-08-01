const smpServiceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';
const smpURL = 'https://openapi.kpx.or.kr/openapi/smp1hToday/getSmp1hToday';

const weatherServiceKey = 'Nzmbm6X06v%2BKFHEtWBn1LJG6XGCdRYGIFiEi%2BGl6BNfaS2C6ki3Hq%2FWXk5TlqTPfKjTTaWAcI%2FH%2F%2FS7BZ%2FtxNw%3D%3D';
const weatherURL = 'http://apis.data.go.kr/1360000/LivingWthrIdxService01/getSenTaIdx';

var smpQueryParams = '?' + encodeURIComponent('ServiceKey') + '=' + smpServiceKey;
smpQueryParams += '&' + encodeURIComponent('areaCd') + '=' + encodeURIComponent('1');

var weatherQueryParams = '?' + encodeURIComponent('ServiceKey') + '=' + weatherServiceKey;
weatherQueryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
weatherQueryParams += '&' + encodeURIComponent('areaNo') + '=' + encodeURIComponent('1100000000');
weatherQueryParams += '&' + encodeURIComponent('requestCode') + '=' + encodeURIComponent('A47');


module.exports = {
    smpURL:function(){
        return smpURL;
    },
    smpQuery:function(){
        return smpQueryParams;
    },
    weatherURL:function(){
        return weatherURL;
    },
    weatherQuery:function(){
        return weatherQueryParams;
    }
}