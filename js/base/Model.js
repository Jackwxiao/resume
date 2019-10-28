window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            var APP_ID = 'WbkARBu1hJwNlF0kpON7ONPY-gzGzoHsz'
            var APP_KEY = 'VAtaKjFTxKFAIotYFpCYYGNi'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            let now = new Date();
            query.lessThanOrEqualTo('createdAt', now);
            query.limit(10);
            // 按 createdAt 降序排列
            query.descending('createdAt');
            return query.find() //Promise 对象
        },
        save: function(object){
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
            
        }
        }
}