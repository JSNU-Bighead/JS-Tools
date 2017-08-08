import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import invoke from 'lodash/invoke'
import defaultTo from 'lodash/defaultTo'
import Popper from 'popper.js'
import btnUrl from './btn.png'
import arrowUrl from './arrow.png'
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
var Guide = {
    mask: null,
    showGuide(guide) {
        return new Promise((resolve, reject)=>{
            this.removeMask();
            invoke(guide, 'before')
            var target = document.querySelector(guide.target);
            if(!target) {
                console.error(`target ${guide.target} not found`)
                return;
            }
            this.mask = this.addMask(this.getRect(target, guide.offset), guide);
            window.addEventListener('resize', event=>{
                this.updateMask(this.getRect(target, guide.offset));
            })
            this.mask.addEventListener('click', event=>{
                resolve();
                invoke(guide, 'after')
            })            
        })
    },
    addMask({top,left, width, height}, guide) {
        var mask = document.createElement('div');
        var outline = document.createElement('div');
        var pop = document.createElement('div');
        var arrow = document.createElement('div');
        var btn = document.createElement('img');
        var arrow = document.createElement('img');
        arrow.src = arrowUrl;
        btn.src = btnUrl;
        
        pop.innerText = guide.state;
        
        Object.assign(arrow.style, {
            position: 'absolute',
            top: '-35px',
            left: '0',
            width: 'auto'
        })
        
        Object.assign(btn.style, {
            display: 'block',
            margin: '400px auto 0 auto',
            position: 'relative',
            cursor: 'pointer',
            width: 'auto'
        })
        
        Object.assign(pop.style, {
            position: 'absolute',
            margin: '40px',
            color: 'white',
            fontSize: '1.2em',
            zIndex: 1
        })
        
        Object.assign(outline.style, {
            position: 'absolute',
            top: top+'px',
            left: left+'px',
            width: width+'px',
            height: height+'px',
            borderRadius: '22px',
            // border: '1px dashed',
            boxShadow: '0px 0px 1px 1000000px rgba(0, 0, 0, 0.65)'
        })
        
        Object.assign(mask.style, {
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999
        })
       
        mask.appendChild(outline)
        pop.appendChild(arrow);
        if(!isEmpty(guide.state)) mask.appendChild(pop)
        mask.appendChild(btn)
        document.body.appendChild(mask);
        new Popper(outline, pop, {
            placement: 'bottom'
        });
        return mask;
    },
    updateMask({top,left, width, height}) {
        if(isNil(this.mask)) return;
        var outline = this.mask.children[0];
        Object.assign(outline.style, {
            position: 'absolute',
            top: top+'px',
            left: left+'px',
            width: width+'px',
            height: height+'px',
            boxShadow: '0px 0px 1px 1000000px rgba(0, 0, 0, 0.65)'
        })
    },
    removeMask() {
        if(isNil(this.mask)) return;
        this.mask.remove();
    },
    getRect(target, offset = {}){
        var rect = target.getBoundingClientRect(),//兼容IE
        y = document.documentElement.clientTop,
        x= document.documentElement.clientLeft;
        return {
            top: rect.top - y + document.body.scrollTop  + defaultTo(offset.top, 0),
            left: rect.left - x + document.body.scrollLeft + defaultTo(offset.left, 0),
            height: target.clientHeight - defaultTo(offset.top, 0) - defaultTo(offset.bottom, 0),
            width: target.clientWidth - defaultTo(offset.left, 0) - defaultTo(offset.right, 0)
        }
    },
    async init(config) {
        if(!config.test) {
            if(localStorage.getItem(`guide-${location.host+location.pathname}`)) return;
            if(!isEmpty(config.Expires) && config.Expires < (new Date())) return;
            localStorage.setItem(`guide-${location.host+location.pathname}`, true);
        }
        if(isEmpty(config.guides)) {
            console.error(`guides is not provide`);
            return;
        }
        document.body.style.overflow = 'hidden';
        for(var guide of config.guides) {
            await this.showGuide(guide)
        }
        
        document.body.style.overflow = 'initial';
        this.removeMask();
    }
}
window.Guide = Guide