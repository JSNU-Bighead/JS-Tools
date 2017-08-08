(function(){
    var script = getScript();
    var isIframe = script.hasAttribute('data-is-iframe');
    console.log(isIframe)
    // 根据 script 中是否是否含有 data-is-iframe 判断脚本是执行在 iframe 中还是在 parent 中
    if(isIframe) runInIframe()
    else runInParent();
    function runInIframe() {
        window.addEventListener('load', function() {
            postHeight();
            observePage(function(){
                postHeight();
            })
        })
    }
    function runInParent() {
        window.addEventListener('message', function(event){
            console.log(event)
            try {
                var message = JSON.parse(event.data);
                if(message.tag !== 'iframe-height') return;
                var iframe = getIframe(message.url);
                if(!iframe) return;
                iframe.style.height = message.height+'px';
            }catch(e) {
            }
        })
    }
    function getScript(){
        var scripts = document.getElementsByTagName( 'script' );
        return scripts[ scripts.length - 1 ];
    }
    function postHeight() {
        var message = {
            tag: 'iframe-height',
            height: getHeight(),
            url: location.href
        }
        window.parent.postMessage(JSON.stringify(message), '*');
    }
    function getHeight() {
        return document.body.scrollHeight;
    }
    function observePage(callback) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        // 选择目标节点
        var target = document.querySelector('body');
        
        // 创建观察者对象
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // console.log(mutation.type);
                callback()
            });    
        });
        
        // 配置观察选项:
        var config = { attributes: true, childList: true, characterData: true }
        
        // 传入目标节点和观察选项
        observer.observe(target, config);
        
        // 随后,你还可以停止观察
        // observer.disconnect();
    }
    function toArray(target) {
        if(!target) return [];
        return Array.prototype.slice.apply(target);
    }
    function getIframe(url) {
        return toArray(document.querySelectorAll('iframe')).filter(function(iframe){
            return iframe.src === url;
        })[0]||document.querySelector('iframe');
    }
})();