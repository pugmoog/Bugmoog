// Standalone version-12 loader: local game bundle plus touch support.
(function () {
  const state = window.webSnake;
  const base = new URL(".", document.location.href);
  function fingerprint(value) {
    const match = value.match(/\/m=([^/?#]+)/);
    return match ? match[1] : null;
  }
  function resolve(value) {
    const url = new URL(value, "https://www.google.com").href;
    for (const rule of state.urlMap) {
      if (url === rule.oldUrl || (url.includes("/xjs/_/js/") && fingerprint(url) && fingerprint(url) === fingerprint(rule.oldUrl))) {
        return new URL(rule.newUrl, base).href;
      }
    }
    return value;
  }
  navigator.sendBeacon = function () { return true; };
  google.log = function () {};
  google.logUrl = function () { return ""; };
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    arguments[1] = resolve(url);
    return open.apply(this, arguments);
  };
  const fetch = window.fetch.bind(window);
  window.fetch = function (input, options) {
    const url = typeof input === "string" || input instanceof URL ? String(input) : input.url;
    const target = resolve(url);
    return fetch(target === url ? input : (input instanceof Request ? new Request(target, input) : target), options);
  };
  const append = document.body.appendChild;
  document.body.appendChild = function (element) {
    if (element && element.tagName === "SCRIPT" && element.src) element.src = resolve(element.src);
    return append.call(this, element);
  };
})();

function switchToMobile() {
  const currentGameVersion = 12;

  let snakeContainer = document.getElementsByClassName('EjCLSb')[0];
  snakeContainer.dataset.isMobile = '';

  let fullscreenButtonOld = document.querySelector('img[src$="fullscreen_white_24dp.png"]')
  if(fullscreenButtonOld) {
    fullscreenButtonOld.remove();
  }

  let fullscreenButtonsNew = document.querySelectorAll('div.EFcTud[jsaction="zeJAAd"]');
  if(fullscreenButtonsNew.length > 0) {
    [...fullscreenButtonsNew].forEach(button => button.remove());
  }

  let css = `
  
  
  .EjCLSb {
    height: 100% !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100% !important;
  }

  
  .yZz3de {
    position: static !important;
    left: 0 !important;
    top: 0 !important;
    transform: none !important;
  }

  
  .rNjvu {
    background-image: url(//www.google.com/logos/fnbx/snake_arcade/swipe.svg) !important
  }

  
  .T7SB3d {
    width: calc(100% - 64px) !important;
    max-width: 300px !important;
  }

  
  .wUt0xf {
    width: calc(100% - 64px) !important;
    max-width: 300px !important;
  }

  
  @media only screen and (max-width: 315px),only screen and (orientation:landscape) and (max-height:315px) {
    .bF4Gmf {
        margin-left:5% !important;
        margin-right: 5% !important;
    }
  }

  
  @media only screen and (max-width: 215px),only screen and (orientation:landscape) and (max-height:215px) {
      .bF4Gmf {
          margin-left:0% !important;
          margin-right: 0% !important;
      }
  }

  
  .HIonyd {
    width: 45px !important;
  }

  
  @media only screen and (max-width: 285px), only screen and (orientation: landscape) and (max-height: 285px)
  .HIonyd {
      width: 35px !important;
      padding-left: 0 !important;
  }
  `;

  if(currentGameVersion >= 5) {

    css += `
    
    @media only screen and (max-width: 285px) {
      .DwxlBd {
          display:none
      }
    }

    
    @media only screen and (max-width: 340px) {
        .jKj29e .DwxlBd {
            display:none
        }

        .jKj29e .qM98Ge {
            visibility: hidden
        }
    }

    
    @media only screen and (max-width: 340px) {
        
        .SU4xse .fbftZe {
            width:28px
        }

        
        .SU4xse .OZ9aHc {
            border-radius: 4px;
            margin: 3px;
            padding: 3px;
            width: 20px
        }

        
        .SU4xse .Cg6pxb .fbftZe {
            border-radius: 4px;
            margin: 8px 2px;
            padding: 2px;
            width: 16px
        }
    }

    
    @media only screen and (max-height: 650px) {
        
        .FL0z2d {
            height:36px;
            margin-top: 8px
        }

        
        .DwxlBd {
            height: 30px;
            width: 30px
        }

        
        .l3ryBd {
            font-size: 17px
        }

        
        .w9ahb {
            height: 26px;
            width: 26px
        }

        .w9ahb svg {
            width: 100%;
            height: 100%
        }
    }

    
    
    .jNB0Ic {
        aspect-ratio: auto !important;
    }

    
    :not(.DgO4x).EjCLSb {
        max-width: none !important;
    }

    
    @media only screen and (min-height: 650px) {
        :not(.DgO4x).EjCLSb {
            max-height: none !important;
        }
    }

    
    .O6HIqc {
      right: unset !important;
      left: 10px;
    }
    `;

    let divWithMainCanvas = document.getElementsByClassName('cer0Bd')[0].parentElement;
    divWithMainCanvas.classList.add('azpHl');

    let settingsOverlay = document.getElementsByClassName('wjOYOd')[0];

    const touchpadHtml = `
    <div jsname="Ycs2rd" class="Oiw5Ib" jsaction="touchstart:G0IZGc;touchmove:G0IZGc;touchend:G0IZGc" data-ved="0ahUKEwjzppHUw_eFAxWPR_EDHQIwB6kQvNgMCAM">
        <div class="KM6Me">
            <div jsname="MUDVS" class="CyfBUb fzrkB">
                <div class="YD2pbc">
                    <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                        <path d="M480-360 280-560h400L480-360Z" fill="#000000"></path>
                    </svg>
                </div>
            </div>
            <div jsname="rmiREc" class="CyfBUb DVNA1b">
                <div class="YD2pbc">
                    <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                        <path d="M480-360 280-560h400L480-360Z" fill="#000000"></path>
                    </svg>
                </div>
            </div>
            <div jsname="p4rndc" class="CyfBUb aq6vAe">
                <div class="YD2pbc">
                    <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                        <path d="M480-360 280-560h400L480-360Z" fill="#000000"></path>
                    </svg>
                </div>
            </div>
            <div jsname="dICtMc" class="CyfBUb EyxhB">
                <div class="YD2pbc">
                    <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                        <path d="M480-360 280-560h400L480-360Z" fill="#000000"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div jsname="k8ZH5e" class="ekPAb">
            <div class="SjfyTc"></div>
        </div>
    </div>
    `;

    const enableTouchpadButton = `
    <div class="O6HIqc" aria-label="Toggle virtual controls" role="button" tabindex="0" jsaction="Uex1ad">
        <div class="qMDOx">
            <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" fill="#FFFFFF"></path>
            </svg>
        </div>
        <div jsname="ZxgYgc" class="DZekPe vCjPXe" data-ved="0ahUKEwjzppHUw_eFAxWPR_EDHQIwB6kQxvMMCAU">
            <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                <path d="M172.309-260.001q-30.308 0-51.308-21t-21-51.435v-295.128q0-30.435 21-51.435 21-21 51.308-21h615.382q30.308 0 51.308 21t21 51.435v295.128q0 30.435-21 51.435-21 21-51.308 21H172.309Zm0-59.999h615.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-295.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H172.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v295.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846Zm117.692-50.001h59.998v-80h80v-59.998h-80v-80h-59.998v80h-80v59.998h80v80Zm289.954 0q20.814 0 35.429-14.57 14.615-14.57 14.615-35.384t-14.57-35.429q-14.57-14.615-35.384-14.615t-35.429 14.57q-14.615 14.57-14.615 35.384t14.57 35.429q14.57 14.615 35.384 14.615Zm120-120q20.814 0 35.429-14.57 14.615-14.57 14.615-35.384t-14.57-35.429q-14.57-14.615-35.384-14.615t-35.429 14.57q-14.615 14.57-14.615 35.384t14.57 35.429q14.57 14.615 35.384 14.615ZM160-320V-640-320Z" fill="#FFFFFF"></path>
            </svg>
        </div>
        <div jsname="fIqioc" class="ufnB2c vCjPXe" data-ved="0ahUKEwjzppHUw_eFAxWPR_EDHQIwB6kQxfMMCAY">
            <svg height="100%" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                <path d="M172.309-260.001q-30.308 0-51.308-21t-21-51.435v-295.128q0-30.435 21-51.435 21-21 51.308-21h615.382q30.308 0 51.308 21t21 51.435v295.128q0 30.435-21 51.435-21 21-51.308 21H172.309Zm0-59.999h615.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-295.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H172.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v295.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846Zm117.692-50.001h59.998v-80h80v-59.998h-80v-80h-59.998v80h-80v59.998h80v80Zm289.954 0q20.814 0 35.429-14.57 14.615-14.57 14.615-35.384t-14.57-35.429q-14.57-14.615-35.384-14.615t-35.429 14.57q-14.615 14.57-14.615 35.384t14.57 35.429q14.57 14.615 35.384 14.615Zm120-120q20.814 0 35.429-14.57 14.615-14.57 14.615-35.384t-14.57-35.429q-14.57-14.615-35.384-14.615t-35.429 14.57q-14.615 14.57-14.615 35.384t14.57 35.429q14.57 14.615 35.384 14.615ZM160-320V-640-320Z" fill="#FFFFFF"></path>
            </svg>
        </div>
    </div>
    `;

    settingsOverlay.insertAdjacentHTML('beforebegin', touchpadHtml);
    settingsOverlay.insertAdjacentHTML('afterbegin', enableTouchpadButton);

    const rotateGameMobileHtml = `
    <div jsname="ar2wLb" class="t6jjTb">
        <img class="xAAoNb" src="https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/screen_rotation/default/48px.svg" alt="Rotate device to portrait">
    </div>
    `;

    snakeContainer.insertAdjacentHTML('beforeend', rotateGameMobileHtml);
  }

  let styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
}

if (/Mobile|iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) { switchToMobile(); }
